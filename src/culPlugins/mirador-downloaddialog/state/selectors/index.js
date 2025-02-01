import { createSelector } from 'reselect';
import { getCurrentCanvas, getWindowConfig } from '../../../../state/selectors';

const defaultConfig = {
  // Open the download dialog
  dialogOpen: false,
  // Enable the plugin
  enabled: true,
};

/** Selector to get the plugin config for a given window */
const getPluginConfig = createSelector(
  [getWindowConfig],
  ({ downloadDialog = {} }) => ({
    ...defaultConfig,
    ...downloadDialog,
  }),
);

/** Check the behaviors for no-download */
const getSuppressDownload = createSelector(
  [getCurrentCanvas],
  (canvas) => ((canvas?.getProperty('behavior') || []).includes('no-download')),
);

export { getPluginConfig, getSuppressDownload };
