import { connect } from 'react-redux';
import * as M_A from '../redux/actions/modalActions';
import NodeHoverModal from '../components/NodeHoverModal';
import {fetchPreview} from "../redux/selectors";

const mapStateToProps = state => ({
  hoveredDisplayName : (state.selectedGene) ? state.selectedGene.gene_display_name : "hoveredDisplayName",
  hoverVisible: state.hoverVisible,
  xPos : state.xPos,
  yPos : state.yPos
});

const mapDispatchToProps = dispatch => ({
  updateModalUid: uid => dispatch(M_A.updateModalUid(uid)),
  toggleInfoModal: isVisible => dispatch(M_A.toggleInfoModal(isVisible)),
  toggleHoverModal: isVisible => dispatch(M_A.toggleHoverModal(isVisible)),
  updateHoverCords: (newX,newY) => dispatch(M_A.updateHoverCords(newX,newY)),
  fetchPreview: fetchPreview
});

export default connect(mapStateToProps,mapDispatchToProps)(NodeHoverModal);
