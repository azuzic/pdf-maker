<template>
    <div class="h-0.5 w-full bg-PE_dark_gray rounded-full my-4"></div>
    <div class="text-xl font-bold text-PE_dark_gray mb-2">Width:</div>
    <div class="flex flex-col gap-1 text-PE_dark_gray">
        <div class="flex gap-2">
            <div class="font-bold">Type: </div> 
            <AP_dropdowninput :label="widthType" class="z-50" @selected="updateWidth" :list="[
                {label: 'Fit', value: 'flex-none'},
                {label: 'Divide', value: 'flex-1'},
                {label: 'Grow', value: 'grow'},
                {label: 'Set', value: 'w'},
            ]"/>
        </div>
        <div v-if="widthType == 'Set'" class="flex gap-2">
            <div class="font-bold">Size: </div> 
            <input type="text" class="bg-PE_dark_gray bg-opacity-10 hover:bg-opacity-20 focus:bg-opacity-25 rounded px-2 w-full outline-none truncate" 
            v-model="width" @change="updateWidth({label: 'Set', value: 'w'})"> px
        </div>
    </div>
</template>
<script>
import { useGlobalStore } from '@/stores/globalStore'
import AP_dropdowninput from '@/components/helpers/AP_dropdowninput.vue';
export default {
    name: "element_settings_width",
    components: { AP_dropdowninput },
    setup() {
        const globalStore = useGlobalStore();
        return { globalStore };
    },
    data() {
        return {
            widthType: this.globalStore.selectedItem.widthType,
            width: this.globalStore.selectedItem.width,
        }
    },
    async mounted() {
        await this.globalStore.executeNextTickMultipleTimes(5);
        this.widthType = this.globalStore.selectedItem.widthType;
        this.width = this.globalStore.selectedItem.width;
    },
    methods: {
        updateWidth(value) {
            this.widthType = value.label;
            if (this.globalStore.selectedItem == null) return;
            
            let el = document.getElementById('element_'+this.globalStore.selectedItem.id);
            el.classList.remove('flex-none','flex-1','grow');
            el.style.removeProperty('width');

            if (value.label == 'Set') el.style.width = this.width+'px';
            else el.classList.add(value.value);
            
            this.globalStore.selectedItem.widthClasses = value.value;

            this.globalStore.selectedItem.widthType = this.widthType;
            this.globalStore.selectedItem.width = this.width;
        },
    }
}
</script>