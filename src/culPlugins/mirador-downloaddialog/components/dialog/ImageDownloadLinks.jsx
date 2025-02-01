import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import ImageLink from './ImageLink';
import SuppressedDownload from './SuppressedDownload';

/** */
const ImageDownloadLinks = ({
  canvas, label, sizes = [], suppressDownload,
}) => {
  const { t } = useTranslation();
  if (suppressDownload) {
    return (
      <SuppressedDownload label={label} t={t} />
    );
  }

  return (
    <Card className="mb-3" raised>
      <CardContent>
        <Typography component="h5" style={{ textTransform: 'none' }} variant="h6">
          <Box fontWeight="fontWeightBold" textTransform="none">
            {`${t(
              'image',
            )}: ${label}`}
          </Box>
        </Typography>
        <List>
          {sizes
            .sort((a, b) => b.width - a.width)
            .slice(1)
            .reduce(
              (acc, { height, width }) => {
                // only take sizes, where the difference between the last taken width
                // and the current one is bigger than 500 pixels
                if (acc[acc.length - 1].width - width >= 500) {
                  acc.push({ height, width });
                }
                return acc;
              },
              // this represents the full size
              [{ height: canvas.getHeight(), width: canvas.getWidth() }],
            )
            .map(({ height, width }) => (
              <ListItem dense key={`${height}x${width}`}>
                <ImageLink
                  height={height}
                  linkTarget={canvas.getCanonicalImageUri(width)}
                  t={t}
                  width={width}
                />
              </ListItem>
            ))}
        </List>
      </CardContent>
    </Card>
  );
};

ImageDownloadLinks.propTypes = {
  canvas: PropTypes.shape({
    getCanonicalImageUri: PropTypes.func.isRequired,
    getHeight: PropTypes.func.isRequired,
    getWidth: PropTypes.func.isRequired,
  }).isRequired,
  label: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  sizes: PropTypes.arrayOf(
    PropTypes.shape({
      height: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
    }),
  ),
  suppressDownload: PropTypes.bool.isRequired,
};

export default ImageDownloadLinks;
