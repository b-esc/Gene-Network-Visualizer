import { useStore } from 'react-context-hook';
import axios from "axios";

let endpoint = "http://localhost:8080";

// attempted abstraction
function norm(a,b,min, max) {
    var del = max - min;
    return function (val) {
        return a + (((val - min) * (b-a)) / del);
    };
}

export default async function queryGeneByUid(queryText,maxRes,isNhood){
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
