import { connect } from 'react-redux';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { VideoViewer } from '../../../components/VideoViewer';
import { getConfig, getVisibleCanvasCaptions, getVisibleCanvasVideoResources } from '../../../state/selectors';

import { VideoJS } from './VideoJS';
import ForbiddenComponent from '../../ForbiddenComponent';

/** */
const mapStateToProps = (state, { windowId }) => (
  {
    captions: getVisibleCanvasCaptions(state, { windowId }) || [],
    videoOptions: getConfig(state).videoOptions,
    videoResources: getVisibleCanvasVideoResources(state, { windowId }) || [],
  }
);

const enhance = compose(
  withTranslation(),
  connect(mapStateToProps, null),
);

/** */
class VideoJSViewerBase extends VideoViewer {
  /** */
  render() {
    const {
      captions, videoOptions, videoResources,
    } = this.props;

    const videoJsOptions = {
      autoplay: false,
      controlBar: {
        remainingTimeDisplay: false,
      },
      controls: true,
      fluid: true,
      playbackRates: [0.5, 1, 1.5, 2],
      responsive: true,
      sources: videoResources.filter(video => video.id && video.getFormat()).map(video => ({ src: video.id, type: video.getFormat() })),
      tracks: captions.filter(caption => caption.id).map(caption => ({ kind: (caption.kind || 'captions'), src: caption.id })),
    };

    console.log({ state: this.state, videoJsOptions });
    if (videoJsOptions.sources.length === 0) return <ForbiddenComponent id="this content" />;
    return (
      <div className="video-js w-100" data-vjs-player>
        <VideoJS options={videoJsOptions} />
      </div>
    );
  }
}

export const VideoJSViewer = enhance(VideoJSViewerBase);

/** */
export default function ({ _targetComponent, targetProps }) {
  return <VideoJSViewer {...targetProps} />;
}

VideoJSViewer.propTypes = {
  targetProps: PropTypes.object.isRequired,
  _targetComponent: PropTypes.func, 
}
