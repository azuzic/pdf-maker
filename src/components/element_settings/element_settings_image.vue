<template>
    <div class="h-0.5 w-full bg-PE_dark_gray rounded-full my-4"></div>
    <div class="text-xl font-bold text-PE_dark_gray mb-2">Image URL:</div>
    <div class="flex flex-col gap-1 text-PE_dark_gray">
        <input type="text" class="bg-PE_dark_gray bg-opacity-5 rounded px-2 w-full outline-none truncate" 
        readonly :value="globalStore.selectedItem.url">
        <div class="flex gap-2">
            <div class="font-bold">Size: </div> 
            <AP_dropdowninput :label="size.charAt(0).toUpperCase() + size.slice(1)" class="z-[90]" @selected="updateSize" :list="[
                {label: 'Auto', value: 'auto'},
                {label: 'Cover', value: 'cover'},
                {label: 'Contain', value: 'contain'},
            ]"/>
        </div> 
        <div class="flex gap-2">
            <div class="font-bold">Position: </div> 
            <AP_dropdowninput :label="position.charAt(0).toUpperCase() + position.slice(1)" class="z-[80]" @selected="updatePosition" :list="[
                {label: 'Bottom', value: 'bottom'},
                {label: 'Center', value: 'center'},
                {label: 'Left', value: 'left'},
                {label: 'Left bottom', value: 'left bottom'},
                {label: 'Left top', value: 'left top'},
                {label: 'Right', value: 'right'},
                {label: 'Right bottom', value: 'right bottom'},
                {label: 'Right top', value: 'right top'},
                {label: 'Top', value: 'top'},
            ]"/>
        </div> 
        <div class="flex gap-2">
            <div class="font-bold">Repeat: </div> 
            <AP_dropdowninput :label="repeat.charAt(0).toUpperCase() + repeat.slice(1).replace('-', ' ')" class="z-[70]" @selected="updateRepeat" :list="[
                {label: 'No repeat', value: 'no-repeat'},
                {label: 'Repeat', value: 'repeat'},
                {label: 'Repeat x', value: 'repeat-x'},
                {label: 'Repeat y', value: 'repeat-y'},
            ]"/>
        </div> 
    </div>
</template>
<script>
import { useGlobalStore } from '@/stores/globalStore'
import AP_dropdowninput from '@/components/helpers/AP_dropdowninput.vue';
export default {
    name: "element_settings_text",
    components: { AP_dropdowninput },
    setup() {
        const globalStore = useGlobalStore();
        return { globalStore };
    },
    data() {
        return {
            size: this.globalStore.selectedItem.size,
            position: this.globalStore.selectedItem.position,
            repeat: this.globalStore.selectedItem.repeat,
        }
    },
    async mounted() {
        await this.globalStore.executeNextTickMultipleTimes(5);
        this.size = this.globalStore.selectedItem.size;
        this.position = this.globalStore.selectedItem.position;
        this.repeat = this.globalStore.selectedItem.repeat;
    },
    methods: {
        updateRepeat(value) {        
            this.repeat = value.value;
            this.globalStore.selectedItem.repeat = value.value;
        },
        updatePosition(value) {        
            this.position = value.value;
            this.globalStore.selectedItem.position = value.value;
        },
        updateSize(value) {        
            this.size = value.value;
            this.globalStore.selectedItem.size = value.value;
        },
    }
}
</script>