import PropTypes from 'prop-types'
import React, { Component } from 'react'
import * as SUI from 'semantic-ui-react'


let allowed_table_keys = ["species","gene_display_name","gene_names","description","term_ids"];
let atk_set = new Set(allowed_table_keys);
let table_headers = ['Species', 'Display Name',"Gene Names",'Description', 'Term IDs','🐦 🐦']

class TableContainer extends Component{
  constructor(props){
    super(props);
    this.state = {cur_page : 1};
  }

  render(){
    let { tableGenes, isPreview, rowsPerPage, fetchPreview } = this.props;
    let last_idx = rowsPerPage * this.state.cur_page;
    let first_idx = last_idx - rowsPerPage;
    let cur_page_data = tableGenes.slice(first_idx,last_idx);
    let preview_name = "";
    let render_page = tableGenes.map(gene =>
      <SUI.Table.Row>
        {
          allowed_table_keys.map(key =>{
            if(atk_set.has(key)){
              return(<SUI.Table.Cell>
                {gene[key]}
              </SUI.Table.Cell>)
            }
          })
        }
        {!isPreview &&
        <SUI.Table.Cell>
          <SUI.Button animated onClick={
              function(){
                // reducer toggles infoModal visible
                fetchPreview(gene.uid);
              }}>
            <SUI.Button.Content visible>More Info</SUI.Button.Content>
            <SUI.Button.Content hidden>
              <Icon name='arrow right' />
            </SUI.Button.Content>
          </SUI.Button>
        </SUI.Table.Cell>
        }
      </SUI.Table.Row>
    );

    let page_numbers = []
    for(let i = 1; i <= Math.ceil(tableGenes.length / rowsPerPage); i++){
      page_numbers.push(i);
    }

    let render_numbers = page_numbers.map(number =>{
      return(
        <SUI.Menu.Item as='a'
          key={number}
          id={number}
          onClick={(event) => this.setState({cur_page: Number(event.target.id)})}>
          {number}
        </SUI.Menu.Item>
      )
    });

    let render_titles = table_headers.map(title =>{
      if(!(!this.props.is_parent && title == '🐦 🐦')){
        return(<SUI.Table.Cell>{title}</SUI.Table.Cell>)
      }
    });

    return(
      <Table textAlign='center' celled striped fixed>
        <SUI.Table.Header>
          {render_titles}
        </SUI.Table.Header>

        <SUI.Table.Body>
          {render_page}
        </SUI.Table.Body>

        <SUI.Table.Footer>
          <SUI.Table.Row>
            <SUI.Table.HeaderCell colSpan = {!isPreview ? '6' : '5'}>
              <SUI.Menu floated='right' pagination id="page-numbers">
                {render_numbers}
              </SUI.Menu>
            </SUI.Table.HeaderCell>
          </SUI.Table.Row>
        </SUI.Table.Footer>
      </Table>
    )
  }
}

export default TableContainer

TableContainer.PropTypes = {
  tableGenes: PropTypes.array.isRequired,
  isPreview: PropTypes.bool.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  fetchPreview: PropTypes.func.isRequired
}
