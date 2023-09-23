import { defineStore } from "pinia";
import { nextTick } from "vue";

let wait = function (seconds) {
    return new Promise((resolveFn) => {
        setTimeout(resolveFn, seconds * 1000);
    });
};

export const useGlobalStore = defineStore("globalStore", {
    state: () => ({
        //UNDO REDO
        undoStack: [],
        redoStack: [],
        stackBuffer: [],
        canAddToStack: true,

        //VARIABLE PREVIEW
        variablePreview: false,
        variables: {},
        innerHTML: [],
        calculatedInnerHTML: "",

        //HELPING VARIABLES
        refresh: true,
        selected: null,
        highlighted: null,
        type: null,
        entered: false,
        moving: null,
        showImagePrompt: false,
        imageUrl: null,

        //MARGIN
        margin: {c:false,X:0.5, Y:0.5},

        //PDF ELEMENTS
        PredefinedPDFelements: [],
        PDFelements: [],

        selectedItem: null
    }),
    actions: {
        async undo() {
            this.canAddToStack = false;
            let element = JSON.stringify(this.undoStack.pop());

            if (JSON.stringify(this.stackBuffer) != JSON.stringify(this.redoStack[this.redoStack.length-1]))
                this.redoStack.push(JSON.parse(JSON.stringify(this.stackBuffer)));
            this.stackBuffer = JSON.parse(element);

            await this.executeNextTickMultipleTimes(5);
            this.PDFelements = [];
            await this.executeNextTickMultipleTimes(5);
            this.PDFelements = JSON.parse(element);
            await this.executeNextTickMultipleTimes(5);
            this.canAddToStack = true;
        },
        async redo() {
            this.canAddToStack = false;
            let element = JSON.stringify(this.redoStack.pop());

            if (JSON.stringify(this.stackBuffer) != JSON.stringify(this.undoStack[this.undoStack.length-1]))
                this.undoStack.push(JSON.parse(JSON.stringify(this.stackBuffer)));
            this.stackBuffer = JSON.parse(element);

            await this.executeNextTickMultipleTimes(5);
            this.PDFelements = [];
            await this.executeNextTickMultipleTimes(5);
            this.PDFelements = JSON.parse(element);
            await this.executeNextTickMultipleTimes(5);
            this.canAddToStack = true;
        },
        async resetPredefinedPDFelements() {
            await this.update();
            this.PredefinedPDFelements = [
                {
                    id: "1",
                    justify: "Start",

                    heightType: "Fit",
                    height: "100",

                    list: [
                        {
                            parentID: "1",
                            id: "11",
                            type: "text",
                            innerHTML: "TEXT",

                            widthType: "Fit",
                            width: "100",
                            widthClasses: 'flex-none',

                            absolute: false,
                            top: 0,
                            left: 0,
                            initialX: 0,
                            initialY: 0,
                            offsetX: 0,
                            offsetY: 0
                        },
                    ]
                },
                {
                    id: "2",
                    justify: "Start",

                    heightType: "Fit",
                    height: "100",
                    
                    list: [
                        {
                            parentID: "2",
                            id: "21",
                            type: "image",
                            url: "https://fipu.unipu.hr/_pub/themes_static/unipu2020/fipu/icons/fipu_hr.png",

                            widthType: "Grow",
                            width: "500",
                            widthClasses: 'flex-none',

                            absolute: false,
                            top: 0,
                            left: 0,
                            initialX: 0,
                            initialY: 0,
                            offsetX: 0,
                            offsetY: 0
                        },
                    ]
                },
                {
                    id: "3",
                    justify: "Start",

                    heightType: "Fit",
                    height: "100",
                    
                    list: [
                        {
                            parentID: "3",
                            id: "31",
                            type: "line",
                            dashed: false,

                            widthType: "Grow",
                            width: "500",
                            widthClasses: 'flex-none',

                            absolute: false,
                            top: 0,
                            left: 0,
                            initialX: 0,
                            initialY: 0,
                            offsetX: 0,
                            offsetY: 0
                        },
                    ]
                },
            ]
            await this.update();
        },
        async update() {
            this.refresh = false;
            await nextTick();
            this.refresh = true; 
        },
        async executeNextTickMultipleTimes(count) {
            for (let i = 0; i < count; i++) {
                await nextTick();
            }
        },
        async setSelected(item, type) {
            this.moving = null;
            this.selectedItem = item;
            if (item == null) {
                this.highlighted = null;
                this.selectedItem = null;
                this.type = null;
                this.selected = null;
                return;
            }
            if (this.selected == item.id) return;
            this.type = null;
            this.selected = null;
            await this.executeNextTickMultipleTimes(5);
            this.type = type;
            this.selected = item.id;
        },
        async wait(value) {
            await wait(value);
        },
        changeURL(url, bool) {
            this.showImagePrompt = false;
            if (!bool)
                return;
            console.log("test");
            this.imageUrl.url = url;
        },
    }
});