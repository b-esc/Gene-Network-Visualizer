// ben.escobar.ben@gmail.com

// defines logic and handling of users' queries
// functions starting with a capital letter
// are called when certain endpoints are invoked (see router/router.go)

package middleware

import (
	//"context"
	"encoding/json"
	"fmt"
	. "github.com/b-esc/carolyns-web/server/models"
	"github.com/deckarep/golang-set"
	"github.com/gorilla/mux" // routing
	//"github.com/k0kubun/pp"
	. "github.com/prologic/bitcask"
	"log"
	"net/http"
	"path/filepath"
	"sort"
	"strconv"
)

// bitcask instance
var store *Bitcask
var storeErr error

// connect to bitcask
func init() {
	fp, _ := filepath.Abs("database/store")
	// adjust WithMaxValueSize up as needed,
	// default was too small for samples during development
	store, storeErr = Open(fp, WithMaxValueSize(20777216))
	if storeErr != nil {
		log.Fatal(storeErr)
	}
	fmt.Println("Connected to bitcask store (database)")
}

/* route functions */

// QueryGeneByUid is primarily a debugging tool for table + visualizer
// using the UIDs in the original gene_info csv
// takes a user's UID query, finds N most related genes in dataset (maxRes),
// filters out all edges not explicitly outgoing from root UID if isNhood = false
// returns an object containing properties:
// genes: array of Gene objects containing relevant edges
// links: array of edges to render (isNhood may impact this)
func QueryGeneByUid(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	// all of our variables come via the url
	// see /client/src/components/utils/queryGeneByUid.js
	vars := mux.Vars(r)
	uid := vars["uid"]
	maxRes, _ := strconv.Atoi(vars["maxRes"])
	isNhood, _ := strconv.ParseBool(vars["isNhood"])
	fmt.Println(uid,maxRes,isNhood)
	// golang may return multiple variables
	genes, links := buildQueryResponse(uid, maxRes, isNhood)
	// ResData must be capitalized as its leaving this file (to our frontend)
	ResData := struct{
		// same goes for the properties, capitalized first letter
		Genes	[]Gene
		Links []Link
	}{
		genes,
		links,
	}
	// how data is sent back to client,
	// our ResponseWriter writes json encoded ResData object
	json.NewEncoder(w).Encode(ResData)
}

// PreviewGeneByUid replicates QueryGeneByUid's behavior but only prepares
// the response data with genes to be displayed in a smaller table (no graph)
// This is called whenever 'more info' is selected by the user on the clientside
func PreviewGeneByUid(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	vars := mux.Vars(r)
	uid := vars["uid"]

	genes := buildPreviewResponse(uid)
	// pp.Print(genes,"GENES FROM PREVIEW RESPONSE");
	ResData := struct{
		Genes []Gene
	}{
		genes,
	}
	json.NewEncoder(w).Encode(ResData)
	// pp.Print(genes)
}

/* utils */

// helper function handling easy retreival of genes from our database
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

// helper function converting a map of Links to an array of Links
func mapToArr(m map[string]Link) []Link {
	var arr []Link
	for _, val := range m {
		arr = append(arr, val)
	}
	return arr
}

// finds the n most related genes (via distance) and aggregates Edges to render
// on the visualizer. See getNhoodLinks below.
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

// Aggregates links that are relevant to resultant Genes. Filters duplicates
// and includes links not directly connected to root Gene.
func getNhoodLinks(uidSet mapset.Set, linkStrSet mapset.Set, genes []Gene) []Link {
	var nhoodLinks []Link
	for _, curGene := range genes {
		for _, curOutLink := range curGene.Edges.Outgoing {
			outStr := curOutLink.ToString()
			if uidSet.Contains(curOutLink.Target) && !linkStrSet.Contains(outStr) {
				nhoodLinks = append(nhoodLinks, curOutLink)
				linkStrSet.Add(outStr)
			}
		}

		for _, curInLink := range curGene.Edges.Incoming {
			inStr := curInLink.ToString()
			if uidSet.Contains(curInLink.Source) && !linkStrSet.Contains(inStr) {
				nhoodLinks = append(nhoodLinks, curInLink)
				linkStrSet.Add(inStr)
			}
		}
	}
	return nhoodLinks
}

// Array to HashSet (for duplicate fitering)
func linkSliceToSet(links []Link) mapset.Set {
	linkSet := mapset.NewSet()
	for _, curLink := range links {
		linkSet.Add(curLink.ToString())
	}
	return linkSet
}

// Changes logic to be more minimal for preview queries
func buildPreviewResponse(uid string) []Gene {
	rootG := getGeneByUid(uid, store)
	_, genes, _ := nMostRelatedGenesLinks(rootG.Edges.Outgoing, 10, store)
	genes = append(genes, rootG)
	return genes
}

// provides all needed for graph and main table
func buildQueryResponse(uid string, n int, isNhood bool) ([]Gene, []Link) {
	rootG := getGeneByUid(uid, store)
	geneUids, genes, links := nMostRelatedGenesLinks(rootG.Edges.Outgoing, n, store)

	var nhoodLinks []Link

	if isNhood {
		s := make([]interface{}, len(geneUids))
		for i, v := range geneUids {
			s[i] = v
		}
		uidSet := mapset.NewSetFromSlice(s)
		uidSet.Add(rootG.Uid)
		nhoodLinks = getNhoodLinks(uidSet, linkSliceToSet(links), genes)
	}
	genes = append(genes, rootG)
	links = append(links, nhoodLinks...)
	return genes, links
}
