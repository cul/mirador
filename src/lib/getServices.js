import { Utils } from 'manifesto.js';
import flatten from 'lodash/flatten';
import { filterByTypes } from './typeFilters';

/**
 */
export function anyAuthServices(resource) {
  return resource
  && Utils.getServices(resource).filter(s => (s.getProfile()
    && s.getProfile().match(/http:\/\/iiif.io\/api\/auth\//))
      || (s.getProperty('type')?.match(/^Auth.*Service2$/)));
}

/**
 */
export function anyProbeServices(resource) {
  return resource
  && Utils.getServices(resource).filter(s => (s.getProfile() === 'http://iiif.io/api/auth/1/probe')
    || (s.getProperty('type') === 'AuthProbeService2'));
}

/**
 */
export function getProbeService(resource) {
  return resource
  && anyProbeServices(resource)[0];
}

/**
 */
function auth1TokenService(resource) {
  return resource
  && (
    Utils.getService(resource, 'http://iiif.io/api/auth/1/token')
    || Utils.getService(resource, 'http://iiif.io/api/auth/0/token')
    || filterByTypes(Utils.getServices(resource), 'AuthAccessTokenService2')[0]
  );
}

/**
 */
export function anyTokenServices(resource) {
  const v1TokenService = auth1TokenService(resource);
  if (v1TokenService) return [v1TokenService];
  const services = resource && filterByTypes(Utils.getServices(resource), 'AuthAccessTokenService2');
  if (services && services[0]) return services;
  if (resource) {
    // probe services are separated from token services by access services
    const authServices = anyAuthServices(resource);
    if (authServices[0]) return flatten(authServices.map(authSvc => anyTokenServices(authSvc)));
  }
  return [];
}

/**
 */
export function getTokenService(resource) {
  return anyTokenServices(resource)[0];
}

/**
 */
export function getLogoutService(resource) {
  return resource
  && (
    Utils.getService(resource, 'http://iiif.io/api/auth/1/logout')
    || Utils.getService(resource, 'http://iiif.io/api/auth/0/logout')
    || filterByTypes(Utils.getServices(resource), 'AuthLogoutService2')[0]
  );
}
