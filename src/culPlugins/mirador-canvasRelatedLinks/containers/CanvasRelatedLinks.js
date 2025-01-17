import { compose } from 'redux';
import { connect } from 'react-redux';
import { withPlugins } from '../../../extend/withPlugins';
import {
  getCanvasRelated,
  getCanvasRenderings,
  getCanvasSeeAlso,
} from '../state/selectors';
import { CanvasRelatedLinks } from '../components/CanvasRelatedLinks';

/**
 * mapStateToProps - to hook up connect
 * @memberof CanvasInfo
 * @private
 */
const mapStateToProps = (state, { id, windowId }) => ({
  id,
  related: getCanvasRelated(state, { windowId }),
  renderings: getCanvasRenderings(state, { windowId }),
  seeAlso: getCanvasSeeAlso(state, { windowId }),
});

const enhance = compose(
  connect(mapStateToProps),
  withPlugins('CanvasRelatedLinks'),
);

export default enhance(CanvasRelatedLinks);
