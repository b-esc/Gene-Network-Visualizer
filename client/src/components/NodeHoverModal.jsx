import React from 'react';
import axios from "axios";
import queryGeneByUid from '../utils/queryGeneByUid';
import previewGene from '../utils/previewGene';
import { useStore } from 'react-context-hook';
import { Transition, Grid, Header, Button } from 'semantic-ui-react';

let endpoint = "http://localhost:8080";

/*
* Modal that follows our cursor
* when we hover over a node on visualizer
* Visibility triggered by hoverVisible (handled in GraphContainer)
*
* Usage of async function (){ ... } is to use await
* avoiding conflicts with functions not running in order
*/
export default function () {
// Relevant to this component
  const [hoverVisible, setHoverVisible] = useStore('hoverVisible')
// Double clicking a node fixes it to the screen
  const [hoverFix, setHoverFix] = useStore('hoverFix')
  const [hoverUID, setHoverUID] = useStore('hoverUID')
  const [xPos, setXPos] = useStore('xPos')
  const [yPos, setYPos] = useStore('yPos')

  const [moreInfoGene, setMoreInfoGene] = useStore('moreInfoGene');

  const [previewGenes, setPreviewGenes] = useStore('previewGenes')
  const [curPreviewPage, setCurPreviewPage] = useStore('curPreviewPage');


// MoreInfo is MoreInfoModal.jsx
  const [moreInfoVisible, setMoreInfoVisible] = useStore('moreInfoVisible')

  const [queryText, setQueryText] = useStore('queryText')
  const [isNhood, toggleNhood] = useStore('isNhood')
  const [tableGenes, setTableGenes] = useStore('tableGenes')
  const [data, setData] = useStore('data');
  const [curPage, setCurPage] = useStore('curPage');



  return(
    <Transition.Group
      animation={'fade down'}
      duration={300}>
      { (hoverVisible || hoverFix) &&
        (
          <div style={{ backgroundColor: 'rgba(237, 235, 237,0.3)',
            padding: '1em', position: 'absolute',
            top: `${yPos-125}px`, left: `${xPos+250}px` }}>
            <Grid
              celled='internally'
              centered
              divided
              columns={2}>
              <Grid.Column textAlign='center'>
                <Header as='h2'>
                  {`${tableGenes.find(x => x.uid === hoverUID.toString(10)).gene_display_name}`}
                </Header>
                <Button onClick={async function(){
                    let x = await previewGene(hoverUID)
                    if(x.length > 0) setMoreInfoGene(x[0]);
                    setPreviewGenes(x);
                    setCurPreviewPage(1);
                    setHoverFix(false);
                    setHoverVisible(false);
                    setMoreInfoVisible(true);
                  }}>
                  More Info
                </Button>
              </Grid.Column>
              <Grid.Column textAlign='center'>
                <Grid.Row>
                  <Button small>Expand</Button>
                </Grid.Row>
                <br>
                </br>
                <Grid.Row>
                  <Button small
                  onClick={async function(){
                    let x = await queryGeneByUid(hoverUID,5,true);
                    setTableGenes(x.nodes);
                    setData({
                      nodes:x.nodes,
                      links:x.links,
                      focusedNodeId:x.nodes[0].id
                    });
                    setCurPage(1);
                    setHoverVisible(false);
                    setHoverFix(false);
                  }}>
                    New Search
                  </Button>
                </Grid.Row>
              </Grid.Column>
            </Grid>

          </div>
        )
      }
    </Transition.Group>
  )
}
