<template>
    <div class="h-0.5 w-full bg-slate-400 rounded-full my-4"></div>
    <div class="text-xl font-bold text-slate-300 mb-2">Text value:</div>
    <div class="flex flex-col gap-1 text-slate-300">
        <input type="text" class="bg-slate-50 bg-opacity-5 rounded px-2 w-full outline-none truncate" 
        readonly :value="globalStore.selectedItem.innerHTML">
    </div>
</template>
<script>
import { useGlobalStore } from '@/stores/globalStore'
export default {
    name: "element_settings_text",
    setup() {
        const globalStore = useGlobalStore();
        return { globalStore };
    },
}
</script>