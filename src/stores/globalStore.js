import { defineStore } from "pinia";

export const useGlobalStore = defineStore("globalStore", {
    state: () => ({
        PDFelements: [
            1,2,3
        ]
    }),
    actions: {
    }
});