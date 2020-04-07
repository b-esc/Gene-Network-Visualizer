import * as React from 'react';
import * as SUI from "semantic-ui-react";
import Graph from '../containers/Graph.js';
import MoreInfo from '../containers/MoreInfo.js';
import NodeHover from '../containers/NodeHover.js';
import Query from '../containers/Query.js';
import TableMain from '../containers/TableMain.js';



export const Home = props => (
    <SUI.Segment textAlign="center" vertical>
    <div>
    <div style={{display: "inline-flex"}}>
        <SUI.Header as= "h2" content = "visualizer"
        style={{fontSize:"3em", fontWeight:"normal",
        marginBottom:0, marginRight:5}} />
      <SUI.Image style={{width:50, height:50}}
        src="https://i.imgur.com/jXy3wuV.png"/>
    </div>

    <div id="graph-bridge-container">
      <Graph/>
    </div>

    <NodeHover/>
    <MoreInfo/>

    <SUI.Grid>
        <SUI.Grid.Row>
            <SUI.Header as="h3" style={{ fontSize: "2em" }}>
            </SUI.Header>
        </SUI.Grid.Row>
        <SUI.Grid.Row>
            <Query/>
        </SUI.Grid.Row>
        <SUI.Grid.Row>
            {/*<TableMain/>*/}
        </SUI.Grid.Row>
    </SUI.Grid>
    </div>
    </SUI.Segment>
)

export default Home;
