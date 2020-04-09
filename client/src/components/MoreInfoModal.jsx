import React from 'react';
import axios from "axios";
import { useStore } from 'react-context-hook';
import { Modal, Header, Button, List, Accordion, Icon } from 'semantic-ui-react';
import Table from './Table.jsx'

let endpoint = "http://localhost:8080";

export default function () {
  const [moreInfoGene] = useStore('moreInfoGene');
  const [moreInfoVisible, setMoreInfoVisible] = useStore('moreInfoVisible');
  const [previewGenes] = useStore('previewGenes');
  const [previewRowsPerPage] = useStore('previewRowsPerPage');
  const [gnDrop, setGnDrop] = useStore('gnDrop');
  const [tiDrop, setTiDrop] = useStore('tiDrop');

  let geneNames = moreInfoGene.gene_names.map(name =>{
    return(
      <List.Item>
        <List.Content>
          <List.Header>
            {name}
          </List.Header>
        </List.Content>
      </List.Item>
    )
  })

  let goTerms = moreInfoGene.term_ids.map(term_id =>{
    return(
      <List.Item>
        <List.Content>
          <List.Header>
            {term_id}
          </List.Header>
        </List.Content>
      </List.Item>
    )
  })

  return ( (moreInfoGene != null) &&
  <Modal dimmer={'blurring'} open={moreInfoVisible}>
    {{moreInfoVisible} &&
      <Modal.Content>

        {/* <Image wrapped size='medium' src='https://i.imgur.com/jXy3wuV.png' /> */}
        <Modal.Description>

          <Header>
            <h1>
              {moreInfoGene.gene_display_name}
            </h1>
          </Header>
          <h2>Description:</h2>
          <p>{moreInfoGene.description}</p>

          <h2>Species:</h2>
          <p>{moreInfoGene.species}</p>

          <Accordion exclusive={false}>
            <Accordion.Title active={gnDrop===true} onClick={()=>setGnDrop(!gnDrop)}>
              <h2>Gene Names <Icon name='dropdown'/></h2>

            </Accordion.Title>
            <Accordion.Content active={gnDrop===true}>
              <List divided relaxed>
                {geneNames}
              </List>
            </Accordion.Content>

            <Accordion.Title active={tiDrop===true} onClick={()=>setTiDrop(!tiDrop)}>
              <h2>Term ids <Icon name='dropdown'/></h2>

            </Accordion.Title>
            <Accordion.Content active={tiDrop===true}>
              <List divided relaxed>
                {goTerms}
              </List>
            </Accordion.Content>

          </Accordion>



          <h1>Most related (doc2vec) table preview:</h1>

            <Table data={previewGenes}
              rowsPerPage={previewRowsPerPage}
              isPreview={true}/>

        </Modal.Description>
        <Button onClick={() => setMoreInfoVisible(!moreInfoVisible)}>Close</Button>
      </Modal.Content>
    }
  </Modal>)
}
