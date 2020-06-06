// ben.escobar.ben@gmail.com

// listens on urls for client requests
// assigns middleware function to handle variable url requests
// see client/src/utils/*.js to see how these are called
package router

import (
	mw "github.com/b-esc/carolyns-web/server/middleware"
	"github.com/gorilla/mux"
)

func Router() *mux.Router {
	router := mux.NewRouter()
	// {uid}, {maxRes} .. etc are all variables passed via ajax url call
	// these variables are retreived in middleware/middleware.go
	router.HandleFunc("/api/queryGene/{uid}/{maxRes}/{isNhood}", mw.QueryGeneByUid).Methods("GET", "OPTIONS")

	// these urls are differentiated by prefix
	router.HandleFunc("/api/previewGene/{uid}", mw.PreviewGeneByUid).Methods("GET", "OPTIONS")
	return router
}
