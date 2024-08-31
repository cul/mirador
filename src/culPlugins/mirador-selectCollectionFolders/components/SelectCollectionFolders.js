import { useContext, useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBackSharp';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import { CollectionAncestorButton } from './CollectionAncestorButton';
import { CollectionListHeaders } from './CollectionListHeaders';
import { CollectionListItem } from './CollectionListItem';
import { IIIFResourceLabel } from '../../../components/IIIFResourceLabel';
import LocaleContext from '../../../contexts/LocaleContext';
import { collectionPathEqual, getCollectionPath } from '../../state/selectors';
import { getLocale, getManifest } from '../../../state/selectors';

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

/** Using IIIFResourceLabel results in mismatched hook invocations */
const getLabel = ({ fallback, locale, resource }) => {
  if (!resource) return fallback;

  const label = resource.getLabel();

  if (!label) return fallback;

  return label.getValue(locale) ?? (fallback || resource.id);
};

/** SelectCollections slot that displays navigable icons of folders and thumbnails */
export const SelectCollectionFolders = ({
  collectionId,
  fetchManifest,
  getCollectionManifesto,
  updateWindow,
  windowId = null,
}) => {
  const { t } = useTranslation();

  const collectionPath = useSelector((state) => getCollectionPath(state, { windowId }), collectionPathEqual);

  const collectionResource = useSelector((state) => getManifest(state, { manifestId: collectionId }), shallowEqual);

  const collection = collectionResource && getCollectionManifesto(collectionId);

  const contextLocale = useContext(LocaleContext);
  const fallbackLocale = useSelector(state => getLocale(state, {}));
  const locale = (contextLocale || fallbackLocale || '');

  useEffect(() => {
    if (!collection && !collectionResource?.isFetching) {
      fetchManifest(collectionId);
    }
  }, [collection, collectionId, collectionResource, fetchManifest]);

  /** */
  const backToCollection = ({ collection: newCollection, collectionPath: oldCollectionPath }) => {
    const pathIndex = oldCollectionPath.indexOf(newCollection.id);
    const newCollectionPath = (pathIndex > 0) ? oldCollectionPath.slice(0, pathIndex) : [];
    const update = { collectionPath: newCollectionPath, manifestId: newCollection.id };
    updateWindow(windowId, update);
  };

  /** */
  const setCollection = ({ collection: newCollection, collectionPath: newCollectionPath }) => {
    const update = { collectionPath: newCollectionPath, manifestId: newCollection.id };
    updateWindow(windowId, update);
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
          collectionPath?.map((ancestorId, ix) => (
            <CollectionAncestorButton
              key={ancestorId}
              backToCollection={backToCollection}
              collectionId={ancestorId}
              collectionPath={collectionPath}
              getCollectionManifesto={getCollectionManifesto}
              getLabel={getLabel}
              locale={locale}
            />
          ))
        }
        <CollectionListHeaders collectionId={collectionId} />

        {
          items && items.map((item, ix) => (
            <CollectionListItem
              key={item.id}
              title={getLabel({ fallback: (ix + 1).toString(), locale, resource: item })}
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
  collectionId: PropTypes.string.isRequired,
  fetchManifest: PropTypes.func.isRequired,
  getCollectionManifesto: PropTypes.func.isRequired,
  updateWindow: PropTypes.func.isRequired,
  windowId: PropTypes.string,
};
