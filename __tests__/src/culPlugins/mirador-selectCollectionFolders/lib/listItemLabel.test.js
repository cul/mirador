import { Utils } from 'manifesto.js';
import v2ImagesFixture from '../../../../fixtures/version-2/019.json';
import v2SequenceImageFixture from '../../../../fixtures/version-2/sn904cj3429.json';
import v3ImageFixture from '../../../../fixtures/version-3/001.json';
import v3ChoiceImageFixture from '../../../../fixtures/version-3/hamilton.json';
import v3PagedFixture from '../../../../fixtures/culPlugins/public-images.json';

import listItemLabel from '../../../../../src/culPlugins/mirador-selectCollectionFolders/lib/listItemLabel';

describe('listItemLabel', () => {
  it('labels basic image manifest appropriately', () => {
    const manifesto = Utils.parseManifest(v3ImageFixture);
    expect(listItemLabel(manifesto)).toEqual('1 Image');
  });
  it('labels multiple image manifest appropriately', () => {
    const manifesto = Utils.parseManifest(v2ImagesFixture);
    expect(listItemLabel(manifesto)).toEqual('3 Images');
  });
  it('labels choice image manifest appropriately', () => {
    const manifesto = Utils.parseManifest(v3ChoiceImageFixture);
    expect(listItemLabel(manifesto)).toEqual('1 Image');
  });
  it('labels sequence image manifest appropriately', () => {
    const manifesto = Utils.parseManifest(v2SequenceImageFixture);
    expect(listItemLabel(manifesto)).toEqual('1 Image');
  });
  it('labels paged behavior manifest appropriately', () => {
    const manifesto = Utils.parseManifest(v3PagedFixture);
    expect(listItemLabel(manifesto)).toEqual('2 Pages');
  });
});
