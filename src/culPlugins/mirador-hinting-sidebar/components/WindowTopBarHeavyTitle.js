import { Component } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import ErrorIcon from '@mui/icons-material/ErrorOutlineSharp';
import { getManifestStatus, getManifestTitle, getWindowConfig } from '../../../state/selectors';

const StyledTitleTypography = styled(TitleTypography)(({ theme }) => ({
  ...theme.typography.h6,
  flexGrow: 1,
  fontWeight: 'bold',
  paddingLeft: theme.spacing(0.5),
}));

const StyledTitle = styled('div')(({ theme }) => ({
  ...theme.typography.h6,
  flexGrow: 1,
  paddingLeft: theme.spacing(0.5),
}));
/** */
function TitleTypography({ children, ...props }) {
  return (
    <Typography variant="h2" noWrap color="inherit" {...props}>
      {children}
    </Typography>
  );
}

TitleTypography.propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * WindowTopBarHeavyTitle
 */
export const WindowTopBarHeavyTitle = ({ windowId }) => {
  const error = useSelector((state) => getManifestStatus(state, { windowId }).error, shallowEqual);
  const hideWindowTitle = useSelector((state) => getWindowConfig(state, { windowId }).hideWindowTitle, shallowEqual);
  const isFetching = useSelector((state) => getManifestStatus(state, { windowId }).isFetching, shallowEqual);
  const manifestTitle = useSelector((state) => getManifestTitle(state, { windowId }), shallowEqual);

  let title = null;
  if (isFetching) {
    title = (<StyledTitle />);
  } else if (error) {
    title = (
      <>
        <ErrorIcon color="error" />
        <StyledTitleTypography color="textSecondary">
          {error}
        </StyledTitleTypography>
      </>
    );
  } else if (hideWindowTitle) {
    title = (<StyledTitle />);
  } else {
    title = (
      <StyledTitleTypography>
        {manifestTitle || ''}
      </StyledTitleTypography>
    );
  }
  return title;
};

WindowTopBarHeavyTitle.propTypes = {
  windowId: PropTypes.string,
};
