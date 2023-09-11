<template>
    <div class="h-0.5 w-full bg-PE_dark_gray rounded-full my-4"></div>
    <div class="text-xl font-bold text-PE_dark_gray mb-2">Position:</div>
    <div class="flex flex-col gap-1 text-PE_dark_gray">
        <div class="flex gap-2">
            <LogCheckBox @selected="updatePostion" label="Absolute" :value="absolute"/>
        </div>
    </div>
</template>
<script>
import { useGlobalStore } from '@/stores/globalStore'
import LogCheckBox from '@/components/helpers/LogCheckBox.vue';
export default {
    name: "element_settings_position",
    components: { LogCheckBox },
    setup() {
        const globalStore = useGlobalStore();
        return { globalStore };
    },
    data() {
        return {
            absolute: this.globalStore.selectedItem.absolute,
        }
    },
    async mounted() {
        await this.globalStore.executeNextTickMultipleTimes(5);
        this.absolute = this.globalStore.selectedItem.absolute;
    },
    methods: {
        updatePostion(value) {
            this.absolute = value;

            if (this.globalStore.selectedItem == null) return;
            let el = document.getElementById('element_'+this.globalStore.selectedItem.id);

            if (this.absolute) el.classList.add('absolute');
            else el.classList.remove('absolute');

            this.globalStore.selectedItem.absolute = value;
        },
    }
}
</script>