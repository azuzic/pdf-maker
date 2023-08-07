<template>
    <div class="flex flex-col">
        <div class="mb-2 text-xl">PDF preview:</div>
        <div class="bg-white w-96 h-[543px]">
            <VuePDF v-if="globalStore.state.pdf!=null" :pdf="globalStore.state.pdf" fit-parent @loaded="onLoaded"/>
        </div>
    </div>
</template>

<script>
import { useGlobalStore } from '@/stores/globalStore'
import { VuePDF, usePDF } from '@tato30/vue-pdf'
export default {
    name: "PDF_Preview",
    components: { VuePDF },
    setup() {
        const globalStore = useGlobalStore();
        return { globalStore };
    },
    methods: {
        onLoaded(eventValue) {
            this.globalStore.state.scale = eventValue.scale;

        },
        updateVuePDF() {
            const { pdf, pages, info } = usePDF(this.globalStore.state.doc.output("datauristring"))
            this.globalStore.state.pdf = pdf;
        }
    }
}
</script>