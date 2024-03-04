import { createSelector } from 'reselect';
import { getWindowConfig } from '../../../state/selectors';

const defaultConfig = {
  // Open the panel
  panelOpen: false,
  // Enable the plugin
  enabled: true,
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
