import { compose } from 'redux';
import { connect } from 'react-redux';
import { withPlugins } from '../extend/withPlugins';
import {
  getConfig,
  getThumbnailFactory,
} from '../state/selectors';
import { IIIFThumbnail } from '../components/IIIFThumbnail';

/**
 * mapStateToProps - to hook up connect
 * @private
 */
const mapStateToProps = (state) => ({
  getThumbnail: (resource, { maxHeight, maxWidth }) => getThumbnailFactory(
    { ...getConfig(state).thumbnails, maxHeight, maxWidth },
    getConfig(state),
  ).get(resource),
});

const enhance = compose(
  connect(mapStateToProps),
  withPlugins('IIIFThumbnail'),
);

export default enhance(IIIFThumbnail);
