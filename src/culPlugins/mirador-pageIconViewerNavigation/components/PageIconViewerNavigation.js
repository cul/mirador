import { Component } from 'react';
import { useTranslation } from 'react-i18next';
import LtrNextPage from '@mui/icons-material/AutoStories';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import MiradorMenuButton from '../../../containers/MiradorMenuButton';
import ns from '../../../config/css-ns';
/** */
const noOp = () => {};
/**
 */
export function PageIconViewerNavigation({
  hasNextCanvas = false, hasPreviousCanvas = false, setNextCanvas = noOp, setPreviousCanvas = noOp, viewingDirection = '',
}) {
  /**
   * Renders previous next canvas buttons, but only if there are such canvases
   * The AutoStories icon appears to be a page turning, and is thus flipped
   * via a scale transform rather than a 180deg rotation. Rotations
   * for the reading direction can thus be applied uniformly to both but before
   * the scale transform.
   */
  const { t } = useTranslation();

  if (!hasPreviousCanvas && !hasNextCanvas) return (null);
  let htmlDir = 'ltr';
  const prevTransform = ['scale(-1, 1)'];
  const nextTransform = [];
  switch (viewingDirection) {
    case 'top-to-bottom':
      prevTransform.unshift('rotate(90deg)');
      nextTransform.unshift('rotate(90deg)');
      break;
    case 'bottom-to-top':
      prevTransform.unshift('rotate(270deg)');
      nextTransform.unshift('rotate(270deg)');
      break;
    case 'right-to-left':
      htmlDir = 'rtl';
      nextTransform.push(prevTransform.pop());
      break;
    default:
      break;
  }
  const previousIconStyle = (prevTransform.length > 0) ? { transform: prevTransform.join(' ') } : {};
  const nextIconStyle = (nextTransform.length > 0) ? { transform: nextTransform.join(' ') } : {};
  return (
    <div
      className={classNames(ns('osd-navigation'))}
      dir={htmlDir}
    >
      <MiradorMenuButton
        aria-label={t('previousCanvas')}
        className={ns('previous-canvas-button')}
        disabled={!hasPreviousCanvas}
        onClick={() => { hasPreviousCanvas && setPreviousCanvas(); }}
      >
        <LtrNextPage style={previousIconStyle} />
      </MiradorMenuButton>
      <MiradorMenuButton
        aria-label={t('nextCanvas')}
        className={ns('next-canvas-button')}
        disabled={!hasNextCanvas}
        onClick={() => { hasNextCanvas && setNextCanvas(); }}
      >
        <LtrNextPage style={nextIconStyle} />
      </MiradorMenuButton>
    </div>
  );
}

PageIconViewerNavigation.propTypes = {
  hasNextCanvas: PropTypes.bool,
  hasPreviousCanvas: PropTypes.bool,
  setNextCanvas: PropTypes.func,
  setPreviousCanvas: PropTypes.func,
  viewingDirection: PropTypes.string,
};
