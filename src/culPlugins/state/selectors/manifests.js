import { createSelector } from 'reselect';
import MiradorCanvas from '../../../lib/MiradorCanvas';
import canvasTypes from '../../../lib/canvasTypes';
import { getCanvases, getManifestoInstance } from '../../../state/selectors';

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

export const getManifestDoi = createSelector(
  [getManifestoInstance],
  (manifest) => {
    const doiValue = manifest?.getProperty('doi');
    if (!doiValue) return null;
    if (Object.prototype.hasOwnProperty.call(doiValue, 'id')) return doiValue.id;
    if (Object.prototype.hasOwnProperty.call(doiValue, '@id')) return doiValue['@id'];
    return doiValue.toString();
  },
);
