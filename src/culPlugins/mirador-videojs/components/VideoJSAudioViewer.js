import { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { AudioViewer } from '../../../components/AudioViewer';
import { getConfig, getVisibleCanvasCaptions, getVisibleCanvasAudioResources } from '../../../state/selectors';

import { VideoJS } from './VideoJS';
import ForbiddenComponent from '../../ForbiddenComponent';

/** */
const mapStateToProps = (state, { windowId }) => (
  {
    audioOptions: getConfig(state).audioOptions,
    audioResources: getVisibleCanvasAudioResources(state, { windowId }) || [],
    captions: getVisibleCanvasCaptions(state, { windowId }) || [],
  }
);

const enhance = compose(
  withTranslation(),
  connect(mapStateToProps, null),
);

/** */
class VideoJSAudioViewerBase extends Component {
  /** */
  render() {
    const {
      captions, audioOptions, audioResources,
    } = this.props;

    const debugResources = audioResources.filter(audio => audio.id && audio.getFormat()).map(
      audio => ({ src: audio.id, type: audio.getFormat() }),
    );
    const videoJsOptions = {
      ...audioOptions,
      autoplay: false,
      controlBar: {
        remainingTimeDisplay: false,
      },
      controls: true,
      fluid: true,
      playbackRates: [0.5, 1, 1.5, 2],
      responsive: true,
      sources: audioResources.filter(audio => audio.id && audio.getFormat()).map(
        audio => ({ src: audio.id, type: audio.getFormat() }),
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

export const VideoJSAudioViewer = enhance(VideoJSAudioViewerBase);

/** */
export default function ({ _targetComponent, targetProps }) {
  return <VideoJSAudioViewer {...targetProps} />;
}
