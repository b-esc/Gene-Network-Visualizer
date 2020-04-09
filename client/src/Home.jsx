import * as React from 'react';
import { useStore } from 'react-context-hook';

import { Segment, Header, Image, Grid } from 'semantic-ui-react';
import GraphContainer from "./components/GraphContainer";
import NodeHoverModal from "./components/NodeHoverModal";
import MoreInfoModal from "./components/MoreInfoModal";
import Query from "./components/Query";
import Table from "./components/Table";

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
              <Table data={tableGenes}
                rowsPerPage={rowsPerPage}
                isPreview={false}/>
          </Grid.Row>
      </Grid>
      </div>
      </Segment>
  )
}
