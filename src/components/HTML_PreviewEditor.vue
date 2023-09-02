<template>
    <div class="flex justify-center grow overflow-hidden" @mousedown="globalStore.entered ? '' : globalStore.setSelected(null, null)">
        <div class="flex flex-col w-full relative overflow-auto scrollbar-thin scrollbar-track-slate-600 scrollbar-thumb-slate-400 hover:scrollbar-thumb-slate-500">
            
            <div class="w-full flex flex-col justify-center items-center z-50 bg-[#e4e4e4] mb-2">
                <div class="flex justify-center text-4xl font-bold text-slate-900">PDF Editor:</div>
                <Slider class="w-96 my-4 slider" v-model="scale" :min="0.5" :max="2" :step="-1" showTooltip="focus" :merge="0.01" :lazy="false" />
                <Quill_toolbar/>
            </div>

            <div class="flex w-full justify-center pb-8  relative">
                <div :style="'height:'+(height*scale)+'pt; width:'+(width*scale)+'pt;'">
                    <div id="printMe" class="w-[595pt] h-[842pt]" 
                        :style="'height:'+height+'pt; width:'+width+'pt; transform: scale('+scale+'); transform-origin: top left;'">
                        
                        <Vertical_arrow v-if="globalStore.margin.c"/>
                        <Horizontal_arrow v-if="globalStore.margin.c"/>

                        <div class="bg-white h-full w-full relative text-black rounded"
                            :style="'padding: '+(globalStore.margin.Y+0.25)+'in '+(globalStore.margin.X+0.25)+'in;'">
                            <draggable @change="checkList" v-model="globalStore.PDFelements" item-key="id" group="pdfelements" v-if="globalStore.refresh"
                                class="w-full h-full leading-5" :class="globalStore.margin.c ? 'border-2 border-dashed rounded border-amber-600 -my-[2px]' : ''">
                                <template #item="{ element }">
                                    <PDF_Element :item="element"/>
                                </template>
                            </draggable>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useGlobalStore } from '@/stores/globalStore'
import Slider from '@vueform/slider'
import draggable from 'vuedraggable'
import PDF_Element from '@/components/PDF_Element.vue';
import Quill_toolbar from '@/components/helpers/Quill_toolbar.vue';
import Vertical_arrow from '@/components/helpers/vertical_arrow.vue';
import Horizontal_arrow from '@/components/helpers/horizontal_arrow.vue';
export default {
    name: "HTML_PreviewEditor",
    components: { Slider, draggable, PDF_Element, Quill_toolbar, Vertical_arrow, Horizontal_arrow },
    data() {
        return {
            height: 842,
            width: 595,
            scale: 1,
        }
    },
    setup() {
        const globalStore = useGlobalStore();
        return { globalStore };
    },
    mounted() {
        this.checkMove();
    },
    methods: {
        async checkMove(){
            await this.globalStore.resetPredefinedPDFelements();
        },
        checkList(change) {
            if (change.added) {
                let temp = JSON.parse(JSON.stringify(change.added.element)); 
                temp.list[0].parentID = temp.id;
                let index = this.globalStore.PDFelements.findIndex(item => item.id === temp.id);
                if (index !== -1) this.globalStore.PDFelements[index] = temp;
                else console.log("Element with ID " + targetId + " not found.");                
            }
            this.globalStore.resetPredefinedPDFelements()
        }
    }
}
</script>

<style lang="scss" src="@vueform/slider/themes/default.css">
</style>
<style>
.slider {
  --slider-bg: rgb(15,23,42);
}
</style>