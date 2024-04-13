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
      ...videoOptions,
      autoplay: false,
      controlBar: {
        remainingTimeDisplay: false,
      },
      controls: true,
      fluid: true,
      playbackRates: [0.5, 1, 1.5, 2],
      responsive: true,
      sources: videoResources.filter(video => video.id && video.getFormat()).map(
        video => ({ src: video.id, type: video.getFormat() }),
      ),
      tracks: captions.filter(caption => caption.id).map(caption => ({ kind: (caption.kind || 'captions'), src: caption.id })),
    };

    if (videoJsOptions.sources.length === 0) return <ForbiddenComponent id="this content" />;
    return (
      <div className="video-js vjs-fill" data-vjs-player>
        <VideoJS options={videoJsOptions} />
      </div>
    );
  }
}

export const VideoJSViewer = enhance(VideoJSViewerBase);

/** */
export default ({ _targetComponent, targetProps }) => (<VideoJSViewer {...targetProps} />);
