import { connect } from 'react-redux';
import * as M_A from "../redux/actions/modalActions";
import initalModalStore from "../redux/reducers/modal.js";
import GraphContainer from '../components/GraphContainer';

const mapStateToProps = (state :any = initialModalStore) => ({
  xPos: state.xPos,
  yPos: state.yPos,
  nodes: state.pGenes,
  links: state.pLinks,
  hoverVisible: state.hoverVisible,
  hoverFix: state.hoverFix,
});

const mapDispatchToProps = dispatch => ({
  updateModalUid: uid => dispatch(M_A.updateModalUid(uid)),
  toggleFixHover: isFix => dispatch(M_A.toggleFixHover(isFix)),
  toggleHoverModal: isVisible => dispatch(M_A.toggleHoverModal(isVisible)),
  updateHoverCords: (x,y) => dispatch(M_A.updateHoverCords(x,y)),
});

export default connect(mapStateToProps,mapDispatchToProps)(GraphContainer);
