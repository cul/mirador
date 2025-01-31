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
import { getVisibleCanvases, selectInfoResponses } from './canvases';

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
    getAuthProfiles,
    getAuth,
    (state, { iiifResources }) => iiifResources,
  ],
  (canvases, infoResponses = {}, serviceProfiles, auth, iiifResources) => {
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
        return authResources.concat(miradorCanvas.videoResources)
          .concat(miradorCanvas.audioResources)
          .concat(miradorCanvas.textResources);
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
