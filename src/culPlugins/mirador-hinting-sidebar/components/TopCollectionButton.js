import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { useDispatch, useSelector } from 'react-redux';
import { Utils } from 'manifesto.js';
import PropTypes from 'prop-types';
import { getCollectionPath } from '../../state/selectors';
import { getManifest, getManifestoInstance } from '../../../state/selectors';
import { updateWindow } from '../../../state/actions';
import MiradorMenuButton from '../../../containers/MiradorMenuButton';
import ns from '../../../config/css-ns';

/** render a topbar button that returns to a view of the containing collection */
export const TopCollectionButton = ({ className = null, color = null, windowId }) => {
  const collectionPath = useSelector((state) => getCollectionPath(state, { windowId }));

  /** compare o(ld) manifest and n(ew) manifest to see if difference should update state */
  const equalManifest = (o, n) => {
    if (!o && !n) return true;
    if (!o || !n) return false;
    if (o?.id !== n?.id) return false;
    if (o?.isFetching !== n?.isFetching) return false;
    return true;
  };

  const manifest = useSelector(state => getManifest(state, { windowId }), equalManifest);
  const dispatch = useDispatch();

  const manifestoObject = manifest ? Utils.parseManifest(manifest.json, undefined) : false;
  if (!manifestoObject || manifestoObject.isCollection()) return false;

  const disableButton = !collectionPath?.at(0);

  /** onclick to update collection data on window and return to collection view */
  const clickHandler = () => {
    if (!manifestoObject || disableButton) return;
    const update = { collectionPath: collectionPath.slice(0, -1), manifestId: collectionPath.at(-1) };
    dispatch(updateWindow(windowId, update));
  };

  return (
    <MiradorMenuButton
      aria-label="View Collection"
      className={className || ns('window-menu-btn')}
      color={color}
      disabled={disableButton}
      onClick={clickHandler}
    >
      <AccountTreeIcon />
    </MiradorMenuButton>
  );
};

TopCollectionButton.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  windowId: PropTypes.string.isRequired,
};
