import * as React from 'react';
import { useStore } from 'react-context-hook';
import { Segment, Header, Image, Grid, Container, Menu, Responsive, Icon, Button, List } from 'semantic-ui-react';
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
          <Icon loading size='huge' name='spinner'/>
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
            content='lawrence-dill plant informatics & computation'
            style={{fontSize : '2em', marginTop: '1em', marginBottom: '1em'}}
            />
        </Container>

        <Button size='massive' color='green' inverted>
          Enter
        </Button>

      </Segment>

      <Header
        as='h1' textAlign='right' style={{marginRight:'4em'}}>
        quick start
        <Icon.Group size='large' style={{marginTop: '1em',marginLeft:'1em'}}>
          <Icon size='large' name='angle double down'/>
        </Icon.Group>

      </Header>

      <Segment textAlign='center' style={{minHeight:650, padding: '0em 0em'}}>
        <Grid celled>
          <Grid.Row>
            <Grid.Column width={4}>
              <List style={{fontSize:"1.5em"}}>
                <List.Item>
                  This application visualizes and tabulates gene information
                </List.Item>
                <List.Item>
                  The database is configurable and user provided
                </List.Item>
                <List.Item>
                  See Documentation => BuildDb.go
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={4}>
              <List style={{fontSize:"1.5em"}}>
                <List.Item>
                  A user may search the database for a Gene via their unique ID's,
                  identifying names, relevant descriptional text, among other properties.
                </List.Item>
                <List.Item>
                  Search results include a graph and table of X most related Genes
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={4}>
              <List style={{fontSize:"1.5em"}}>
                <List.Item>
                  Relatedness is determined by user provided weight / distance from
                  our 'root gene' (what gene was returned by the search)
                </List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      <Segment
        textAlign='right'
        style={{minHeight:650, padding: '0.75em 0em'}}
        vertical
      >
      <Grid celled>
        <Grid.Row>
          <Grid.Column width={11}>
            <Image src="https://i.ibb.co/d5fQh11/image.png"></Image>
          </Grid.Column>
          <Grid.Column width={4}>
            <List style={{fontSize:"1.5em"}}>
              <List.Item>
                This application visualizes and tabulates gene information
              </List.Item>
              <List.Item>
                The database is configurable and user provided
              </List.Item>
              <List.Item>
                See Documentation => BuildDb.go
              </List.Item>
              <List.Item>
                A user may search the database for a Gene via their unique ID's,
                identifying names, relevant descriptional text, among other properties.
              </List.Item>
              <List.Item>
                Search results include a graph and table of X most related Genes
              </List.Item>
              <List.Item>
                Relatedness is determined by user provided weight / distance from
                our 'root gene' (what gene was returned by the search)
              </List.Item>
            </List>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      </Segment>


    </Responsive>
  )
}
