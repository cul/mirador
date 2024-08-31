import {
  getManifest,
  getManifestoInstance,
  getWindow,
  getManifests,
  getManifestTitle,
} from '../../state/selectors';
import { updateWindow, fetchManifest } from '../../state/actions';

import { CollectionFolderDialog } from './components/CollectionFolderDialog';
import { CollectionFolderInfo } from './components/CollectionFolderInfo';
import { SelectCollectionFolders } from './components/SelectCollectionFolders';

export {
  SelectCollectionFolders,
};

export default [
  {
    component: SelectCollectionFolders,
    config: {},
    mapDispatchToProps: (dispatch, { canvas, id, windowId }) => ({
      fetchManifest: (...args) => dispatch(fetchManifest(...args)),
      requestItemAnnotations: () => [],
      updateWindow: (...args) => dispatch(updateWindow(...args)),
    }),
    /** */
    mapStateToProps: (state, { windowId, provider }) => {
      const { collectionPath, collectionManifestId, manifestId } = getWindow(state, { windowId });
      /** */
      const getCollection = (collectionId) => collectionId
        && getManifest(state, { manifestId: collectionId, windowId });
      /** */
      const getCollectionManifesto = (collectionId) => collectionId
        && getManifestoInstance(state, { manifestId: collectionId });

      return {
        collectionId: manifestId || collectionManifestId,
        collectionPath,
        getCollection,
        getCollectionManifesto,
        getManifests,
        windowId,
      };
    },
    mode: 'wrap',
    name: 'SelectCollectionFolders',
    target: 'SelectCollection',
  },
  {
    component: CollectionFolderInfo,
    config: {},
    mapDispatchToProps: (dispatch, { canvas, id, windowId }) => ({
      updateWindow: (...args) => dispatch(updateWindow(...args)),
    }),
    mapStateToProps: (state, { id, windowId }) => {
      const { collectionPath, manifestId } = (getWindow(state, { windowId }) || {});
      const collectionId = collectionPath[collectionPath.length - 1];

      return {
        collectionLabel: getManifestTitle(state, { manifestId: collectionId }),
        collectionPath,
        id: collectionId,
        manifestId,
        windowId,
      };
    },
    mode: 'wrap',
    name: 'CollectionFolderInfo',
    target: 'CollectionInfo',
  },
  {
    component: CollectionFolderDialog,
    config: {},
    mapDispatchToProps: (dispatch, { canvas, id, windowId }) => ({}),
    mapStateToProps: (state, { id, windowId }) => ({}),
    mode: 'wrap',
    name: 'CollectionFolderDialog',
    target: 'CollectionDialog',
  },
];
