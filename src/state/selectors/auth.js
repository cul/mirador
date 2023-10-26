import { createSelector } from 'reselect';
import { Utils } from 'manifesto.js';
import flatten from 'lodash/flatten';
import {
  audioResourcesFrom, filterByTypes, textResourcesFrom, videoResourcesFrom,
} from '../../lib/typeFilters';
import MiradorCanvas from '../../lib/MiradorCanvas';
import { miradorSlice } from './utils';
import { getConfig } from './config';
import { getVisibleCanvases, selectInfoResponses } from './canvases';

export const getAuthProfiles = createSelector(
  [
    getConfig,
  ],
  ({ auth: { serviceProfiles = [] } = {} }) => serviceProfiles,
);

/** */
export const getAccessTokens = state => miradorSlice(state).accessTokens || {};

/** */
export const getAuth = state => miradorSlice(state).auth || {};

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
        const images = miradorCanvas.iiifImageResources;

        return images.map(i => {
          const iiifImageService = i.getServices()[0];

          const infoResponse = infoResponses[iiifImageService.id];
          if (infoResponse && infoResponse.json) {
            return { ...infoResponse.json, options: {} };
          }

          return iiifImageService;
        });
      }));
    }

    if (currentAuthResources.length === 0 && canvases) {
      currentAuthResources = flatten(canvases.map(c => {
        const miradorCanvas = new MiradorCanvas(c);
        const canvasResources = miradorCanvas.imageResources;
        return videoResourcesFrom(canvasResources)
          .concat(audioResourcesFrom(canvasResources))
          .concat(textResourcesFrom(canvasResources));
      }));
    }

    if (!currentAuthResources) return [];
    if (currentAuthResources.length === 0) return [];

    const currentAuthServices = currentAuthResources.map(resource => {
      let lastAttemptedService;
      const resourceServices = Utils.getServices(resource);
      const probeServices = filterByTypes(resourceServices, 'AuthProbeService2');
      const probeServiceServices = flatten(probeServices.map(p => Utils.getServices(p)));

      for (const authProfile of serviceProfiles) {
        const profiledAuthServices = resourceServices.concat(probeServiceServices).filter(
          p => authProfile.profile === p.getProfile(),
        );

        for (const service of profiledAuthServices) {
          lastAttemptedService = service;

          if (!auth[service.id] || auth[service.id].isFetching || auth[service.id].ok) {
            return service;
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
