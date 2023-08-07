<template>
    <div>
        PDF:
    </div>
    <hr>
    <button @click="test()">test</button>
    <hr>
</template>

<script>
import { VuePDF, usePDF } from '@tato30/vue-pdf'
import { jsPDF } from "jspdf";
export default {
    name: "App.vue",
    components: { VuePDF },
    data() {
        return {
            pdf: null,
        }
    },
    methods: {
        test() {
            var doc = new jsPDF();
            doc.text(20, 20, 'Hello world!');
            doc.text(20, 30, 'This is client-side Javascript, pumping out a PDF.');
            doc.addPage();
            doc.text(20, 20, 'Do you like that?');
            this.pdf = doc;
        }
    }
}
</script>