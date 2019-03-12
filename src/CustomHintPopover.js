import $ from "jquery";
import HintPopover from "summernote/src/js/base/module/HintPopover";
import key from "summernote/src/js/base/core/key";
import range from "summernote/src/js/base/core/range";
import dom from "summernote/src/js/base/core/dom";

export default class CustomHintPopover extends HintPopover{
    constructor(context){
        super(context);
    }

    replace() {
        let $item = this.$content.find('.note-hint-item.active');

        if ($item.length) {

            // XXX: consider to move codes to editor for recording redo/undo.
            let convertedText = this.lastWordRange.sc.textContent;
            let string = window.inString;

            let index = convertedText.indexOf(string);
            let lastIndex = convertedText.length - 1;
            convertedText = convertedText.substr(0,index);
            convertedText = convertedText.split(" ");
            convertedText = convertedText[convertedText.length - 1];
            convertedText = convertedText ? convertedText.replace(string, "") : "";

            let text = `${index !== 0 ? convertedText: ""}${$item.text()}`;
            $item = $item.text(text);

            const hint = this.hints[$item.data('index')];
            const item = $item.text();
            let node = hint.content ? hint.content(item) : item;
            if (typeof node === 'string') {
                node = dom.createText(node);
            }

            this.lastWordRange.insertNode(node);
            range.createFromNode(node).collapse().select();

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

    createItemTemplates(hintIdx, items) {
        const hint = this.hints[hintIdx];
        return items.map((item, idx) => {
            let $item = $('<div class="note-hint-item"/>');
            if(idx === 0) {
                $item = $('<div class="note-hint-item active"/>');
            }
            $item.append(hint.template ? hint.template(item) : item + '');
            $item.data({
                'index': hintIdx,
                'item': item
            });
            return $item;
        });
    }

    handleKeydown(e){
        if (!this.$popover.is(':visible')) {
            return;
        }

        if (e.keyCode === key.code.ENTER) {
            e.preventDefault();
            this.replace();
            window.inString = "";
        } else if (e.keyCode === key.code.UP) {
            e.preventDefault();
            this.moveUp();
        } else if (e.keyCode === key.code.DOWN) {
            e.preventDefault();
            this.moveDown();
        } else if (e.keyCode === key.code.SPACE) {
            e.preventDefault();
            this.replace();
            window.inString = "";
        }
    }
}