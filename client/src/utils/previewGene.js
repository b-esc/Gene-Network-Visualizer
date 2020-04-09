import { useStore } from 'react-context-hook';
import axios from "axios";

let endpoint = "http://localhost:8080";


export default async function previewGene(uid){
  // const [na, setMoreInfoVisible] = useStore('moreInfoVisible');
  // const [previewGenes, setPreviewGenes] = useStore('previewGenes');
  // const [curPreviewPage, setCurPreviewPage] = useStore('curPreviewPage');

  return axios.get(endpoint + '/api/previewGene/'
  + `${uid}`).then(res =>{
    if(res.error) throw(res.error);
    //console.log(res);
    let nodes = res.data.Genes;
    //console.log(nodes);
    return nodes;
  });
}
