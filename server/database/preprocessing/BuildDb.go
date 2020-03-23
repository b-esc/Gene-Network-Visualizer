package main

import (
	"encoding/json"
	"fmt"
	. "github.com/b-esc/carolyns-web/server/models"
	//. "github.com/b-esc/carolyns-web/server/utils"
	"github.com/k0kubun/pp"
	"github.com/prologic/bitcask"
	"io"
	"log"
	"os"
	"os/exec"
	"time"
	// DictReader (.py each line is a map) equivalent in Go
	"github.com/ibbd-dev/go-csv"
)

func main() {
	// clear previous store
	cmd := exec.Command("rm -r ../store")
	cmd.Stdout = os.Stdout
	cmd.Run()

	start := time.Now()
	// Doesn't include program name

	args := os.Args[1:]

	if len(args) < 2 || args[1] == "-h" {
		fmt.Println("Usage: go run ./BuildDb.go info.csv edges.csv")
		fmt.Println(">> Successfully parsing new database files will clear previous contents!")
		os.Exit(0)
	}

	fmt.Println("Our database is stored under /server/database/store")

	infoFilename := args[0]
	edgesFilename := args[1]

	fmt.Printf("\n Now Loading \n Info: %s | Edges: %s \n", infoFilename, edgesFilename)

	parsedEdges := parseEdges(edgesFilename)
	finalizedGenes := parseGeneInfo(infoFilename, parsedEdges)
	store, _ := bitcask.Open("../store", bitcask.WithMaxValueSize(20777216))

	for k, v := range finalizedGenes {
		jsonV, err := json.Marshal(v)
		if err != nil {
			log.Fatal("jsonMarshal failed", err)
		}
		err = store.Put([]byte(k), jsonV)
		if err != nil {
			log.Fatal(err)
		}
	}
	//q := GetGeneByUid("910", store)
	//pp.Println(q)
	storeStats, err := store.Stats()
	if err != nil {
		log.Fatal(err)
	}
	pp.Println(storeStats)
	pp.Printf("\n\n >>> ! finished BuildDb.go in: %s", time.Since(start))

	// close access to store
	store.Close()

}

func parseGeneInfo(infoFilename string, parsedEdges map[string]EdgesPair) map[string]Gene {
	finalizedGenes := make(map[string]Gene)

	csvFile, err := os.Open(infoFilename)
	if err != nil {
		log.Fatal(err)
	}

	// lines are maps, key is column title
	reader := goCsv.NewMapReader(csvFile)

	_, err = reader.GetFieldnames()
	if err != nil {
		log.Fatal(err)
	}

	for {
		// handle error / eof
		line, err := reader.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			log.Fatal(err)
		}
		finalizedGenes[line["uid"]] = *LineToGene(line, parsedEdges)
	}
	return finalizedGenes
}

// returns map of uid => EdgesPair (see: models/EdgesPair)
func parseEdges(edgesFilename string) map[string]EdgesPair {
	// return target
	parsedEdges := make(map[string]EdgesPair)

	csvFile, err := os.Open(edgesFilename)
	if err != nil {
		log.Fatal(err)
	}

	// lines are maps, key is column title
	reader := goCsv.NewMapReader(csvFile)

	_, err = reader.GetFieldnames()
	if err != nil {
		log.Fatal(err)
	}

	for {
		// handle error / eof
		line, err := reader.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			log.Fatal(err)
		}

		// fmt.Println(line)
		fromUID, toUID := line["from"], line["to"]

		// if current line fromUID not in parsedEdges
		if _, ok := parsedEdges[fromUID]; !ok {
			// init incoming and outgoing maps
			//parsedEdges[fromUID] = EdgesPair{}
			parsedEdges[fromUID] = EdgesPair{make(map[string]Link), make(map[string]Link)}
		}
		parsedEdges[fromUID].Outgoing[toUID] = *LineToLink(line)

		// again for toUID not in parsedEdges
		if _, ok := parsedEdges[toUID]; !ok {
			parsedEdges[toUID] = EdgesPair{make(map[string]Link), make(map[string]Link)}
		}
		parsedEdges[toUID].Incoming[fromUID] = *LineToLink(line)
	}
	return parsedEdges
}
