import InputAdornment from '@mui/material/InputAdornment';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import PropTypes from 'prop-types';
import { MiradorMenuButton } from '../../../../components/MiradorMenuButton';

/** */
const CopyToClipboard = (props) => {
  const { onCopy, supported, t } = props;
  if (!supported) {
    return null;
  }
  return (
    <InputAdornment>
      <MiradorMenuButton
        aria-label={t('canvasLink.copyToClipboard')}
        edge="end"
        onClick={onCopy}
      >
        <FileCopyIcon fontSize="small" />
      </MiradorMenuButton>
    </InputAdornment>
  );
};

/** */
CopyToClipboard.propTypes = {
  onCopy: PropTypes.func.isRequired,
  supported: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
};

export default CopyToClipboard;
