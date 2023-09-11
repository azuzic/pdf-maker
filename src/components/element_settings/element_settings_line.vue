<template>
    <div class="h-0.5 w-full bg-PE_dark_gray rounded-full my-4"></div>
    <div class="text-xl font-bold text-PE_dark_gray mb-2">Line:</div>
    <div class="flex flex-col gap-1 text-PE_dark_gray">
        <div class="flex gap-2">
            <LogCheckBox @selected="updateDashed" label="Dashed" :value="dashed"/>
        </div>
    </div>
</template>
<script>
import { useGlobalStore } from '@/stores/globalStore'
import LogCheckBox from '@/components/helpers/LogCheckBox.vue';
export default {
    name: "element_settings_line",
    components: { LogCheckBox },
    setup() {
        const globalStore = useGlobalStore();
        return { globalStore };
    },
    data() {
        return {
            dashed: this.globalStore.selectedItem.dashed,
        }
    },
    async mounted() {
        await this.globalStore.executeNextTickMultipleTimes(5);
        this.dashed = this.globalStore.selectedItem.dashed;
    },
    methods: {
        async updateDashed(value) {
            this.dashed = value;
            this.globalStore.selectedItem.dashed = value;
            await this.globalStore.update();
        },
    }
}
</script>