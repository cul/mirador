import PropTypes from 'prop-types';
import CodeIcon from '@mui/icons-material/Code';
import MiradorMenuButton from '../../containers/MiradorMenuButton';

self.$RefreshReg$ = () => {};
self.$RefreshSig$ = () => () => {};

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
      container={container}
      onClick={() => updateConfig({
        ...config,
        dialogOpen: !dialogOpen,
      })}
    >
      <CodeIcon />
    </MiradorMenuButton>
  );
};

MiradorViewXml.propTypes = {
  config: PropTypes.shape({
    dialogOpen: PropTypes.bool.isRequired,
    enabled: PropTypes.bool.isRequired,
  }).isRequired,
  container: PropTypes.string.isRequired,
  updateConfig: PropTypes.func.isRequired,
};

export default MiradorViewXml;
