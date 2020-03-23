package utils

import (
	"encoding/json"
	"fmt"
	. "github.com/b-esc/carolyns-web/server/models"
	"github.com/k0kubun/pp"
	. "github.com/prologic/bitcask"
	"log"
	"path/filepath"
	"sort"
)

// takes string as key, handles tedious unseralization
func GetGeneByUid(uid string, b *Bitcask) Gene {
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

func nMostRelatedUids(outgoing map[string]Link, n int, b *Bitcask) []string {
	arr := mapToArr(outgoing)
	sort.SliceStable(arr, func(a, b int) bool {
		return arr[a].Distance < arr[b].Distance
	})
	var rt []string
	for idx, curLink := range arr {
		if idx >= n {
			break
		}
		rt = append(rt, curLink.Target)
	}
	return rt
}

func QueryGene(uid string) {
	fp, _ := filepath.Abs("database/store")
	store, err := Open(fp, WithMaxValueSize(20777216))
	if err != nil {
		log.Fatal(err)
	}
	rootG := GetGeneByUid(uid, store)
	nMost := nMostRelatedUids(rootG.Edges.Outgoing, 10, store)
	pp.Println(nMost)
}
