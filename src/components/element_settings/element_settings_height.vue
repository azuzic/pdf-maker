<template> 
    <div class="text-xl font-bold text-PE_dark_gray my-2">Element Height:</div>
    <div class="flex flex-col gap-1 text-PE_dark_gray">
        <div class="flex gap-2">
            <div class="font-bold">Type: </div> 
            <AP_dropdowninput :label="heightType" class="z-50" @selected="updateHeight" :list="[
                {label: 'Fit', value: 'flex-none'},
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
    name: "element_settings_height",
    components: { AP_dropdowninput },
    setup() {
        const globalStore = useGlobalStore();
        return { globalStore };
    },
    data() {
        return {
            heightType: this.globalStore.selectedItem.heightType,
            height: this.globalStore.selectedItem.height,
        }
    },
    async mounted() {
        await this.globalStore.executeNextTickMultipleTimes(5);
        this.heightType = this.globalStore.selectedItem.heightType;
        this.height = this.globalStore.selectedItem.height;
    },
    methods: {
        updateHeight(value) {
            this.heightType = value.label;
            if (this.globalStore.selectedItem == null) return;
            
            let el = document.getElementById('element_'+this.globalStore.selectedItem.id);
            el.classList.remove('flex-none','flex-1','grow');
            el.style.removeProperty('height');

            if (value.label == 'Set') el.style.height = this.height+'px';
            else el.classList.add(value.value);
            
            this.globalStore.selectedItem.heightClasses = value.value;

            this.globalStore.selectedItem.heightType = this.heightType;
            this.globalStore.selectedItem.height = this.height;
        },
    }
}
</script>