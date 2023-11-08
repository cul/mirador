import { Component, lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import WindowSideBar from '../containers/WindowSideBar';
import CompanionArea from '../containers/CompanionArea';
import CollectionDialog from '../containers/CollectionDialog';
import ns from '../config/css-ns';

const AudioViewer = lazy(() => import('../containers/AudioViewer'));
const GalleryView = lazy(() => import('../containers/GalleryView'));
const SelectCollection = lazy(() => import('../containers/SelectCollection'));
const WindowViewer = lazy(() => import('../containers/WindowViewer'));
const VideoViewer = lazy(() => import('../containers/VideoViewer'));
const NativeObjectViewer = lazy(() => import('../containers/NativeObjectViewer'));

GalleryView.displayName = 'GalleryView';
SelectCollection.displayName = 'SelectCollection';
WindowViewer.displayName = 'WindowViewer';

const StyledPrimaryWindowContainer = styled('div')(() => ({
  display: 'flex',
  flex: 1,
  position: 'relative',
}));

/**
 * PrimaryWindow - component that renders the primary content of a Mirador
 * window. Right now this differentiates between a Image, Video, or Audio viewer.
 */
export class PrimaryWindow extends Component {
  /**
   * renderViewer - logic used to determine what type of view to show
   *
   * @return {(String|null)}
   */
  renderViewer() {
    const {
      audioResources, isCollection,
      isFetching, textResources, videoResources, view, windowId,
    } = this.props;
    if (isCollection) {
      return (
        <SelectCollection
          windowId={windowId}
        />
      );
    }
    if (isFetching === false) {
      if (view === 'gallery') {
        return (
          <GalleryView
            windowId={windowId}
          />
        );
      }
      if (videoResources.length > 0) {
        return (
          <VideoViewer
            windowId={windowId}
          />
        );
      }
      if (audioResources.length > 0) {
        return (
          <AudioViewer
            windowId={windowId}
          />
        );
      }
      if (textResources.length > 0) {
        return (
          <NativeObjectViewer
            windowId={windowId}
          />
        );
      }
      return (
        <WindowViewer
          windowId={windowId}
        />
      );
    }
    return null;
  }

  /**
   * Render the component
   */
  render() {
    const {
      isCollectionDialogVisible, windowId, children,
    } = this.props;
    return (
      <StyledPrimaryWindowContainer data-testid="test-window" className={ns('primary-window')}>
        <WindowSideBar windowId={windowId} />
        <CompanionArea windowId={windowId} position="left" />
        { isCollectionDialogVisible && <CollectionDialog windowId={windowId} /> }
        <Suspense fallback={<div />}>
          {children || this.renderViewer()}
        </Suspense>
      </StyledPrimaryWindowContainer>
    );
  }
}

PrimaryWindow.propTypes = {
  audioResources: PropTypes.arrayOf(PropTypes.object), // eslint-disable-line react/forbid-prop-types
  children: PropTypes.node,
  isCollection: PropTypes.bool,
  isCollectionDialogVisible: PropTypes.bool,
  isFetching: PropTypes.bool,
  textResources: PropTypes.arrayOf(PropTypes.object), // eslint-disable-line react/forbid-prop-types
  videoResources: PropTypes.arrayOf(PropTypes.object), // eslint-disable-line react/forbid-prop-types
  view: PropTypes.string,
  windowId: PropTypes.string.isRequired,
};

PrimaryWindow.defaultProps = {
  audioResources: [],
  children: undefined,
  isCollection: false,
  isCollectionDialogVisible: false,
  isFetching: false,
  textResources: [],
  videoResources: [],
  view: undefined,
};
