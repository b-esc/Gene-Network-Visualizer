package middleware

import (
	"context"
	"encoding/json"
	"fmt"
	. "github.com/b-esc/carolyns-web/server/models"
	"github.com/deckarep/golang-set"
	"github.com/gorilla/mux" // routing
	"github.com/k0kubun/pp"
	. "github.com/prologic/bitcask"
	"log"
	"net/http"
	"path/filepath"
	"sort"
)

// bitcask instance
var store *bitcask

// connect to bitcask
func init() {
	fp, _ := filepath.Abs("database/store")
	store, err := Open(fp, WithMaxValueSize(20777216))
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Connected to bitcask store (database)")
}

/* route functions */

// return node/link objects + accessory information for reactd3js
func QueryGeneByUid(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	vars := mux.Vars(r)
	uid := vars["uid"]
	maxRes := vars["maxRes"]
	isNhood := vars["isNhood"]

	genes, links := buildQueryResponse(uid, maxRes, isNhood)
	fmt.Println(genes, links)
}

func QueryGeneByUid(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	vars := mux.Vars(r)
	uid := vars["uid"]

	genes := buildPreviewResponse(uid)
	fmt.Println(genes)
}

/* utils */

// takes string as key, handles tedious unseralization
func getGeneByUid(uid string, b *Bitcask) Gene {
	byteUid, err := b.Get([]byte(uid))
	if err != nil {
		fmt.Println(uid)
		log.Fatal("failed to find uid in bitcask: ", err)
	}
	var g Gene
	if err := json.Unmarshal(byteUid, &g); err != nil {
		log.Fatal(err)
	}
	return g
}

func mapToArr(m map[string]Link) []Link {
	var arr []Link
	for _, val := range m {
		arr = append(arr, val)
	}
	return arr
}

// returns list of genes, list of outgoing edges
func nMostRelatedGenesLinks(outgoing map[string]Link, n int, b *Bitcask) ([]string, []Gene, []Link) {
	arr := mapToArr(outgoing)
	sort.SliceStable(arr, func(a, b int) bool {
		return arr[a].Distance < arr[b].Distance
	})

	var genes []Gene
	var geneUids []string
	var links []Link

	for idx, curLink := range arr {
		if idx >= n {
			break
		}
		geneUids = append(geneUids, curLink.Target)
		genes = append(genes, getGeneByUid(curLink.Target, store))
		links = append(links, curLink)
	}
	return geneUids, genes, links
}

func getNhoodLinks(uidSet mapset.Set, linkStrSet mapset.Set, genes []Gene) []Link {
	var nhoodLinks []Link
	for idx, curGene := range genes {
		for _, curOutLink := range curGene.Edges.Outgoing {
			outStr := curOutLink.ToString()
			if uidSet.contains(curOutLink.Target) && !linkStrSet.Contains(outStr) {
				nhoodLinks = append(nhoodLinks, curOutLink)
				linkStrSet.Add(outStr)
			}
		}

		for _, curInLink := range curGene.Edges.Incoming {
			inStr := curInLink.ToString()
			if uidSet.contains(curInLink.Source) && !linkStrSet.Contains(inStr) {
				nhoodLinks = append(nhoodLinks, curInLink)
				linkStrSet.Add(inStr)
			}
		}
	}
	return nhoodLinks
}

func linkSliceToSet(links []Link) mapset.Set {
	linkSet := mapset.NewSet()
	for idx, curLink := range links {
		linkSet.Add(curLink.ToString())
	}
	return linkSet
}

func buildPreviewResponse(uid string) []Gene {
	rootG := getGeneByUid(uid, store)
	_, genes, _ := nMostRelatedGenesLinks(rootG.Edges.Outgoing, 10, store)
	return genes
}

// provides all needed for graph and main table
func buildQueryResponse(uid string, n int, isNhood bool) ([]Gene, []Link) {
	rootG := getGeneByUid(uid, store)
	geneUids, genes, links := nMostRelatedGenesLinks(rootG.Edges.Outgoing, n, store)

	var nhoodLinks []Link

	if isNhood {
		uidSet := mapset.NewSetFromSlice(geneUids)
		uidSet.Add(rootG.Uid)
		nhoodLinks = getNhoodLinks(uidSet, linkSliceToSet(links), genes)
	}
	links = append(links, nhoodLinks...)
	return genes, links
}
