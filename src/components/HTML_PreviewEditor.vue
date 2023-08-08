<template>
    <div class="flex justify-center grow overflow-auto">
        <div class="flex flex-col w-full">
            
            <div class="w-full flex flex-col justify-center items-center">
                <div class="flex justify-center text-4xl font-bold text-slate-400">PDF Editor:</div>
                <div class="w-96 my-4">
                    <Slider v-model="scale" :min="0.5" :max="2" :step="-1" showTooltip="focus" :merge="0.01" :lazy="false" />
                </div>
            </div>

            <div class="flex w-full h-full overflow-auto justify-center pb-8">
                <div :style="'height:'+(height*scale)+'pt; width:'+(width*scale)+'pt;'">
                
                    <div id="printMe" class="w-[595pt] h-[842pt] overflow-hidden" 
                        :style="'height:'+height+'pt; width:'+width+'pt; transform: scale('+scale+'); transform-origin: top left;'">
                        
                        <div class="bg-white h-full w-full relative p-12 text-base text-black">
                            <draggable v-model="globalStore.PDFelements"
                                class="bg-white w-full h-full text-base leading-5">
                                <template v-slot:item="{ item }">
                                    <div>item: {{ item }}</div>
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
import draggable from "vue3-draggable";
export default {
    name: "HTML_PreviewEditor",
    components: { Slider, draggable },
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
    methods: {
        adjustTextareaSize() {
            const textarea = this.$refs.textarea;
            const lines = textarea.value.split("\n");

            // Calculate the width based on the longest line
            const maxWidth = lines.reduce((maxWidth, line) => {
                // Replace consecutive spaces with non-breaking space (\u00A0)
                const sanitizedLine = line.replace(/ /g, "\u00A0");
                
                const tempDiv = document.createElement("div");
                tempDiv.textContent = sanitizedLine || "\u00A0"; // Ensure at least one character for measurement
                tempDiv.style.position = "absolute";
                tempDiv.classList.add("font-Helvetica");
                tempDiv.style.visibility = "hidden";
                document.body.appendChild(tempDiv);
                const lineWidth = tempDiv.clientWidth;
                document.body.removeChild(tempDiv);
                return Math.max(maxWidth, lineWidth);
            }, 0);

            // Add a margin (width of a single letter) to the calculated maxWidth
            const letterWidthMargin = this.getLetterWidthMargin();
            const adjustedMaxWidth = maxWidth + letterWidthMargin;

            // Calculate the content height
            textarea.style.height = "auto";
            textarea.style.width = adjustedMaxWidth + "px";
            textarea.style.height = textarea.scrollHeight + "px";
        },
        getLetterWidthMargin() {
            const tempDiv = document.createElement("div");
            tempDiv.textContent = "_"; // Use any single letter for measurement
            tempDiv.style.position = "absolute";
            tempDiv.style.visibility = "hidden";
            document.body.appendChild(tempDiv);
            const letterWidth = tempDiv.clientWidth;
            document.body.removeChild(tempDiv);
            return letterWidth;
        },
    }
}
</script>

<style lang="scss" src="@vueform/slider/themes/default.css">
/*
<textarea ref="textarea" @input="adjustTextareaSize" rows="1" v-model="globalStore.state.text" type="text" 
    class="bg-slate-300 m-0 p-0 bg-transparent border-b-2 outline-none resize-none overflow-hidden text-black border-none absolute top-0 left-0
    text-base leading-[1.15] font-Helvetica">
</textarea>
 */
</style>