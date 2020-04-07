// @flow
import * as Q_A from "./actions/queryActions.js";
import * as M_A from "./actions/modalActions.js";
import {getQueryInputs} from "./reducers/query.js";
import {getModalUID} from "./reducers/modal.js";
const SERVER_PREFIX = "http://localhost:8080/api/";

export const fetchGenes = () => {
  return (dispatch: any) => {
    dispatch(Q_A.fetchGenesPending());
    const { text, type, max_res, is_nhood } = getQueryInputs();
    fetch(SERVER_PREFIX + "queryGene"
      + `?input=${text}`
      + `&query_type=${type}`
      + `&max_res=${max_res}`
      + `&neighborhood=${is_nhood}`).then(res =>{return res.json}).then(
      res =>{
        if(res.error) throw(res.error);
        dispatch(Q_A.fetchGenesSuccess(res.genes, res.links)); // oof change
        return res.genes;
      }).catch(error =>{
          dispatch(Q_A.fetchGenesError(error));
      })
  }
}

export const fetchPreview = () =>{
  return (dispatch: any) =>{
    dispatch(M_A.fetchPreviewPending());
    const selectedUID: string = getModalUID();
    fetch(SERVER_PREFIX + "previewGene"
      + `?uid=${selectedUID}`).then(res =>{return res.json}).then(
      res => {
        if(res.error) throw(res.error);
        dispatch(M_A.fetchPreviewSuccess(res.genes, res.links));
        return res.geneRes;
      }).catch(error =>{
        dispatch(M_A.fetchPreviewError(error));
      })
  }
}

/*
query_gene = () =>{
  try{
    fetch(bridge_url
      + `/api/queryGene?input=${this.state.input_text}`
      + `&query_type=${this.state.query_type}`
      + `&max_res=${this.state.max_res}`
      + `&neighborhood=${this.state.neighborhood}`).then(res =>{
        return res.json();
      }).then(query_res =>{
        console.log(query_res);
        if (!query_res.success){
          alert("!query response failed in react");
        } else{
          this.setState({
            graph_data:query_res.endpoint_res.graph_objects,
            table_data:{table_rows:query_res.endpoint_res.table_objects,
                        rows_per_page: 5}
          });
          this.props.get_res_output(this.state);
        }
      })
    }catch(err){
      console.log(err);
    }
  };


*/
