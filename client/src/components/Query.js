import React from 'react';
import axios from "axios";
import queryGeneByUid from '../utils/queryGeneByUid';
import CategoricalSearch from './CategoricalSearch';
import {CSVLink} from "react-csv";
import { useStore } from 'react-context-hook';
import { Popup, Button, Grid, Header, Input, Label, Dropdown, Icon } from 'semantic-ui-react';

let endpoint = "http://localhost:8080";


const dropdown_opts = [
  {
    key: 'Gene UID',
    text: 'Gene UID',
    value: 'Gene UID',
  },
  {
    key: 'Text Search',
    text: 'Text Search',
    value: 'Text Search',
  }
]

/**
*
* 'Search Bar' portion of the application
* Controls global state based on user input to forms
* @param {String} queryText (FROM STORE) text to be sent to server (based on searchType)
* @param {Number} maxRes (FROM STORE) how many unique gene's may be returned with the request
* @param {boolean} isNhood (FROM STORE) should we include edges outside of just those connected to parent?
* @param {Number} curPage (FROM STORE) essential to set back to 1 after every new query
* @returns {Object} 'Google Search Bar' form elements along with Execute being linked to a server call 
*/
function Query(){
  const [queryText, setQueryText] = useStore('queryText')
  const [maxRes, setMaxRes] = useStore('maxRes')

  // Dropdown for varying types of functionality
  const [searchType, setSearchType] = useStore('searchType')
  const [isNhood, toggleNhood] = useStore('isNhood')
  const [tableGenes, setTableGenes] = useStore('tableGenes')

  const [data, setData] = useStore('data');

  const [curPage, setCurPage] = useStore('curPage');


  return (
    <div>
      <Popup
        trigger={
          <Button size='huge'>
            Options
          </Button>
        }
        flowing
        hoverable>
        <Grid centered divided columns={2}>
          <Grid.Column textAlign='center'>
            <Header as='h2'>
              Max Response
            </Header>
            <Input
              onChange={(e) => {
                //console.log(e.target.value)
                if(e!=maxRes){
                  setMaxRes(e.target.value)
                }
              }}
              style={{ width: '5em' }}
              >
            </Input>
          </Grid.Column>
          <Grid.Column textAlign='center'>
            <Header as='h2'>Is Neighborhood</Header>
            <Header as='h4'>
              {`${isNhood}`}
            </Header>
            <Button onClick={() => toggleNhood(!isNhood)}>Toggle</Button>
          </Grid.Column>
        </Grid>
      </Popup>

      <Input
        placeholder="Query Input"
        size="huge"
        type="text"

        >
        <Label style={{ marginRight: '0' }} size="huge">
          <Dropdown
            fluid
            search
            placeholder="Search by.."
            size="huge"
            options={dropdown_opts}
            onChange={(e,data) => {
              setSearchType(data.value);
            }}/>
        </Label>
        <Input
          placeholder="Query Input"
          onChange={e => {
            if(!e.target.value.trim()) return;
            setQueryText(e.target.value);
          }}/>
          <Button
            onClick={async function(){
              let x = await queryGeneByUid(queryText,maxRes,isNhood);
              setTableGenes(x.nodes);
              setData({
                nodes:x.nodes,
                links:x.links,
                focusedNodeId:x.nodes[0].id
              });
              // ALWAYS set the current page back to 1
              setCurPage(1);
            }}
            size="huge">
            Execute 1 (Gene Names)
          </Button>
          <CSVLink data={data.nodes}>
            <Button icon size="huge" labelPosition='left'>
              <Icon name='download'/>
              Export
            </Button>
          </CSVLink>
          <CategoricalSearch genes={tableGenes}/>
        </Input>
    </div>
  )

}

export default Query;
