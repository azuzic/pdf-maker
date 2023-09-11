<template>
    <div class="w-64 min-w-[256px] bg-PE_dark_primary border-r border-PE_dark_border drop-shadow-lg z-[200] h-full flex flex-col justify-center items-center px-8">

        <Prompt :showPrompt="showHTMLPrompt" title="Download PDF" variable="Filename" placeholder="Name" @submitPrompt="saveHTML" />
        <Prompt :showPrompt="showTemplatePrompt" title="Download Template" variable="Template name" placeholder="Name" @submitPrompt="saveTemplate" />
        <Prompt :showPrompt="globalStore.showImagePrompt" title="Change Image URL" variable="Image URL" placeholder="Url" @submitPrompt="globalStore.changeURL" />

        <span class="w-full text-left text-PE_dark_gray font-bold pt-12 pb-2">Items:</span>
        <draggable class="flex flex-col items-center border border-PE_dark_border rounded mb-2" 
            @mousedown="globalStore.setSelected(null, null)"
            :list="globalStore.PredefinedPDFelements" v-if="globalStore.refresh" item-key="id"  
            @change="globalStore.resetPredefinedPDFelements()"
            :clone="clone" :group="{ name: 'pdfelements', pull: pullFunction }">
            <template #item="{ element }">
                <PDF_Element :item="element" :main="true"/>
            </template>
        </draggable>

        <span class="w-full text-left text-PE_dark_gray font-bold pb-2">Hierarchy:</span>
        <nested-draggable :list="globalStore.PDFelements"/>
        
        <div class="flex flex-col w-full gap-2 mb-4 mt-2">
            <div class="w-full">
                <div class="w-full flex mb-1.5 font-bold text-slate-300">PDF margin Y:</div>
                <Slider @start="globalStore.margin.c = true" @end="globalStore.margin.c = false"
                    class="w-full mb-1.5 slider" v-model="globalStore.margin.Y" :min="0" :max="1" :step="-1" showTooltip="focus" :merge="0.01" :lazy="false" />
                <div class="w-full flex mb-1.5 font-bold text-slate-300">PDF margin X:</div>
                <Slider @start="globalStore.margin.c = true" @end="globalStore.margin.c = false"
                    class="w-full mb-1.5 slider" v-model="globalStore.margin.X" :min="0" :max="1" :step="-1" showTooltip="focus" :merge="0.01" :lazy="false" />
            </div>
            <div class="inline-flex items-center text-left whitespace-nowrap focus:outline-none transition-colors focus:ring duration-150 border
                cursor-pointer rounded border-blue-500 ring-blue-700 text-blue-500 hover:bg-blue-600 hover:text-white hover:border-blue-600 py-2 px-3">
                <input type="file" ref="fileInput" class="absolute cursor-pointer left-0 top-0 px-4 pt-1.5 pb-1 w-full opacity-0 rounded-md text-white" 
                @change="loadTemplate"/>
                <i class="fa-solid fa-file-import w-8"></i>
                <span class="grow">Load Template</span>
            </div>
            <button class="inline-flex items-center text-left whitespace-nowrap focus:outline-none transition-colors focus:ring duration-150 border
            cursor-pointer rounded border-blue-500 ring-blue-700 text-blue-500 hover:bg-blue-600 hover:text-white hover:border-blue-600 py-2 px-3" 
                @click="showTemplatePrompt = true">
                <i class="fa-solid fa-file-export w-8"></i>
                <span class="grow">Save Template</span>
            </button>
            <button class="inline-flex items-center text-left whitespace-nowrap focus:outline-none transition-colors focus:ring duration-150 border
            cursor-pointer rounded border-blue-500 ring-blue-700 text-blue-500 hover:bg-blue-600 hover:text-white hover:border-blue-600 py-2 px-3" 
                @click="savePDF()">
                <i class="fa-solid fa-file-pdf w-8"></i>
                <span class="grow">Save as PDF</span>
            </button>
            <button class="inline-flex items-center text-left whitespace-nowrap focus:outline-none transition-colors focus:ring duration-150 border
            cursor-pointer rounded border-blue-500 ring-blue-700 text-blue-500 hover:bg-blue-600 hover:text-white hover:border-blue-600 py-2 px-3" 
                @click="showHTMLPrompt = true">
                <i class="fa-solid fa-file-code w-8"></i>
                <span class="grow">Save as HTML</span>
            </button>
        </div>
    </div>
</template>

<script>
import { useGlobalStore } from '@/stores/globalStore'
import draggable from 'vuedraggable'
import Slider from '@vueform/slider'
import PDF_Element from "@/components/PDF_Element.vue"
import cryptoRandomString from 'crypto-random-string';
import nestedDraggable from "@/components/helpers/nested.vue";
import Prompt from '@/components/helpers/Prompt.vue';
export default {
    name: "PDF_EditorBar",
    components: { Slider, draggable, PDF_Element, nestedDraggable, Prompt },
    setup() {
        const globalStore = useGlobalStore();
        globalStore.update();
        return { 
            globalStore, 
        };
    },
    mounted() {
        this.checkMove();
    },
    data() {
        return {
            controlOnStart: true,
            showHTMLPrompt: false,
            showTemplatePrompt: false
        }
    },
    methods: {
        saveHTML(fileName, bool) {
            this.showHTMLPrompt = false;
            if (!bool) return;
            const divContent = document.getElementById("pdf-content").innerHTML;
            const blob = new Blob([divContent], { type: 'text/html' });
            const a = document.createElement('a');
            a.href = window.URL.createObjectURL(blob);
            a.download = fileName+'.html';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        },
        async savePDF() {
            await this.$htmlToPaper('printMe');
        },
        async loadTemplate(event) {
            const file = event.target.files[0];
            if (file) {
                const text = await file.text();
                this.globalStore.PDFelements = JSON.parse(text);
            }
        },
        async saveTemplate(fileName, bool) {
            this.showTemplatePrompt = false;
            if (!bool) return;
            const variableContent = JSON.stringify(this.globalStore.PDFelements);

            const blob = new Blob([variableContent], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = fileName + ".txt";
            a.style.display = 'none';

            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        },
        clone( item ) {
            let clone = JSON.parse(JSON.stringify(item));
            clone.id = cryptoRandomString({ length: 32, type: 'alphanumeric' });
            clone.list[0].id = cryptoRandomString({ length: 32, type: 'alphanumeric' });
            clone.list[0].parentID = clone.id;
            return clone;
        },
        pullFunction() {
            return "clone";
        },
        async checkMove(){
            await this.globalStore.resetPredefinedPDFelements();
        },
        async checkMove(){
            await this.globalStore.resetPredefinedPDFelements();
        },
        checkList(change) {
            console.log(change);
            if (change.added) {
                let temp = JSON.parse(JSON.stringify(change.added.element)); 
                temp.list[0].parentID = temp.id;
                let index = this.globalStore.PDFelements.findIndex(item => item.id === temp.id);
                if (index !== -1) this.globalStore.PDFelements[index] = temp;
                else console.log("Element with ID " + targetId + " not found.");                
            }
            this.globalStore.resetPredefinedPDFelements()
        }
    },
}
</script>
<style lang="scss" src="@vueform/slider/themes/default.css">
</style>
<style scoped>
.slider {
  --slider-bg: #f1f5f9;
  --slider-connect-bg: #3b82f6;
  --slider-tooltip-bg: #3b82f6;
}
</style>