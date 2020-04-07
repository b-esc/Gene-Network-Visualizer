import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {QueryBar} from "./QueryBar.jsx";
import * as SUI from 'semantic-ui-react';

const NodeContent = ({hoveredDisplayName, fetchPreview, hoverVisible}) => (
  <Grid
    celled='internally'
    centered
    divided
    columns={2}>
    <Grid.Column textAlign='center'>
      <Header as='h2'>
        {hoveredDisplayName}
      </Header>
      <Button onClick={() =>{
          fetchPreview();
          toggleInfoModal(hoverVisible);
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
)

const NodeHoverModal = ({hoverVisible, xPos, yPos}) =>(
  <SUI.Transition.Group
    animation={'fade down'}
    duration={300}>
    { hoverVisible &&
      (
        <div style={{ backgroundColor: 'rgba(237, 235, 237,0.3)',
          padding: '1em', position: 'absolute',
          top: `${yPos}px`, left: `${xPos}px` }}>
          <NodeContent/>
        </div>
      )
    }
  </SUI.Transition.Group>
)

export default NodeHoverModal

NodeHoverModal.PropTypes = {
  hoveredDisplayName : PropTypes.string.isRequired,
  hoverVisible: PropTypes.bool.isRequired,
  xPos : PropTypes.number.isRequired,
  yPos : PropTypes.number.isRequired,
  updateModalUid: PropTypes.func.isRequired,
  toggleInfoModal: PropTypes.func.isRequired,
  toggleHoverModal: PropTypes.func.isRequired,
  updateHoverCords: PropTypes.func.isRequired,
  fetchPreview: PropTypes.func.isRequired
}
