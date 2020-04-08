import React from 'react';
import axios from "axios";
import { useStore } from 'react-context-hook';
import { Table, Menu, Button, Icon } from 'semantic-ui-react';

let allowed_table_keys = ["species","gene_display_name","gene_names","description","term_ids"];
let atk_set = new Set(allowed_table_keys);
let table_headers = ['Species', 'Display Name',"Gene Names",'Description', 'Term IDs','🐦 🐦']

let endpoint = "http://localhost:8080";


export default function(props) {
  const [tableGenes, setTableGenes] = useStore('tableGenes')
  const [curPage, setCurPage] = useStore('curPage')
  const [hoverUID, setHoverUID] = useStore('hoverUID')
  const [rowsPerPage] = useStore('rowsPerPage')

  let lastIdx = rowsPerPage * curPage;
  let firstIdx = lastIdx - rowsPerPage;
  let curPageData = tableGenes.slice(firstIdx,lastIdx);

  function previewGene(){
    axios.get(endpoint + '/api/previewGene/'
    + `${hoverUID}`).then(res =>{ return res.json }).then(res =>{
      if(res.error) throw(res.error);
      console.log(res);
      console.log("FROM TABLE preview gene res successful (CALLING DEFAULT AS 910)!");
    });
  }

  let render_page = tableGenes.map(gene =>
    <Table.Row>
      {
        allowed_table_keys.map(key =>{
          if(atk_set.has(key)){
            return(<Table.Cell>
              {gene[key]}
            </Table.Cell>)
          }
        })
      }
      {!props.isPreview &&
      <Table.Cell>
        <Button animated onClick={
            function(){
              // reducer toggles infoModal visible
              previewGene();
            }}>
          <Button.Content visible>More Info</Button.Content>
          <Button.Content hidden>
            <Icon name='arrow right' />
          </Button.Content>
        </Button>
      </Table.Cell>
      }
    </Table.Row>
  );

  let page_numbers = []
  for(let i = 1; i <= Math.ceil(tableGenes.length / rowsPerPage); i++){
    page_numbers.push(i);
  }

  let render_numbers = page_numbers.map(number =>{
    return(
      <Menu.Item as='a'
        key={number}
        id={number}
        onClick={(event) => setCurPage(event.target.id)}>
        {number}
      </Menu.Item>
    )
  });

  let render_titles = table_headers.map(title =>{
    if(!(!props.isPreview && title == '🐦 🐦')){
      return(<Table.HeaderCell key={title}>{title}</Table.HeaderCell>)
    }
  });

  return(
    <Table textAlign='center' celled striped fixed>
      <Table.Header>
        {render_titles}
      </Table.Header>

      <Table.Body>
        {render_page}
      </Table.Body>

      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell colSpan = {!props.isPreview ? '6' : '5'}>
            <Menu floated='right' pagination id="page-numbers">
              {render_numbers}
            </Menu>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  )
}
