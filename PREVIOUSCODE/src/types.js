// @flow

export type Gene = {
    uid: string,
    species: string,
    gene_names: string,
    description: string,
    gene_display_name: string,
    color: string,
    // TODO: move delimiting to py
    term_ids: Array<string>,
    edges : any
}

export type Link = {
    label: string,
    source: string,
    target: string,
    distance: number
}

export type QueryRequest = {
  searchText: string,
  max: number,
  uid: string,
  isNhood: bool
}

export type QueryResponse = {
  genes: {[string]:Gene},
  links: Array<Link>
}

export type ModalStore = {
  selectedGene: string,
  selectedUID: string,
  infoVisible: bool,
  hoverVisible: bool,
  hoverFix: bool,
  xPos: number,
  yPos: number,
  pGenes: any,
  pLinks: any,
  error: any
}

export type QueryStore = {
  recentSearch: string,
  searchText: string,
  searchType: string,
  maxRes: number,
  is_nhood: bool,
  pending: bool,
  genes: any,
  nodes: any,
  links: any,
  map: any,
  error: any
}
