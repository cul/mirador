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
      windowId,
      id,
      classes,
      t,
      locale,
      value,
    } = this.props;

    return (
      <Badge overlap="rectangular" classes={{ badge: classes.badge }} variant="dot">
        <CollectionsBookmarkIcon />
      </Badge>
    );
  }
}

/**
TODO: Where are translations registered? Mouseover currently 'openCompanionWindow'
* */

WindowSideBarCitationButton.value = 'citation';

WindowSideBarCitationButton.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  id: PropTypes.string.isRequired,
  locale: PropTypes.string,
  t: PropTypes.func,
  windowId: PropTypes.string.isRequired,
};

WindowSideBarCitationButton.defaultProps = {
  classes: {},
  locale: '',
  t: key => key,
};
