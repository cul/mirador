import userEvent from '@testing-library/user-event';
import { Utils } from 'manifesto.js';
import { render, screen } from '../../../../../utils/test-utils';
import ImageDownloadLinks from '../../../../../../src/culPlugins/mirador-downloaddialog/components/dialog/ImageDownloadLinks';

import { numCanvases, someCanvases } from '../../../../../../src/culPlugins/mirador-selectCollectionFolders/lib/canvases';
import fixture from '../../../../../fixtures/version-2/019.json';

/** create wrapper */
function createWrapper(props) {
  return render(
    <ImageDownloadLinks
      {...props}
    />,
  );
}

describe('ImageDownloadLinks', () => {
  let manifesto;
  const canvas = {
    getCanonicalImageUri: vi.fn((width) => `https://www.example.com/iiif/12345/${width}/0/default.jpg`),
  };
  const label = 'This is the label';
  const sizes = [
    { height: 100, width: 200 },
    { height: 300, width: 600 },
    { height: 500, width: 1000 },
  ];

  it('renders the component', () => {
    createWrapper({
      canvas,
      label,
      sizes,
      suppressDownload: false,
    });

    const downloadLinks = screen.queryAllByText(/\d+ x \d+ pixels/);
    expect(downloadLinks).toHaveLength(3);
  });

  describe('when suppressedDownload is true', () => {
    it('renders the component with a suppression message', () => {
      createWrapper({
        canvas,
        label,
        sizes,
        suppressDownload: true,
      });

      expect(screen.queryAllByText(`suppressedDownloads: ${label}`)).toHaveLength(1);
    });
  });
});
