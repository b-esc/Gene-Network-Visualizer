package utils

import (
	"encoding/json"
	. "github.com/b-esc/carolyns-web/server/models"
	. "github.com/prologic/bitcask"
	"log"
)

// takes string as key, handles tedious unseralization
func GetGeneByUid(uid string, b *Bitcask) Gene {
	byteUid, err := b.Get([]byte(uid))
	if err != nil {
		log.Fatal("failed to find uid in bitcask", err)
	}
	var g Gene
	if err := json.Unmarshal(byteUid, &g); err != nil {
		log.Fatal(err)
	}
	return g
}
