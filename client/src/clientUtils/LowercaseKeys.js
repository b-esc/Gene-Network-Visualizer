export default function(root){
  console.log(root);
  for(let i = 0; i < root.length; i++){
    root[i] = Object.keys(root[i]).reduce((c, k) => (c[k.toLowerCase()] = root[i][k], c), {});
  }
  console.log(root);
  return root;
  // let rt = Object.keys(o).reduce((c, k) => (c[k.toLowerCase()] = o[k], c), {});
  // console.log(rt);
  // return rt;
}
