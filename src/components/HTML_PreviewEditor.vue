<template>
    <div class="flex justify-center grow overflow-hidden" @mousedown="globalStore.entered ? this.moving = null : globalStore.setSelected(null, null)">
        <div class="flex flex-col w-full relative">
            
            <div class="w-full flex flex-col justify-center items-center z-50 bg-PE_dark_primary transition-all duration-300 border-b border-PE_dark_border pb-1"
                :class="globalStore.selected != null && globalStore.type=='text' ? 'mb-0' : 'mb-8'">
                <div class="flex items-baseline gap-1">
                    <div class="flex justify-center text-4xl font-bold text-PE_dark_gray pt-2">PDF Editor</div>
                    <abbr class="no-underline font-bold text-PE_dark_gray cursor-help" :title="
` 
> fixed: 
    - mouse hover
    - template loading 
> added:
    - item cloning
    - variable preview
    - undo/redo
`"> 
                        v1.1 
                    </abbr>
                </div>
                <Slider class="w-96 my-4 slider" v-model="scale" :min="0.5" :max="2" :step="-1" showTooltip="focus" :merge="0.01" :lazy="false" />
                <Quill_toolbar/>
            </div>

            <div class="w-full flex flex-col justify-center items-center -mt-6 text-PE_dark_white transition-all duration-300"
                :class="[globalStore.selected == null ? 'opacity-100 pb-2' : 'pointer-events-none opacity-0 pb-0']">
                <LogCheckBox @selected="updateVariablePreview" label="Variables Preview" :value="globalStore.variablePreview"/>
            </div>

            <div id="pdf-content" class="flex w-full justify-center pb-8 relative overflow-auto scrollbar-thin transition-all duration-300
                scrollbar-thumb-PE_dark_scrollbar hover:scrollbar-thumb-PE_dark_scrollbar_pressed scrollbar-thumb-rounded-full"
                :class="globalStore.selected == null ? 'pt-0' : 'pt-2'">
                <div :style="'height:'+(height*scale)+'pt; width:'+(width*scale)+'pt;'">

                    <div v-if="!globalStore.variablePreview" id="printMe" class="w-[595pt] h-[842pt]" 
                        :style="'height:'+height+'pt; width:'+width+'pt; transform: scale('+scale+'); transform-origin: top left;'">
                        <Vertical_arrow v-if="globalStore.margin.c"/>
                        <Horizontal_arrow v-if="globalStore.margin.c"/>
                        <div class="bg-white h-full w-full relative text-black rounded"
                            :style="'padding: '+(globalStore.margin.Y+0.25)+'in '+(globalStore.margin.X+0.25)+'in;'">
                            <draggable @change="checkList" v-model="globalStore.PDFelements" item-key="id" group="pdfelements" v-if="globalStore.refresh" handle=".handle"
                                class="w-full h-full leading-5 flex flex-col py-1" :class="globalStore.margin.c ? 'border-2 border-dashed rounded border-PE_dark_red -my-[2px]' : ''">
                                <template #item="{ element, index }">
                                    <PDF_Element :item="element" :index="index"/>
                                </template>
                            </draggable>
                        </div>
                    </div>

                    <div v-else id="variablePreview" class="w-[595pt] h-[842pt] pointer-events-none" :innerHTML="globalStore.calculatedInnerHTML"
                        :style="'height:'+height+'pt; width:'+width+'pt; transform: scale('+scale+'); transform-origin: top left;'">
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
import LogCheckBox from '@/components/helpers/LogCheckBox.vue';
import { watch, onMounted, onUnmounted } from 'vue';
export default {
    name: "HTML_PreviewEditor",
    components: { Slider, draggable, PDF_Element, Quill_toolbar, Vertical_arrow, Horizontal_arrow, LogCheckBox },
    data() {
        return {
            height: 842,
            width: 595,
            scale: 1,
        }
    },
    setup() {
        const globalStore = useGlobalStore();

        const handleKeys = (event) => {
            if (event.ctrlKey && event.key === 'z') {
                globalStore.undo(); // Trigger undo action
            }
            if (event.ctrlKey && event.key === 'y') {
                globalStore.redo(); // Trigger redo action
            }
        };

        onMounted(() => {
            document.addEventListener('keydown', handleKeys);
        });
        onUnmounted(() => {
            document.removeEventListener('keydown', handleKeys);
        });
        
        const innerHTML = (variables) => {
            const innerHTML = globalStore.innerHTML;
            const updatedHTML = innerHTML.map(item => {
            if (item.startsWith('$')) {
                return variables[item] || item; 
            }
            return item;
            });
            globalStore.calculatedInnerHTML = updatedHTML.join('');
        };
        watch(() => globalStore.variables,
            (newVariables) => { innerHTML(newVariables); },
            { deep: true }
        );

        const addToStack = (change) => {
            if (!globalStore.canAddToStack) {
                return;
            }
            if (!isEqual(globalStore.stackBuffer, globalStore.PDFelements)) {
                if (globalStore.undoStack.length > 200) globalStore.undoStack.shift();
                globalStore.undoStack.push(JSON.parse(JSON.stringify(globalStore.stackBuffer)));
                globalStore.stackBuffer = (JSON.parse(JSON.stringify(globalStore.PDFelements)));
            }
        };
        function isEqual(arr1, arr2) {
            if (arr1 == null || arr2 == null) return false;
            return JSON.stringify(arr1) == JSON.stringify(arr2)
        }
        watch(() => globalStore.PDFelements,
            (change) => { addToStack(change); },
            { deep: true }
        );
        return { globalStore };
    },
    mounted() {
        this.checkMove();
    },
    methods: {
        async updateVariablePreview(value) {
            this.globalStore.variablePreview = value;
            if (value) {
                const divContent = document.getElementById("printMe").innerHTML;
                await this.globalStore.executeNextTickMultipleTimes(5);

                let variables = {};
                let sentence = [];

                let parts = divContent.split(/\$(\w+)/);

                for (let i = 0; i < parts.length; i++) {
                    if (i % 2 === 0) {
                        sentence.push(parts[i]);
                    } else {
                        let variableName = `$${parts[i]}`;
                        if (this.globalStore.variables.hasOwnProperty(variableName))
                            variables[variableName] = this.globalStore.variables[variableName];
                        else variables[variableName] = "placeholder"
                        sentence.push(variableName);
                    }
                }

                this.globalStore.variables = variables;
                this.globalStore.innerHTML = sentence;
            }
        },
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
  --slider-bg: #f1f5f9;
  --slider-connect-bg: #3b82f6;
  --slider-tooltip-bg: #3b82f6;
}
</style>