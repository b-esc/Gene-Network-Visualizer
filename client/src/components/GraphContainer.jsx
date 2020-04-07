import { useStore } from 'react-context-hook';
import {QueryBar} from "../components/QueryBar.jsx";
import React, { Component } from 'react'
import { Graph, Link, d3 } from "react-d3-graph";

// bridged graph, visualization of nearest neighbors


class GraphContainer extends Component{
  const [gNodes] = useStore('nodes')
  const [gLinks] = useStore('links')
  const [hoverVisible, setHoverVisible] = useStore('hoverVisible')
  const [hoverFix, setHoverFix] = useStore('hoverFix')
  const [hoverUID, setHoverUID] = useStore('hoverUID')

  const [xPos, setXPos] = useStore('xPos')
  const [yPos, setYPos] = useStore('yPos')

  clickGraph = () =>{
    // forces both to false
    setHoverVisible('false');
    setHoverFix('false');
  }

  // Single clicking zooms into a node
  nodeClick = (nodeId) =>{
    this.setState({
      data:{
        ...this.state.data,
        focusedNodeId: this.state.data.focusedNodeId !== nodeId ? nodeId : null
      }
    })
  }

  // Helper method to focus a node given its id
  focusNode(node_name){
    this.setState({
      data:{
        ...this.state.data,
        focusedNodeId: node_name,
      }
    });
  }
// if problem data addition

  constructor(props){
    console.log(props);
    super(props);
    this.state = {
      focusedNodeId:"",
      data:{
        nodes:gNodes,
        links:gLinks,
      },
      config: {
        "automaticRearrangeAfterDropNode": false,
        "collapsible": false,
        "directed": true,
        "focusAnimationDuration": 4,
        "focusZoom": 2.5,
        "height": 400,
        "highlightDegree": 1,
        "highlightOpacity": 1,
        "linkHighlightBehavior": false,
        "maxZoom": 5,
        "minZoom": 1,
        "nodeHighlightBehavior": false,
        "panAndZoom": false,
        "staticGraph": false,
        "staticGraphWithDragAndDrop": false,
        "width": 800,
        "d3": {
          "alphaTarget": 0.05,
          "gravity": -100,
          "linkLength": 100,
          "linkStrength": 1
        },
        "node": {
          "color": "#d3d3d3",
          "fontColor": "black",
          "fontSize": 8,
          "fontWeight": "normal",
          "highlightColor": "SAME",
          "highlightFontSize": 8,
          "highlightFontWeight": "normal",
          "highlightStrokeColor": "SAME",
          "highlightStrokeWidth": "SAME",
          "labelProperty": "id",
          "mouseCursor": "pointer",
          "opacity": 1,
          "renderLabel": true,
          "size": 200,
          "strokeColor": "none",
          "strokeWidth": 1.5,
          "svg": "",
          "symbolType": "circle"
        },
        "link": {
          "color": "#8c6262",
          "fontColor": "black",
          "fontSize": 8,
          "fontWeight": "normal",
          "highlightColor": "#d3d3d3",
          "highlightFontSize": 8,
          "highlightFontWeight": "normal",
          "labelProperty": "label",
          "mouseCursor": "pointer",
          "opacity": 1,
          "type":"CURVE_SMOOTH",
          "renderLabel": false,
          "semanticStrokeWidth": false,
          "strokeWidth": 1.5,
          "markerHeight": 6,
          "markerWidth": 6
        }
      }
    };
    this._onMouseMove = this._onMouseMove.bind(this);
  }

// Without this nodes will stack on one another by default
  decorateGraphNodesWithInitialPositioning = nodes => {
    console.log("IN DECORATE");
    if(nodes != undefined){
      return null;
    }
    console.log(nodes);
      return nodes.map(n =>
          Object.assign({}, n, {
              x: n.x || Math.floor(Math.random() * 500),
              y: n.y || Math.floor(Math.random() * 500),
          })
      );
  };

// Focus starter placeholder node for zoom animation
  componentDidMount(){
    if(this.props.nodes != undefined && this.props.links != undefined){
        this.setState({data:{nodes:this.props.nodes,links:this.props.links}},()=>{
          setTimeout(function(){this.focusNode(this.state.data.nodes[0].id)}.bind(this),500);
        });
    }
}

// Updates component when Nodes are changed
componentDidUpdate() {
  if(this.state.data.nodes != this.props.nodes && this.props.nodes != undefined){
    let decoratedNodes = this.decorateGraphNodesWithInitialPositioning(this.props.nodes);
    if(decoratedNodes != undefined || decoreatedNodes != null){
      this.setState({
        data:{
          ...this.state.data,
          nodes: decoratedNodes.nodes,
          links: decoratedNodes.links,
        }},()=>{
        setTimeout(function(){this.focusNode(this.state.data.nodes[0].id)}.bind(this),500);
      });
    }
  }
}

// Update X Y position to move NodeExt.jsx
  _onMouseMove(e) {
    if(!this.props.hoverFix){
      setXPos(e.nativeEvent.offsetX)
      setYPos(e.nativeEvent.offsetY)
      // this.props.updateHoverCords(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    }
  }

// If we didn't double click the node, hide NodeExt
  onMouseOutNode = id =>{
    // Toggle hover modal handles the case when hoverFix is true
    if(!hoverFix){
      setHoverVisible('false')
    }
  }

// Fix NodeExt to screen if respective node is double clicked
  onDoubleClickNode = id => {
    this.props.updateModalUid(Number(id));
    this.props.toggleFixHover(this.props.hoverFix);
  }

  onMouseOverNode = id =>{
    if(!hoverVisible){
      setHoverUID(id);
      setHoverVisible('true');
    }
  }


  render(){
    const graphProps = {
      id: "graph",
      data: {...this.state.data, focusedNodeId: this.state.focusedNodeId},
      config: this.state.config,
      onClickNode:this.nodeClick,
      onClickGraph:this.clickGraph,
      onMouseOverNode:this.onMouseOverNode,
      onMouseOutNode:this.onMouseOutNode,
      onDoubleClickNode:this.onDoubleClickNode,
    }
    return(
      <div onMouseMove={this._onMouseMove}>
        <Graph
          ref = "graph"
          {...graphProps}
          />

      </div>
    )
  }


}

export default GraphContainer;
