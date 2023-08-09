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
        refreshToolbar: true,
        selected: null,
        type: null,
        entered: false,
        margin: {c:false,X:0.5, Y:0.5},
        PredefinedPDFelements: [],
        PDFelements: []
    }),
    actions: {
        async resetPredefinedPDFelements() {
            await this.update();
            this.PredefinedPDFelements = [
                {
                    id: 1,
                    type: "text",
                },
                {
                    id: 2,
                    type: "line",
                },
                {
                    id: 3,
                    type: "image",
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
        async setSelected(value, type) {
            if (this.selected == value) return;
            this.type = null;
            this.selected = null;
            await this.executeNextTickMultipleTimes(5);
            this.type = type;
            this.selected = value;
        }
    }
});