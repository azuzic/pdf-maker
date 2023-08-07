<template>
    <div class="h-screen bg-slate-950 text-slate-400 flex flex-col items-center p-8">
        <div class="flex justify-center mb-4 text-4xl font-bold">PDF</div>
        <div class="h-1 w-full bg-slate-400 rounded-full my-4"></div>
        <div class="flex justify-center items-center gap-2">
            <HTML_PreviewEditor/>
            <PDF_Preview/>            
        </div>
        <div class="h-1 w-full bg-slate-400 rounded-full my-4"></div>

        <div class="flex gap-4">
            <button class="bg-gray-900 hover:bg-gray-700 px-4 py-1 rounded-full" @click="addText()">Add Text</button>
            <button class="bg-gray-900 hover:bg-gray-700 px-4 py-1 rounded-full" @click="savePDF()">Save PDF</button>
        </div>
    </div>
</template>

<script>
import { useGlobalStore } from '@/stores/globalStore'
import HTML_PreviewEditor from '@/components/HTML_PreviewEditor.vue';
import PDF_Preview from '@/components/PDF_Preview.vue';
export default {
    name: "HomeView",
    components: { HTML_PreviewEditor, PDF_Preview },
    setup() {
        const globalStore = useGlobalStore();
        globalStore.createPDF();
        return { globalStore };
    },
    methods: {
        addText() {
            this.globalStore.state.doc.text(0, this.globalStore.state.increment, "TEST: !#$%&/()=?*~ˇ^˘°˛`˙´˝¨¸");
            this.globalStore.updateVuePDF();
        },
        savePDF() {
            this.globalStore.doc.save();
        }
    },
}
</script>