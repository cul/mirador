import { JSONLDResource, Utils } from 'manifesto.js';
import { v4 as uuid } from 'uuid';
import flattenDeep from 'lodash/flattenDeep';
import manifestFixture019 from '../../fixtures/version-2/019.json';
import {
  audioResourcesFrom, filterByProfiles, filterByTypes, textResourcesFrom, videoResourcesFrom,
} from '../../../src/lib/resourceFilters';

/**
 */
function resourceFixtureForProps(props) {
  return new JSONLDResource({
    id: uuid(),
    ...props,
  });
}

describe('resourceFilters', () => {
  let canvas;
  beforeEach(() => {
    [canvas] = Utils.parseManifest(manifestFixture019).getSequences()[0].getCanvases();
  });
  describe('filterByProfiles', () => {
    it('filters resources', () => {
      const services = flattenDeep(canvas.resourceAnnotations.map((a) => a.getResource().getServices()));
      expect(filterByProfiles(services, 'http://iiif.io/api/image/2/level2.json').map((s) => s.id)).toEqual([
        'https://stacks.stanford.edu/image/iiif/hg676jb4964%2F0380_796-44',
      ]);
      expect(filterByProfiles(services, 'http://nonexistent.io/api/service.json').map((s) => s.id)).toEqual([]);
    });
  });
  describe('filterByTypes', () => {
    it('filters resources', () => {
      const resources = flattenDeep(canvas.resourceAnnotations.map((a) => a.getResource()));
      expect(filterByTypes(resources, 'dctypes:Image').map((r) => r.id)).toEqual([
        'https://stacks.stanford.edu/image/iiif/hg676jb4964%2F0380_796-44/full/full/0/default.jpg',
      ]);
      expect(filterByTypes(resources, 'Nonexistent').map((r) => r.id)).toEqual([]);
    });
    it('returns a resource of any given types', () => {
      const typeFixture = 'someType';
      const resourceFixture = resourceFixtureForProps({ '@type': typeFixture });
      expect(filterByTypes([resourceFixture], ['anotherType', typeFixture])).toEqual([resourceFixture]);
    });
  });

  describe('audioResourcesFrom', () => {
    it('returns a resource of audio type', () => {
      const typeFixture = 'Audio';
      const resourceFixture = resourceFixtureForProps({ '@type': typeFixture });
      expect(audioResourcesFrom([resourceFixture])).toEqual([resourceFixture]);
    });
  });

  describe('videoResourcesFrom', () => {
    it('returns a resource of audio type', () => {
      const typeFixture = 'Video';
      const resourceFixture = resourceFixtureForProps({ '@type': typeFixture });
      expect(videoResourcesFrom([resourceFixture])).toEqual([resourceFixture]);
    });
  });

  describe('textResourcesFrom', () => {
    it('returns a resource of audio type', () => {
      const typeFixture = 'Document';
      const resourceFixture = resourceFixtureForProps({ '@type': typeFixture });
      expect(textResourcesFrom([resourceFixture])).toEqual([resourceFixture]);
    });
  });
});
