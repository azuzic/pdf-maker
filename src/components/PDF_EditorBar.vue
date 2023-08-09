<template>
    <div class="w-64 min-w-[256px] bg-slate-800 h-full flex flex-col justify-center items-center px-8">
        <draggable class="grow flex flex-col pt-16 gap-4 items-center"
            :list="globalStore.PredefinedPDFelements" v-if="globalStore.refresh" item-key="id" :draggable="!globalStore.enabled"  
            @change="globalStore.resetPredefinedPDFelements()"
            :clone="clone" :group="{ name: 'pdfelements', pull: pullFunction }">
            <template #item="{ element }">
                <PDF_Element :item="element" :main="true"/>
            </template>
        </draggable>
        <div class="p-2 flex flex-col justify-center items-center w-full">
            <div class="w-full">
                <div class="w-full flex mb-3 text-lg font-bold text-slate-300">PDF margin Y:</div>
                <Slider @start="globalStore.margin.c = true" @end="globalStore.margin.c = false"
                    class="w-full mb-2" v-model="globalStore.margin.Y" :min="0" :max="1" :step="-1" showTooltip="focus" :merge="0.01" :lazy="false" />
                <div class="w-full flex mb-3 text-lg font-bold text-slate-300">PDF margin X:</div>
                <Slider @start="globalStore.margin.c = true" @end="globalStore.margin.c = false"
                    class="w-full mb-4" v-model="globalStore.margin.X" :min="0" :max="1" :step="-1" showTooltip="focus" :merge="0.01" :lazy="false" />
            </div>
            <button class="px-4 py-2 w-full bg-emerald-600 hover:bg-emerald-500 rounded-md font-bold text-emerald-950" 
                @click="savePDF()">
                Save PDF
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
export default {
    name: "PDF_EditorBar",
    components: { Slider, draggable, PDF_Element },
    setup() {
        const globalStore = useGlobalStore();
        globalStore.update();
        return { globalStore };
    },
    data() {
        return {
            controlOnStart: true,
        }
    },
    methods: {
        async savePDF() {
            await this.$htmlToPaper('printMe');
        },
        clone( item ) {
            return { type: item.type, id: cryptoRandomString({ length: 32, type: 'alphanumeric' }) };
        },
        pullFunction() {
            return "clone";
        },
        test(value) {
            this.globalStore.enabled = value;
            console.log(value);
        }
    },
}
</script>