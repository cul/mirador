import { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ViewListIcon from '@mui/icons-material/ViewListSharp';
import CollapsibleSection from '../../../containers/CollapsibleSection';

/**
 * CollectionFolderInfo
 */
export const CollectionFolderInfo = (props) => {
  const {
    collectionLabel,
    collectionPath,
    id,
    t,
    updateWindow,
    windowId,
  } = props;

  /** */
  const showCollectionFolder = () => {
    const update = {
      collectionPath: collectionPath.slice(0, collectionPath.length - 1),
      manifestId: collectionPath[collectionPath.length - 1],
    };
    updateWindow(windowId, update);
  };

  if (collectionPath.length === 0) return null;

  return (
    <CollapsibleSection
      id={`${id}-collection`}
      label={t('collection')}
    >
      {collectionLabel && (
        <Typography
          aria-labelledby={`${id}-resource ${id}-resource-heading`}
          id={`${id}-resource-heading`}
          variant="h4"
        >
          {collectionLabel}
        </Typography>
      )}

      <Button
        color="primary"
        onClick={showCollectionFolder}
        startIcon={<ViewListIcon />}
      >
        {t('showCollection')}
      </Button>
    </CollapsibleSection>
  );
};

CollectionFolderInfo.propTypes = {
  collectionLabel: PropTypes.string,
  collectionPath: PropTypes.arrayOf(PropTypes.string),
  id: PropTypes.string.isRequired,
  t: PropTypes.func,
  updateWindow: PropTypes.func.isRequired,
  windowId: PropTypes.string,
};

CollectionFolderInfo.defaultProps = {
  collectionLabel: null,
  collectionPath: [],
  t: key => key,
  windowId: null,
};
