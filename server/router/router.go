package router

import (
	mw "github.com/b-esc/carolyns-web/server/middleware"
	"github.com/gorilla/mux"
)

func Router() *mux.Router {
	router := mux.NewRouter()
	router.HandleFunc("/api/queryGene/{uid}/{maxRes}/{isNhood}", mw.QueryGeneByUid).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/previewGene/{uid}", mw.PreviewGeneByUid).Methods("GET", "OPTIONS")
	return router
}
