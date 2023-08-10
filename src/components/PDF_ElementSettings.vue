<template>
    <div class="w-80 min-w-[256px] bg-slate-800 h-full flex flex-col pt-16 px-8 gap-2">
        <div v-if="globalStore.selectedItem != null && globalStore.selected">
            
            <Element_data/>
            <Element_settings_text v-if="globalStore.selected != null && globalStore.type == 'text'"/>

        </div>
    </div>
</template>

<script>
import { useGlobalStore } from '@/stores/globalStore'
import Element_data from '@/components/element_settings/element_settings_data.vue';
import Element_settings_text from '@/components/element_settings/element_settings_text.vue';
export default {
    name: "PDF_ElementSettings",
    setup() {
        const globalStore = useGlobalStore();
        return { globalStore };
    },
    components: { Element_data, Element_settings_text }
}
</script>