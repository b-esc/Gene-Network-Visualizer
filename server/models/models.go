package models

import (
	f "fmt"
	"log"
	"strconv"
)

type Link struct {
	Source         string
	Target         string
	Distance       float64
	StrokeWidth    float32 // 1.5
	HighlightColor string  //"RED"
}

// returns pointer, shorthand init of struct
func NewLink(source, target string, distance float64) *Link {
	return &Link{source, target, distance, 1.5, "RED"}
}

func LineToLink(line map[string]string) *Link {
	// f.Println(line)
	dist, err := strconv.ParseFloat(line["distance"], 64)
	if err != nil {
		log.Fatal(err)
	}
	x := NewLink(line["from"], line["to"], dist)
	return x
}

type EdgesPair struct {
	// key is source
	Incoming map[string]Link
	// key is target
	Outgoing map[string]Link
}

type DbGene struct {
	// reactd3graph
	// id == uid, label == display name
	Id    string
	Label string
	// core information
	Uid               string
	Species           string
	Description       string
	Gene_display_name string
	Color             string
	Term_ids          []string
	Gene_names        []string
	Edges             EdgesPair
}
