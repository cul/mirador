import { createSelector } from 'reselect';
import { getWindowConfig } from '../../../../state/selectors';

const defaultConfig = {
  // Open the settings dialog
  dialogOpen: false,
  // Enable share plugin
  enabled: true,
  // Show the rights information defined in the manifest
  showRightsInformation: true,
  // Show only in single canvas view,
  singleCanvasOnly: false,
};

/** Selector to get the plugin config for a given window */
export const getPluginConfig = createSelector(
  [getWindowConfig],
  ({ canvasLink = {} }) => ({
    ...defaultConfig,
    ...canvasLink,
  }),
);
