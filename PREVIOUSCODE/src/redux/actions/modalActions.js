// Modal Actions
export const UPDATE_MODAL_UID = "UPDATE_INFO_UID";
export const UPDATE_HOVER_CORDS = "UPDATE_HOVER_CORDS";
export const TOGGLE_INFO_MODAL = "TOGGLE_INFO_MODAL";
export const TOGGLE_HOVER_MODAL = "TOGGLE_HOVER_MODAL";
export const TOGGLE_FIX_HOVER = "TOGGLE_FIX_HOVER";

export const FETCH_PREVIEW_PENDING = "FETCH_PREVIEW_PENDING";
export const FETCH_PREVIEW_SUCCESS = "FETCH_PREVIEW_SUCCESS";
export const FETCH_PREVIEW_ERROR = "FETCH_PREVIEW_ERROR";

export const updateModalUid = (newUid: any) => ({
  type: UPDATE_MODAL_UID,
  payload: {modalId: newUid}
})

export const updateHoverCords = (newX: number, newY: number) => ({
  type: UPDATE_HOVER_CORDS,
  payload: {xPos: newX, yPos: newY}
})

export const toggleInfoModal = (isVisible: boolean) =>({
  type: TOGGLE_INFO_MODAL,
  payload: { infoVisible: isVisible }
})


export const toggleHoverModal = (isVisible: boolean) =>({
  type: TOGGLE_HOVER_MODAL,
  payload: { hoverVisible: isVisible }
})

export const toggleFixHover = (fix: boolean) =>({
  type: TOGGLE_FIX_HOVER,
  payload: { hoverFix: fix}
})

export const fetchPreviewPending = () =>({
  type: FETCH_PREVIEW_PENDING,
});

export const fetchPreviewSuccess = (gene_res : {[number] : Gene}, link_res: Array<Link>) =>({
  type: FETCH_PREVIEW_SUCCESS,
  payload: { genes: gene_res, links: link_res }
});

export const fetchPreviewError = (error: any) =>({
  type: FETCH_PREVIEW_ERROR,
  payload: { res_error: error }
})
