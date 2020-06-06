import _ from 'lodash'
import propTypes from 'prop-types'
import faker from 'faker'
import React, { Component } from 'react'
import { Search, Grid, Header, Segment } from 'semantic-ui-react'

const initialState = { isLoading: false, results: [], value: '' }


const getResults = () =>
  _.times(5, () => ({
    title: faker.company.companyName(),
    description: faker.company.catchPhrase(),
    image: faker.internet.avatar(),
    price: faker.finance.amount(0, 100, 2, '$'),
  }))

const source = _.range(0, 3).reduce((memo) => {
  const name = faker.hacker.noun()

  // eslint-disable-next-line no-param-reassign
  memo[name] = {
    name,
    results: getResults(),
  }

  return memo
}, {})

/**
* CategoricalSearch
*
* Functionality restricted by SemanticUI-React
* If functionality to get / display search data from
* other sites is added, test without the component / just text
* first as Class components are a good way to lose time
*/
class CategoricalSearch extends Component {

  // Maps client data to SemanticUI's expected
  arrayToSource = (arr, descKey) =>{
    let x = arr.map(function(item){
      return{
        title: item.gene_display_name,
        description: item[descKey],
        image: faker.internet.avatar(),
      }
    })
    return x
  }


  constructor(props){
    console.log(props);

    super(props);
    var newSource = {
      description: {
        name:"description",
        results:this.arrayToSource(props.genes, "description"),
      },
      terms: {
        name:"term_ids",
        results:this.arrayToSource(props.genes, "term_ids"),
      },
      gene_names: {
        name:"gene_names",
        results:this.arrayToSource(props.genes, "gene_names"),
      },
    }
    this.state = {...initialState,searchSource:newSource,srcGenes:props.genes}
    console.log(this.state)
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.genes != this.props.genes){
        console.log("SEARCH UPDATED!");

        var newSource = {
          description: {
            name:"description",
            results:this.arrayToSource(this.props.genes, "description"),
          },
          terms: {
            name:"term_ids",
            results:this.arrayToSource(this.props.genes, "term_ids"),
          },
          gene_names: {
            name:"gene_names",
            results:this.arrayToSource(this.props.genes, "gene_names"),
          },
        }
        this.setState({searchSource:newSource});
      }

  }




  handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState)

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = (result) => re.test(result.title)

      const filteredResults = _.reduce(
        this.state.searchSource,
        (memo, data, name) => {
          //console.log("SOURCE!",source);
          console.log(this.state,this.props)
          console.log(this.state.searchSource)
          const results = _.filter(data.results, isMatch)
          if (results.length) memo[name] = { name, results } // eslint-disable-line no-param-reassign

          return memo
        },
        {},
      )

      this.setState({
        isLoading: false,
        results: filteredResults,
      })
    }, 300)
  }

  render() {
    const { isLoading, value, results } = this.state
    //console.log(this.props);
    return (
      <div>

        <Search
          category
          loading={isLoading}
          onResultSelect={this.handleResultSelect}
          onSearchChange={_.debounce(this.handleSearchChange, 500, {
            leading: true,
          })}
          results={results}
          value={value}
          {...this.props}
        />
      </div>


    )
  }
}

export default CategoricalSearch;

CategoricalSearch.propTypes = {
  genes: propTypes.array.isRequired,
}
