import PropTypes from 'prop-types';
import DataObject from '@mui/icons-material/DataObject';
import MiradorMenuButton from '../../containers/MiradorMenuButton';

self.$RefreshReg$ = () => {}; /* eslint-disable-line no-restricted-globals */
self.$RefreshSig$ = () => () => {}; /* eslint-disable-line no-restricted-globals */

/** */
const MiradorViewXml = ({ config, container, updateConfig }) => {
  const { dialogOpen, enabled } = config;
  if (!enabled) {
    return null;
  }

  return (
    <MiradorMenuButton
      aria-expanded={dialogOpen}
      aria-haspopup
      aria-label="View MODS"
      onClick={() => updateConfig({
        ...config,
        dialogOpen: !dialogOpen,
      })}
    >
      <DataObject />
    </MiradorMenuButton>
  );
};

MiradorViewXml.propTypes = {
  config: PropTypes.shape({
    dialogOpen: PropTypes.bool.isRequired,
    enabled: PropTypes.bool.isRequired,
  }).isRequired,
  updateConfig: PropTypes.func.isRequired,
};

export default MiradorViewXml;
