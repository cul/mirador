import { createSelector } from 'reselect';
import { getWindow } from '../../../state/selectors';

/** compare two collection path objects, o (old) and n (new) */
export const collectionPathEqual = (o, n) => {
  if (!o && !n) return true;
  if (!o || !n) return false;
  if (o && o.length === n?.length) {
    for (let i = 0; i < o.length; i += 1) {
      if (o[i] !== n[i]) return false;
    }
    return true;
  }
  return false;
};

export const getCollectionPath = createSelector(
  [getWindow],
  window => window && window.collectionPath,
);
