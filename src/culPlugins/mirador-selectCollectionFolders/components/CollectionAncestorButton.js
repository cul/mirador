import { useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ArrowBackIcon from '@mui/icons-material/ArrowBackSharp';
import Button from '@mui/material/Button';
import { getManifest } from '../../../state/selectors';

/** */
export const CollectionAncestorButton = ({
  backToCollection,
  collectionId,
  collectionPath,
  fetchManifest,
  getCollectionManifesto,
  getLabel,
  locale,
  windowId = null,
}) => {
  const { t } = useTranslation();

  const collectionResource = useSelector((state) => getManifest(state, { manifestId: collectionId }), shallowEqual);

  const collection = collectionResource && getCollectionManifesto(collectionId);

  useEffect(() => {
    if (!collection && !collectionResource?.isFetching) {
      fetchManifest(collectionId);
    }
  }, [collection, collectionId, collectionResource, fetchManifest]);

  const fallbackLabel = collectionId.split('/').pop();
  return (
    <Button
      startIcon={<ArrowBackIcon />}
      onClick={() => backToCollection({ collection, collectionPath })}
    >
      {getLabel({ fallback: fallbackLabel, locale, resource: collection })}
    </Button>
  );
};
