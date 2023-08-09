<template>
    <div class="flex justify-center grow overflow-hidden" @mousedown="globalStore.entered ? '' : globalStore.selected = null">
        <div class="flex flex-col w-full relative overflow-auto">
            
            <div class="w-full flex flex-col justify-center items-center z-50">
                <div class="flex justify-center text-4xl font-bold text-slate-400">PDF Editor:</div>
                <div class="w-96 my-4">
                    <Slider v-model="scale" :min="0.5" :max="2" :step="-1" showTooltip="focus" :merge="0.01" :lazy="false" />
                </div>
            </div>

            <div class="flex w-full justify-center pb-8 overflow-x-scroll relative">
                <div :style="'height:'+(height*scale)+'pt; width:'+(width*scale)+'pt;'">
                    <div class="sticky top-0 z-50 w-[595pt]"
                        :style="'height:'+(14*scale)+'pt; width:'+(width)+'pt; transform: scale('+scale+'); transform-origin: top left; margin-bottom: '+(14*scale)+'pt;'">
                        <Quill_toolbar @mouseenter="globalStore.entered = true" @mouseleave="globalStore.entered = false"
                        :style="'height:'+(24)+'pt;'" v-if="globalStore.selected != null && globalStore.type=='text'"/>
                    </div>
                    <div id="printMe" class="w-[595pt] h-[842pt]" 
                        :style="'height:'+height+'pt; width:'+width+'pt; transform: scale('+scale+'); transform-origin: top left;'">
                        
                        <Vertical_arrow v-if="globalStore.margin.c"/>
                        <Horizontal_arrow v-if="globalStore.margin.c"/>

                        <div class="bg-white h-full w-full relative text-black rounded"
                            :style="'padding: '+(globalStore.margin.Y+0.25)+'in '+(globalStore.margin.X+0.25)+'in;'">
                            <draggable v-model="globalStore.PDFelements" item-key="id" group="pdfelements"
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
import Quill_toolbar from '@/components/PDF_Elements/Quill_toolbar.vue';
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
    }
}
</script>

<style lang="scss" src="@vueform/slider/themes/default.css">
</style>