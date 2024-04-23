import { PropertyValue } from 'manifesto.js';
import { createSelector } from 'reselect';
import asArray from '../../../lib/asArray';
import MiradorCanvas from '../../../lib/MiradorCanvas';
import canvasTypes from '../../../lib/canvasTypes';
import { getCanvases, getManifestoInstance, getManifestLocale } from '../../../state/selectors';

/**
 * Detect the IIIF v3 content types represented in the canvas
 */
export const getCanvasesContentTypes = createSelector(
  [getCanvases],
  (canvases) => {
    const detected = [];
    canvases?.forEach((canvas) => {
      new MiradorCanvas(canvas).imageResources.forEach((resource => {
        if (!detected.includes('Audio') && canvasTypes.audioTypes.includes(resource.getProperty('type'))) detected.push('Audio');
        if (!detected.includes('Image') && canvasTypes.imageTypes.includes(resource.getProperty('type'))) detected.push('Image');
        if (!detected.includes('Text') && canvasTypes.textTypes.includes(resource.getProperty('type'))) detected.push('Text');
        if (!detected.includes('Video') && canvasTypes.videoTypes.includes(resource.getProperty('type'))) detected.push('Video');
      }));
    });
    return detected;
  },
);

/**
 * Get a named property for the current manifest
 */
const getManifestProperty = (property) => createSelector(
  [getManifestoInstance],
  manifest => manifest && manifest.getProperty(property),
);

/**
 * Get the id value for the manifest property
 */
export const getManifestDoi = createSelector(
  [getManifestProperty('doi')],
  (doiValue) => {
    if (!doiValue) return null;
    if (Object.prototype.hasOwnProperty.call(doiValue, 'id')) return doiValue.id;
    if (Object.prototype.hasOwnProperty.call(doiValue, '@id')) return doiValue['@id'];
    return doiValue.toString();
  },
);

/**
 * Build a destructuring selector for the given link property
 */
const linkSelector = (linkProperty) => createSelector(
  [
    getManifestProperty(linkProperty),
    getManifestLocale,
  ],
  (linkPropertyValues, locale) => {
    if (!linkPropertyValues) return null;
    return asArray(linkPropertyValues).map(link => (
      {
        ...link,
        format: link.format,
        label: PropertyValue.parse(link.label, locale)
          .getValue(),
        value: link.id || link['@id'],
      }
    ));
  },
);

export const getManifestRenderings = linkSelector('rendering');

export const getManifestSeeAlso = linkSelector('seeAlso');

export const getManifestRelatedLinks = createSelector(
  [
    getManifestRenderings,
    getManifestSeeAlso,
  ],
  (renderings, seeAlso) => {
    if (!renderings && !seeAlso) return null;
    return asArray(renderings || []).concat(seeAlso || []);
  },
);
