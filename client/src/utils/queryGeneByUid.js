import { useStore } from 'react-context-hook';
import axios from "axios";

let endpoint = "http://localhost:8080";


export default async function queryGeneByUid(queryText,maxRes,isNhood){
    return axios.get(endpoint + '/api/queryGene/'
    + `${queryText}/${maxRes}/${isNhood}`).then(res =>{
      if(res.error) throw(res.error);
      let data = {nodes: res.data.Genes, links: res.data.Links};
      return data;
    });
  }
