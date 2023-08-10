<script setup>
import { useGlobalStore } from '@/stores/globalStore'
const globalStore = useGlobalStore();
</script>
<template>
    <div class="h-0.5 w-full bg-slate-400 rounded-full my-4"></div>
    <div class="text-xl font-bold text-slate-300 mb-2">Element data:</div>
    <div class="flex flex-col gap-1 text-slate-300">
        <div class="flex gap-2">
            <div class="font-bold">ID: </div> 
            <input type="text" class="bg-slate-50 bg-opacity-5 rounded px-2 w-full outline-none truncate" 
            readonly :value="globalStore.selectedItem.id">
        </div>
        <div class="flex gap-2">
            <div class="font-bold">Type: </div> 
            <input type="text" class="bg-slate-50 bg-opacity-5 rounded px-2 w-full outline-none truncate" 
            readonly :value="globalStore.selectedItem.type">
        </div>
        <div class="flex gap-2">
            <div class="font-bold">Value: </div> 
            <input type="text" class="bg-slate-50 bg-opacity-5 rounded px-2 w-full outline-none truncate" 
            readonly :value="globalStore.selectedItem.innerHTML">
        </div>
    </div>
</template>
<script>
export default {
    name: "element_data"
}
</script>