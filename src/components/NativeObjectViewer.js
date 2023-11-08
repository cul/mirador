import { Fragment } from 'react';
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

  const { width, height } = (document.body.querySelector(`#${windowId} .mirador-primary-window`)?.getBoundingClientRect() || {});
  return (
    <StyledContainer>
      <StyledObject {...nativeObjectOptions}>
        {nativeObjectResources.map((nativeObject) => (
          <Fragment key={nativeObject.id}>
            <object data={nativeObject.id} type={nativeObject.getFormat()} width={`${width}px`} height={`${height}px`} />
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
