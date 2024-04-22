import { updateWindow } from '../../state/actions';
import {
  getConfig, getContainerId, getManifestLocale, getManifestTitle, getManifestUrl,
} from '../../state/selectors';
import { getManifestDoi } from '../state/selectors';

import { WindowSideBarCitationButton } from './WindowSideBarCitationButton';
import { WindowSideBarCitationPanel } from './WindowSideBarCitationPanel';
import { getManifestProviderNames, getPluginConfig } from './state/selectors';

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
      translations: getConfig(state).translations,
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
      citationData: ((config) => Object.getOwnPropertyNames(config.dataSelectors).reduce((acc, key) => {
        acc[key] = config.dataSelectors[key](state, { windowId });
        return acc;
      }, {}))(getPluginConfig(state, { windowId })),
      config: getPluginConfig(state, { windowId }),
      containerId: getContainerId(state),
      manifestDoi: getManifestDoi(state, { windowId }),
      manifestId: getManifestUrl(state, { windowId }),
      manifestLocale: getManifestLocale(state, { windowId }),
      manifestProviderNames: getManifestProviderNames(state, { windowId }),
      manifestTitle: getManifestTitle(state, { windowId }),
    }),
    // see mirador/dist/es/src/extend/pluginMapping.js
    name: 'WindowSideBarCitationPanel',
  },
];
