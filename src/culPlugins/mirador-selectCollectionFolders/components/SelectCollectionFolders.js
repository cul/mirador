import { Component, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import ArrowBackIcon from '@mui/icons-material/ArrowBackSharp';
import { CollectionListItem } from './CollectionListItem';
import { CollectionDialog } from '../../../components/CollectionDialog';
import { getCollectionData } from '../state/selectors';

const Root = styled(Paper, { name: 'GalleryView', slot: 'root' })(({ theme }) => ({
  alignItems: 'flex-start',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  overflowX: 'hidden',
  overflowY: 'scroll',
  padding: '50px 0 50px 20px',
  width: '100%',
}));

/** SelectCollections slot that displays navigable icons of folders and thumbnails */
export const SelectCollectionFolders = (props) => {
  const {
    collectionId: originalCollectionId,
    fetchCollection,
    getCollection,
    getCollectionManifesto,
    getManifests,
    updateWindow,
    windowId,
  } = props;

  const windowManifests = useSelector((state) => getManifests(state));
  const windowCollectionData = useSelector((state) => getCollectionData(state, { windowId }));

  /** */
  const cachedManifest = (manifestId) => windowManifests[manifestId] && windowManifests[manifestId].json;

  const [collectionData, setCollectionData] = useState({
    collectionId: originalCollectionId,
    collectionPath: windowCollectionData.collectionPath,
    collectionResource: (cachedManifest(originalCollectionId) || getCollection(originalCollectionId)),
    rootManifestId: windowCollectionData.manifestId,
  });

  const { collectionId, collectionPath, collectionResource } = collectionData;

  const collection = collectionResource && getCollectionManifesto(collectionId);

  if (collectionData.rootManifestId !== windowCollectionData.manifestId) {
    // the collection manifest has been changed by another widget
    setCollectionData({
      collectionId: windowCollectionData.manifestId,
      collectionPath: windowCollectionData.collectionPath,
      collectionResource: (cachedManifest(windowCollectionData.manifestId)
        || getCollection(windowCollectionData.manifestId)),
      rootManifestId: windowCollectionData.manifestId,
    });
  }

  if (!collection && !collectionResource?.isFetching) {
    setCollectionData({
      ...collectionData,
      collectionResource: fetchCollection(collectionId),
    });
  }
  if (collectionResource?.isFetching && cachedManifest(collectionId)) {
    setCollectionData({
      ...collectionData,
      collectionResource: cachedManifest(collectionId),
    });
  }

  /** */
  const backToCollection = ({ collection: newCollection, collectionPath: oldCollectionPath }) => {
    const pathIndex = oldCollectionPath.indexOf(newCollection.id);
    const newCollectionPath = (pathIndex > 0) ? oldCollectionPath.slice(0, pathIndex) : [];
    const update = { ...collectionData, collectionId: newCollection.id, collectionPath: newCollectionPath };
    update.collectionResource = cachedManifest(newCollection.id);
    if (!update.collectionResource) {
      fetchCollection(newCollection.id);
      update.collectionResource = { ...newCollection, isFetching: true };
    }
    setCollectionData(update);
  };

  /** */
  const setCollection = ({ collection: newCollection, collectionPath: newCollectionPath }) => {
    const update = { ...collectionData, collectionId: newCollection.id, collectionPath: newCollectionPath };
    update.collectionResource = cachedManifest(newCollection.id);
    if (!update.collectionResource) {
      fetchCollection(newCollection.id);
      update.collectionResource = { ...newCollection, isFetching: true };
    }
    setCollectionData(update);
  };

  const items = collection?.items;

  return (
    <Root
      component="section"
      aria-label="gallery section"
      dir="ltr"
      square
      elevation={0}
      id={`${windowId}-gallery`}
    >
      {
        collectionPath?.map(ancestor => (
          <Button
            key={ancestor}
            startIcon={<ArrowBackIcon />}
            onClick={() => backToCollection({ collection: getCollectionManifesto(ancestor), collectionPath })}
          >
            {CollectionDialog.getUseableLabel(getCollectionManifesto(ancestor), 0)}
          </Button>
        ))
      }
      {
        items && items.map(item => (
          <CollectionListItem
            key={item.id}
            title={CollectionDialog.getUseableLabel(item, 0)}
            manifest={getCollectionManifesto(item.id) || item}
            manifestId={item.id}
            collectionPath={[...collectionPath, collection.id]}
            setCollection={setCollection}
            updateWindow={updateWindow}
            windowId={windowId}
            handleClose={() => {}}
          />
        ))
      }
    </Root>
  );
};

SelectCollectionFolders.propTypes = {
  windowId: PropTypes.string,
};

SelectCollectionFolders.defaultProps = {
  windowId: null,
};
