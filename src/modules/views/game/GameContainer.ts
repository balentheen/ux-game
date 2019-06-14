import { connect } from 'react-redux';

import { IRootState, authState, coreState } from '../../state-mgmt/rootState';
import Game from './Game';

export const mapStateToProps = (state: IRootState) => ({
});

export default connect(mapStateToProps, null)(Game);
