import { createSelector } from 'reselect';
import { Utils } from 'manifesto.js';
import flatten from 'lodash/flatten';
import { anyProbeServices } from '../../lib/getServices';
import {
  audioResourcesFrom, iiifImageResourcesFrom, textResourcesFrom, videoResourcesFrom,
} from '../../lib/typeFilters';
import MiradorCanvas from '../../lib/MiradorCanvas';
import { miradorSlice } from './utils';
import { getConfig } from './config';
import { getVisibleCanvases, selectInfoResponses, selectProbeResponses } from './canvases';

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
export const getAccessTokens = state => miradorSlice(state).accessTokens || {};

/**
 * Return the authentification data from the state
 * @param {object} state
 * @returns {object}
 */
export const getAuth = state => miradorSlice(state).auth || {};

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
    selectProbeResponses,
    getAuthProfiles,
    getAuth,
    (state, { iiifResources }) => iiifResources,
  ],
  (canvases, infoResponses = {}, probeResponses = {}, serviceProfiles, auth, iiifResources) => {
    let currentAuthResources = iiifResources;

    if (!currentAuthResources && canvases) {
      currentAuthResources = flatten(canvases.map(c => {
        const miradorCanvas = new MiradorCanvas(c);
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

    if (!currentAuthResources) return [];
    if (currentAuthResources.length === 0) return [];

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
          if (service.getProfile() !== 'external') { // external service has no id to track by
            if (!auth[service.id] || auth[service.id].isFetching || auth[service.id].ok) {
              return service;
            }
          }
        }
      }

      return lastAttemptedService;
    });

    return Object.values(currentAuthServices.reduce((h, service) => {
      if (service && !h[service.id]) {
        h[service.id] = service; // eslint-disable-line no-param-reassign
      }
      return h;
    }, {}));
  },
);
