import React from 'react';
import PropTypes from 'prop-types';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

/** */
export const VideoJS = ({ options = {}, onReady }) => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);

  React.useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement('video-js');

      videoElement.classList.add('vjs-big-play-centered');
      videoRef.current.appendChild(videoElement);

      const player = videojs(videoElement, options, () => {
        videojs.log('player is ready');
        onReady && onReady(player);
      });
      playerRef.current = player;

    // You could update an existing player in the `else` block here
    // on prop change, for example:
    } else {
      const player = playerRef.current;

      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, videoRef, onReady]);

  // Dispose the Video.js player when the functional component unmounts
  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div ref={videoRef} data-vjs-player style={{ width: '100%' }} />
  );
};

export default VideoJS;

VideoJS.propTypes = {
  onReady: PropTypes.func.isRequired,
  options: PropTypes.shape({
    autoplay: PropTypes.bool,
    sources: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  }),
};
