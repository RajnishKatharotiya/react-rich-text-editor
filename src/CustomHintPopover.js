import $ from "jquery";
import HintPopover from "summernote/src/js/base/module/HintPopover";
import key from "summernote/src/js/base/core/key";

export default class CustomHintPopover extends HintPopover{
    constructor(context){
        super(context);
     console.log('HintPopover Called', context)
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
        } else if (e.keyCode === key.code.UP) {
            e.preventDefault();
            this.moveUp();
        } else if (e.keyCode === key.code.DOWN) {
            e.preventDefault();
            this.moveDown();
        } else if (e.keyCode === key.code.SPACE) {
            e.preventDefault();
            this.replace();
        }
    }
}