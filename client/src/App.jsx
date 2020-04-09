import * as React from 'react';
import { withStore } from 'react-context-hook';
import { Segment } from 'semantic-ui-react';
import Home from './Home.jsx';

function App(){
    return(
        <div className="App">
            <Segment id='app-segment' vertical>
                <div style={{ color: '#sebfcf7' }}>
                    <Home/>
                </div>
            </Segment>
        </div>
    )
}

const initialState = {
  // for GraphContainer
  focusedNodeId: "initialNode1",
  highlightedNode: "",
  // Query input given to server
  queryText: "init inputText from app",
  maxRes: 10,
  searchType: "init searchType", //?
  isNhood: true,
  // Modal appearing over network
  xPos: 0,
  yPos: 0,
  hoverVisible: false,
  hoverFix: false,
  hoverUID: 910,
  // Network initial values
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
  curPage: 1,
  rowsPerPage: 8,
  curPreviewPage: 1,
  previewRowsPerPage:4,
  gnDrop: false,
  tiDrop: false,
}

const storeConfig ={
  listener: (state) =>{
    //console.log('state changed!', state)
  }
}

export default withStore(App, initialState, storeConfig)
