<template>
    <div v-if="main" class="flex justify-center items-center rounded-lg bg-emerald-600 hover:bg-emerald-500 hover:cursor-grab py-2 w-40">
        <div class="text-lg font-bold text-emerald-50">TEXT</div>
    </div>
    <div class="relative" v-else>
        <div ref="innerHTML" :innerHTML="computedInnerHTML" class="outline-none bg-slate-300 bg-opacity-0 border-0 rounded 
            py-1 -my-1 px-2 pdf-text hover:bg-opacity-25 w-full"></div>
        <div class="absolute top-1 left-0 w-full"
            :class="globalStore.selected == id ? 'h-full py-1 -my-1 px-2 bg-gray-400 bg-opacity-25 rounded' : 'h-0 p-0 m-0 bg-opacity-0'">
            <QuillEditor v-if="globalStore.selected == id" v-model:content="innerHTML" contentType="html" theme="snow" toolbar="#epictoolbar"/>
        </div>
    </div>
</template>

<script>
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { useGlobalStore } from '@/stores/globalStore'
export default {
    name: "PDF_text",
    props: {
        item: Object,
        main: false,
        id: String,
    },
    data() {
        return {
            text: "TEXT",
            innerHTML: "TEXT",
            showQuill: false,
        };
    },
    setup() {
        const globalStore = useGlobalStore();
        return { globalStore };
    },
    mounted() {
        window.katex = katex;
    },
    computed: {
        computedInnerHTML() {
            return this.innerHTML.replace(/  /g, "&nbsp;&nbsp;");
        }
    },
}
</script>