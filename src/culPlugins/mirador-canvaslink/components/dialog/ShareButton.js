import FacebookIcon from '@mui/icons-material/Facebook';
import MailIcon from '@mui/icons-material/Mail';
import PinterestIcon from '@mui/icons-material/Pinterest';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PropTypes from 'prop-types';
import { MiradorMenuButton } from '../../../../components/MiradorMenuButton';

import { getShareLink } from '../utils';

const iconMapping = {
  envelope: MailIcon,
  facebook: FacebookIcon,
  pinterest: PinterestIcon,
  twitter: TwitterIcon,
  whatsapp: WhatsAppIcon,
};

/** Renders a button for sharing the given content on one of the supported providers */
const ShareButton = ({
  attribution = null,
  canvasLink,
  label,
  provider,
  thumbnailUrl,
  title,
}) => {
  const link = getShareLink(
    attribution,
    canvasLink,
    label,
    provider,
    thumbnailUrl,
  );
  const ProviderIcon = iconMapping[provider];
  return (
    <MiradorMenuButton
      aria-label={title}
      href={encodeURI(link)}
      rel="noopener"
      target="_blank"
    >
      <ProviderIcon />
    </MiradorMenuButton>
  );
};

ShareButton.propTypes = {
  attribution: PropTypes.string,
  canvasLink: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  provider: PropTypes.string.isRequired,
  thumbnailUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default ShareButton;
