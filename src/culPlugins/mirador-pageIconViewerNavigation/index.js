import {
  getContainerId,
  getSequenceViewingDirection,
  getNextCanvasGrouping,
  getPreviousCanvasGrouping,
} from '../../state/selectors';
import { setNextCanvas, setPreviousCanvas } from '../../state/actions';

import { PageIconViewerNavigation } from './components/PageIconViewerNavigation';

export {
  PageIconViewerNavigation,
};

export default [
  {
    component: PageIconViewerNavigation,
    config: {},
    mapDispatchToProps: (dispatch, { windowId }) => ({
      setNextCanvas: (...args) => dispatch(setNextCanvas(windowId)),
      setPreviousCanvas: (...args) => dispatch(setPreviousCanvas(windowId)),
    }),
    mapStateToProps: (state, { windowId }) => ({
      hasNextCanvas: !!getNextCanvasGrouping(state, { windowId }),
      hasPreviousCanvas: !!getPreviousCanvasGrouping(state, { windowId }),
      viewingDirection: getSequenceViewingDirection(state, { windowId }),
    }),
    mode: 'wrap',
    name: 'PageIconViewerNavigation',
    target: 'ViewerNavigation',
  },
];
