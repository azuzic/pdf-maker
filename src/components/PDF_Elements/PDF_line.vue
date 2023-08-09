<template>
    <div v-if="main" class="flex justify-center items-center rounded-lg bg-emerald-600 hover:bg-emerald-500 hover:cursor-grab py-2 w-40">
        <div class="text-lg font-bold text-emerald-50">LINE</div>
    </div>
    <div class="relative" v-else>
        <hr class="border-2 rounded-full border-gray-200 my-8">
    </div>
</template>

<script>
import { useGlobalStore } from '@/stores/globalStore'
export default {
    name: "PDF_line",
    props: {
        item: Object,
        main: false,
    },
    data() {
        return {
            text: "LINE"
        }
    },
    setup() {
        const globalStore = useGlobalStore();
        return { globalStore };
    },
    methods: {
    },
}
</script>