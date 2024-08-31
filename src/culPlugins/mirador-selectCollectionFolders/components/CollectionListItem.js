import { Component, useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Folder from '@mui/icons-material/Folder';
import { styled } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import ButtonBase from '@mui/material/ButtonBase';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { Img } from 'react-image';
import { getManifest } from '../../../state/selectors';
import { IIIFResourceLabel } from '../../../components/IIIFResourceLabel';
import IIIFThumbnail from '../../../containers/IIIFThumbnail';
import ManifestListItemError from '../../../containers/ManifestListItemError';
import ns from '../../../config/css-ns';
import getBestThumbnail from '../../../lib/ThumbnailFactory';

const Root = styled(ListItem, { name: 'CollectionListItem', slot: 'root' })(({ ownerState, theme }) => ({
  '&:hover,&:focus-within': {
    backgroundColor: theme.palette.action.hover,
    borderLeftColor: theme.palette.action.hover,
  },
  borderLeft: '4px solid',
  borderLeftColor: 'transparent',
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
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
export function CollectionListItem({
  buttonRef = undefined,
  handleClose = () => {},
  manifestId,
  title = null,
  manifestLogo = null,
  t = key => key,
  fetchManifest,
  getCollectionManifesto,
  isCollection = false,
  isMultipart = false,
  updateWindow,
  windowId,
}) {
  const ownerState = arguments[0]; // eslint-disable-line prefer-rest-params
  const manifest = useSelector((state) => manifestId && getManifest(state, { manifestId, windowId }), shallowEqual);

  useEffect(() => {
    const { error, isFetching } = (manifest || {});
    const ready = manifest && !!manifest.json;
    if (!ready && !error && !isFetching) {
      fetchManifest(manifestId);
    }
  }, [fetchManifest, manifest, manifestId]);

  const manifesto = getCollectionManifesto(manifestId);
  /**
   * Handling open button click
   */
  const handleCollectionClick = () => {
    const {
      collectionPath, setCollection,
    } = ownerState;
    setCollection({ collection: manifest, collectionPath });
    handleClose();
  };

  /** */
  const handleManifestClick = () => {
    const {
      collectionPath,
    } = ownerState;
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
    if (!manifestoResource) return unloader;

    if (manifestoResource.isCollection()) {
      return (
        <Folder fontSize="large" color="primary" />
      );
    }
    const { url: thumbnail } = getBestThumbnail(manifestoResource);

    return (manifestoResource && thumbnail) ? (
      <IIIFThumbnail
        resource={manifestoResource}
        alt=""
        style={{
          maxWidth: '100%',
          objectFit: 'contain',
        }}
        variant="inside"
      />
    ) : unloader;
  };

  if (!manifesto) {
    return (
      <Root
        ownerState={ownerState}
        divider
        data-manifestid={manifestId}
      >
        {placeholder}
      </Root>
    );
  }
  if (manifest.error) {
    return (
      <Root
        ownerState={ownerState}
        divider
        data-manifestid={manifestId}
      >
        <ManifestListItemError manifestId={manifestId} />
      </Root>
    );
  }

  const numItems = (manifesto && manifesto.isCollection() && manifesto.items)?.length;
  return (
    <Root
      divider
      data-manifestid={manifest?.id}
    >
      <Grid container className={ns('manifest-list-item')} spacing={2}>
        <Grid item xs={12} sm={6}>
          <ButtonBase
            ref={buttonRef}
            className={ns('manifest-list-item-title')}
            style={{ width: '100%' }}
            onClick={manifesto.isCollection() ? handleCollectionClick : handleManifestClick}
          >
            <Grid
              container
              spacing={2}
              sx={{
                textAlign: 'left',
                textTransform: 'initial',
              }}
              component="span"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={4} sm={3} component="span">
                { thumbnailFor(manifesto) }
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
        <Grid item xs={8} sm={4} display="flex" justifyContent="left" alignItems="center">
          <Typography>{numItems ? `${numItems} Items` : ''}</Typography>
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
    </Root>
  );
}

CollectionListItem.propTypes = {
  buttonRef: PropTypes.elementType,
  fetchManifest: PropTypes.func.isRequired,
  getCollectionManifesto: PropTypes.func.isRequired,
  handleClose: PropTypes.func,
  isCollection: PropTypes.bool,
  isMultipart: PropTypes.bool,
  manifestId: PropTypes.string.isRequired,
  manifestLogo: PropTypes.string,
  t: PropTypes.func,
  title: PropTypes.string,
  updateWindow: PropTypes.func.isRequired,
  windowId: PropTypes.string.isRequired,
};
