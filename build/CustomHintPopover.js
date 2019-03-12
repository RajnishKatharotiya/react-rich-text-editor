"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jquery = _interopRequireDefault(require("jquery"));

var _HintPopover2 = _interopRequireDefault(require("summernote/src/js/base/module/HintPopover"));

var _key = _interopRequireDefault(require("summernote/src/js/base/core/key"));

var _range = _interopRequireDefault(require("summernote/src/js/base/core/range"));

var _dom = _interopRequireDefault(require("summernote/src/js/base/core/dom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var CustomHintPopover =
/*#__PURE__*/
function (_HintPopover) {
  _inherits(CustomHintPopover, _HintPopover);

  function CustomHintPopover(context) {
    _classCallCheck(this, CustomHintPopover);

    return _possibleConstructorReturn(this, _getPrototypeOf(CustomHintPopover).call(this, context));
  }

  _createClass(CustomHintPopover, [{
    key: "replace",
    value: function replace() {
      var $item = this.$content.find('.note-hint-item.active');

      if ($item.length) {
        // XXX: consider to move codes to editor for recording redo/undo.
        var convertedText = this.lastWordRange.sc.textContent;
        var string = window.inString;
        var index = convertedText.indexOf(string);
        var lastIndex = convertedText.length - 1;
        convertedText = convertedText.substr(0, index);
        convertedText = convertedText.split(" ");
        convertedText = convertedText[convertedText.length - 1];
        convertedText = convertedText ? convertedText.replace(string, "") : "";
        var text = "".concat(index !== 0 ? convertedText : "").concat($item.text());
        $item = $item.text(text);
        var hint = this.hints[$item.data('index')];
        var item = $item.text();
        var node = hint.content ? hint.content(item) : item;

        if (typeof node === 'string') {
          node = _dom.default.createText(node);
        }

        this.lastWordRange.insertNode(node);

        _range.default.createFromNode(node).collapse().select();

        this.lastWordRange = null;
        this.hide();
        this.context.triggerEvent('change', this.$editable.html(), this.$editable[0]);
        this.context.invoke('editor.focus');
        /*
        
                    console.log(index, lastIndex);
                    if(lastIndex === index) {
                        let space = document.createElement('span');
                        space.innerHTML = '&nbsp;';
                        window.$("#reactRichEditor").summernote('insertNode', space);
                    }
        */
      }
    }
  }, {
    key: "createItemTemplates",
    value: function createItemTemplates(hintIdx, items) {
      var hint = this.hints[hintIdx];
      return items.map(function (item, idx) {
        var $item = (0, _jquery.default)('<div class="note-hint-item"/>');

        if (idx === 0) {
          $item = (0, _jquery.default)('<div class="note-hint-item active"/>');
        }

        $item.append(hint.template ? hint.template(item) : item + '');
        $item.data({
          'index': hintIdx,
          'item': item
        });
        return $item;
      });
    }
  }, {
    key: "handleKeydown",
    value: function handleKeydown(e) {
      if (!this.$popover.is(':visible')) {
        return;
      }

      if (e.keyCode === _key.default.code.ENTER) {
        e.preventDefault();
        this.replace();
        window.inString = "";
      } else if (e.keyCode === _key.default.code.UP) {
        e.preventDefault();
        this.moveUp();
      } else if (e.keyCode === _key.default.code.DOWN) {
        e.preventDefault();
        this.moveDown();
      } else if (e.keyCode === _key.default.code.SPACE) {
        e.preventDefault();
        this.replace();
        window.inString = "";
      }
    }
  }]);

  return CustomHintPopover;
}(_HintPopover2.default);

exports.default = CustomHintPopover;