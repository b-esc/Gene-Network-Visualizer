import { useStore } from 'react-context-hook';
import axios from "axios";

let endpoint = "http://localhost:8080";

/**
* queryGeneByUid
*
* Requests gene and link information to populate table & graph.
* Uses UID, which isn't too relevant to users making this primarily
* a debugging tool.
*
* @param {String/Number} uid unique id of gene to preview
* @returns {Array} list of Gene + info
*  to create a preview of a full query
*/
async function queryGeneByUid(queryText,maxRes,isNhood){
    return axios.get(endpoint + '/api/queryGene/'
    + `${queryText}/${maxRes}/${isNhood}`).then(res =>{
      if(res.error) throw(res.error);
      // TODO: improve normalization
      let normalizedLinks = res.data.Links.map(link =>{
        link.strokeWidth=(link.strokeWidth * 30.859)/2.2;
        return link;
      });
      let data = {nodes: res.data.Genes, links: normalizedLinks};
      return data;
    });
  }

export default queryGeneByUid
