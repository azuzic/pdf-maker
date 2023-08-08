import { defineStore } from "pinia";
import { usePDF } from '@tato30/vue-pdf'

export const useGlobalStore = defineStore("globalStore", {
    state: () => ({
        state: {
            pdf: null,
            doc: null,
            text: "",
            increment: 5,
            scale: 1,
        },
    }),
    actions: {
        createPDF() {
            //this.state.doc = new pdfkit();
            //this.updateVuePDF();
        },
        updateVuePDF() {
            //const { pdf, pages, info } = usePDF(this.state.doc.output("datauristring"))
            //this.state.pdf = pdf;
        }
    }
});