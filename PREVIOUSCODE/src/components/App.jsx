import * as React from 'react';
import { Segment } from 'semantic-ui-react';
import { Home } from './Home.jsx';

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
  // Query input given to server
  inputText: "init inputText",
  maxRes: 10,
  uid: -1, //?
  isNhood: true,
  // Modal appearing over network
  xPos: 0,
  yPos: 0,
  hoverVisible: false,
  hoverFix: false,
  // Network initial values
  nodes: [{id:"initialNode1",color:"black",symbolType:"diamond"},
          {id:"initialNode2",color:"red",symbolType:"diamond"}],
  links: [{label:"initialLink", source:"initialNode1",target:"initialNode2"}],
  // More Info Modal
  previewGene: {uid: -1, species:"initial species", gene_names:"init gnames",
                description: "init desc", gene_display_name: "init gdisplay",
                color:"white", term_ids:"init term_ids", edges:"edges"},
  previewGeneUID: -1,
  // Main Table Params
  tableGenes: [],
  rowsPerPage: 8,
}

const storeConfig ={
  listener: (state) =>{
    console.log('state changed!', state)
  }
}

export default withStore(App, initialState, storeConfig)
