import { Component } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Tabs from '@mui/material/Tabs';
import InfoIcon from '@mui/icons-material/InfoSharp';
import AnnotationIcon from '@mui/icons-material/CommentSharp';
import AttributionIcon from '@mui/icons-material/CopyrightSharp';
import LayersIcon from '@mui/icons-material/LayersSharp';
import SearchIcon from '@mui/icons-material/SearchSharp';
import { useTranslation } from 'react-i18next';
import CanvasIndexIcon from '../../../components/icons/CanvasIndexIcon';
import TabButton from './TabButton';

const Root = styled(Tabs, { name: 'WindowSideBarButtons', slot: 'root' })({
  '& .MuiTabs-flexContainer': {
    flexDirection: 'column',
  },
  '&.MuiTabs-indicator': {
    display: 'none',
  },
});

/**
 * This is an override (mode = wrap) plugin targeting the WindowSidebarButtons area.
 */
export const HintingSideBarButtons = ({
  addCompanionWindow,
  canvasContentTypes,
  canvasSeeAlso,
  hasAnnotations = false,
  hasAnyAnnotations = false,
  hasAnyLayers = false,
  hasCurrentLayers = false,
  hasSearchResults = false,
  hasSearchService = false,
  panels = [],
  PluginComponents = null,
  sideBarPanel = 'closed',
  windowId,
}) => {
  const { t } = useTranslation();
  /**
   * @param {object} event the change event
   * @param {string} value the tab's value
   */
  const handleChange = (event, value) => addCompanionWindow(value);
  const hintCanvasIndex = ((canvasContentTypes?.length || 0) > 1);
  const hintInfo = ((canvasSeeAlso?.length || 0) > 0);

  return (
    <Root
      value={sideBarPanel === 'closed' ? false : sideBarPanel}
      onChange={handleChange}
      variant="fullWidth"
      indicatorColor="primary"
      textColor="primary"
      orientation="vertical"
      aria-orientation="vertical"
      aria-label={t('sidebarPanelsNavigation')}
    >
      { panels.info && (
        <TabButton
          color={(hintInfo) ? 'info' : ''}
          value="info"
          onKeyUp={handleChange}
          t={t}
          icon={(
            <Badge overlap="rectangular" color="info" invisible={!hintInfo} variant="dot">
              <InfoIcon />
            </Badge>
          )}
        />
      )}
      { panels.attribution && (
        <TabButton
          value="attribution"
          onKeyUp={handleChange}
          t={t}
          icon={(<AttributionIcon />)}
        />
      )}
      { panels.canvas && (
        <TabButton
          color={(hintCanvasIndex) ? 'info' : ''}
          value="canvas"
          onKeyUp={handleChange}
          t={t}
          icon={(
            <Badge overlap="rectangular" color="info" invisible={!hintCanvasIndex} variant="dot">
              <CanvasIndexIcon />
            </Badge>
          )}
        />
      )}
      {panels.annotations && (hasAnnotations || hasAnyAnnotations) && (
        <TabButton
          value="annotations"
          onKeyUp={handleChange}
          t={t}
          icon={(
            <Badge overlap="rectangular" color="notification" invisible={!hasAnnotations} variant="dot">
              <AnnotationIcon />
            </Badge>
          )}
        />
      )}
      {panels.search && hasSearchService && (
        <TabButton
          value="search"
          onKeyUp={handleChange}
          t={t}
          icon={(
            <Badge overlap="rectangular" color="notification" invisible={!hasSearchResults} variant="dot">
              <SearchIcon />
            </Badge>
          )}
        />
      )}
      { panels.layers && hasAnyLayers && (
        <TabButton
          value="layers"
          onKeyUp={handleChange}
          t={t}
          icon={(
            <Badge overlap="rectangular" color="notification" invisible={!hasCurrentLayers} variant="dot">
              <LayersIcon />
            </Badge>
          )}
        />
      )}
      { PluginComponents
        && PluginComponents.map(PluginComponent => (
          <TabButton
            onKeyUp={handleChange}
            t={t}
            key={PluginComponent.value}
            value={PluginComponent.value}
            icon={<PluginComponent windowId={windowId} />}
            windowId={windowId}
          />
        ))}
    </Root>
  );
};

HintingSideBarButtons.propTypes = {
  addCompanionWindow: PropTypes.func.isRequired,
  hasAnnotations: PropTypes.bool,
  hasAnyAnnotations: PropTypes.bool,
  hasAnyLayers: PropTypes.bool,
  hasCurrentLayers: PropTypes.bool,
  hasSearchResults: PropTypes.bool,
  hasSearchService: PropTypes.bool,
  panels: PropTypes.shape({
    annotations: PropTypes.bool,
    attribution: PropTypes.bool,
    canvas: PropTypes.bool,
    info: PropTypes.bool,
    layers: PropTypes.bool,
    search: PropTypes.bool,
  }),
  PluginComponents: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  sideBarPanel: PropTypes.string,
};
