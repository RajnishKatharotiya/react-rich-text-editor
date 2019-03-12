"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jquery = _interopRequireDefault(require("jquery"));

require("summernote/dist/summernote");

require("summernote/dist/summernote.css");

require("codemirror/lib/codemirror.css");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

require("bootstrap/js/dist/modal");

require("bootstrap/js/dist/dropdown");

require("bootstrap/js/dist/tooltip");

require("bootstrap/dist/css/bootstrap.css");

require("../public/ReactEditor.css");

var _CustomHintPopover = _interopRequireDefault(require("./CustomHintPopover"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ReactEditor =
/*#__PURE__*/
function (_Component) {
  _inherits(ReactEditor, _Component);

  function ReactEditor(props) {
    var _this;

    _classCallCheck(this, ReactEditor);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ReactEditor).call(this, props));
    _this.uid = "reactRichEditor";
    _this.editor = {};
    _this.noteEditable = null;
    _this.notePlaceholder = null;
    _this.onInit = _this.onInit.bind(_assertThisInitialized(_this));
    _this.onImageUpload = _this.onImageUpload.bind(_assertThisInitialized(_this));
    _this.focus = _this.focus.bind(_assertThisInitialized(_this));
    _this.isEmpty = _this.isEmpty.bind(_assertThisInitialized(_this));
    _this.reset = _this.reset.bind(_assertThisInitialized(_this));
    _this.replace = _this.replace.bind(_assertThisInitialized(_this));
    _this.disable = _this.disable.bind(_assertThisInitialized(_this));
    _this.enable = _this.enable.bind(_assertThisInitialized(_this));
    _this.toggleState = _this.toggleState.bind(_assertThisInitialized(_this));
    _this.insertImage = _this.insertImage.bind(_assertThisInitialized(_this));
    _this.insertNode = _this.insertNode.bind(_assertThisInitialized(_this));
    _this.insertText = _this.insertText.bind(_assertThisInitialized(_this));
    ReactEditor.focus = _this.focus.bind(_assertThisInitialized(_this));
    ReactEditor.isEmpty = _this.isEmpty.bind(_assertThisInitialized(_this));
    ReactEditor.reset = _this.reset.bind(_assertThisInitialized(_this));
    ReactEditor.replace = _this.replace.bind(_assertThisInitialized(_this));
    ReactEditor.disable = _this.disable.bind(_assertThisInitialized(_this));
    ReactEditor.enable = _this.enable.bind(_assertThisInitialized(_this));
    ReactEditor.toggleState = _this.toggleState.bind(_assertThisInitialized(_this));
    ReactEditor.insertImage = _this.insertImage.bind(_assertThisInitialized(_this));
    ReactEditor.insertNode = _this.insertNode.bind(_assertThisInitialized(_this));
    ReactEditor.insertText = _this.insertText.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ReactEditor, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var options = this.props.options || {};
      window.$ = _jquery.default;
      var codeview = this.props.codeview; // const codeviewCommand = codeview ? 'codeview.activate' : 'codeview.deactivate';

      options.callbacks = this.callbacks;
      this.editor = (0, _jquery.default)("#".concat(this.uid));

      _jquery.default.extend(true, _jquery.default.summernote.options.modules, {
        'hintPopover': _CustomHintPopover.default
      });

      console.log(_jquery.default.summernote);
      this.editor.summernote(options);

      if (codeview) {
        this.editor.summernote("codeview.activate");
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var props = this.props;
      var codeview = nextProps.codeview;
      var codeviewCommand = codeview ? "codeview.activate" : "codeview.deactivate";

      if (typeof nextProps.value === "string" && props.value !== nextProps.value) {
        this.replace(nextProps.value);
      }

      if (typeof nextProps.disabled === "boolean" && props.disabled !== nextProps.disabled) {
        this.toggleState(nextProps.disabled);
      }

      if (codeview !== props.codeview) {
        this.editor.summernote(codeviewCommand);
      }
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate() {
      return false;
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.editor.summernote) {
        this.editor.summernote("destroy");
      }
    }
  }, {
    key: "onInit",
    value: function onInit() {
      var _this$props = this.props,
          disabled = _this$props.disabled,
          onInit = _this$props.onInit;
      var $container = this.editor.parent();
      this.noteEditable = $container.find(".note-editable");
      this.notePlaceholder = $container.find(".note-placeholder");

      if (typeof disabled === "boolean") {
        this.toggleState(disabled);
      }

      if (typeof onInit === "function") {
        onInit({
          summernote: this.editor.summernote.bind(this.editor),
          focus: this.focus,
          isEmpty: this.isEmpty,
          reset: this.reset,
          replace: this.replace,
          disable: this.disable,
          enable: this.enable,
          insertImage: this.insertImage,
          insertNode: this.insertNode,
          insertText: this.insertText
        });
      }
    }
  }, {
    key: "onImageUpload",
    value: function onImageUpload(images) {
      var onImageUpload = this.props.onImageUpload;

      if (typeof onImageUpload === "function") {
        onImageUpload(images, this.insertImage);
      }
    }
  }, {
    key: "focus",
    value: function focus() {
      this.editor.summernote("focus");
    }
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return this.editor.summernote("isEmpty");
    }
  }, {
    key: "reset",
    value: function reset() {
      this.editor.summernote("reset");
    }
  }, {
    key: "replace",
    value: function replace(content) {
      var noteEditable = this.noteEditable,
          notePlaceholder = this.notePlaceholder;
      var prevContent = noteEditable.html();
      var contentLength = content.length;

      if (prevContent !== content) {
        if (this.isEmpty() && contentLength > 0) {
          notePlaceholder.hide();
        } else if (contentLength === 0) {
          notePlaceholder.show();
        }

        noteEditable.html(content);
      }
    }
  }, {
    key: "disable",
    value: function disable() {
      this.editor.summernote("disable");
    }
  }, {
    key: "enable",
    value: function enable() {
      this.editor.summernote("enable");
    }
  }, {
    key: "toggleState",
    value: function toggleState(disabled) {
      if (disabled) {
        this.disable();
      } else {
        this.enable();
      }
    }
  }, {
    key: "insertImage",
    value: function insertImage(url, filenameOrCallback) {
      this.editor.summernote("insertImage", url, filenameOrCallback);
    }
  }, {
    key: "insertNode",
    value: function insertNode(node) {
      this.editor.summernote("insertNode", node);
    }
  }, {
    key: "insertText",
    value: function insertText(text) {
      this.editor.summernote("insertText", text);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          value = _this$props2.value,
          defaultValue = _this$props2.defaultValue,
          className = _this$props2.className;
      var html = value || defaultValue;
      return _react.default.createElement("div", {
        className: className
      }, _react.default.createElement("div", {
        id: this.uid,
        dangerouslySetInnerHTML: {
          __html: html
        }
      }));
    }
  }, {
    key: "callbacks",
    get: function get() {
      var props = this.props;
      return {
        onInit: this.onInit,
        onEnter: props.onEnter,
        onFocus: props.onFocus,
        onBlur: props.onBlur,
        onKeyup: props.onKeyUp,
        onKeydown: props.onKeyDown,
        onPaste: props.onPaste,
        onChange: props.onChange,
        onImageUpload: this.onImageUpload
      };
    }
  }]);

  return ReactEditor;
}(_react.Component);

ReactEditor.propTypes = {
  value: _propTypes.default.string,
  defaultValue: _propTypes.default.string,
  codeview: _propTypes.default.bool,
  className: _propTypes.default.string,
  options: _propTypes.default.object,
  disabled: _propTypes.default.bool,
  onInit: _propTypes.default.func,
  onEnter: _propTypes.default.func,
  onFocus: _propTypes.default.func,
  onBlur: _propTypes.default.func,
  onKeyUp: _propTypes.default.func,
  onKeyDown: _propTypes.default.func,
  onPaste: _propTypes.default.func,
  onChange: _propTypes.default.func,
  onImageUpload: _propTypes.default.func
};
var _default = ReactEditor;
exports.default = _default;