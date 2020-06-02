import { useStore } from 'react-context-hook';
import React, { useState, useEffect, useRef, useMemo } from 'react'
import { Graph, Link, d3 } from "react-d3-graph";


/*
* Container for our visualizer
* Specifies configuration / styling for our data
* Before passing it to Reactd3Graph
*
* Probably leave everything below alone or
* ensure regression is tested before after every change
*/
export default function(){
    const isCancelled = useRef;
    const [tableGenes] = useStore('tableGenes');
    const [hoverVisible, setHoverVisible] = useStore('hoverVisible');
    const [hoverFix, setHoverFix] = useStore('hoverFix');
    const [hoverUID, setHoverUID] = useStore('hoverUID');
    const [xPos, setXPos] = useStore('xPos');
    const [yPos, setYPos] = useStore('yPos');
    const [data, setData] = useStore('data');

    // Make the root node stand out
    // data.nodes[0]['symbolType'] = "diamond";
    // data.nodes[0]['color'] = "blue";

    const [focusedNodeId, setFocusedNodeId] = useStore('focusedNodeId');

    // Alternative config for regression testing (use both after a change)
    let altConfig ={
      directed: true,
      automaticRearrangeAfterDropNode: true,
      collapsible: true,
      height: 400,
      highlightDegree: 2,
      highlightOpacity: 0.2,
      linkHighlightBehavior: true,
      maxZoom: 12,
      minZoom: 0.05,
      nodeHighlightBehavior: true,
      panAndZoom: false,
      staticGraph: false,
      width: 800,
      d3: {
          alphaTarget: 0.05,
          gravity: -250,
          linkLength: 120,
          linkStrength: 2,
      },
      node: {
          color: "#d3d3d3",
          fontColor: "black",
          fontSize: 10,
          fontWeight: "normal",
          highlightColor: "red",
          highlightFontSize: 14,
          highlightFontWeight: "bold",
          highlightStrokeColor: "red",
          highlightStrokeWidth: 1.5,
          labelProperty: n => (n.name ? `${n.id} - ${n.name}` : n.id),
          mouseCursor: "crosshair",
          opacity: 0.9,
          renderLabel: true,
          size: 200,
          strokeColor: "none",
          strokeWidth: 1.5,
          svg: "",
          symbolType: "circle",
          viewGenerator: null,
      },
      link: {
          color: "lightgray",
          highlightColor: "red",
          mouseCursor: "pointer",
          opacity: 1,
          semanticStrokeWidth: true,
          strokeWidth: 3,
          type: "STRAIGHT",
      },
    }

    // Primary config w/ the least bugs
    let config = {
      "automaticRearrangeAfterDropNode": false,
      "collapsible": false,
      "directed": true,
      "focusAnimationDuration": 0.75,
      "focusZoom": 1,
      "height": 600,
      "highlightDegree": 2,
      "highlightOpacity": 0.3,
      "linkHighlightBehavior": true,
      "maxZoom": 5,
      "minZoom": 0.5,
      "nodeHighlightBehavior": true,
      "panAndZoom": false,
      "staticGraph": false,
      //"staticGraphWithDragAndDrop": false,
      "width": 1200,
      "d3": {
        "alphaTarget": 0.05,
        "gravity": -250,
        "linkLength": 20,
        "linkStrength": function(link){
          //console.log("in link strength!",link);
          return link.distance;
          // We can have functions defining graph properties

          // let x = 1 / Math.min(count(link.source), count(link.target));
          // console.log(x);
          // return x;
        },
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
        "mouseCursor": "pointer",
        "opacity": 0.4,
        //"type":"STRAIGHT",
        "renderLabel": "false",
        "semanticStrokeWidth": true,
        //"labelProperty":"distance",
        "strokeWidth": 1.5,
        "markerHeight": 6,
        "markerWidth": 6
      }
    }

    // Make nodes spread out initially
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

    // Single clicking zooms into a node (unsafe)
    // const nodeClick = nodeId =>{
    //   if(focusedNodeId !== nodeId){
    //     focusNode(nodeId);
    //   } else{
    //     focusNode("");
    //   }
    // }


    // Update X Y position to move NodeExt.jsx
    const _onMouseMove = (e) => {
        if(!hoverFix && !hoverVisible){
          setXPos(e.nativeEvent.offsetX)
          setYPos(e.nativeEvent.offsetY)
          // this.props.updateHoverCords(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        }
      }

    const onMouseOutNode = id =>{
      //console.log("ON MOUSE OUT NODE",hoverFix,!hoverFix);
        if(!hoverFix){
          //console.log("HOVER VISIBLE SHOULD BE FALSE NOW!");
          setHoverVisible(false)
        } else{
          //console.log(hoverFix)
        }
      }

    const onDoubleClickNode = id => {
      if(focusedNodeId !== id){
        focusNode(id);
      }
        setHoverUID(Number(id));
        setHoverFix(true);
      }

    const onMouseOverNode = (id) => {
      //setHighlightedNodeId(id);
      //console.log(id);
      //console.log(label,lou);
      setHoverUID(Number(id));
      if(!hoverVisible){
        setHoverVisible(true);
      }
    }

    /*
    'do this when we first render' example

    useEffect(()=>{
      //if(data.links != undefined){
        setData({data:data},()=>{
          setTimeout(function(){
            focusNode(data.nodes[0].id)
          }, 500);
        });
      //}
    },[]);

    'do this when we update' example

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

    last argument is what to look for to signal an update

    */

    const dummyData = {
      nodes: [{id:"dInitialNode1",color:"black",symbolType:"diamond"},
              {id:"dInitialNode2",color:"red",symbolType:"diamond"}],
      links: [{label:"initialLink", source:"dInitialNode1",target:"dInitialNode2"}],
    }
    const graphProps = {
      id: "graph-id",
      data: (typeof data.nodes !== 'undefined') ? {...data, focusedNodeId: focusedNodeId} : {...dummyData},
      config: config,
      //onClickNode:nodeClick,
      onClickGraph:clickGraph,
      onMouseOverNode:onMouseOverNode,
      onMouseOutNode:onMouseOutNode,
      onDoubleClickNode:onDoubleClickNode,
    }

    // Do not remove memo usage,
    const memoizedGraph = useMemo(()=>{
      return(
      <div onMouseMove={_onMouseMove}>
        <Graph
          {...graphProps}
          />
      </div>)
    },[data.nodes,hoverFix])
    //console.log("GRAPH PROPS!",graphProps);
    return(
      <>
      {memoizedGraph}
      </>
    )
}
//          ref = "graph"
