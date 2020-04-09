import React from 'react';
import axios from "axios";
import previewGene from '../utils/previewGene';
import { useStore } from 'react-context-hook';
import { Table, Menu, Button, Icon } from 'semantic-ui-react';

let allowed_table_keys = ["species","gene_display_name","gene_names","description","term_ids"];
let atk_set = new Set(allowed_table_keys);
let table_headers = ['Species', 'Display Name',"Gene Names",'Description', 'Term IDs','Additional Info']



export default function({data, rowsPerPage, isPreview}) {
  const [gCurPage, gSetCurPage] = useStore('curPage');
  const [curPreviewPage, setCurPreviewPage] = useStore('curPreviewPage');
  const [moreInfoGene, setMoreInfoGene] = useStore('moreInfoGene');

  const [previewGenes, setPreviewGenes] = useStore('previewGenes');
  const [moreInfoVisible, setMoreInfoVisible] = useStore('moreInfoVisible');
  // if(props.isPreview){
  //   console.log("CUR PREVIEW GENES!",curGenes,previewGenes,tableGenes);
  // }
  let curPage = (isPreview) ? curPreviewPage : gCurPage;
  let lastIdx = rowsPerPage * curPage;
  let firstIdx = lastIdx - rowsPerPage;
  let curGenes = (data.length > 0) ? data.slice(firstIdx,lastIdx) : [];

  let render_page = curGenes.map(gene =>
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
      {!isPreview &&
      <Table.Cell>
        <Button animated onClick={
            async function(){
              // reducer toggles infoModal visible
              let x = await previewGene(gene.uid);
              if(x.length > 0) setMoreInfoGene(x[0]);
              console.log(x[0])
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
