// Query Actions
export const UPDATE_SEARCH = "TOGGLE_NHOOD";
export const UPDATE_MAX_RES = "UPDATE_MAX_RES";
export const UPDATE_SEARCH_TYPE = "UPDATE_SEARCH_TYPE";
export const TOGGLE_NHOOD = "TOGGLE_NHOOD";

export const FETCH_GENES_PENDING = "FETCH_GENES_PENDING";
export const FETCH_GENES_SUCCESS = "FETCH_GENES_SUCCESS";
export const FETCH_GENES_ERROR = "FETCH_GENES_ERROR";

export const updateSearch = (updatedText: string)  => ({
  type: UPDATE_SEARCH,
  payload: { text: updatedText }
});

export const updateSearchType = (updatedType: string) => ({
  type: UPDATE_SEARCH_TYPE,
  payload: { type: updatedType }
});

export const updateMaxRes = (updatedMax: number) => ({
  type: UPDATE_MAX_RES,
  payload: { max_res: updatedMax }
});

export const toggleNhood = (curNhood: boolean) => ({
  type: TOGGLE_NHOOD,
  payload: { nhood: curNhood }
});

export const fetchGenesPending = () =>({
  type: FETCH_GENES_PENDING,
});

export const fetchGenesSuccess = (gene_res: {[string]:Gene}, link_res: Array<Link>) =>({
  type: FETCH_GENES_SUCCESS,
  payload: {genes: gene_res, links: link_res}
});

export const fetchGenesError = (error: any) =>({
  type: FETCH_GENES_ERROR,
  payload: { res_error: error }
})
