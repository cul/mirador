import VideoJSAudioViewerComponent from './components/VideoJSAudioViewer';
import VideoJSViewerComponent from './components/VideoJSViewer';

export default [
  {
    component: VideoJSAudioViewerComponent,
    mode: 'wrap',
    name: 'VideoJSAudioViewer',
    target: 'AudioViewer',
  },
  {
    component: VideoJSViewerComponent,
    mode: 'wrap',
    name: 'VideoJSViewer',
    target: 'VideoViewer',
  },
];

export { VideoJSAudioViewerComponent, VideoJSViewerComponent };
