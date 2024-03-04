import * as React from 'react';
import PropTypes from 'prop-types';
import CompanionWindow from '../../containers/CompanionWindow';
import CanvasInfo from '../../containers/CanvasInfo';
import LocalePicker from '../../containers/LocalePicker';
import ManifestInfo from '../../containers/ManifestInfo';
import CollectionInfo from '../../containers/CollectionInfo';
import ManifestRelatedLinks from '../../containers/ManifestRelatedLinks';
import ns from '../../config/css-ns';

/**
 * WindowSideBarCitationPanel
 */
export class WindowSideBarCitationPanel extends React.Component {
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
      setLocale,
      availableLocales,
      showLocalePicker,
    } = this.props;

    return (
      <CompanionWindow
        title={t('citeThisItem')}
        paperClassName={ns('window-sidebar-citation-panel')}
        windowId={windowId}
        id={id}
        titleControls={(
          showLocalePicker
            && (
            <LocalePicker
              locale={locale}
              setLocale={setLocale}
              availableLocales={availableLocales}
            />
            )
        )}
      >
        <div className={classes.section}>Citation Information Will Go Here</div>
      </CompanionWindow>
    );
  }
}

WindowSideBarCitationPanel.propTypes = {
  availableLocales: PropTypes.arrayOf(PropTypes.string),
  classes: PropTypes.objectOf(PropTypes.string),
  id: PropTypes.string.isRequired,
  locale: PropTypes.string,
  setLocale: PropTypes.func,
  showLocalePicker: PropTypes.bool,
  t: PropTypes.func,
  windowId: PropTypes.string.isRequired,
};

WindowSideBarCitationPanel.defaultProps = {
  availableLocales: [],
  classes: {},
  locale: '',
  setLocale: undefined,
  showLocalePicker: false,
  t: key => key,
};
