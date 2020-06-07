# gene-network-visualizer
<img src="https://i.ibb.co/5h3DRSH/image.png">

Application for lawrence-dill plant informatics & computation lab 

Visualizes & tabulates user provided gene data + relatedness data.

<img src="https://i.ibb.co/d5fQh11/image.png" >

# Dependencies
.js: npm / yarn, react, react-scripts, semantic ui, see package.json in client
.go: bitcask, mux, golang-set

# Getting started
Install npm / yarn and go

## Use BuildDb.go to build a database from two csv files

Builds a local read/write store of Gene UIDs mapped to their details and relationships with other genes.

usage:

go run BuildDb.go [gene_info_file.csv] [gene_edges_file.csv] 

### info_file columns
* uid: unique gene identifer (per dataset)
* species: species symbol
* gene_names: various names delimited by |
* term_ids: go_terms
* gene_display_name: label gene will have as a node on visualizer
* color: color of node


### edges_file columns

* from: uid of edge source
* to: uid of edge target
* distance: weight of edge
* ...: more edge weights may be comma seperated per row, but only 'distance' is recorded

## Install client dependencies
`cd client; npm install`

## Run dev servers
* `cd /client; npm run start` start the frontend at localhost:3000/landing
* `cd /server; go run main.go` start the backend to listen for requests
* `cd /server/router; python3 router.py` auxillary handler for requests to be handled in pure python

## Visit application
`localhost:3000/landing`


## Synopsis / Dataflow
* client - react frontend
  * public - contains documentation static files, served by react
  * src - contains react source
* server - contains main.go entry for backend
  * database - contains BuildDb.go and directory for data storage
  * middleware - logic handling endpoint requests
  * models - typing & backend auxillary functions
  * router - defines how urls are listened for, contains router.py
  
  
Clients issue input to the application primarily in `/client/src/Home.jsx`

Functions from `/client/src/utils` invoke endpoints being listened for in `/server/router/router.go` which handles requests based on url prefixes. Once an endpoint is caught it's handled in `/server/middleware/middleware.go` which returns an appropriate response. 

Many helper functions and constructors compose our data to how our frontend wants them. These can be found in `/server/models/models.go`. 

Currently Flask returns an assortment of random genes. `/server/router/router.go` listens for a search type 'flask' (via url param) before sending a request to the running `/server/router/router*.py*`. The flask server sends back a list of random UIDs from the database before the golang backend aggregates the gene / edge information from it.

Aside: Client request Errors crash the server immediately. This can be changed in main.go (set to Fatal.log)





