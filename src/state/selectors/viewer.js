import { createSelector } from 'reselect';
import CanvasWorld from '../../lib/CanvasWorld';

import { getVisibleCanvases } from './canvases';
import { getLayersForVisibleCanvases } from './layers';
import { getSequenceViewingDirection } from './sequences';
import { getConfig } from './config';

/**
 *  Instantiate a manifesto instance.
 * @param {object} state
 * @param {string} windowId
 * @return {object}
 */
export const getCurrentCanvasWorld = createSelector(
  [getVisibleCanvases, getLayersForVisibleCanvases, getSequenceViewingDirection, getConfig],
  (canvases, layers, viewingDirection, miradorConfig) => new CanvasWorld(canvases, {
    layers, miradorConfig, viewingDirection,
  }),
);
