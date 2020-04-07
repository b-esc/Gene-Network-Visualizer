// @flow
import type {QueryStore} from "../../types";
import * as Q_A from '../actions/queryActions';

let initialQueryStore : QueryStore = {
  recentSearch: "Search a gene or description to get started",
  searchText: "",
  searchType: "Gene Names",
  maxRes: 10,
  is_nhood: true,
  pending: false,
  genes: [],
  nodes: [],
  links: [],
  map: {},
  error: null
}
// Ensure 'pure' functions, never modify in place
// Concat / Slide / Spread for Arrays
// Object.assign()
function queryReducer(state: QueryStore = initialQueryStore, action: any): QueryStore{
  switch (action.type){
    case Q_A.UPDATE_SEARCH: {
      const { text } = action.payload;
      return { ...state, searchText: text};
    }
    case Q_A.UPDATE_MAX_RES: {
      const { max_res } = action.payload;
      return { ...state, maxRes: max_res}
    }
    case Q_A.UPDATE_SEARCH_TYPE: {
      const { type } = action.payload;
      return { ...state, searchType: type}
    }
    case Q_A.TOGGLE_NHOOD: {
      const { nhood } = action.payload;
      return { ...state, is_nhood: !nhood}
    }
    case Q_A.FETCH_GENES_PENDING: {
      return{ ...state, pending: true}
    }
    case Q_A.FETCH_GENES_SUCCESS: {
      const { genes, links } = action.payload;
      return{
        ...state,
        pending: false,
        genes: genes,
        links: links
      }
    }
    case Q_A.FETCH_GENES_ERROR: {
      const { res_error } = action.payload;
      return{
        ...state,
        pending: false,
        error: res_error
      }
    }
    default:
      return state;
  }
}

export const getQueryInputs = (state : any = initialQueryStore) => ({
  text: state.searchText,
  type: state.searchType,
  max_res: state.maxRes,
  is_nhood: state.is_nhood
});

export {initialQueryStore}
export const getGenes = (state : any = initialQueryStore) => state.genes;
export const getGenesPending = (state: any = initialQueryStore) => state.pending;
export const getGenesError = (state: any = initialQueryStore) => state.error;
export {queryReducer};
