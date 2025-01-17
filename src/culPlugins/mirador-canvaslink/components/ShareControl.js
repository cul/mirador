import ShareIcon from '@mui/icons-material/Share';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { MiradorMenuButton } from '../../../components/MiradorMenuButton';

/** */
const ShareControl = ({
  containerId,
  config,
  updateConfig,
  windowViewType,
}) => {
  const { dialogOpen, enabled, singleCanvasOnly } = config;
  const { t } = useTranslation();
  if (!enabled
  // Only show in single canvas view if configured
  || (singleCanvasOnly && windowViewType !== 'single')
  // Never show in gallery view
  || windowViewType === 'gallery') {
    return null;
  }

  return (
    <MiradorMenuButton
      aria-expanded={dialogOpen}
      aria-label={t('canvasLink.shareLink')}
      containerId={containerId}
      onClick={() => updateConfig({
        ...config,
        dialogOpen: !dialogOpen,
      })}
    >
      <ShareIcon />
    </MiradorMenuButton>
  );
};

ShareControl.propTypes = {
  config: PropTypes.shape({
    dialogOpen: PropTypes.bool.isRequired,
    enabled: PropTypes.bool.isRequired,
    singleCanvasOnly: PropTypes.bool.isRequired,
  }).isRequired,
  containerId: PropTypes.string.isRequired,
  updateConfig: PropTypes.func.isRequired,
  windowViewType: PropTypes.string.isRequired,
};

export default ShareControl;
