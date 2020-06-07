import * as React from 'react';
import { useStore } from 'react-context-hook';
import { Segment, Header, Image, Grid, Container, Menu, Responsive, Icon, Button, List } from 'semantic-ui-react';
import GraphContainer from "./components/GraphContainer";
import NodeHoverModal from "./components/NodeHoverModal";
import MoreInfoModal from "./components/MoreInfoModal";
import Query from "./components/Query";
import Table from "./components/Table";


/**
* Splash
*
* Splash Page w/Context, FAQ, ToDos, etc
* Best place to add user auth entry if later added
*/
function Splash(){
  return (
    <Responsive>
      <Segment
        textAlign='center'
        style={{minHeight:650, padding: '0.75em 0em'}}
        vertical
      >

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


      </Segment>

      <Header
        as='h1' textAlign='right' style={{marginRight:'4em', marginBottom:'8em'}}>
        quick start
        <Icon.Group size='large' style={{marginTop: '1em',marginLeft:'1em'}}>
          <Icon size='large' name='angle double down'/>
        </Icon.Group>

      </Header>

      <Segment textAlign='center' style={{marginTop:"6em", marginBottom:"6em"}}>
        <Grid celled columns={3}>
          <Grid.Row>
            <Grid.Column>
              <List size='massive'>
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
            <Grid.Column>
              <List size='massive'>
                <List.Item>
                  A user may search the database
                </List.Item>
                <List.Item>
                  for a Gene via their unique ID's,
                  identifying names,
                </List.Item>
                <List.Item>
                  relevant descriptional text, among other properties.
                </List.Item>
                <List.Item>
                  Search results include a graph and table of X most related Genes
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column>
              <List size='massive'>
                <List.Item>
                  Relatedness is determined by user provided weight / distance
                </List.Item>
                <List.Item>
                  from our 'root gene' (what gene was returned by the search)
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
            <List size='huge'>
              <List.Item>
                <List.Content>
                  <List.Header as='h1'>Options</List.Header>
                  <List.Description>
                    Change max # genes to visualize & tabulate
                      <br></br>
                      <br></br>
                    Toggle if related Gene's form connected components in the graph

                  </List.Description>
                </List.Content>
              </List.Item>

              <List.Item>
                <List.Content>
                  <List.Header as='h1'>Dropdown</List.Header>
                  <List.Description>
                    UID: Searches genes by UID (Developer Tool)
                      <br></br>
                    UID's uniquely identify entries in the dataset
                      <br></br>
                      <br></br>
                    Flask: Searches genes by description (Python Processing)
                      <br></br>
                    This currently returns random UIDs.
                      <br></br>
                    Ian is developing english / word processing to relate descriptions to genes.
                  </List.Description>
                </List.Content>
              </List.Item>

              <List.Item>
                <List.Content>
                  <List.Header as='h1'>Query Input</List.Header>
                  <List.Description>
                    Input sent to backend for processing
                      <br></br>
                    Responses are handled based on Dropdown's setting
                  </List.Description>
                </List.Content>
              </List.Item>

              <List.Item>
                <List.Content>
                  <List.Header as='h1'>Execute</List.Header>
                  <List.Description>
                    Run the selected search operating on Dropdown and Query Input
                  </List.Description>
                </List.Content>
              </List.Item>

              <List.Item>
                <List.Content>
                  <List.Header as='h1'>Export</List.Header>
                  <List.Description>
                    Download a csv file representing Gene's visible in the current query
                  </List.Description>
                </List.Content>
              </List.Item>

              <List.Item>
                <List.Content>
                  <List.Header as='h1'>Search</List.Header>
                  <List.Description>
                    Browse current query's result via Gene properties
                  </List.Description>
                </List.Content>
              </List.Item>

            </List>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      </Segment>

      <Segment
        textAlign='left'
        style={{minHeight:650}}
        vertical
      >
      <Grid celled>
        <Grid.Row>

          <Grid.Column width={5}>
            <List size='huge'>
              <List.Item>
                <List.Content>
                  <List.Header as='h1'>Table</List.Header>
                  <List.Description>
                    Table displays data from searches as well.
                      <br></br>
                      <br></br>
                    All data is paginated, searches via 'Flask' option in Dropdown are not
                    guarenteed to be the same data on the graph
                    <br></br>
                    <br></br>
                    Currenty description and Term IDs are delimited by ';' and '|' respectively.
                    <br></br>
                    See render_page in Table.jsx for details concerning formatting
                    <br></br>
                    <br></br>
                    BuildDb.go enforces strict column names not
                    <br></br>
                    identical to column names on the pictured table
                  </List.Description>
                </List.Content>
              </List.Item>
            </List>

            <List size='huge'>
              <List.Item>
                <List.Content>
                  <List.Header as='h1'>More Info</List.Header>
                  <List.Description>
                    Toggles a modal displaying more information about the specific gene.
                    <br></br>
                    A preview request is sent to the server as soon as MoreInfo is clicked.
                    <br></br>
                    This same modal may be accessed via the graph visualizer
                  </List.Description>
                </List.Content>
              </List.Item>
            </List>
          </Grid.Column>


          <Grid.Column width={11}>
            <Image src="https://i.ibb.co/HB7PZYy/image.png"></Image>
          </Grid.Column>

        </Grid.Row>
      </Grid>

      </Segment>

      <Segment
        textAlign='left'
        style={{minHeight:350, padding: '0em 0em'}}
        vertical
      >
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            <Image src="https://i.ibb.co/G5B4kQN/image.png"></Image>
          </Grid.Column>
          <Grid.Column width={3}>
            <List size='huge'>
              <List.Item>
                <List.Content>
                  <List.Header as='h1'>More Info Modal</List.Header>
                  <List.Description>
                    Focuses on a single Gene database entry
                      <br></br>
                      <br></br>
                    Export and Result Search are with respect to the information queried to generate the preview.
                    <br></br>
                    <br></br>
                    Gene Names and Term IDs are collapsible for the case of multiple entries
                  </List.Description>
                </List.Content>
              </List.Item>

            </List>
          </Grid.Column>

          <Grid.Column width={1}>
          </Grid.Column>

          <Grid.Column width={4}>
            <Image src="https://i.ibb.co/q5BbT1W/image.png"></Image>
          </Grid.Column>

          <Grid.Column width={4}>
            <List size='huge'>
              <List.Item>
                <List.Content>
                  <List.Header as='h1'>Interactive Visualizer</List.Header>
                  <List.Description>
                    Hovering over nodes brings up their identifier
                      <br></br>
                      <br></br>
                    More Info Modal may be accessed here
                    <br></br>
                    <br></br>
                    The two other options aren't connected to any functions
                  </List.Description>
                </List.Content>
              </List.Item>

            </List>
          </Grid.Column>


        </Grid.Row>
      </Grid>

      </Segment>







    </Responsive>
  )
}

export default Splash;
