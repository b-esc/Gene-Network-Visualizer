import { connect } from 'react-redux';
import * as A from "../redux/actions/queryActions.js";
import QueryBar from '../components/QueryBar.jsx';
import {fetchGenes} from "../redux/selectors.js";

const mapStateToProps = state => ({
  nhoodStatus : (state.is_nhood) ? "Yes" : "No"
});

const mapDispatchToProps = dispatch => ({
  updateSearch: text => dispatch(A.updateSearch(text)),
  updateSearchType: type => dispatch(A.updateSearchType(type)),
  updateMaxRes: max => dispatch(A.updateMaxRes(max)),
  toggleNhood: nhood => dispatch(A.toggleNhood(nhood)),
  fetchGenes: fetchGenes
});

export default connect(mapStateToProps,mapDispatchToProps)(QueryBar);
