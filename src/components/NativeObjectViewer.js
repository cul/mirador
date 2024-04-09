import { Fragment, useContext, useRef, useState } from 'react';
import { FullScreen } from 'react-full-screen';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { getCurrentCanvasWorld } from '../state/selectors';
import FullScreenContext from '../contexts/FullScreenContext';

const StyledContainer = styled('div')({
  alignItems: 'center',
  display: 'flex',
  width: '100%',
});

const StyledObject = styled('object')({
  width: '100%',
});

/** */
export function NativeObjectViewer(props) {
  /* eslint-disable jsx-a11y/media-has-caption */
  /** */
  const {
    dimensions, nativeObjectOptions, nativeObjectResources, windowId,
  } = props;

  const fullscreenHandle = useContext(FullScreenContext);
  const eleRef = useRef(null);
  const [fullscreen, setFullscreen] = useState(false);

  if (fullscreenHandle.active != fullscreen) setFullscreen(fullscreenHandle.active);

  const boundingRect = (fullscreen && eleRef.current) ? eleRef.current.closest(`.mirador-primary-window`).getBoundingClientRect() : dimensions;


  return (
    <StyledContainer ref={eleRef}>
      <StyledObject {...nativeObjectOptions}>
        {nativeObjectResources.map((nativeObject) => (
          <Fragment key={nativeObject.id}>
            <object data={`${nativeObject.id}`} type={nativeObject.getFormat()} width={`${boundingRect.width}px`} height={`${boundingRect.height}px`} />
          </Fragment>
        ))}
      </StyledObject>
    </StyledContainer>
  );
}
/* eslint-enable jsx-a11y/media-has-caption */

NativeObjectViewer.propTypes = {
  nativeObjectOptions: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  nativeObjectResources: PropTypes.arrayOf(PropTypes.object), // eslint-disable-line react/forbid-prop-types
  windowId: PropTypes.string, // eslint-disable-line react/forbid-prop-types
};

NativeObjectViewer.defaultProps = {
  nativeObjectOptions: {},
  nativeObjectResources: [],
  windowId: undefined,
};
