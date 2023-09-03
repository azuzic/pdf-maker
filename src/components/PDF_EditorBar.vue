<template>
    <div class="w-64 min-w-[256px] bg-slate-800 h-full flex flex-col justify-center items-center px-8">
        <draggable class="py-4 h-64 overflow-y-auto flex flex-col pt-16 gap-4 items-center" @mousedown="globalStore.setSelected(null, null)"
            :list="globalStore.PredefinedPDFelements" v-if="globalStore.refresh" item-key="id"  
            @change="globalStore.resetPredefinedPDFelements()"
            :clone="clone" :group="{ name: 'pdfelements', pull: pullFunction }">
            <template #item="{ element }">
                <PDF_Element :item="element" :main="true"/>
            </template>
        </draggable>

        <nested-draggable :list="globalStore.PDFelements"/>
        
        <div class="p-2 flex flex-col justify-center items-center w-full gap-2">
            <div class="w-full">
                <div class="w-full flex mb-3 text-lg font-bold text-slate-300">PDF margin Y:</div>
                <Slider @start="globalStore.margin.c = true" @end="globalStore.margin.c = false"
                    class="w-full mb-2" v-model="globalStore.margin.Y" :min="0" :max="1" :step="-1" showTooltip="focus" :merge="0.01" :lazy="false" />
                <div class="w-full flex mb-3 text-lg font-bold text-slate-300">PDF margin X:</div>
                <Slider @start="globalStore.margin.c = true" @end="globalStore.margin.c = false"
                    class="w-full mb-4" v-model="globalStore.margin.X" :min="0" :max="1" :step="-1" showTooltip="focus" :merge="0.01" :lazy="false" />
            </div>
            <div class="relative flex justify-center px-4 py-2 w-full bg-emerald-600 hover:bg-emerald-500 rounded-md font-bold text-emerald-950">
                <input type="file" ref="fileInput" class="absolute cursor-pointer left-0 top-0 px-4 pt-1.5 pb-1 w-full opacity-0 rounded-md font-bold text-emerald-950" 
                @change="loadTemplate"/>
                <div>Load Template</div>
            </div>
            <button class="px-4 py-2 w-full bg-emerald-600 hover:bg-emerald-500 rounded-md font-bold text-emerald-950" 
                @click="saveTemplate()">
                Save Template
            </button>
            <button class="px-4 py-2 w-full bg-emerald-600 hover:bg-emerald-500 rounded-md font-bold text-emerald-950" 
                @click="savePDF()">
                Save PDF
            </button>
            <button class="px-4 py-2 w-full bg-emerald-600 hover:bg-emerald-500 rounded-md font-bold text-emerald-950" 
                @click="callService()">
                Call Service
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
import { PDF } from "@/services";
export default {
    name: "PDF_EditorBar",
    components: { Slider, draggable, PDF_Element, nestedDraggable },
    setup() {
        const globalStore = useGlobalStore();
        globalStore.update();
        return { globalStore };
    },
    mounted() {
        this.checkMove();
    },
    data() {
        return {
            controlOnStart: true,
        }
    },
    methods: {
        async callService() {
            const divContent = document.getElementById("pdf-content").innerHTML;
            let response = await PDF.getPDF(
                {
                    "html": divContent,
                    "data": { 
                        "student_ime": "Luka",
                        "student_prezime": "Blašković",
                        "student_broj_mobitela": "0917217631",
                        "student_OIB": "56768537128",
                        "student_email": "luka.blaskovi@student.unipu.hr",
                        "mentor_ime": "Nikola",
                        "mentor_prezime": "Tanković",
                        "mentor_email": "",
                        "detaljan_opis_zadatka": 
                        "Zadatak je bio izraditi konverzacijskog intent-recognition chatbot-a koji odgovara na " +
                        "upite studenata ili služi za pokretanje nekih procesa (pr. prijava zadataka za praksu). " +
                        "U prvoj fazi radio sam kategorizaciju studentskih upita u predefinirane topicse " +
                        "koristeći spacy i sentence-transformer (SBERT) frameworke. Zatim je to bilo " +
                        "nadograđeno da se korisniku vrati predefinirani odgovor najveće sličnosti s " +
                        "postavljenim free-form pitanjem. Servis je implementiran u python asyncio dok je " +
                        "jednostavan frontend izrađen u Vue.js-u.",
                        "dogovoreni_broj_sati": 100,
                        "pocetak_prakse": "1/2/2023",
                        "kraj_prakse": "1/3/2023",
                        "alokacija_potvrda": true,
                        "kontakt_potvrda": true,
                        "poslodavac": "Sveučilište Jurja Dobile u Puli",
                        "mjesto_izvrsavanja": "Fipu Lab",
                    }
                }
            );
            console.log(response.data);
        },
        async savePDF() {
            await this.$htmlToPaper('printMe');
        },
        async loadTemplate(event) {
            console.log(event);
            const file = event.target.files[0];
            if (file) {
                const text = await file.text();
                this.globalStore.PDFelements = JSON.parse(text);
            }
        },
        async saveTemplate() {
            const variableContent = JSON.stringify(this.globalStore.PDFelements);
            const filename = 'PDFtemplate.txt';

            const blob = new Blob([variableContent], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
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