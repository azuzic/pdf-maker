<script setup>
import { useGlobalStore } from '@/stores/globalStore'
const globalStore = useGlobalStore()
</script>

<template>
    <div v-if="debug" class="w-screen h-screen flex justify-center items-center absolute backdrop-blur-sm z-[100] py-16 px-[8%]">
        <div class="p-4 flex flex-col bg-black bg-opacity-90 shadow-xl rounded-xl h-full w-full text-slate-400">
            <div class="text-center text-2xl font-bold"> DEBUG INFO </div>
            <hr/>
            <div class="overflow-auto scrollbar-thin scrollbar-track-slate-800 scrollbar-thumb-slate-600 hover:scrollbar-thumb-slate-400">
                <vue-json-pretty showIcon :deep="2" :data="globalStore.$state" />
            </div>
        </div>
    </div>
    <div class="absolute bottom-2 right-2 z-[200]">
        <i @click="debug = !debug" class="fa-solid fa-circle-question text-main_lighttext hover:text-main_cyan text-4xl hover:cursor-pointer mr-2 opacity-50"></i>
    </div>
</template>

<script>
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';

export default {
    name: "GlobalStoreDebug",
    components: {
        VueJsonPretty,
    },
    data() {
        return {
            debug: false,
        }
    }
}
</script>

<style>
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
    transition: all 0s 50000s;
}
.vjs-tree-node:hover {
    background: rgba(255, 255, 255, 0.1) !important;
}
</style>