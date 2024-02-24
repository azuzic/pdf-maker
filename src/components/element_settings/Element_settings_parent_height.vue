<template>
    <div class="h-0.5 w-full bg-PE_dark_gray rounded-full my-4"></div>
    <div class="text-xl font-bold text-PE_dark_gray mb-2">Parent Height:</div>
    <div class="flex flex-col gap-1 text-PE_dark_gray">
        <div class="flex gap-2">
            <div class="font-bold">Type: </div> 
            <AP_dropdowninput :label="heightType" class="z-40" @selected="updateHeight" :list="[
                {label: 'Fit', value: 'flex-none'},
                {label: 'Divide', value: 'flex-1'},
                {label: 'Grow', value: 'grow'},
                {label: 'Set', value: 'h'},
            ]"/>
        </div>
        <div v-if="heightType == 'Set'" class="flex gap-2">
            <div class="font-bold">Size: </div> 
            <input type="number" class="bg-PE_dark_gray bg-opacity-10 hover:bg-opacity-20 focus:bg-opacity-25 rounded px-2 w-full outline-none truncate" 
            v-model="height" @change="updateHeight({label: 'Set', value: 'h'})"> 
            <div class="flex flex-col h-6">                
                <i class="fa-solid fa-square-caret-up text-xs hover:brightness-150" @click="height+=1; updateHeight({label: 'Set', value: 'h'});"></i>
                <i class="fa-solid fa-square-caret-down text-xs hover:brightness-150" @click="height-=1; updateHeight({label: 'Set', value: 'h'});"></i>
            </div>
            px
        </div>
    </div>
</template>
<script>
import { useGlobalStore } from '@/stores/globalStore'
import AP_dropdowninput from '@/components/helpers/AP_dropdowninput.vue';
export default {
    name: "Element_settings_parent_height",
    components: { AP_dropdowninput },
    setup() {
        const globalStore = useGlobalStore();
        return { globalStore };
    },
    data() {
        return {
            heightType: "",
            index: -1,
            height: 100
        }
    },
    async mounted() {
        await this.globalStore.executeNextTickMultipleTimes(5);
        this.index = this.globalStore.PDFelements.findIndex(item => item.id === this.globalStore.selectedItem.parentID);
        if (this.index != -1) {
            this.heightType = this.globalStore.PDFelements[this.index].heightType;
            this.height = this.globalStore.PDFelements[this.index].height;
        }
    },
    methods: {
        updateHeight(value) {
            this.heightType = value.label;            
            this.globalStore.PDFelements[this.index].heightType = value.label;
            this.globalStore.PDFelements[this.index].height = this.height;
        },
    }
}
</script>