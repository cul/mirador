import * as React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { citationHandlerFor, CitationStylePicker } from './panel';
import CompanionWindow from '../../containers/CompanionWindow';
import ns from '../../config/css-ns';

/**
 * WindowSideBarCitationPanel
 */
export function WindowSideBarCitationPanel({
  citationData,
  classes = {},
  id,
  manifestDoi,
  manifestProviderNames = [],
  manifestTitle = '',
  windowId,
}) {
  const { t } = useTranslation();
  const [citationStyle, setCitationStyle] = React.useState('mla');

  const citationHandler = citationHandlerFor(citationStyle);
  const citationProps = {
    doi: manifestDoi, providers: manifestProviderNames, title: manifestTitle, ...citationData,
  };

  return (
    <CompanionWindow
      title={t('citeThisItem')}
      paperClassName={ns('window-sidebar-citation-panel')}
      windowId={windowId}
      id={id}
      titleControls={
        <CitationStylePicker citationStyle={citationStyle} setCitationStyle={setCitationStyle} availableCitationStyles={['mla', 'chicago', 'apa']} />
      }
    >
      {
        citationHandler(citationProps, classes)
      }
    </CompanionWindow>
  );
}

WindowSideBarCitationPanel.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  id: PropTypes.string.isRequired,
  manifestProviderNames: PropTypes.arrayOf(PropTypes.string),
  manifestTitle: PropTypes.string,
  windowId: PropTypes.string.isRequired,
};
