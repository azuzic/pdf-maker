<template>
    <div class="flex flex-col">
        <div class="mb-2 text-xl">HTML preview editor:</div>
        <div class="bg-white w-96 h-[543px]">
            <div class="bg-white relative" :style="'transform: scale('+globalStore.state.scale+'); transform-origin: top left;'">
                <textarea ref="textarea" @input="adjustTextareaSize" rows="1" v-model="globalStore.state.text" type="text" 
                class="bg-slate-300 m-0 p-0 bg-transparent border-b-2 outline-none resize-none overflow-hidden text-black border-none absolute top-0 left-0
                text-base leading-[1.15] font-Helvetica">
                </textarea>
            </div>
        </div>
    </div>
</template>

<script>
import { useGlobalStore } from '@/stores/globalStore'
export default {
    name: "HTML_PreviewEditor",
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