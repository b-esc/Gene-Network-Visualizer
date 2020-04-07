import React from 'react';
import PropTypes from 'prop-types'
import * as SUI from 'semantic-ui-react';

const Options = ({updateMaxRes, toggleNhood, nhoodStatus}) =>(
    <SUI.Popup
      trigger={
        <SUI.Button size='huge'>
          Options
        </SUI.Button>
      }
      flowing
      hoverable>
      <SUI.Grid centered divided columns={2}>
        <SUI.Grid.Column textAlign='center'>
          <SUI.Header as='h2'>
            Max Response
          </SUI.Header>
          <SUI.Input
            onChange={'max_res'}
            style={{ width: '5em' }}
            placeholder={'placeholder'}>
          </SUI.Input>
        </SUI.Grid.Column>
        <SUI.Grid.Column textAlign='center'>
          <SUI.Header as='h2'></SUI.Header>
          <SUI.Header as='h4'>
            {nhoodStatus}
          </SUI.Header>
          <SUI.Button onClick={toggleNhood}>Toggle</SUI.Button>
        </SUI.Grid.Column>
      </SUI.Grid>
    </SUI.Popup>
)

const dropdown_opts = [
  {
    key: 'Gene Name',
    text: 'Gene Name',
    value: 'Gene Name',
  },
  {
    key: 'Text Search',
    text: 'Text Search',
    value: 'Text Search',
  }
]

const QueryBar = ({ updateSearch, updateSearchType }) => (
  <div>
    <Options/>
    <SUI.Input
      placeholder="Query SUI.Input"
      size="huge"
      type="text"
      onChange={e => {
        if(!e.target.value.trim()) return;
        updateSearch(e.target.value);
      }}
      >
      <SUI.Label style={{ marginRight: '0' }} size="huge">
        <SUI.Dropdown
          fluid
          search
          placeholder="Search by.."
          size="huge"
          options={dropdown_opts}
          onChange={(e,data) => {
            updateSearchType(data.value);
          }}/>
      </SUI.Label>
      <SUI.Input />
        <SUI.Button
          onClick={() => props.query_gene()}
          size="huge">
          Execute 1 (Gene Names)
        </SUI.Button>
      </SUI.Input>
  </div>
)

export default QueryBar

QueryBar.PropTypes = {
  updateSearch: PropTypes.func.isRequired,
  updateSearchType: PropTypes.func.isRequired,
  updateMaxRes: PropTypes.func.isRequired,
  toggleNhood: PropTypes.func.isRequired,
  nhoodStatus: PropTypes.string.isRequired
}
//props.query_change(data.value, 'query_type')
