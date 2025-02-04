/**
 * Filter resources by profile property in given profiles
 */
export function filterByProfiles(resources, profiles) {
  if (profiles === undefined || resources === undefined) return [];

  if (!Array.isArray(profiles)) {
    return resources.filter((resource) => profiles === resource.getProperty('profile'));
  }

  return resources.filter((resource) => profiles.includes(resource.getProperty('profile')));
}

/**
 * Filter resources by type property in given types
 */
export function filterByTypes(resources, types) {
  if (types === undefined || resources === undefined) return [];

  if (!Array.isArray(types)) {
    return resources.filter((resource) => types === resource.getProperty('type'));
  }

  return resources.filter((resource) => types.includes(resource.getProperty('type')));
}

/** */
export function imageServicesFrom(services, iiifImageProfiles) {
  return filterByProfiles(services, iiifImageProfiles);
}

/** */
export function hasImageService(resource, iiifImageProfiles = []) {
  const imageServices = imageServicesFrom(resource ? resource.getServices() : [], iiifImageProfiles);
  return imageServices[0] && imageServices[0].id;
}

/** */
export function iiifImageResourcesFrom(resources, iiifImageProfiles = []) {
  return resources.filter((r) => hasImageService(r, iiifImageProfiles));
}
