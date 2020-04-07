import { connect } from 'react-redux';
import * as M_A from '../redux/actions/modalActions';
import MoreInfoModal from '../components/MoreInfoModal.jsx';
import {fetchPreview} from "../redux/selectors";

const mapStateToProps = state => ({
  selectedGene: (state.selectedGene) ? state.selectedGene : null,
  infoPreview: (state.infoPreview) ? state.infoPreview : [],
  infoVisible: state.infoVisible
});

const mapDispatchToProps = dispatch => ({
  updateModalUid: uid => dispatch(M_A.updateModalUid(uid)),
  toggleInfoModal: isVisible => dispatch(M_A.toggleInfoModal(isVisible)),
  fetchPreview: fetchPreview
});

export default connect(mapStateToProps,mapDispatchToProps)(MoreInfoModal);
