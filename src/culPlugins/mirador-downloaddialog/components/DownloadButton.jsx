import Badge from '@mui/material/Badge';
import DownloadIcon from '@mui/icons-material/VerticalAlignBottomSharp';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { MiradorMenuButton } from '../../../components/MiradorMenuButton';

/** */
const DownloadButton = ({
  config, containerId, suppressDownload, updateConfig,
}) => {
  const { t } = useTranslation();
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
  suppressDownload: PropTypes.bool.isRequired,
  updateConfig: PropTypes.func.isRequired,
};

export default DownloadButton;
