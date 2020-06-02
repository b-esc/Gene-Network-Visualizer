import * as React from 'react';
import { useStore } from 'react-context-hook';
import { Segment, Header, Image, Grid, Container, Menu, Responsive, Icon } from 'semantic-ui-react';
import GraphContainer from "./components/GraphContainer";
import NodeHoverModal from "./components/NodeHoverModal";
import MoreInfoModal from "./components/MoreInfoModal";
import Query from "./components/Query";
import Table from "./components/Table";


/**
* Splash Page w/Context, FAQ, ToDos, etc
* Best place to add user auth entry if later added
*/
export default function (){
  const [tableGenes] = useStore('tableGenes');
  const [rowsPerPage] = useStore('rowsPerPage');

  return (
    <Responsive>
      <Segment
        textAlign='center'
        style={{minHeight:650, padding: '0.75em 0em'}}
        vertical
      >
        <Container>
          <Menu size='large'>
            <Menu.Item as='a'>
              lab site
            </Menu.Item>
            <Menu.Item as='a'>
              documentation
            </Menu.Item>
          </Menu>
        </Container>

        <Icon.Group size='huge' style={{marginTop: '1em'}}>
          <Icon loading size='big' name='spinner'/>
          <Icon name='dna' />
        </Icon.Group>

        <Container text>
          <Header
            as='h1'
            content='visualizer'
            style={{fontSize : '5em', marginTop: '0.5em'}}
            />

          <Header
            as='h3'
            content='lawrence-dill plat informatics & computation lab'
            style={{fontSize : '2em', marginTop: '1em'}}
            />
        </Container>

      </Segment>

      <Header
        as='h1' textAlign='right' style={{marginRight:'4em'}}>
        quick start
        <Icon.Group size='large' style={{marginTop: '1em',marginLeft:'1em'}}>
          <Icon size='large' name='angle double down'/>
        </Icon.Group>

      </Header>




    </Responsive>
  )
}
