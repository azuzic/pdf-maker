<template>
    <div class="h-0.5 w-full bg-PE_dark_gray rounded-full my-4"></div>
    <div class="text-xl font-bold text-PE_dark_gray mb-2">Justify Parent:</div>
    <div class="flex flex-col gap-1 text-PE_dark_gray">
        <div class="flex gap-2">
            <AP_dropdowninput :label="justifyType" @selected="updateJustify" :list="[
                {label: 'Start', value: 'justify-start'},
                {label: 'Center', value: 'justify-center'},
                {label: 'End', value: 'justify-end'},
                {label: 'Between', value: 'justify-between'},
                {label: 'Around', value: 'justify-around'},
                {label: 'Evenly', value: 'justify-evenly'},
            ]"/>
        </div>
    </div>
</template>
<script>
import { useGlobalStore } from '@/stores/globalStore'
import AP_dropdowninput from '@/components/helpers/AP_dropdowninput.vue';
export default {
    name: "element_settings_justify",
    components: { AP_dropdowninput },
    setup() {
        const globalStore = useGlobalStore();
        return { globalStore };
    },
    data() {
        return {
            justifyType: "",
            index: -1,
        }
    },
    async mounted() {
        await this.globalStore.executeNextTickMultipleTimes(5);
        this.index = this.globalStore.PDFelements.findIndex(item => item.id === this.globalStore.selectedItem.parentID);
        if (this.index != -1) this.justifyType = this.globalStore.PDFelements[this.index].justify;
    },
    methods: {
        updateJustify(value) {
            this.justifyType = value.label;            
            this.globalStore.PDFelements[this.index].justify = value.label;
        },
    }
}
</script>