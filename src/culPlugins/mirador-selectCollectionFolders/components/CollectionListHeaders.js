import { Component } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ns from '../../../config/css-ns';

const Root = styled(ListItem, { name: 'CollectionListHeaders', slot: 'root' })(({ ownerState, theme }) => ({
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

/**
 * Represents an item in a list of currently-loaded or loading manifests
 * @param {object} props
 * @param {object} [props.manifest = string]
 */

/** */
export const CollectionListHeaders = ({ collectionId }) => (
  <Root
    divider
    data-manifestid={collectionId}
  >
    <Grid container className={ns('collection-list-item')} spacing={2}>
      <Grid item xs={12} sm={6}>
        <Grid
          container
          spacing={2}
          sx={{
            textAlign: 'left',
            textTransform: 'initial',
          }}
          component="span"
        >
          <Grid item xs={4} sm={3} component="span" />
          <Grid item xs={8} sm={9} component="span">
            <Typography component="span" variant="h6" fontWeight="bold">Name</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={8} sm={4}>
        <Typography component="span" variant="h6" fontWeight="bold">Number of Items</Typography>
      </Grid>

      <Grid item xs={4} sm={2} />
    </Grid>
  </Root>
);

CollectionListHeaders.propTypes = {
  collectionId: PropTypes.string.isRequired,
};
