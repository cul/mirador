import * as React from 'react';
import PropTypes from 'prop-types';
import Badge from '@mui/material/Badge';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';

/**
 * WindowSideBarCitationButton
 */
export class WindowSideBarCitationButton extends React.Component {
  /**
   * render
   * @return
   */
  render() {
    const {
      classes,
    } = this.props;

    const { badge } = classes;
    return (
      <Badge overlap="rectangular" classes={{ badge }} variant="dot">
        <CollectionsBookmarkIcon />
      </Badge>
    );
  }
}

WindowSideBarCitationButton.value = 'citation';

WindowSideBarCitationButton.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
};

WindowSideBarCitationButton.defaultProps = {
  classes: {},
};
