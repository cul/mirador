import { updateWindow } from '../../state/actions';
import {
  getConfig, getContainerId, getWindowConfig,
} from '../../state/selectors';
import {
  getCanvasesContentTypes, getCanvasSeeAlso,
} from '../state/selectors';

import { HintingTopBar } from './components/HintingTopBar';
import { HintingSideBarButtons } from './components/HintingSideBarButtons';
import {
  getHasOpenSideBar, getHintSideBar,
} from './state/selectors';

export {
  HintingTopBar,
  HintingSideBarButtons,
};

export default [
  {
    component: HintingTopBar,
    config: {},
    mapDispatchToProps: (dispatch, { windowId }) => ({
      /** */
      updateConfig(openPanel) {
        return dispatch(updateWindow(windowId, { openPanel }));
      },
    }),
    mapStateToProps: (state, { windowId }) => {
      const windowConfig = getWindowConfig(state, { windowId });
      return {
        allowTopCollectionButton: windowConfig.allowTopCollectionButton,
        canvasContentTypes: getCanvasesContentTypes(state, { windowId }),
        containerId: getContainerId(state),
        hasOpenSideBar: getHasOpenSideBar(state, { windowId }),
        hintSideBar: getHintSideBar(state, { windowId }),
        translations: getConfig(state).translations,
        windowId,
      };
    },
    mode: 'wrap',
    name: 'HintingTopBar',
    target: 'WindowTopBar',
  },
  {
    component: HintingSideBarButtons,
    config: {},
    mapDispatchToProps: (dispatch, { windowId }) => ({
      /** */
      updateConfig(openPanel) {
        return dispatch(updateWindow(windowId, { openPanel }));
      },
    }),
    mapStateToProps: (state, { windowId }) => ({
      canvasContentTypes: getCanvasesContentTypes(state, { windowId }),
      canvasSeeAlso: getCanvasSeeAlso(state, { windowId }),
      containerId: getContainerId(state),
      translations: getConfig(state).translations,
      windowId,
    }),
    mode: 'wrap',
    name: 'HintingSideBarButtons',
    target: 'WindowSideBarButtons',
  },
];
