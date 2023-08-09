<template>
    <div v-if="main" class="flex justify-center items-center rounded-lg bg-emerald-600 hover:bg-emerald-500 hover:cursor-grab py-2 w-40">
        <div class="text-lg font-bold text-emerald-50">IMAGE</div>
    </div>
    <div class="relative" v-else>
        <div class="w-full flex flex-col justify-center items-center">
            <img class="h-28" src="https://fipu.unipu.hr/_pub/themes_static/unipu2020/fipu/icons/fipu_hr.png">
        </div>
    </div>
</template>

<script>
import { useGlobalStore } from '@/stores/globalStore'
export default {
    name: "PDF_image",
    props: {
        item: Object,
        main: false,
    },
    data() {
        return {
            text: "IMAGE"
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