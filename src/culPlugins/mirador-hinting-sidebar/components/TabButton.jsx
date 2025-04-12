import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Tooltip from '@mui/material/Tooltip';

/**
 * export the base button components from mirador/src/components/WindowSidebarButtons.js
 */
export const StyledTabButton = styled(Tab, { name: 'WindowSideBarButtons', slot: 'button' })(({ theme }) => ({
  '&.Mui-selected': {
    '.MuiBadge-badge': {
      display: 'none',
    },
    borderRight: '2px solid',
    borderRightColor: theme.palette.primary.main,
  },
  '&.MuiTab-root': {
    '&:active': {
      backgroundColor: theme.palette.action.active,
    },
    '&:focus': {
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
      backgroundColor: theme.palette.action.hover,
      textDecoration: 'none',
      // Reset on touch devices, it doesn't add specificity
    },
    '&:hover': {
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
      backgroundColor: theme.palette.action.hover,
      textDecoration: 'none',
      // Reset on touch devices, it doesn't add specificity
    },
    borderRight: '2px solid transparent',
    minWidth: 'auto',
  },
  fill: 'currentcolor',
}));

/** */
export default function TabButton({ t, value, ...tabProps }) {
  return (
    <Tooltip title={t('openCompanionWindow', { context: value })}>
      <StyledTabButton
        {...tabProps}
        value={value}
        aria-label={
          t('openCompanionWindow', { context: value })
        }
        disableRipple
      />
    </Tooltip>
  );
}

TabButton.propTypes = {
  t: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
