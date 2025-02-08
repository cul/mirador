import { createSelector } from 'reselect';
import { getCanvasResourceTypes, getImageServiceProfiles } from './config';
import MiradorCanvas from '../../lib/MiradorCanvas';
import MiradorManifest from '../../lib/MiradorManifest';

/** */
export const getMiradorCanvas = (state, canvas) => {
  const resourceTypes = getCanvasResourceTypes(state);
  const imageServiceProfiles = getImageServiceProfiles(state);
  return new MiradorCanvas(canvas, resourceTypes, imageServiceProfiles);
};

/** */
export const getMiradorCanvasWrapper = createSelector(
  [getCanvasResourceTypes, getImageServiceProfiles],
  (resourceTypes, imageServiceProfiles) => ((canvas) => new MiradorCanvas(canvas, resourceTypes, imageServiceProfiles)),
);

/** */
export const getMiradorManifestWrapper = createSelector(
  [getCanvasResourceTypes],
  (resourceTypes) => ((manifest) => new MiradorManifest(manifest, resourceTypes)),
);
