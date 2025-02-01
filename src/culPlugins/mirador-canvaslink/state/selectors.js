exports.__esModule = true;
exports.getPluginConfig = undefined;
const _reselect = require('reselect');
const _selectors = require('../../../state/selectors');

/** */
function _extends(...outsideArgs) {
  _extends = Object.assign ? Object.assign.bind() : function _ext(...args) {
    const target = args[0];
    for (let i = 1; i < args.length; i += 1) {
      const source = args[i];
      for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, outsideArgs);
}

const defaultConfig = {
  // Open the settings dialog
  dialogOpen: false,
  // Enable share plugin
  enabled: true,
  // Show the rights information defined in the manifest
  showRightsInformation: true,
  // Show only in single canvas view,
  singleCanvasOnly: false,
};

/** Selector to get the plugin config for a given window */
const getPluginConfig = (0, _reselect.createSelector)([_selectors.getWindowConfig], (_ref) => {
  const _ref$canvasLink = _ref.canvasLink;
  const canvasLink = _ref$canvasLink === undefined ? {} : _ref$canvasLink;
  return _extends({}, defaultConfig, canvasLink);
});
exports.getPluginConfig = getPluginConfig;
