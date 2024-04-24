import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

/** */
const SuppressedDownload = ({ label, t }) => (
  <Card className="mb-3" raised>
    <CardContent>
      <Typography component="h5" style={{ textTransform: 'none' }} variant="h6">
        <Box fontWeight="fontWeightBold" textTransform="none">
          {`${t(
            'suppressedDownloads',
          )}: ${label}`}
        </Box>
      </Typography>
    </CardContent>
  </Card>
);

SuppressedDownload.propTypes = {
  label: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

export default SuppressedDownload;
