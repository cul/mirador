import { createSelector } from 'reselect';

import { getMiradorCanvasWrapper, getMiradorManifestWrapper } from './wrappers';

import { ThumbnailFactory } from '../../lib/ThumbnailFactory';

/**
 *  Instantiate a thumbnail factory.
 * @param {object} state
 * @return {object}
 */
export const getThumbnailFactory = createSelector(
  [(state, iiifOpts) => iiifOpts, getMiradorCanvasWrapper, getMiradorManifestWrapper],
  (iiifOpts, getMiradorCanvas, getMiradorManifest) => new ThumbnailFactory(
    iiifOpts,
    { getMiradorCanvas, getMiradorManifest },
  ),
);
