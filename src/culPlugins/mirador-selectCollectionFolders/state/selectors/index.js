import { createSelector } from 'reselect';

import { getWindow } from '../../../../state/selectors/getters';

/** compare two collection data objects, o (old) and n (new) */
export const collectionDataEqual = (o, n) => {
  if (!o && !n) return true;
  if (!o || !n) return false;
  if (o.collectionManifestId !== n.collectionManifestId) return false;
  if (o.manifestId !== n.manifestId) return false;
  if (o.collectionPath && o.collectionPath.length === n.collectionPath?.length) {
    for (let i = 0; i < o.collectionPath.length; i += 1) {
      if (o.collectionPath[i] !== n.collectionPath[i]) return false;
    }
    return true;
  }
  return false;
};

export const getCollectionData = createSelector(
  [getWindow],
  window => window && {
    collectionManifestId: window.collectionManifestId,
    collectionPath: window.collectionPath,
    manifestId: window.manifestId,
  },
);
