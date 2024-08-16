import { Component } from 'react';
import PropTypes from 'prop-types';
import Folder from '@mui/icons-material/Folder';
import { styled } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import ButtonBase from '@mui/material/ButtonBase';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { Img } from 'react-image';
import ManifestListItemError from '../../../containers/ManifestListItemError';
import ns from '../../../config/css-ns';
import getBestThumbnail from '../../../lib/ThumbnailFactory';

const Root = styled(ListItem, { name: 'CollectionListItem', slot: 'root' })(({ ownerState, theme }) => ({
  '&:hover,&:focus-within': {
    backgroundColor: theme.palette.action.hover,
    borderLeftColor: ownerState?.active ? theme.palette.primary.main : theme.palette.action.hover,
  },
  borderLeft: '4px solid',
  borderLeftColor: ownerState?.active ? theme.palette.primary.main : 'transparent',
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
}));

const StyledThumbnail = styled(Img, { name: 'CollectionListItem', slot: 'thumbnail' })(({ theme }) => ({
  maxWidth: '100%',
  objectFit: 'contain',
}));

const StyledLogo = styled(Img, { name: 'CollectionListItem', slot: 'logo' })(({ theme }) => ({
  height: '2.5rem',
  maxWidth: '100%',
  objectFit: 'contain',
  paddingRight: 1,
}));

/**
 * Represents an item in a list of currently-loaded or loading manifests
 * @param {object} props
 * @param {object} [props.manifest = string]
 */

/** */
export const CollectionListItem = (props) => {
  const {
    active,
    buttonRef,
    handleClose,
    manifest,
    manifestId,
    title,
    manifestLogo,
    t,
    error,
    isCollection,
    isMultipart,
    updateWindow,
    windowId,
  } = props;

  /**
   * Handling open button click
   */
  const handleCollectionClick = () => {
    const {
      collectionPath, setCollection,
    } = props;

    setCollection({ collection: manifest, collectionPath });
    handleClose();
  };

  /** */
  const handleManifestClick = () => {
    const {
      collectionPath,
    } = props;
    updateWindow(windowId, { collectionPath, manifestId });
    handleClose();
  };

  const placeholder = (
    <Grid container className={ns('manifest-list-item')} spacing={2}>
      <Grid item xs={3} sm={2}>
        <Skeleton sx={{ bgcolor: 'grey[300]' }} variant="rectangular" height={80} width={120} />
      </Grid>
      <Grid item xs={9} sm={6}>
        <Skeleton sx={{ bgcolor: 'grey[300]' }} variant="text" />
      </Grid>
      <Grid item xs={8} sm={2}>
        <Skeleton sx={{ bgcolor: 'grey[300]' }} variant="text" />
        <Skeleton sx={{ bgcolor: 'grey[300]' }} variant="text" />
      </Grid>
      <Grid item xs={4} sm={2}>
        <Skeleton sx={{ bgcolor: 'grey[300]' }} variant="rectangular" height={60} width={60} />
      </Grid>
    </Grid>
  );

  const unloader = (
    <Skeleton
      variant="rectangular"
      animation={false}
      sx={{ bgcolor: 'grey[300]' }}
      height={80}
      width={120}
    />
  );

  /** */
  const thumbnailFor = (manifestoResource) => {
    if (manifestoResource.isCollection()) {
      return (
        <Folder fontSize="large" color="primary" />
      );
    }
    const { url: thumbnail } = getBestThumbnail(manifestoResource);
    return thumbnail ? (
      <StyledThumbnail
        className={[ns('manifest-list-item-thumb')]}
        src={thumbnail}
        alt=""
        height="80"
        unloader={unloader}
      />
    ) : unloader;
  };

  if (error) {
    return (
      <Root
        ownerState={props}
        divider
        selected={active}
        className={active ? 'active' : ''}
        data-manifestid={manifestId}
      >
        <ManifestListItemError manifestId={manifestId} />
      </Root>
    );
  }

  return (
    <Root
      divider
      data-manifestid={manifest?.id}
    >
      {manifest ? (
        <Grid container className={ns('manifest-list-item')} spacing={2}>
          <Grid item xs={12} sm={6}>
            <ButtonBase
              ref={buttonRef}
              className={ns('manifest-list-item-title')}
              style={{ width: '100%' }}
              onClick={manifest.isCollection() ? handleCollectionClick : handleManifestClick}
            >
              <Grid
                container
                spacing={2}
                sx={{
                  textAlign: 'left',
                  textTransform: 'initial',
                }}
                component="span"
              >
                <Grid item xs={4} sm={3} component="span">
                  { thumbnailFor(manifest) }
                </Grid>
                <Grid item xs={8} sm={9} component="span">
                  { isCollection && (
                    <Typography component="div" variant="overline">
                      { t(isMultipart ? 'multipartCollection' : 'collection') }
                    </Typography>
                  )}
                  <Typography component="span" variant="h6">
                    {title || manifestId}
                  </Typography>
                </Grid>
              </Grid>
            </ButtonBase>
          </Grid>
          <Grid item xs={8} sm={4}>
            <Typography>{manifest.items?.at(0) ? `${manifest.items.length} Items` : ''}</Typography>
          </Grid>

          <Grid item xs={4} sm={2}>
            { manifestLogo
              && (
              <StyledLogo
                src={[manifestLogo]}
                alt=""
                role="presentation"
                unloader={(
                  <Skeleton
                    variant="rectangular"
                    animation={false}
                    sx={{ bgcolor: 'grey[300]' }}
                    height={60}
                    width={60}
                  />
                )}
              />
              )}
          </Grid>
        </Grid>
      ) : (
        placeholder
      )}
    </Root>
  );
};

CollectionListItem.propTypes = {
  active: PropTypes.bool,
  buttonRef: PropTypes.elementType,
  error: PropTypes.string,
  handleClose: PropTypes.func,
  isCollection: PropTypes.bool,
  isMultipart: PropTypes.bool,
  manifestId: PropTypes.string.isRequired,
  manifestLogo: PropTypes.string,
  t: PropTypes.func,
  title: PropTypes.string,
  updateWindow: PropTypes.func.isRequired,
};

CollectionListItem.defaultProps = {
  active: false,
  buttonRef: undefined,
  error: null,
  handleClose: () => {},
  isCollection: false,
  isMultipart: false,
  manifestLogo: null,
  t: key => key,
  title: null,
};
