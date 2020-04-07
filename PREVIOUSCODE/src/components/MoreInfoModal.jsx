import React, { Component } from 'react';
import PropTypes from "prop-types";
import * as SUI from 'semantic-ui-react'

const MoreInfoModal = ({selectedGene, infoPreview, infoVisible, toggleInfoModal}) => (
  ( (selectedGene != null) &&
  <SUI.Modal dimmer={'blurring'} open={infoVisible}>
    {{infoVisible} &&
      <SUI.Modal.Content>

        {/* <Image wrapped size='medium' src='https://i.imgur.com/jXy3wuV.png' /> */}
        <SUI.Modal.Description>

          <SUI.Header>Alias: {selectedGene.gene_display_name}</SUI.Header>
          <h2>Description:</h2>
          <p>{selectedGene.description}</p>

          <h2>Species:</h2>
          <p>{selectedGene.species}</p>

          <h2>Gene Names:</h2>
          <p>{selectedGene.gene_names}</p>

          <h2>Term ids:</h2>
          <p>{selectedGene.term_ids}</p>
          }

          <h1>Most related (doc2vec) table preview:</h1>

          <TablePreview/>

        </SUI.Modal.Description>
        <Button onClick={toggleInfoModal(infoVisible)}>Close</Button>
      </SUI.Modal.Content>
    }
  </SUI.Modal>)
)

export default MoreInfoModal

MoreInfoModal.PropTypes = {
  selectedGene: PropTypes.object.isRequired,
  infoPreview: PropTypes.array.isRequired,
  infoVisible: PropTypes.bool.isRequired,
  updateModalUid: PropTypes.func.isRequired,
  toggleInfoModal: PropTypes.func.isRequired,
  fetchPreview: PropTypes.func.isRequired
}
