import { updateWindow } from '../../state/actions';
import { getContainerId } from '../../state/selectors';
import { getManifestUrl } from '../../state/selectors/manifests';

import MiradorViewXmlPlugin from './MiradorViewXmlPlugin';
import MiradorViewXmlDialog from './MiradorViewXmlDialog';
import { getManifestSeeAlso, getPluginConfig } from './state/selectors';

export {
  MiradorViewXmlPlugin,
  MiradorViewXmlDialog,
};

export default [
  {
    component: MiradorViewXmlPlugin,
    config: {},
    mapDispatchToProps: (dispatch, { windowId }) => ({
      /** */
      updateConfig(viewXmlDialog) {
        return dispatch(updateWindow(windowId, { viewXmlDialog }));
      },
    }),
    mapStateToProps: (state, { windowId }) => ({
      config: getPluginConfig(state, { windowId }),
      containerId: getContainerId(state),
    }),
    mode: 'add',
    name: 'MiradorViewXmlPlugin',
    target: 'WindowTopBarPluginArea',
  },
  {
    component: MiradorViewXmlDialog,
    config: {},
    mapDispatchToProps: (dispatch, { windowId }) => ({
      /** */
      updateConfig(viewXmlDialog) {
        return dispatch(updateWindow(windowId, { viewXmlDialog }));
      },
    }),
    mapStateToProps: (state, { windowId }) => ({
      config: getPluginConfig(state, { windowId }),
      containerId: getContainerId(state),
      manifestId: getManifestUrl(state, { windowId }),
      seeAlso: getManifestSeeAlso(state, { windowId }),
    }),
    mode: 'add',
    name: 'MiradorViewXmlDialog',
    target: 'Window',
  },
];
