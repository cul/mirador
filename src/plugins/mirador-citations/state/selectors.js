import { createSelector } from 'reselect';
import { getWindowConfig } from '../../../state/selectors';

const defaultConfig = {
  // Enable the plugin
  enabled: true,
  // Open the panel
  panelOpen: false,
};

/** Selector to get the plugin config for a given window */
const getPluginConfig = createSelector(
  [getWindowConfig],
  ({ openPanel = {} }) => ({
    ...defaultConfig,
    ...openPanel,
  }),
);

export { getPluginConfig };
