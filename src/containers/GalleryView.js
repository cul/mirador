import { compose } from 'redux';
import { connect } from 'react-redux';
import { withPlugins } from '../extend/withPlugins';
import { GalleryView } from '../components/GalleryView';
import { getCanvases, getConfig, getSequenceViewingDirection } from '../state/selectors';

/**
 * mapStateToProps - to hook up connect
 * @memberof WindowViewer
 * @private
 */
const mapStateToProps = (state, { windowId }) => (
  {
    canvases: getCanvases(state, { windowId }),
    miradorConfig: getConfig(state),
    viewingDirection: getSequenceViewingDirection(state, { windowId }),
  }
);

const enhance = compose(
  connect(mapStateToProps),
  withPlugins('GalleryView'),
  // further HOC go here
);

export default enhance(GalleryView);
