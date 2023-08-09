<template>
    <div class="absolute h-0.5 left-0 bg-rose-700 z-10 rounded-full" :style="'width: '+(globalStore.margin.X+0.23)+'in; top:'+(globalStore.margin.Y+0.29)+'in;'">
        <div class="absolute right-0.5 -top-[0px] bg-rose-700 w-0.5 h-2 rotate-45 rounded-full"></div>
        <div class="absolute right-0.5 -top-[6px] bg-rose-700 w-0.5 h-2 -rotate-45 rounded-full"></div>
        <div class="absolute right-1/2 translate-x-1/2 mt-3 text-rose-600 font-bold text-sm whitespace-nowrap bg-white px-1 rounded border">{{ (globalStore.margin.X+0.25).toFixed(2) }}in</div>
        <div class="absolute left-0.5 -top-[0px] bg-rose-700 w-0.5 h-2 -rotate-45 rounded-full"></div>
        <div class="absolute left-0.5 -top-[6px] bg-rose-700 w-0.5 h-2 rotate-45 rounded-full"></div>
    </div>
</template>
<script>
import { useGlobalStore } from '@/stores/globalStore'
export default {
    name: "horizontal_arrow",
    setup() {
        const globalStore = useGlobalStore();
        return { globalStore };
    },
}
</script>