"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _ReactEditor = _interopRequireDefault(require("./ReactEditor"));

require("../public/App.css");

var _axios = _interopRequireDefault(require("axios"));

var _qs = _interopRequireDefault(require("qs"));

var _materialIconsReact = _interopRequireDefault(require("material-icons-react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _antd = require("antd");

require("../node_modules/font-awesome/css/font-awesome.min.css");

require("../node_modules/antd/dist/antd.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ImageUploader = function ImageUploader(context) {
  var ui = window.$.summernote.ui; // create button

  var button = ui.button({
    contents: '<i class="fa fa-picture-o"/>',
    tooltip: 'Insert Image',
    click: function click() {
      // invoke insertText method with 'hello' on editor module.
      window.$(".imageModel").modal('show');
    }
  });
  return button.render(); // return button as jquery object
};

var LanguageDropdown = function LanguageDropdown(context) {
  var ui = window.$.summernote.ui;
  var list = document.getElementById('ContentDropDown');
  var languages = [{
    label: "English",
    value: "english"
  }, {
    label: "Hindi",
    value: "hindi"
  }, {
    label: "Gujarati",
    value: "gujarati"
  }, {
    label: "Tamil",
    value: "tamil"
  }, {
    label: "Kannada",
    value: "kannada"
  }, {
    label: "Panjabi",
    value: "panjabi"
  }, {
    label: "Malayalam",
    value: "malayalam"
  }, {
    label: "Bengali",
    value: "bengali"
  }, {
    label: "Marathi",
    value: "marathi"
  }, {
    label: "Oriya",
    value: "oriya"
  }, {
    label: "Konkani(E)",
    value: "konkani(e)"
  }, {
    label: "Konkani(H)",
    value: "konkani(h)"
  }];
  var button = ui.buttonGroup([ui.button({
    className: 'dropdown-toggle',
    contents: "<span class=\"fa fa-language\"></span> ".concat(window.lang ? window.lang : "English", " <span class=\"fa fa-caret-down\"></span>"),
    tooltip: "Parámetros disponibles",
    data: {
      toggle: 'dropdown'
    }
  }), ui.dropdown({
    className: 'drop-default summernote-list',
    contents: "<ul> ".concat(languages.map(function (e) {
      return "<li>".concat(e.label, "</li>");
    }), " </ul>"),
    callback: function callback(e) {
      console.log(e);
    }
  })]);
  return button.render(); // return button as jquery object
};

var App =
/*#__PURE__*/
function (_Component) {
  _inherits(App, _Component);

  function App(props) {
    var _this;

    _classCallCheck(this, App);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(App).call(this, props));
    _this.state = {
      editorValue: "",
      lang: "english",
      stageEditorValue: ""
    };
    _this.handleEditorValueChange = _this.handleEditorValueChange.bind(_assertThisInitialized(_this));
    _this.handleLangChange = _this.handleLangChange.bind(_assertThisInitialized(_this));
    _this.handleImageInsert = _this.handleImageInsert.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var element = document.getElementsByClassName("note-editable")[0];
      var spaces = new Set([0]);
      window.prevString = '';
      window.currentString = '';
      window.languages = this.props.languages;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var insertImage = this.props.insertImage;

      if (insertImage !== "" && insertImage && prevProps.insertImage !== insertImage) {
        this.handleImageInsert(insertImage);
      }
    }
  }, {
    key: "handleEditorValueChange",
    value: function handleEditorValueChange(editorValue) {
      window.$(".note-editable a").each(function () {
        this.onclick = function () {
          var win = window.open(this.href, '_blank');
          win.focus();
        };
      });
      var HTML = window.$(window.$("#reactRichEditor").summernote("code"));
      var text = HTML.text();

      if (this.props.onCodeChange) {
        this.props.onCodeChange(editorValue);
      }

      if (this.props.onTextChange) {
        this.props.onTextChange(text);
      }

      this.setState({
        editorValue: editorValue
      });
    }
  }, {
    key: "handleLangChange",
    value: function handleLangChange(lang) {
      window.lang = lang;
      this.setState({
        lang: lang
      });
    }
  }, {
    key: "handleImageInsert",
    value: function handleImageInsert(url) {
      window.$("#reactRichEditor").summernote("insertImage", url);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          lang = _this$state.lang,
          editorValue = _this$state.editorValue;
      var _this$props = this.props,
          imageModel = _this$props.imageModel,
          height = _this$props.height,
          languages = _this$props.languages,
          showAll = _this$props.showAll;

      var menu = _react.default.createElement(_antd.Menu, {
        className: "ContentDropDown",
        id: "ContentDropDown",
        onClick: function onClick(e) {
          return _this2.handleLangChange(e.key);
        }
      }, languages ? languages.map(function (e) {
        return _react.default.createElement(_antd.Menu.Item, {
          className: lang === e.value ? "ant-dropdown-menu-item-active" : "",
          key: e.value
        }, e.label);
      }) : "");

      return _react.default.createElement("div", {
        className: "React-editor-container"
      }, _react.default.createElement(_ReactEditor.default, {
        value: editorValue,
        options: {
          height: height,
          fontNames: ["Arial", "Arial Black", "Comic Sans MS", "Courier New"],
          placeholder: "Compose Mail",
          dialogsFade: true,
          disableResizeEditor: true,
          toolbar: [["style", ["undo", "redo", showAll ? "style" : "", "fontsize"]], ["font", ["bold", "underline", "clear"]], ["fontname", [showAll ? "fontname" : ""]], ["color", [showAll ? "color" : ""]], ["para", ["ul", "ol", "paragraph"]], ["table", [showAll ? "table" : ""]], ["float", ["floatLeft", "floatRight", "floatNone"]], ["insert", ["link", imageModel ? 'customImage' : ""]], ["view", [showAll ? "codeview" : ""]]],
          buttons: {
            customImage: ImageUploader,
            LanguageDropdown: LanguageDropdown
          },
          hint: {
            match: /\b(\w{1,})$/,
            search: function search(inString, callback) {
              var lang = window && window.lang ? window.lang.toLowerCase() : "english";

              if (lang && lang !== "english") {
                console.log("from app", inString);
                window.inString = inString;

                var query = _qs.default.stringify({
                  inString: inString,
                  lang: lang
                });

                var queryUrl = "http://quill.magicauthor.ml/processWordJSON?".concat(query);

                _axios.default.get(queryUrl).then(function (res) {
                  var resData = res.data.twords && res.data.twords[0] && res.data.twords[0].options ? res.data.twords[0].options : [];
                  var data = [];
                  data.push.apply(data, _toConsumableArray(resData).concat([inString]));
                  callback(data);
                });
              } else {
                callback([]);
              }
            }
          }
        },
        onChange: this.handleEditorValueChange
      }), _react.default.createElement(_antd.Dropdown, {
        overlay: menu,
        placement: "topLeft"
      }, _react.default.createElement("div", {
        className: "React-editor-container__language-btn-box"
      }, _react.default.createElement(_materialIconsReact.default, {
        icon: "translate"
      }))), _react.default.createElement("div", {
        id: "uploadModal",
        className: "modal fade imageModel",
        role: "dialog"
      }, _react.default.createElement("div", {
        className: "modal-dialog"
      }, _react.default.createElement("div", {
        className: "modal-content"
      }, imageModel))));
    }
  }]);

  return App;
}(_react.Component);

App.propTypes = {
  height: _propTypes.default.number,
  imageModel: _propTypes.default.element,
  insertImage: _propTypes.default.string,
  languages: _propTypes.default.array,
  onTextChange: _propTypes.default.func,
  onCodeChange: _propTypes.default.func,
  showAll: _propTypes.default.bool
};
App.defaultProps = {
  height: 500,
  imageModel: null,
  insertImage: "",
  showAll: false,
  languages: [{
    label: "English",
    value: "english"
  }, {
    label: "Hindi",
    value: "hindi"
  }, {
    label: "Gujarati",
    value: "gujarati"
  }, {
    label: "Tamil",
    value: "tamil"
  }, {
    label: "Kannada",
    value: "kannada"
  }, {
    label: "Panjabi",
    value: "panjabi"
  }, {
    label: "Malayalam",
    value: "malayalam"
  }, {
    label: "Bengali",
    value: "bengali"
  }, {
    label: "Marathi",
    value: "marathi"
  }, {
    label: "Oriya",
    value: "oriya"
  }, {
    label: "Konkani(E)",
    value: "konkani(e)"
  }, {
    label: "Konkani(H)",
    value: "konkani(h)"
  }]
};
var _default = App;
exports.default = _default;