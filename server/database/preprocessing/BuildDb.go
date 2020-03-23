package main

import (
	//"bufio"
	//"encoding/csv"
	"../../models"
	"carolyns-web/server/models"
	"fmt"
	"github.com/prologic/bitcask"
	"io"
	"log"
	"os"
	// DictReader (.py each line is a map) equivalent in Go
	"github.com/ibbd-dev/go-csv"
)

func main() {
	// Doesn't include program name
	args := os.Args[1:]

	if len(args) < 2 || args[1] == "-h" {
		fmt.Println("Usage: go run ./BuildDb.go info.csv edges.csv")
		os.Exit(0)
	}

	fmt.Println("Our database is stored under /server/database/store")

	infoFilename := args[0]
	edgesFilename := args[1]

	fmt.Printf("\n Now Loading \n Info: %s | Edges: %s \n", infoFilename, edgesFilename)

	parseEdges(edgesFilename)

	store, _ := bitcask.Open("./store")
	defer store.Close()

}

func parseEdges(edgesFilename string) map[string]EdgesPair {
	// return target
	parsedEdges := make(map[string]EdgesPair)

	csvFile, err := os.Open(edgesFilename)
	if err != nil {
		log.Fatal(err)
	}

	// lines are maps, key is column title
	reader := goCsv.NewMapReader(csvFile)

	fieldnames, err := reader.GetFieldnames()
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(fieldnames)

	for {
		line, err := reader.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			log.Fatal(err)
		}
	}
}
