import { createSelector } from 'reselect';

import { getWindow } from '../../../../state/selectors/getters';

export const getCollectionData = createSelector(
  [getWindow],
  window => window && {
    collectionManifestId: window.collectionManifestId,
    collectionPath: window.collectionPath,
    manifestId: window.manifestId,
  },
);
