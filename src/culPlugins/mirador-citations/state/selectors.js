import { PropertyValue } from 'manifesto.js';
import { createSelector } from 'reselect';
import * as CitationProperties from './selectors/citationProperties';
import {
  getManifestoInstance, getManifestLocale, getWindowConfig,
} from '../../../state/selectors';

const defaultConfig = {
  dataSelectors: {
    collectionName: CitationProperties.simpleShapeSelector({
      seeAlso: {
        profile: 'https://clio.columbia.edu/archives',
      },
    }),
    collectionUri: CitationProperties.simpleShapeIdSelector({
      seeAlso: {
        profile: 'https://clio.columbia.edu/archives',
      },
    }),
    doi: CitationProperties.simpleShapeSelector({
      profile: 'http://purl.org/ontology/bibo/doi',
    }),
    format: CitationProperties.simpleShapeSelector({
      label: { en: 'Format' },
    }),
    genre: CitationProperties.simpleShapeSelector({
      label: { en: 'Genre' },
    }),
    nameForCitation: CitationProperties.nameForCitationSelector({
      label: { en: 'Name' },
    }),
    repositoryName: CitationProperties.simpleShapeSelector({
      seeAlso: {
        profile: 'https://id.loc.gov/vocabulary/organizations',
      },
    }),
    textualDate: CitationProperties.simpleShapeSelector({
      label: { en: 'Date' },
    }),
  },
  // Enable the plugin
  enabled: true,
  // Open the panel
  panelOpen: false,
};

/** Selector to get the plugin config for a given window */
export const getPluginConfig = createSelector(
  [getWindowConfig],
  ({ openPanel = {} }) => ({
    ...defaultConfig,
    ...openPanel,
  }),
);

export const getManifestDoi = createSelector(
  [getManifestoInstance],
  manifest => manifest?.getProperty('doi'),
);

export const getManifestProviderNames = createSelector(
  [
    getManifestoInstance,
    getManifestLocale,
  ],
  (manifest, locale) => {
    const provider = manifest.getProperty('provider');
    const providerLabel = provider
      && provider[0].label
      && PropertyValue.parse(provider[0].label, locale).getValue();
    const partOf = provider && provider[0].partOf;
    const partOfLabel = partOf?.label && PropertyValue.parse(partOf.label, locale).getValue();
    return [providerLabel, partOfLabel].filter((v) => v);
  },
);

export default { getPluginConfig, ...CitationProperties };
