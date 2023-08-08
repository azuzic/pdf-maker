<template>
    <div class="w-64 min-w-[256px] bg-slate-700 h-full flex flex-col">
        <div class="grow bg-slate-600">
        </div>
        <div class="p-2 flex justify-center items-center">
            <button class="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-md font-bold text-emerald-950" 
                @click="savePDF()">
                Save PDF
            </button>
        </div>
    </div>
</template>

<script>
import draggable from "vue3-draggable";
export default {
    name: "PDF_EditorBar",
    components: { draggable },
    methods: {
        async savePDF() {
            await this.$htmlToPaper('printMe');
        }
    },
}
</script>

<style lang="scss" scoped>
</style>