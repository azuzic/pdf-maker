import { defineStore } from "pinia";
import { nextTick } from "vue";

let wait = function (seconds) {
    return new Promise((resolveFn) => {
        setTimeout(resolveFn, seconds * 1000);
    });
};

export const useGlobalStore = defineStore("globalStore", {
    state: () => ({

        refresh: true,
        selected: null,
        highlighted: null,
        type: null,
        entered: false,
        moving: null,

        margin: {c:false,X:0.5, Y:0.5},

        PredefinedPDFelements: [],
        PDFelements: [],

        selectedItem: null
    }),
    actions: {
        async resetPredefinedPDFelements() {
            await this.update();
            this.PredefinedPDFelements = [
                {
                    id: "1",
                    justify: "Start",
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
                    justify: "Center",
                    list: [
                        {
                            parentID: "2",
                            id: "21",
                            type: "image",
                            url: "",

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
            if (item == null) {
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
            this.selectedItem = item;
        },
        async wait(value) {
            await wait(value);
        }
    }
});