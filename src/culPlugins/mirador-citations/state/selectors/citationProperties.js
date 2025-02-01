import { LabelValuePair } from 'manifesto.js';
import { createSelector } from 'reselect';
import {
  getManifestoInstance, getManifestLocale,
} from '../../../../state/selectors';

/** */
const selectorMatch = (data, selector) => {
  if (data === selector) return true;
  if (Array.isArray(data)) return data.find((dataNode) => selectorMatch(dataNode, selector));
  const selectorProperty = Object.keys(selector)[0];
  const selectorValue = selector[selectorProperty];
  if (data[selectorProperty] === selectorValue) return true;
  if (Array.isArray(data[selectorProperty])) {
    return data[selectorProperty].find((dataNode) => selectorMatch(dataNode, selectorValue));
  }
  if (Object.keys(selectorValue)[0] && selectorValue.constructor !== String) {
    return data[selectorProperty] && selectorMatch(data[selectorProperty], selectorValue);
  }
  return false;
};

export const getRawMetadata = createSelector(
  [getManifestoInstance],
  manifest => manifest?.getProperty('metadata'),
);

/** */
const firstRawValueForSelector = (manifestMetadata, selector) => {
  if (!selector) return null;

  return manifestMetadata?.find((data) => selectorMatch(data, selector));
};

/** */
const getInternationalizedValue = (manifestMetadata, selector, locale, joinWith = true) => {
  const rawValue = firstRawValueForSelector(manifestMetadata, selector);
  if (rawValue) {
    const metadataValue = new LabelValuePair(locale);
    metadataValue.parse(rawValue);
    // joinWith positional param of false will return only first value
    return metadataValue.getValue(locale, joinWith);
  }
  return '';
};

/** */
export const simpleShapeIdSelector = (shapeData) => createSelector(
  [getManifestoInstance],
  (manifest) => {
    const val = firstRawValueForSelector(manifest.getProperty('metadata'), shapeData);
    return val && val.seeAlso && val.seeAlso[0]?.id;
  },
);

const nameDateCleaningRegEx = /(.+)(,\W\d{1,4}\s*(-?\s*\d{0,4})?)(.*)/;

/** */
export const nameForCitationSelector = (shapeData) => createSelector(
  [getManifestoInstance, getManifestLocale],
  (manifest, locale) => {
    const nameValue = getInternationalizedValue(manifest.getProperty('metadata'), shapeData, locale, false);
    const regExMatch = nameValue.match(nameDateCleaningRegEx);

    return (regExMatch) ? `${regExMatch[1]} ${regExMatch[4]}` : nameValue;
  },
);

/** */
export const textualDate = (manifestMetadata) => '';

/** */
export const simpleShapeSelector = (shapeData) => createSelector(
  [getManifestoInstance, getManifestLocale],
  (manifest, manifestLocale) => getInternationalizedValue(manifest.getProperty('metadata'), shapeData, manifestLocale),
);
