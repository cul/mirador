import { updateWindow } from '../../state/actions';
import { getContainerId } from '../../state/selectors';
import { getManifestUrl } from '../../state/selectors/manifests';

import { WindowSideBarCitationButton } from './WindowSideBarCitationButton';
import { WindowSideBarCitationPanel } from './WindowSideBarCitationPanel';
import { getPluginConfig } from './state/selectors';

export {
  WindowSideBarCitationButton,
  WindowSideBarCitationPanel,
};

export default [
  {
    component: WindowSideBarCitationButton,
    config: {},
    mapDispatchToProps: (dispatch, { windowId }) => ({
      /** */
      updateConfig(openPanel) {
        return dispatch(updateWindow(windowId, { openPanel }));
      },
    }),
    mapStateToProps: (state, { windowId }) => ({
      config: getPluginConfig(state, { windowId }),
      containerId: getContainerId(state),
    }),
    mode: 'add',
    name: 'WindowSideBarCitationButton',
    target: 'WindowSideBarButtons',
  },
  {
    companionWindowKey: WindowSideBarCitationButton.value,
    component: WindowSideBarCitationPanel,
    config: {},
    mapDispatchToProps: (dispatch, { windowId }) => ({
      /** */
      updateConfig(openPanel) {
        return dispatch(updateWindow(windowId, { openPanel }));
      },
    }),
    mapStateToProps: (state, { windowId }) => ({
      config: getPluginConfig(state, { windowId }),
      containerId: getContainerId(state),
      manifestId: getManifestUrl(state, { windowId }),
    }),
    // see mirador/dist/es/src/extend/pluginMapping.js
    name: 'WindowSideBarCitationPanel',
  },
];
