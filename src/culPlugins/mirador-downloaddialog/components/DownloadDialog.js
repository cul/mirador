import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import ns from '../../../config/css-ns';
import ScrollIndicatedDialogContent from '../../../containers/ScrollIndicatedDialogContent';

import DownloadDialogPluginArea from '../containers/dialog/DownloadDialogPluginArea';
import CanvasDownloadLinks from './dialog/CanvasDownloadLinks';

/** */
const DownloadDialog = ({
  canvasLabel,
  canvasRenderings = [],
  children = undefined,
  config,
  containerId,
  infoResponse,
  manifestRenderings = [],
  manifestUrl = undefined,
  suppressDownload,
  updateConfig,
  visibleCanvases = [],
  windowId,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { dialogOpen, enabled } = config;
  if (!enabled || !dialogOpen || !manifestUrl || !(visibleCanvases && visibleCanvases.length > 0)) {
    return null;
  }
  /** */
  const closeDialog = () => updateConfig({
    ...config,
    dialogOpen: false,
  });

  return (
    <Dialog
      container={document.querySelector(`#${containerId} .${ns('viewer')}`)}
      fullWidth
      maxWidth="xs"
      onClose={closeDialog}
      open={dialogOpen}
      scroll="paper"
    >
      <DialogTitle>
        <Typography variant="h4" component="span">
          <Box fontWeight="fontWeightBold">{t('downloadOptions')}</Box>
        </Typography>
      </DialogTitle>
      <ScrollIndicatedDialogContent dividers>
        {visibleCanvases.map((canvas) => (
          <CanvasDownloadLinks
            canvas={canvas}
            canvasRenderings={canvasRenderings}
            key={canvas.id}
            label={canvasLabel(canvas.id)}
            sizes={infoResponse(canvas.id).json?.sizes}
            suppressDownload={suppressDownload}
            t={t}
          />
        ))}
        <DownloadDialogPluginArea windowId={windowId} />
        {children}
        <Box sx={{ marginTop: '1rem' }}>
          <Card raised>
            <CardContent>
              <Typography
                component="h5"
                style={{ textTransform: 'none' }}
                variant="h6"
              >
                <Box fontWeight="fontWeightBold" textTransform="none">
                  {t('otherDownloadOptions')}
                </Box>
              </Typography>
              <List>
                <ListItem dense>
                  <Box
                    fontFamily={theme.typography.fontFamily ?? 'sans-serif'}
                    fontSize="0.75rem"
                  >
                    <Link href={manifestUrl} rel="noopener" target="_blank">
                      {t('iiifManifest')}
                    </Link>
                  </Box>
                </ListItem>
                {manifestRenderings?.filter(({ format }) => format !== 'text/html')
                  .map(({ label, value }) => (
                    <ListItem dense key={value}>
                      <Box
                        fontFamily={theme.typography.fontFamily ?? 'sans-serif'}
                        fontSize="0.75rem"
                      >
                        <Link href={value} rel="noopener" target="_blank">
                          {label}
                        </Link>
                      </Box>
                    </ListItem>
                  ))}
              </List>
            </CardContent>
          </Card>
        </Box>
      </ScrollIndicatedDialogContent>
      <DialogActions>
        <Button color="primary" onClick={closeDialog}>
          {t('close')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DownloadDialog.propTypes = {
  canvasLabel: PropTypes.func.isRequired,
  canvasRenderings: PropTypes.arrayOf(
    PropTypes.shape({
      format: PropTypes.string,
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
  children: PropTypes.element,
  config: PropTypes.shape({
    dialogOpen: PropTypes.bool.isRequired,
    enabled: PropTypes.bool.isRequired,
  }).isRequired,
  containerId: PropTypes.string.isRequired,
  infoResponse: PropTypes.func.isRequired,
  manifestRenderings: PropTypes.arrayOf(
    PropTypes.shape({
      format: PropTypes.string,
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
  manifestUrl: PropTypes.string,
  updateConfig: PropTypes.func.isRequired,
  visibleCanvases: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string, index: PropTypes.number }),
  ),
  windowId: PropTypes.string.isRequired,
};

export default DownloadDialog;
