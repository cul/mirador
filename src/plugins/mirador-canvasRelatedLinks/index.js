import { getPluginConfig } from '../../state/selectors';
import CanvasRelatedLinks from './containers/CanvasRelatedLinks';

export default [
  {
    component: CanvasRelatedLinks,
    mode: 'add',
    name: 'CanvasRelatedLinks',
    target: 'CanvasInfo',
  },
];
