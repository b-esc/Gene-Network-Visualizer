import { useStore } from 'react-context-hook';
import axios from "axios";

// url of backend
let endpoint = "http://localhost:8080";

/**
* Requests gene data for preview table, Previews occur
* after 'More Info' is selected by the user.
* @param {String/Number} uid unique id of gene to preview
* @returns {Array[Gene]} previewGenes list of Gene + info
*  to create a preview of a full query
*/
export default async function previewGene(uid){
  return axios.get(endpoint + '/api/previewGene/'
  + `${uid}`).then(res =>{
    if(res.error) throw(res.error);
    let nodes = res.data.Genes;
    return nodes;
  });
}
