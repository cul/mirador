import { connect } from 'react-redux';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { withPlugins } from '../extend/withPlugins';
import { NativeObjectViewer } from '../components/NativeObjectViewer';
import * as actions from '../state/actions';
import { getConfig, getCurrentCanvas, getFullScreenEnabled, getVisibleCanvasTextResources, getWindow } from '../state/selectors';

/** */
const mapStateToProps = (state, { windowId }) => {
  const currentCanvas = getCurrentCanvas(state, { windowId });
  const hold = `#${windowId} .mirador-primary-window`;
  return {
    nativeObjectOptions: getConfig(state).nativeObjectOptions,
    nativeObjectResources: getVisibleCanvasTextResources(state, { windowId }) || [],
    windowId,
  }
};

const enhance = compose(
  withTranslation(),
  connect(mapStateToProps, null),
  withPlugins('NativeObjectViewer'),
);

export default enhance(NativeObjectViewer);
