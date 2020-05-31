package models

import (
	//f "fmt"
	"log"
	"strconv"
	"strings"
)

type Link struct {
	Source         string		`json:"source"`
	Target         string		`json:"target"`
	Distance       float64	`json:"distance"`
	StrokeWidth    float64	`json:"strokeWidth"`
	HighlightColor string  	`json:"highlightColor"`
}

// returns pointer, shorthand init of struct
func NewLink(source, target string, distance float64) *Link {
	// changed strokewidth to distance !
	return &Link{source, target, distance, distance, "RED"}
}

func (l Link) ToString() string {
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

type EdgesPair struct {
	// key is source
	Incoming map[string]Link
	// key is target
	Outgoing map[string]Link
}

type Gene struct {
	// reactd3graph
	// id == uid, label == display name
	Id    						string		`json:"id"`
	Label 						string		`json:"label"`
	// core information
	Uid               string		`json:"uid"`
	Species           string		`json:"species"`
	Description       string		`json:"description"`
	Gene_display_name string		`json:"gene_display_name"`
	Color             string		`json:"color"`
	Term_ids          []string	`json:"term_ids"`
	Gene_names        []string	`json:"gene_names"`
	Edges             EdgesPair	`json:"edges"`
}

func NewGene(u, s, d, gdn, c, ti, gn string, parsedEdges map[string]EdgesPair) *Gene {
	//description := strings.Split(d,";")
	term_ids := strings.Split(ti, "|")
	gene_names := strings.Split(gn, "|")
	new_edges := parsedEdges[u]
	return &Gene{u, gdn, u, s, d, gdn, c, term_ids, gene_names, new_edges}
}

func LineToGene(line map[string]string, parsedEdges map[string]EdgesPair) *Gene {
	x := NewGene(line["uid"], line["species"], line["description"], line["gene_display_name"], line["color"], line["term_ids"], line["gene_names"], parsedEdges)
	return x
}
