import React from 'react';
import axios from "axios";
import previewGene from '../utils/previewGene';
import { useStore } from 'react-context-hook';
import { Table, Menu, Button, Icon } from 'semantic-ui-react';

let allowed_table_keys = ["species","gene_display_name","gene_names","description","term_ids"];
let atk_set = new Set(allowed_table_keys);
let table_headers = ['Species', 'Display Name',"Gene Names",'Description', 'Term IDs','Additional Info']


/**
* Generator for all tables in our application
* We anticipate at most two tables at once
*
* One from our primary query, one from a 'More Info' request
* They have different current / max / isVisible values in our global store
*
* gCurPage is for isPreview = false, curPreviewPage is for isPreview = True
*
* @param {Array} data array of Gene's to generate table rows from
* @param {Number} rowsPerPage controls how much information the table can show at once
* @param {boolean} isPreview determines if 'more info' (which invokes a preview server call) should be rendered for each table row
* @returns {Object} resultant table paginated
*/
function TableSrc({data, rowsPerPage, isPreview}) {
  const [gCurPage, gSetCurPage] = useStore('curPage');
  const [curPreviewPage, setCurPreviewPage] = useStore('curPreviewPage');
  const [moreInfoGene, setMoreInfoGene] = useStore('moreInfoGene');

  const [previewGenes, setPreviewGenes] = useStore('previewGenes');
  const [moreInfoVisible, setMoreInfoVisible] = useStore('moreInfoVisible');

// Track table rows to render
  let curPage = (isPreview) ? curPreviewPage : gCurPage;
  let lastIdx = rowsPerPage * curPage;
  let firstIdx = lastIdx - rowsPerPage;
  let curGenes = (data.length > 0) ? data.slice(firstIdx,lastIdx) : [];

// Checks what data is getting a table cell
// Some conditionals to handle rendering (bad move to backend)
  let render_page = curGenes.map(gene =>
    <Table.Row>
      {
        allowed_table_keys.map(key =>{
          if(key == "description"){
            const strToArr = gene[key].split(";");
            const arrayToTable = strToArr.map((d) => <li style={{"list-style": "none"}}>{d}</li>);
            return(<Table.Cell>
              {arrayToTable}
            </Table.Cell>)
          }
          else if(atk_set.has(key) && !(Array.isArray(gene[key]) && (gene[key].length > 1)) ){
            return(<Table.Cell>
              {gene[key]}
            </Table.Cell>)
          }
          else if(Array.isArray(gene[key]) && (gene[key].length > 1)){
            const arrayToTable = gene[key].map((d) => <li style={{"list-style": "none"}}>{d}</li>);
            return(<Table.Cell>
              {arrayToTable}
            </Table.Cell>)

          }
        })
      }
      {!isPreview &&
      <Table.Cell>
        <Button animated onClick={
            async function(){
              // reducer toggles infoModal visible
              let x = await previewGene(gene.uid);
              if(x.length > 0) setMoreInfoGene(x[0]);
              //console.log(x[0])
              setPreviewGenes(x);
              setCurPreviewPage(1);
              setMoreInfoVisible(true);
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
  for(let i = 1; i <= Math.ceil(data.length / rowsPerPage); i++){
    page_numbers.push(i);
  }

  let render_numbers = page_numbers.map(number =>{
    return(
      <Menu.Item as='a'
        key={number}
        id={number}
        onClick={(event) => {
          if(isPreview){
            setCurPreviewPage(event.target.id);
          }else{
            gSetCurPage(event.target.id);
          }
        }}>
        {number}
      </Menu.Item>
    )
  });

// no additional info column title unless its not a preview
  let render_titles = table_headers.map(title =>{
    if(!(isPreview && title == 'Additional Info')){
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
          <Table.HeaderCell colSpan = {!isPreview ? '6' : '5'}>
            <Menu floated='right' pagination id="page-numbers">
              {render_numbers}
            </Menu>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  )
}

export default TableSrc;
