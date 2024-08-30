import { Component, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBackSharp';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import { CollectionListHeaders } from './CollectionListHeaders';
import { CollectionListItem } from './CollectionListItem';
import { CollectionDialog } from '../../../components/CollectionDialog';
import { collectionDataEqual, getCollectionData } from '../state/selectors';

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
    fetchManifest,
    getCollection,
    getCollectionManifesto,
    updateWindow,
    windowId,
  } = props;

  const windowCollectionData = useSelector((state) => getCollectionData(state, { windowId }), collectionDataEqual);

  const [collectionData, setCollectionData] = useState({
    collectionId: originalCollectionId,
    collectionPath: windowCollectionData.collectionPath,
    collectionResource: getCollection(originalCollectionId),
    rootManifestId: windowCollectionData.manifestId,
  });

  const { collectionId, collectionPath, collectionResource } = collectionData;

  const collection = collectionResource && getCollectionManifesto(collectionId);

  if (collectionData.rootManifestId !== windowCollectionData.manifestId) {
    // the collection manifest has been changed by another widget
    setCollectionData({
      collectionId: windowCollectionData.manifestId,
      collectionPath: windowCollectionData.collectionPath,
      collectionResource: getCollection(windowCollectionData.manifestId),
      rootManifestId: windowCollectionData.manifestId,
    });
  }

  if (!collection && !collectionResource?.isFetching) {
    setCollectionData({
      ...collectionData,
      collectionResource: fetchManifest(collectionId),
    });
  }
  if (collectionResource?.isFetching && getCollection(collectionId)) {
    setCollectionData({
      ...collectionData,
      collectionResource: getCollection(collectionId),
    });
  }

  /** */
  const backToCollection = ({ collection: newCollection, collectionPath: oldCollectionPath }) => {
    const pathIndex = oldCollectionPath.indexOf(newCollection.id);
    const newCollectionPath = (pathIndex > 0) ? oldCollectionPath.slice(0, pathIndex) : [];
    const update = { ...collectionData, collectionId: newCollection.id, collectionPath: newCollectionPath };
    update.collectionResource = getCollection(newCollection.id);
    if (!update.collectionResource) {
      fetchManifest(newCollection.id);
      update.collectionResource = { ...newCollection, isFetching: true };
    }
    setCollectionData(update);
  };

  /** */
  const setCollection = ({ collection: newCollection, collectionPath: newCollectionPath }) => {
    const update = { ...collectionData, collectionId: newCollection.id, collectionPath: newCollectionPath };
    update.collectionResource = getCollection(newCollection.id);
    if (!update.collectionResource) {
      fetchManifest(newCollection.id);
      update.collectionResource = { ...newCollection, isFetching: true };
    }
    setCollectionData(update);
  };

  const items = collection?.items;

  return (
    <Root
      component="section"
      aria-label="collection navigation section"
      dir="ltr"
      square
      elevation={0}
      id={`${windowId}-collections`}
    >
      <List sx={{ bgcolor: 'background.paper', width: '100%' }}>
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
        <CollectionListHeaders collectionId={collectionId} />

        {
          items && items.map(item => (
            <CollectionListItem
              key={item.id}
              title={CollectionDialog.getUseableLabel(item, 0)}
              manifest={getCollectionManifesto(item.id) || item}
              manifestId={item.id}
              fetchManifest={fetchManifest}
              getCollectionManifesto={getCollectionManifesto}
              collectionPath={[...collectionPath, collection.id]}
              setCollection={setCollection}
              updateWindow={updateWindow}
              windowId={windowId}
              handleClose={() => {}}
            />
          ))
        }
      </List>
    </Root>
  );
};

SelectCollectionFolders.propTypes = {
  windowId: PropTypes.string,
};

SelectCollectionFolders.defaultProps = {
  windowId: null,
};
