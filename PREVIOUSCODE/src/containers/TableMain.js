import { connect } from 'react-redux';
import * as M_A from '../redux/actions/modalActions.js';
// The graph container is a component as it nests
// a controller for reactd3graph
import TableContainer from "../components/TableContainer.jsx";
import GraphContainer from '../components/GraphContainer.jsx';
import {fetchPreview} from '../redux/selectors.js';

const mapStateToProps = state => ({
  tableGenes: state.genes,
  isPreview: false,
  rowsPerPage: 8,
  tableGenes: state.infoPreview,
  isPreview: true,
  rowsPerPage: 4
});

const mapDispatchToProps = dispatch =>({
  fetchPreview: fetchPreview
});

export default connect(mapStateToProps,mapDispatchToProps)(TableContainer);
