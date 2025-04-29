import { Utils } from 'manifesto.js';
import fixture from '../../../../fixtures/version-2/019.json';

import { numCanvases, someCanvases } from '../../../../../src/culPlugins/mirador-selectCollectionFolders/lib/canvases';

describe('someCanvases', () => {
  let manifesto;
  beforeEach(() => {
    manifesto = Utils.parseManifest(fixture);
  });
  it('detects expected canvases', () => {
    const wellKnownId = 'https://purl.stanford.edu/rz176rt6531/iiif/canvas/rz176rt6531_1';
    expect(someCanvases(manifesto, c => c.getProperty('id') === wellKnownId)).toEqual(true);
  });
  it('correctly iterates all canvases when function returns false', () => {
    expect(someCanvases(manifesto, c => c.isCollection())).toEqual(false);
  });
});

describe('numCanvases', () => {
  let manifesto;
  beforeEach(() => {
    manifesto = Utils.parseManifest(fixture);
  });
  it('counts image canvases', () => {
    expect(numCanvases(manifesto)).toEqual(3);
  });
});
