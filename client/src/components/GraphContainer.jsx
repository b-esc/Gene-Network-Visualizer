import { useStore } from 'react-context-hook';
import React, { useState, useEffect, useRef } from 'react'
import { Graph, Link, d3 } from "react-d3-graph";


// hack to use hooks with above class
// we use class as we need finite control over certain lifecycle methods
export default function(){
    const isCancelled = useRef;

    const [hoverVisible, setHoverVisible] = useStore('hoverVisible');
    const [hoverFix, setHoverFix] = useStore('hoverFix');
    const [hoverUID, setHoverUID] = useStore('hoverUID');
    const [xPos, setXPos] = useStore('xPos');
    const [yPos, setYPos] = useStore('yPos');
    const [data, setData] = useStore('data');
    const [focusedNodeId, setFocusedNodeId] = useStore('focusedNodeId');
    // console.log("DATA FROM STORE!",data);
    // Without this nodes will stack on one another by default


    let config = {
      "automaticRearrangeAfterDropNode": false,
      "collapsible": false,
      "directed": true,
      "focusAnimationDuration": 2,
      "focusZoom": 1.5,
      "height": 400,
      "highlightDegree": 1,
      "highlightOpacity": 1,
      "linkHighlightBehavior": true,
      "maxZoom": 5,
      "minZoom": 1,
      "nodeHighlightBehavior": true,
      "panAndZoom": false,
      "staticGraph": false,
      "staticGraphWithDragAndDrop": false,
      "width": 800,
      "d3": {
        "alphaTarget": 0.05,
        "gravity": -100,
        "linkLength": 45,
        "linkStrength": 1
      },
      "node": {
        "color": "#d3d3d3",
        "fontColor": "black",
        "fontSize": 14,
        "fontWeight": "normal",
        "highlightColor": "SAME",
        "highlightFontSize": 14,
        "highlightFontWeight": "normal",
        "highlightStrokeColor": "RED",
        "highlightStrokeWidth": "SAME",
        "labelProperty": "label",
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
        "color": "gray",
        "fontColor": "black",
        "fontSize": 8,
        "fontWeight": "normal",
        "highlightColor": "RED",
        "highlightFontSize": 8,
        "highlightFontWeight": "normal",
        "labelProperty": "label",
        "mouseCursor": "pointer",
        "opacity": 1,
        "type":"STRAIGHT",
        "renderLabel": false,
        "semanticStrokeWidth": false,
        "strokeWidth": 1.5,
        "markerHeight": 6,
        "markerWidth": 6
      }
    }

    const decorateGraphNodesWithInitialPositioning = (nodes) => {
        //console.log("IN DECORATE");
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

      // Helper method to focus a node given its id
    const focusNode = (node_name) =>{
      setFocusedNodeId(node_name);
    }

    const clickGraph = () =>{
      // forces both to false
      setHoverVisible(false);
      setHoverFix(false);
    }

    // Single clicking zooms into a node
    const nodeClick = nodeId =>{
      if(focusedNodeId !== nodeId){
        focusNode(nodeId);
      } else{
        focusNode(null);
      }
    }


    // Update X Y position to move NodeExt.jsx
    const _onMouseMove = (e) => {
        if(!hoverFix){
          setXPos(e.nativeEvent.offsetX)
          setYPos(e.nativeEvent.offsetY)
          // this.props.updateHoverCords(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        }
      }

    const onMouseOutNode = id =>{
      //setHighlightedNodeId("");
        // Toggle hover modal handles the case when hoverFix is true
        if(!hoverFix){
          setHoverVisible(false)
        }
      }

    const onDoubleClickNode = id => {
        setHoverUID(Number(id));
        setHoverFix(true);
      }

    const onMouseOverNode = id => {
      //setHighlightedNodeId(id);
      //console.log(id);
      setHoverUID(Number(id));
      if(!hoverVisible){
        setHoverVisible(true);
      }
    }

    // component did mount
    // useEffect(()=>{
    //   //if(data.links != undefined){
    //     setData({data:data},()=>{
    //       setTimeout(function(){
    //         focusNode(data.nodes[0].id)
    //       }, 500);
    //     });
    //   //}
    // },[]);
    //
    // componentDidUpdate
    useEffect(()=>{
      // console.log(highlightedNode);
      // setHighlightedNodeId(highlightedNode);
      //console.log(data,"GRAPH CONTAINER DID UPDATE!");
      if(typeof data.nodes !== 'undefined'){
        let decoratedNodes = decorateGraphNodesWithInitialPositioning(data.nodes);
        if(decoratedNodes != undefined || decoratedNodes != null){
          setData(data,()=>{
            setTimeout(function(){
              focusNode(data.nodes[0].id)
            }, 500);
          })
        }
      }
    },[data.links]);

    const dummyData = {
      nodes: [{id:"dInitialNode1",color:"black",symbolType:"diamond"},
              {id:"dInitialNode2",color:"red",symbolType:"diamond"}],
      links: [{label:"initialLink", source:"dInitialNode1",target:"dInitialNode2"}],
    }
    const graphProps = {
      id: "graph-id",
      data: (typeof data.nodes !== 'undefined') ? {...data, focusedNodeId: focusedNodeId} : {...dummyData},
      config: config,
      onClickNode:nodeClick,
      onClickGraph:clickGraph,
      onMouseOverNode:onMouseOverNode,
      onMouseOutNode:onMouseOutNode,
      onDoubleClickNode:onDoubleClickNode,
    }
    //console.log("GRAPH PROPS!",graphProps);
    return(
      <div onMouseMove={_onMouseMove}>
        <Graph
          {...graphProps}
          />
      </div>
    )
}
//          ref = "graph"
