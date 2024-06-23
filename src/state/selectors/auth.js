import { createSelector } from 'reselect';
import { Utils } from 'manifesto.js';
import flatten from 'lodash/flatten';
import { anyProbeServices } from '../../lib/getServices';
import {
  audioResourcesFrom, iiifImageResourcesFrom, textResourcesFrom, videoResourcesFrom,
} from '../../lib/typeFilters';
import MiradorCanvas from '../../lib/MiradorCanvas';
import { miradorSlice, EMPTY_ARRAY, EMPTY_OBJECT } from './utils';
import { getConfig } from './config';
import { getVisibleCanvases, selectInfoResponses } from './canvases';
import { getMiradorCanvasWrapper } from './wrappers';

/**
 * Returns the authentification profile from the configuration
 * @param {object} state
 * @returns {Array}
 */
export const getAuthProfiles = createSelector(
  [
    getConfig,
  ],
  ({ auth: { serviceProfiles = [] } = {} }) => serviceProfiles,
);

/**
 * Returns access tokens from the state
 * @param {object} state
 * @returns {object}
 */
export const getAccessTokens = state => miradorSlice(state).accessTokens || EMPTY_OBJECT;

/**
 * Return the authentification data from the state
 * @param {object} state
 * @returns {object}
 */
export const getAuth = state => miradorSlice(state).auth || EMPTY_OBJECT;

/**
 * Returns current authentification services based on state and windowId
 * @param {object} state
 * @param {string} windowId
 * @returns {Array}
 */
export const selectCurrentAuthServices = createSelector(
  [
    getVisibleCanvases,
    selectInfoResponses,
    getAuthProfiles,
    getAuth,
    getMiradorCanvasWrapper,
    (state, { iiifResources }) => iiifResources,
  ],
<<<<<<< HEAD
  (canvases, infoResponses = {}, probeResponses = {}, serviceProfiles, auth, getMiradorCanvas, iiifResources) => {
=======
  (canvases, infoResponses = {}, serviceProfiles, auth, iiifResources) => {
>>>>>>> 4e32924c (COLUMBIA: Support auth2 style external authentication)
    let currentAuthResources = iiifResources;

    if ((!currentAuthResources || currentAuthResources.length === 0) && !canvases) return EMPTY_ARRAY;
    if (canvases) {
      currentAuthResources = flatten(canvases.map(c => {
        const miradorCanvas = getMiradorCanvas(c);
        const canvasResources = miradorCanvas.imageResources;
        const authResources = iiifImageResourcesFrom(canvasResources).map(i => {
          const iiifImageService = i.getServices()[0];

          const infoResponse = infoResponses[iiifImageService.id];
          if (infoResponse && infoResponse.json) {
            return { ...infoResponse.json, options: {} };
          }

          return iiifImageService;
        });
        return authResources.concat(videoResourcesFrom(canvasResources))
          .concat(audioResourcesFrom(canvasResources))
          .concat(textResourcesFrom(canvasResources));
      }));
    }

    if (currentAuthResources.length === 0) return EMPTY_ARRAY;

    const currentAuthServices = currentAuthResources.map(resource => {
      let lastAttemptedService;
      const resourceServices = Utils.getServices(resource);
      const probeServices = anyProbeServices(resource);
      const probeServiceServices = flatten(probeServices.map(p => Utils.getServices(p)));

      for (const authProfile of serviceProfiles) {
        const profiledAuthServices = resourceServices.concat(probeServiceServices).filter(
          p => authProfile.profile === p.getProfile(),
        );

        for (const service of profiledAuthServices) {
          lastAttemptedService = service;
          // external service may have no id to track by (auth1 vs auth2)
          const serviceKey = (authProfile.external) ? (service?.id || 'external') : service?.id;

          if (!auth[serviceKey] || auth[serviceKey].isFetching || auth[serviceKey].ok) {
            return service;
          }
        }
      }

      return lastAttemptedService;
    });

    return Object.values(currentAuthServices.reduce((h, service) => {
      if (!service) return h;
      const external = serviceProfiles.filter(x => x.external).find(s => (s.profile === service.getProfile()));
      const serviceKey = (external) ? (service.id || 'external') : service.id;
      if (!h[serviceKey]) {
        h[serviceKey] = service; // eslint-disable-line no-param-reassign
      }
      return h;
    }, {}));
  },
);
