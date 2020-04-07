// @flow
import type {Link, Gene, ModalStore} from "../../types.js";
import * as M_A from '../actions/modalActions';

// export const TOGGLE_INFO_MODAL = "TOGGLE_INFO_MODAL";
// export const UPDATE_MODAL_UID = "UPDATE_INFO_UID";
// export const TOGGLE_HOVER_MODAL = "TOGGLE_HOVER_MODAL";

let initalModalStore : ModalStore = {
  selectedGene: "none",
  selectedUID: "-1",
  infoVisible: false,
  hoverVisible: false,
  hoverFix: false,
  xPos: -1,
  yPos: -1,
  pending: false,
  pGenes: {},
  pLinks: [],
  error: null
}

const modalReducer = (state: ModalStore = initalModalStore, action: any) =>{
  switch (action.type){
    case M_A.UPDATE_MODAL_UID:
      const { modalId } = action.payload;
      return {...state, selectedUID: modalId}
    case M_A.UPDATE_HOVER_CORDS:
      const { xPos, yPos } = action.payload;
      return {...state, xPos: xPos, yPos: yPos}
    case M_A.TOGGLE_INFO_MODAL:
      const { infoVisible } = action.payload;
      return {...state, infoVisible: !infoVisible}
    case M_A.TOGGLE_HOVER_MODAL:
      const { hoverVisible } = action.payload;
      // Remains visible if hover is fixed, otherwise toggle
      return {...state, hoverVisible: (state.hoverFix) ? true : !hoverVisible}
    case M_A.TOGGLE_FIX_HOVER:
      const { hoverFix } = action.payload;
      return {...state, hoverFix: !hoverFix}
    case M_A.FETCH_PREVIEW_PENDING:
      return{ ...state, pending: true}
    case M_A.FETCH_PREVIEW_SUCCESS:
      const { genes, links } = action.payload;
      return{
        ...state,
        pending: false,
        pGenes: genes,
        pLinks: links,
        infoVisible: true
      }
    case M_A.FETCH_PREVIEW_ERROR:
      const { res_error } = action.payload;
      return{
        ...state,
        pending: false,
        error: res_error
      }
    default:
      return state;
  }
}

export const getModalUID: any = () => {return initalModalStore.selectedUID};
export {modalReducer, initalModalStore};
