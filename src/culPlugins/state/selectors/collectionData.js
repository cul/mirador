import { createSelector } from 'reselect';
import { getWindow } from '../../../state/selectors';

export const getCollectionPath = createSelector(
  [getWindow],
  window => window && window.collectionPath,
);
