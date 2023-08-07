import { defineStore } from "pinia";
import { usePDF } from '@tato30/vue-pdf'
import { jsPDF } from "jspdf";

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
            this.state.doc = new jsPDF();
            this.state.doc.setFont("times", "italic");
            this.updateVuePDF();
        },
        updateVuePDF() {
            const { pdf, pages, info } = usePDF(this.state.doc.output("datauristring"))
            this.state.pdf = pdf;
        }
    }
});