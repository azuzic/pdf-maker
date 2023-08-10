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
        type: null,
        entered: false,

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
                    type: "text",
                    innerHTML: "TEXT",
                    widthType: "Fit",
                    width: "100",
                    positionType: "Static",
                    classes: 'flex-none'
                },
                {
                    id: "2",
                    type: "line",
                },
                {
                    id: "3",
                    type: "image",
                },
            ]
            this.PDFelements = [...new Set(this.PDFelements)];
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
        },
        async wait(value) {
            await wait(value);
        }
    }
});