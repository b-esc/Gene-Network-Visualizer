package models

import (
	//f "fmt"
	"log"
	"strconv"
	"strings"
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

func (l Link) ToString() string{
	str := l.Source + "," + l.Target
	return str
}

func LineToLink(line map[string]string) *Link {
	//f.Println(line)
	dist, err := strconv.ParseFloat(line["distance"], 64)
	if err != nil {
		log.Fatal(err)
	}
	x := NewLink(line["from"], line["to"], dist)
	return x
}

hoype EdgesPair struct {
	// key is source
	Incoming map[string]Link
	// key is target
	Outgoing map[string]Link
}

type Gene struct {
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

func NewGene(u, s, d, gdn, c, ti, gn string, parsedEdges map[string]EdgesPair) *Gene {
	term_ids := strings.Split(ti, "|")
	gene_names := strings.Split(gn, "|")
	new_edges := parsedEdges[u]
	return &Gene{u, gdn, u, s, d, gdn, c, term_ids, gene_names, new_edges}
}

func LineToGene(line map[string]string, parsedEdges map[string]EdgesPair) *Gene {
	x := NewGene(line["uid"], line["species"], line["description"], line["gene_display_name"], line["color"], line["term_ids"], line["gene_names"], parsedEdges)
	return x
}
