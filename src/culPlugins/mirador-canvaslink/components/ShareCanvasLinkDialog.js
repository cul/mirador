import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { createTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ns from '../../../config/css-ns';
import ScrollIndicatedDialogContent from '../../../containers/ScrollIndicatedDialogContent';

import CopyToClipboard from './dialog/CopyToClipboard';
import RightsInformation from './dialog/RightsInformation';
import ShareButton from './dialog/ShareButton';

const useStyles = createTheme((theme) => ({
  actionButtons: {
    flexWrap: 'wrap',
  },
  actions: {
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  alert: {
    marginBottom: theme.spacing(1),
  },
}));

const supportsClipboard = 'clipboard' in navigator;

/** */
const ShareCanvasLinkDialog = ({
  config,
  containerId,
  manifestId,
  visibleCanvases = [],
  label = '',
  rights = [],
  updateConfig,
}) => {
  const {
    dialogOpen, enabled, showRightsInformation, getCanvasLink, providers,
  } = config;
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  const { actions, actionButtons, alert } = useStyles;
  const { t } = useTranslation();

  if (!enabled || !dialogOpen || visibleCanvases.length === 0) {
    return null;
  }
  /** */
  const closeDialog = () => updateConfig({
    ...config,
    dialogOpen: false,
  });
  const canvasLink = getCanvasLink(manifestId, visibleCanvases);
  /** */
  const getPreviewUrl = (width) => `${visibleCanvases[0]?.imageServiceIds[0]}/full/${width},/0/default.jpg`;

  return (
    <Dialog
      container={document.querySelector(`#${containerId} .${ns('viewer')}`)}
      fullWidth
      maxWidth="sm"
      scroll="paper"
      open={dialogOpen}
      onClose={closeDialog}
    >
      <DialogTitle disableTypography>
        <Typography variant="h4">
          <Box fontWeight="fontWeightBold">{t('canvasLink.shareLink')}</Box>
        </Typography>
      </DialogTitle>
      <ScrollIndicatedDialogContent dividers>
        {copiedToClipboard && (
          <Alert
            className={alert}
            closeText={t('canvasLink.close')}
            onClose={() => setCopiedToClipboard(false)}
            severity="success"
          >
            {t('canvasLink.copiedToClipboard')}
          </Alert>
        )}
        <TextField
          fullWidth
          InputProps={{
            endAdornment: (
              <CopyToClipboard
                onCopy={() => {
                  navigator.clipboard.writeText(canvasLink);
                  setCopiedToClipboard(true);
                  setTimeout(() => setCopiedToClipboard(false), 3000);
                }}
                supported={supportsClipboard}
                t={t}
              />
            ),
            readOnly: true,
          }}
          size="small"
          value={canvasLink}
          variant="outlined"
        />
        {showRightsInformation && <RightsInformation t={t} rights={rights} />}
      </ScrollIndicatedDialogContent>
      <DialogActions className={actions}>
        <ButtonGroup className={actionButtons}>
          {providers.map(
            (p) => (
              <ShareButton
                key={p}
                canvasLink={canvasLink}
                label={label}
                provider={p}
                thumbnailUrl={getPreviewUrl(250)}
                title={t(`canvasLink.share.${p}`)}
              />
            ),
          )}
        </ButtonGroup>
        <div style={{ flex: '1 0 0' }} />
        <Button color="primary" onClick={closeDialog}>
          {t('canvasLink.close')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ShareCanvasLinkDialog.propTypes = {
  config: PropTypes.shape({
    dialogOpen: PropTypes.bool.isRequired,
    enabled: PropTypes.bool.isRequired,
    getCanvasLink: PropTypes.func.isRequired,
    providers: PropTypes.arrayOf(PropTypes.string),
    showRightsInformation: PropTypes.bool.isRequired,
  }).isRequired,
  containerId: PropTypes.string.isRequired,
  label: PropTypes.string,
  manifestId: PropTypes.string.isRequired,
  rights: PropTypes.arrayOf(PropTypes.string),
  updateConfig: PropTypes.func.isRequired,
  visibleCanvases: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      imageServiceIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    }),
  ),
};

export default ShareCanvasLinkDialog;
