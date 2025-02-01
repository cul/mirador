exports.__esModule = true;
exports.default = undefined;
const _actions = require('../../state/actions');
const _selectors = require('../../state/selectors');
const _ShareCanvasLinkDialog = _interopRequireDefault(require('./components/ShareCanvasLinkDialog'));
const _ShareControl = _interopRequireDefault(require('./components/ShareControl'));
const _locales = _interopRequireDefault(require('./locales'));
const _selectors2 = require('./state/selectors');

/** */
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const _default = [{
  component: _ShareControl.default,
  config: {
    translations: _locales.default,
  },
  /** */
  mapDispatchToProps: function mapDispatchToProps(dispatch, _ref) {
    const { windowId } = _ref;
    return {
      /** */
      updateConfig: function updateConfig(canvasLink) {
        return dispatch((0, _actions.updateWindow)(windowId, {
          canvasLink,
        }));
      },
    };
  },
  /** */
  mapStateToProps: function mapStateToProps(state, _ref2) {
    const { windowId } = _ref2;
    return {
      config: (0, _selectors2.getPluginConfig)(state, {
        windowId,
      }),
      containerId: (0, _selectors.getContainerId)(state),
      windowViewType: (0, _selectors.getWindowViewType)(state, {
        windowId,
      }),
    };
  },
  mode: 'add',
  target: 'WindowTopBarPluginArea',
}, {
  component: _ShareCanvasLinkDialog.default,
  config: {
    translations: _locales.default,
  },
  /** */
  mapDispatchToProps: function mapDispatchToProps(dispatch, _ref3) {
    const { windowId } = _ref3;
    return {
      /** */
      updateConfig: function updateConfig(canvasLink) {
        return dispatch((0, _actions.updateWindow)(windowId, {
          canvasLink,
        }));
      },
    };
  },
  /** */
  mapStateToProps: function mapStateToProps(state, _ref4) {
    const { windowId } = _ref4;
    return {
      config: (0, _selectors2.getPluginConfig)(state, {
        windowId,
      }),
      containerId: (0, _selectors.getContainerId)(state),
      manifestId: (0, _selectors.getWindowManifests)(state, {
        windowId,
      })[0],
      rights: (0, _selectors.getRights)(state, {
        windowId,
      }),
      visibleCanvases: (0, _selectors.getVisibleCanvases)(state, {
        windowId,
      }),
    };
  },
  mode: 'add',
  target: 'Window',
}];
exports.default = _default;
module.exports = exports.default;
