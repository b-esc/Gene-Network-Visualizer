// ben.escobar.ben@gmail.com

// builds a Bitcask database from two valid info/edge csv files
// Usage: go run ./BuildDb.go info.csv edges.csv [-d]
// [-d as third arg clears current db]

package main

import (
	"encoding/json"
	"fmt"
	. "github.com/b-esc/carolyns-web/server/models"
	"github.com/k0kubun/pp"
	"github.com/prologic/bitcask"
	"io"
	"log"
	"os"
	"os/exec"
	"path/filepath"
	"time"
	// DictReader (.py each line is a map) equivalent in Go
	"github.com/ibbd-dev/go-csv"
)

func main() {
	start := time.Now()

	// Doesn't include program name
	args := os.Args[1:]

	if len(args) < 2 || args[1] == "-h" {
		fmt.Println("Usage: go run ./BuildDb.go info.csv edges.csv [-d as third arg clears current db]")
		os.Exit(0)
	}

	// clear db if specified by user
	if len(args) > 2 && args[2] == "-d" {
		fmt.Println("-d as third arg.. clearing current db..")
		fp, _ := filepath.Abs("../store")
		cmd := exec.Command("rm", "-r", fp)
		if err := cmd.Run(); err != nil {
			log.Fatal(err)
		}
	}

	fmt.Println("Our database is stored under /server/database/store")

	infoFilename := args[0]
	edgesFilename := args[1]

	fmt.Printf("\n Now Loading \n Info: %s | Edges: %s \n", infoFilename, edgesFilename)

	// parse edges before merging with genes
	parsedEdges := parseEdges(edgesFilename)
	finalizedGenes := parseGeneInfo(infoFilename, parsedEdges)

	// opens up our store/DB, tweak max value size up as needed
	store, _ := bitcask.Open("../store", bitcask.WithMaxValueSize(20777216))
	// before closing the program close our DB
	defer store.Close()

	// to read / write from our DB, we follow common pattern of
	// marshalling / unmarshalling data before put/get what we want
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

	// give performance details to user
	storeStats, err := store.Stats()
	if err != nil {
		log.Fatal(err)
	}
	pp.Println(storeStats)
	pp.Printf("\n\n >>> ! finished BuildDb.go in: %s", time.Since(start).Seconds())
	pp.Println(store)
	// close access to store
	if err := store.Sync(); err != nil {
		log.Panic("issue when sync()..  ", err)
	}
}

// parseGeneInfo matches genes from 'info.csv' with finished edges
// every edge 'source' and 'target' should be present in our 'info.csv'
// see models/models.go => Gene, LineToGene
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

// parseEdges returns a mapping of Gene UID's to incoming / outgoing edges
// see models/models.go => EdgesPair, Link, LineToLink
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
