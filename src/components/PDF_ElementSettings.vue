<template>
    <div class="w-80 min-w-[256px] bg-PE_dark_primary h-full flex flex-col pt-16 px-8 gap-2 border-l border-PE_dark_border drop-shadow-lg">
        <div v-if="globalStore.selectedItem != null && globalStore.selected">
            
            <Element_data/>

            <Element_settings_text v-if="globalStore.selected != null && globalStore.type == 'text'"/>
            <Element_settings_image v-if="globalStore.selected != null && globalStore.type == 'image'"/>
            <Element_settings_line v-if="globalStore.selected != null && globalStore.type == 'line'"/>

            <Element_settings_width/>
            <Element_settings_height/>

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
import Element_settings_justify from '@/components/element_settings/element_settings_justify.vue';
import Element_settings_line from '@/components/element_settings/element_settings_line.vue';
import Element_settings_height from '@/components/element_settings/element_settings_height.vue';
import Element_settings_image from '@/components//element_settings/element_settings_image.vue';
export default {
    name: "PDF_ElementSettings",
    setup() {
        const globalStore = useGlobalStore();
        return { globalStore };
    },
    components: { Element_data, Element_settings_text, Element_settings_position, Element_settings_width, Element_settings_justify, Element_settings_line, Element_settings_height, Element_settings_image }
}
</script>