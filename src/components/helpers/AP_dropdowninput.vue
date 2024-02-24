<template>
    <div class="w-full sm:max-w-sm flex gap-2 items-center">
        <div class="relative z-20 w-full group">
            <input v-model="value.label" @focusout="!focus ? show = false : ''" @click="show = true" readonly
            class="block py-1 w-full text-sm bg-slate-50 bg-opacity-5 hover:bg-opacity-10 cursor-default rounded px-4 appearance-none focus:outline-none focus:ring-0 peer caret-transparent"
            :class="show ? 'text-PE_dark_gray' : 'text-PE_dark_gray'"/>

            <i class="fa-solid fa-caret-up w-4 h-4 absolute top-1.5 right-2 text-PE_dark_gray peer-focus:text-PE_dark_gray transition-all duration-300 z-10 pointer-events-none"
                :class="show ? '-scale-y-100' : ''" ></i>

            <div @mouseleave="focus = false" @mouseenter="focus = true" :class="show ? 'h-fit max-h-64 opacity-100' : 'h-0 opacity-0'"
                class="w-full mt-2 | bg-PE_dark_gray bg-opacity-5 | drop-shadow-md rounded | overflow-hidden | transition-opacity duration-300 | absolute overflow-y-auto">
                <ul class="text-sm z-50" aria-labelledby="dropdownDefaultButton">
                    <div v-for="v, id in  list " @click="value = v; show = false; $emit('selected', v)" 
                        class="block px-4 py-1 hover:bg-opacity-100 bg-opacity-95 cursor-default hover:font-bold z-50"
                        :class="v.label == value.label ? 'bg-PE_dark_gray text-PE_dark_secondary font-bold' : 'text-PE_dark_gray bg-PE_dark_secondary '"> 
                        {{ v.label }}
                    </div>   
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { useGlobalStore } from '@/stores/globalStore'
export default {
    name: "AP_dropdownInput",
    props: {
        label: String,
        list: Array,
        rules: Object,
    },
    setup() {
        const globalStore = useGlobalStore();
        return { globalStore };
    },
    data() {
        return {
            value: {label: this.label, value: 'static'},
            show: false,
            focus: false
        }
    },    
    async mounted() {
        await this.globalStore.executeNextTickMultipleTimes(10);
        this.value = {label: this.label, value: 'static'};
    },
}
</script>