<template>
    <div class="h-0.5 w-full bg-PE_dark_gray rounded-full my-4"></div>
    <div class="text-xl font-bold text-PE_dark_gray mb-2">Image URL:</div>
    <div class="flex flex-col gap-1 text-PE_dark_gray">
        <input type="text" class="bg-PE_dark_gray bg-opacity-5 rounded px-2 w-full outline-none truncate" 
        readonly :value="globalStore.selectedItem.url">
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