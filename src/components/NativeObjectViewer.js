import { Fragment, useEffect, useRef, useState } from 'react';
import { FullScreen } from 'react-full-screen';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

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
    nativeObjectOptions, nativeObjectResources, windowId,
  } = props;

  const defaultDimensions = (originalDimensions) => {
    return originalDimensions || document.body.querySelector(`#${windowId} .mirador-primary-window`)?.getBoundingClientRect();
  };

  const eleRef = useRef(null);

  const [currentDimensions, setCurrentDimensions] = useState({
    original: defaultDimensions(null),
    current: eleRef.current?.getBoundingClientRect(),
  });

  useEffect(() => {
    const element = eleRef.current;

    if (!element) return;

    const originalDimensions = element.getBoundingClientRect();
    const observer = new ResizeObserver((entries) => {
      if (entries.length == 0) return;
      console.log(entries[0]);
      const current = (document.fullscreenElement) ? entries[0].contentRect : originalDimensions;

      setCurrentDimensions({original: originalDimensions, current: current});
    });

    observer.observe(element);
    return () => {
      // Cleanup the observer like any event handlers
      observer.disconnect();
    };
  }, [eleRef]);

  const dimensions = currentDimensions.current || currentDimensions.original;
  return (
    <StyledContainer ref={eleRef}>
      <StyledObject {...nativeObjectOptions}>
        {nativeObjectResources.map((nativeObject) => (
          <Fragment key={nativeObject.id}>
            <object data={`${nativeObject.id}`} type={nativeObject.getFormat()} width={`${dimensions?.width}px`} height={`${dimensions?.height}px`} />
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
