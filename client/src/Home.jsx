import * as React from 'react';
import { Segment, Header, Image, Grid } from 'semantic-ui-react';
import Graph from "./components/Graph";
import NodeHoverModal from "./components/NodeHoverModal";
import MoreInfoModal from "./components/MoreInfoModal";
import Query from "./components/Query";
import Table from "./components/Table";

export default function (){
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
        <Graph/>
      </div>

      <NodeHoverModal/>
      <MoreInfoModal/>

      <Grid>
          <Grid.Row>
              <Header as="h3" style={{ fontSize: "2em" }}>
              </Header>
          </Grid.Row>
          <Grid.Row>
              <Query/>
          </Grid.Row>
          <Grid.Row>
              <Table/>
          </Grid.Row>
      </Grid>
      </div>
      </Segment>
  )
}
