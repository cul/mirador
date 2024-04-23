import { createSelector } from 'reselect';
import { getCanvasesContentTypes, getCanvasSeeAlso } from '../../../state/selectors';
import { getWindow } from '../../../../state/selectors';

const getHasOpenSideBar = createSelector(
  [getWindow],
  (miradorWindow) => miradorWindow?.sideBarOpen,
);

const getHintSideBar = createSelector(
  [getCanvasesContentTypes, getCanvasSeeAlso],
  (contentTypes, canvasSeeAlso) => (((contentTypes?.length || 0) > 1) || ((canvasSeeAlso?.length || 0) > 0)),
);

export { getHasOpenSideBar, getHintSideBar };
