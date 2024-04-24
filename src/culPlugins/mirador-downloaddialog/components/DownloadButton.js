import Badge from '@mui/material/Badge';
import DownloadIcon from '@mui/icons-material/VerticalAlignBottomSharp';
import PropTypes from 'prop-types';
import { MiradorMenuButton } from '../../../components/MiradorMenuButton';

/** */
const DownloadButton = ({
  config, containerId, suppressDownload, t, updateConfig,
}) => {
  const { dialogOpen, enabled } = config;
  if (!enabled) {
    return null;
  }
  const buttonLabel = suppressDownload ? 'limitedDownloadOptions' : 'showDownloadOptions';
  return (
    <MiradorMenuButton
      aria-expanded={dialogOpen}
      aria-haspopup
      aria-label={t(buttonLabel)}
      onClick={() => updateConfig({
        ...config,
        dialogOpen: !dialogOpen,
      })}
    >
      <Badge color="error" invisible={!suppressDownload} variant="dot">
        <DownloadIcon />
      </Badge>
    </MiradorMenuButton>
  );
};

DownloadButton.propTypes = {
  config: PropTypes.shape({
    dialogOpen: PropTypes.bool.isRequired,
    enabled: PropTypes.bool.isRequired,
  }).isRequired,
  containerId: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  updateConfig: PropTypes.func.isRequired,
};

export default DownloadButton;
