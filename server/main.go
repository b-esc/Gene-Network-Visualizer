// ben.escobar.ben@gmail.com

// Entry point for backend / database of application
// Usage: go run main.go

package main

import (
	"fmt"
	"github.com/b-esc/carolyns-web/server/router"
	"log"
	"net/http"
)

func main() {
	r := router.Router()
	fmt.Println("Starting server on port 8080")
	// Change from .Fatal to handle invalid requests differently
	// Currently crashes backend on invalid url / error during handling
	log.Fatal(http.ListenAndServe(":8080", r))
}
