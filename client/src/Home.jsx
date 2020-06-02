import * as React from 'react';
import { useStore } from 'react-context-hook';
import { Segment, Header, Image, Grid } from 'semantic-ui-react';
import GraphContainer from "./components/GraphContainer";
import NodeHoverModal from "./components/NodeHoverModal";
import MoreInfoModal from "./components/MoreInfoModal";
import Query from "./components/Query";
import Table from "./components/Table";

/**
* Container for visualizer + table view
* Defines formatting for our application view
* Details on SemanticUI-React's documentation
* @see App.jsx Home's parent
*/
export default function (){
  const [tableGenes] = useStore('tableGenes');
  const [rowsPerPage] = useStore('rowsPerPage');

  return (
      <Segment textAlign="center" vertical>
      <div>
      <div style={{display: "inline-flex"}}>
          <Header as= "h2" content = "visualizer"
          style={{fontSize:"3em", fontWeight:"normal",
          marginBottom:0, marginRight:5}} />
        <Image style={{width:50, height:50}}
          src="https://i.imgur.com/jXy3wuV.png"/>
      </div>

      <div id="graph-bridge-container">
        <GraphContainer/>
      </div>
      {/* These modals are always available but not always visible*/}
      <NodeHoverModal/>
      <MoreInfoModal/>

      <Grid className="ui segment centered">
          <Grid.Row>
              <Header as="h3" style={{ fontSize: "2em" }}>
              </Header>
          </Grid.Row>
          <Grid.Row>

              <Query/>

          </Grid.Row>
          <Grid.Row>
          {/* We pass data to be displayed as props (ideally) */}
              <Table data={tableGenes}
                rowsPerPage={rowsPerPage}
                isPreview={false}/>
          </Grid.Row>
      </Grid>
      </div>
      </Segment>
  )
}
