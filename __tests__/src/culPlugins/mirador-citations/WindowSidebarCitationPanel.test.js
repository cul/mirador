import { render, screen } from '../../../utils/test-utils';
import manifestFixturePublicPdf from '../../../fixtures/culPlugins/public-pdf.json';

import { WindowSideBarCitationPanel } from '../../../../src/culPlugins/mirador-citations/WindowSideBarCitationPanel';
import {
  getManifestTitle,
} from '../../../../src/state/selectors/manifests';
import { getManifestDoi } from '../../../../src/culPlugins/state/selectors';
import { getManifestProviderNames } from '../../../../src/culPlugins/mirador-citations/state/selectors';

import * as CitationProperties from '../../../../src/culPlugins/mirador-citations/state/selectors/citationProperties';

vi.unmock('react-i18next');

/** create state */
function preloadedStateWithManifest(manifestData) {
  return {
    companionWindows: { asdf: { content: 'citations' } },
    manifests: { x: { json: manifestData } },
  };
}

/**
 * Helper function to create a shallow wrapper around WindowSideBarCitationPanel
 */
/** create wrapper */
function createWrapper(props, preloadedState) {
  return render(
    <WindowSideBarCitationPanel
      id="asdf"
      windowId="zxcv"
      {...props}
    />,
    { preloadedState },
  );
}

/** create props */
function propsWithMetadata(state, dataShapes = {}, dataSelectors = {}) {
  const shapeSelectors = Object.getOwnPropertyNames(dataShapes).reduce((acc, key) => {
    acc[key] = CitationProperties.simpleShapeSelector(dataShapes[key]);
    return acc;
  }, {});
  const config = { dataSelectors: { ...shapeSelectors, ...dataSelectors } };
  const citationData = ((c) => Object.getOwnPropertyNames(c.dataSelectors).reduce((acc, key) => {
    acc[key] = c.dataSelectors[key](state, { manifestId: 'x' });
    return acc;
  }, {}))(config);

  return {
    citationData,
    config,
    manifestDoi: getManifestDoi(state, { manifestId: 'x' }),
    manifestProviderNames: getManifestProviderNames(state, { manifestId: 'x' }),
    manifestTitle: getManifestTitle(state, { manifestId: 'x' }),
    t: value => value,
  };
}

const nameShape = { label: { en: 'Name' } };

const collectionShape = {
  seeAlso: {
    profile: 'https://clio.columbia.edu/archives',
  },
};

describe('WindowSideBarCitationPanel', () => {
  describe('when metadata is present', () => {
    it('renders headers', () => {
      const preloadedState = preloadedStateWithManifest(manifestFixturePublicPdf);
      createWrapper(propsWithMetadata(preloadedState), preloadedState);
      expect(screen.getByRole('heading', { name: 'Cite this item' })).toBeInTheDocument();
    });

    it('renders the title with a terminal dot', () => {
      const preloadedState = preloadedStateWithManifest(manifestFixturePublicPdf);
      createWrapper(propsWithMetadata(preloadedState), preloadedState);
      expect(screen.getByText('"Oral history interview with Mehdi Jomaa, 2015".', { container: 'div.citationTitle' })).toBeInTheDocument();
    });

    it('renders the first name, without date, with a terminal dot', () => {
      const preloadedState = preloadedStateWithManifest(manifestFixturePublicPdf);
      const nameSelector = CitationProperties.nameForCitationSelector(nameShape);
      createWrapper(propsWithMetadata(preloadedState, {}, { nameForCitation: nameSelector }), preloadedState);
      expect(screen.getByText('Jomaa, Mehdi (Interviewee).', { container: 'div.citationName' })).toBeInTheDocument();
    });

    it('renders the collection', () => {
      const preloadedState = preloadedStateWithManifest(manifestFixturePublicPdf);
      createWrapper(propsWithMetadata(preloadedState, { collectionName: collectionShape }), preloadedState);
      expect(screen.getByText('Tunisian Transition oral history collection.', { container: 'div.citationLocation' })).toBeInTheDocument();
    });
  });
});
