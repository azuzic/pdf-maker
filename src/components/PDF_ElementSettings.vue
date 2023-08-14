<template>
    <div class="w-80 min-w-[256px] bg-slate-800 h-full flex flex-col pt-16 px-8 gap-2">
        <div v-if="globalStore.selectedItem != null && globalStore.selected">
            
            <Element_data/>

            <Element_settings_text v-if="globalStore.selected != null && globalStore.type == 'text'"/>
            <Element_settings_line v-if="globalStore.selected != null && globalStore.type == 'line'"/>

            <Element_settings_width/>

            <Element_settings_justify/>
            <Element_settings_position/>

        </div>
    </div>
</template>

<script>
import { useGlobalStore } from '@/stores/globalStore'
import Element_data from '@/components/element_settings/element_settings_data.vue';
import Element_settings_text from '@/components/element_settings/element_settings_text.vue';
import Element_settings_position from '@/components/element_settings/element_settings_position.vue';
import Element_settings_width from '@/components/element_settings/element_settings_width.vue';
import Element_settings_justify from './element_settings/element_settings_justify.vue';
import Element_settings_line from './element_settings/element_settings_line.vue';
export default {
    name: "PDF_ElementSettings",
    setup() {
        const globalStore = useGlobalStore();
        return { globalStore };
    },
    components: { Element_data, Element_settings_text, Element_settings_position, Element_settings_width, Element_settings_justify, Element_settings_line }
}
</script>