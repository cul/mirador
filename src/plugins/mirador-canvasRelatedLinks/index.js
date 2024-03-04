import { getPluginConfig } from '@columbia-libraries/mirador/dist/es/src/state/selectors';
import CanvasRelatedLinks from './containers/CanvasRelatedLinks';

export default [
  {
    component: CanvasRelatedLinks,
    mode: 'add',
    name: 'CanvasRelatedLinks',
    target: 'CanvasInfo',
  },
];
