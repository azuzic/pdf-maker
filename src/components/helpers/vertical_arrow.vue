<template>
    <div class="absolute w-0.5 top-0 bg-PE_dark_red z-10 rounded-full" :style="'height: '+(globalStore.margin.Y+0.23)+'in; left:'+(globalStore.margin.X+0.29)+'in;'">
        <div class="absolute top-0.5 -left-[0px] bg-PE_dark_red w-2 h-0.5 rotate-45 rounded-full"></div>
        <div class="absolute top-0.5 -left-[6px] bg-PE_dark_red w-2 h-0.5 -rotate-45 rounded-full"></div>
        <div class="absolute top-1/2 -translate-y-1/2 ml-3 text-PE_dark_red font-bold text-sm whitespace-nowrap bg-white px-1 rounded border">{{ (globalStore.margin.Y+0.25).toFixed(2) }}in</div>
        <div class="absolute bottom-0.5 -left-[0px] bg-PE_dark_red w-2 h-0.5 -rotate-45 rounded-full"></div>
        <div class="absolute bottom-0.5 -left-[6px] bg-PE_dark_red w-2 h-0.5 rotate-45 rounded-full"></div>
    </div>
</template>
<script>
import { useGlobalStore } from '@/stores/globalStore'
export default {
    name: "vertical_arrow",
    setup() {
        const globalStore = useGlobalStore();
        return { globalStore };
    },
}
</script>