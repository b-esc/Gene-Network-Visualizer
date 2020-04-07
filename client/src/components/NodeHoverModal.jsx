import React from 'react';
import { useStore } from 'react-context-hook';
import { Transition, Grid } from 'semantic-ui-react';

let endpoint = "http://localhost:8080";

// "/api/previewGene/{uid}"

export default function () {
  const [hoverVisible, setHoverVisible] = useStore('hoverVisible')
  const [hoverFix, setHoverFix] = useStore('hoverFix')
  const [hoverUID, setHoverUID] = useStore('hoverUID')
  const [xPos, setXPos] = useStore('xPos')
  const [yPos, setYPos] = useStore('yPos')

  const [moreInfoVisible, setMoreInfoVisible] = useStore('moreInfoVisible')

  function previewGene(){
    axios.get(endpoint + '/api/previewGene/'
    + `${hoverUID}`).then(res =>{ return res.json }.then(res =>{
      if(res.error) throw(res.error);
      console.log(res);
      console.log("preview gene res successful (CALLING DEFAULT AS 910)!");
    }));
  }

  return(
    <Transition.Group
      animation={'fade down'}
      duration={300}>
      { hoverVisible &&
        (
          <div style={{ backgroundColor: 'rgba(237, 235, 237,0.3)',
            padding: '1em', position: 'absolute',
            top: `${yPos}px`, left: `${xPos}px` }}>
            <Grid
              celled='internally'
              centered
              divided
              columns={2}>
              <Grid.Column textAlign='center'>
                <Header as='h2'>
                  'hovered display name'
                </Header>
                <Button onClick={() =>{
                    setMoreInfoVisible('true');
                    previewGene();
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
                  <Button small>
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
