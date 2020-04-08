import React from 'react';
import axios from "axios";
import { useStore } from 'react-context-hook';
import { Modal, Header, Button} from 'semantic-ui-react';
import Table from './Table.jsx'

let endpoint = "http://localhost:8080";

export default function () {
  const [moreInfoGene] = useStore('moreInfoGene')
  const [moreInfoVisible, setMoreInfoVisible] = useStore('moreInfoVisible')

  return ( (moreInfoGene != null) &&
  <Modal dimmer={'blurring'} open={moreInfoVisible}>
    {{moreInfoVisible} &&
      <Modal.Content>

        {/* <Image wrapped size='medium' src='https://i.imgur.com/jXy3wuV.png' /> */}
        <Modal.Description>

          <Header>Alias: {moreInfoGene.gene_display_name}</Header>
          <h2>Description:</h2>
          <p>{moreInfoGene.description}</p>

          <h2>Species:</h2>
          <p>{moreInfoGene.species}</p>

          <h2>Gene Names:</h2>
          <p>{moreInfoGene.gene_names}</p>

          <h2>Term ids:</h2>
          <p>{moreInfoGene.term_ids}</p>
          }

          <h1>Most related (doc2vec) table preview:</h1>

          <Table isPreview={true}/>

        </Modal.Description>
        <Button onClick={() => setMoreInfoVisible(!moreInfoVisible)}>Close</Button>
      </Modal.Content>
    }
  </Modal>)
}
