import { createSelector } from 'reselect';
import { getCanvasResourceTypes, getImageServiceProfiles } from './config';
import MiradorCanvas from '../../lib/MiradorCanvas';
import MiradorManifest from '../../lib/MiradorManifest';

/** */
export const getMiradorCanvas = (state, canvas) => {
  const resourceTypes = getCanvasResourceTypes(state);
  const imageServiceProfiles = getImageServiceProfiles(state);
  return canvas && new MiradorCanvas(canvas, resourceTypes, imageServiceProfiles);
};

/** */
export const getMiradorCanvasWrapper = createSelector(
  [getCanvasResourceTypes, getImageServiceProfiles],
  (canvasTypes, imageProfiles) => ((canvas) => canvas && new MiradorCanvas(canvas, canvasTypes, imageProfiles)),
);

/** */
export const getMiradorManifestWrapper = createSelector(
  [getCanvasResourceTypes],
  (resourceTypes) => ((manifest) => manifest && new MiradorManifest(manifest, resourceTypes)),
);
