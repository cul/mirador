import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

import { anyImageServices } from '../../../../lib/typeFilters';

import ImageDownloadLinks from './ImageDownloadLinks';

/**
 * Filter the misnamed imageResources property to actual imageResources
 */
const anyImageResources = (imageResources) => (imageResources || []).filter((r) => anyImageServices(r).length > 0);

/** */
const CanvasDownloadLinks = ({
  canvas, canvasRenderings, label, sizes, t,
}) => {
  const theme = useTheme();
  const behaviors = canvas?.behaviors || [];
  if (behaviors.includes('no-download')) return null;

  if (anyImageResources(canvas?.imageResources).length > 0) {
    return (
      <ImageDownloadLinks
        canvas={canvas}
        key={canvas.id}
        label={label}
        sizes={sizes}
        t={t}
      />
    );
  }

  if (!canvasRenderings || canvasRenderings.length < 1) return null;

  return (
    <Card className="mb-3" raised>
      <CardContent>
        <Typography component="h5" style={{ textTransform: 'none' }} variant="h6">
          <Box fontWeight="fontWeightBold" textTransform="none">
            {label}
          </Box>
        </Typography>
        <List>
          {canvasRenderings?.filter(({ format }) => format !== 'text/html')
            .map((link) => (
              <ListItem dense key={link.value}>
                <Box
                  fontFamily={theme.typography.fontFamily ?? 'sans-serif'}
                  fontSize="0.75rem"
                >
                  <Link href={link.value} rel="noopener" target="_blank">
                    {link.label}
                  </Link>
                </Box>
              </ListItem>
            ))}
        </List>
      </CardContent>
    </Card>
  );
};

CanvasDownloadLinks.defaultProps = {
  sizes: [],
};

CanvasDownloadLinks.propTypes = {
  canvas: PropTypes.shape({
    getCanonicalImageUri: PropTypes.func.isRequired,
    getHeight: PropTypes.func.isRequired,
    getWidth: PropTypes.func.isRequired,
  }).isRequired,
  label: PropTypes.oneOfType(PropTypes.number, PropTypes.string).isRequired,
  sizes: PropTypes.arrayOf(
    PropTypes.shape({
      height: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
    }),
  ),
  t: PropTypes.func.isRequired,
};

export default CanvasDownloadLinks;
