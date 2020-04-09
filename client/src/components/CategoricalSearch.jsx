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

// function buildSource(dataArr){
//   var x = {
//     desc: {
//       name: "description",
//       results:[],
//     },
//     term_ids:{
//       name: "term_ids",
//       results:[],
//     }
//   }
// }

class CategoricalSearch extends Component {
  // this.props.genes.reduce((gene)=>{
  //   console.log("reducing, cur gene:",gene);
  //   return gene;
  // },{})
  //console.log(props.genes,"SHOULD BE GENES!")
  arrayToSource = (arr, descKey) =>{
    let x = arr.map(function(item){
      return{
        title: item.gene_display_name,
        description: item[descKey],
        image: faker.image.nature(),
      }
    })
    return x
  }
  //state = initialState
  constructor(props){
    console.log(props);

    //console.log(newSource)
    super(props);
    var newSource = {
      description: {
        name:"description",
        results:this.arrayToSource(props.genes, "description"),
      },
      terms: {
        name:"description",
        results:this.arrayToSource(props.genes, "term_ids"),
      },
      gene_names: {
        name:"description",
        results:this.arrayToSource(props.genes, "gene_names"),
      },
    }
    this.state = {...initialState,searchSource:newSource}
    console.log(this.state)
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
          console.log("SOURCE!",source);
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
