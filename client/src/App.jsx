import * as React from 'react';
import { withStore } from 'react-context-hook';
import { Segment } from 'semantic-ui-react';
import Home from './Home.jsx';
import Splash from './Splash.jsx';

/**
* App is seen first by our ReactDOM() in index.jsx
* Serves to init react hooks
*
* React hooks just centralizes our this.state.
* Tried Redux, too much complexity for smaller apps
*/
function App(){
    return(
        <div className="App">
            <Segment id='app-segment' vertical>
                <div style={{ color: '#sebfcf7' }}>
                    <Splash/>
                </div>
            </Segment>
        </div>
    )
}

/**
* Initial global state
* Many libraries require some filler / placeholder
* data to render initially (as we update their props)
*/
const initialState = {
  // for GraphContainer
  focusedNodeId: "initialNode1",
  highlightedNode: "",
  // Query input given to server
  queryText: "init inputText from app",
  maxRes: 10,
  searchType: "init searchType", //?
  isNhood: true,
  // NodeHoverModal.jsx
  xPos: 0,
  yPos: 0,
  hoverVisible: false,
  hoverFix: false,
  hoverUID: 910,
  // Graph initial values
  data: {
    nodes: [{id:"initialNode1",color:"black",symbolType:"diamond"},
            {id:"initialNode2",color:"red",symbolType:"diamond"}],
    links: [{label:"initialLink", source:"initialNode1",target:"initialNode2"}],
  },
  // More Info Modal
  moreInfoVisible: false,
  moreInfoGene: {uid: -1, species:"initial species", gene_names:['gname1,gname2'],
                description: "init desc", gene_display_name: "init gdisplay",
                color:"white", term_ids:["go1","go2"], edges:"edges"},
  // Main Table Params
  tableGenes: [],
  previewGenes: [],
  // Current page on primary table
  curPage: 1,
  rowsPerPage: 8,
  // Current page on preview / more info table
  curPreviewPage: 1,
  previewRowsPerPage:4,
  gnDrop: false,
  tiDrop: false,
}

// Add final configurations to our global store
const storeConfig ={
  // Below console.log's on each state change
  listener: (state) =>{
    //console.log('state changed!', state)
  }
}

export default withStore(App, initialState, storeConfig)
