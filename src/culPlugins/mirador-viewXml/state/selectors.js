import { PropertyValue } from 'manifesto.js';
import { createSelector } from 'reselect';
import asArray from '../../../lib/asArray';
import { getWindowConfig, getManifestLocale, getManifestoInstance } from '../../../state/selectors';

const defaultConfig = {
  // Open the view dialog
  dialogOpen: false,
  // Enable the plugin
  enabled: true,
};

/** Selector to get the plugin config for a given window */
const getPluginConfig = createSelector(
  [getWindowConfig],
  ({ viewXmlDialog = {} }) => ({
    ...defaultConfig,
    ...viewXmlDialog,
  }),
);

/** copied from Mirador because it is not exported */
const getProperty = (property) => createSelector(
  [getManifestoInstance],
  manifest => manifest && manifest.getProperty(property),
);

/** modified from Mirador to destructure all the properties */
const getManifestSeeAlso = createSelector(
  [
    getProperty('seeAlso'),
    getManifestLocale,
  ],
  (seeAlso, locale) => seeAlso
    && asArray(seeAlso).map(related => (
      {
        ...related,
        format: related.format,
        label: PropertyValue.parse(related.label, locale)
          .getValue(),
        value: related.id || related['@id'],
      }
    )),
);
export { getManifestSeeAlso, getPluginConfig };
