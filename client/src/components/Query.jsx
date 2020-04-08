import React from 'react';
import axios from "axios";
import LowercaseKeys from '../clientUtils/LowercaseKeys';
import { useStore } from 'react-context-hook';
import { Popup, Button, Grid, Header, Input, Label, Dropdown } from 'semantic-ui-react';

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

// "/api/queryGene/{uid}/{maxRes}/{isNhood}"


export default function (){
  const [queryText, setQueryText] = useStore('queryText')
  const [maxRes, setMaxRes] = useStore('maxRes')
  const [searchType, setSearchType] = useStore('searchType')
  const [isNhood, toggleNhood] = useStore('isNhood')

  const [data, setData] = useStore('data');

  function queryGene(){
    axios.get(endpoint + '/api/queryGene/'
    + `${queryText}/${maxRes}/${isNhood}`).then(res =>{
      if(res.error) throw(res.error);
      let nodes = LowercaseKeys(res.data.Genes);
      let links = LowercaseKeys(res.data.Links);
      setData({
        nodes:nodes,
        links:links,
        focusedNodeId:nodes[0]
      });
      console.log(res);
      console.log(res.data);
      console.log("query gene res successful!");
      console.log("BE SURE TO SET CURRENT PAGE TO 1");
    });
  }

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
              onChange={(e) => setMaxRes(e.target.value)}
              style={{ width: '5em' }}
              placeholder={`${maxRes}`}>
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
            onClick={() => queryGene()}
            size="huge">
            Execute 1 (Gene Names)
          </Button>
        </Input>
    </div>
  )

}
