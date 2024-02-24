<template>
    <div class="w-80 min-w-[256px] bg-PE_dark_primary h-full flex flex-col pt-16 px-8 gap-2 border-l border-PE_dark_border drop-shadow-lg 
        overflow-y-auto scrollbar-thin scrollbar-thumb-PE_dark_scrollbar hover:scrollbar-thumb-PE_dark_scrollbar_pressed scrollbar-thumb-rounded-full pb-16">
        <div v-if="globalStore.selectedItem != null && globalStore.selected">
            
            <Element_data/>

            <Element_settings_text v-if="globalStore.selected != null && globalStore.type == 'text'"/>
            <Element_settings_image v-if="globalStore.selected != null && globalStore.type == 'image'"/>
            <Element_settings_line v-if="globalStore.selected != null && globalStore.type == 'line'"/>

            <Element_settings_width/>
            <Element_settings_height/>
            <Element_settings_parent_height/>

            <Element_settings_justify/>
            <Element_settings_position v-if="false"/>

        </div>
        <div v-else-if="globalStore.variablePreview">
            <div class="text-2xl font-bold text-PE_dark_gray mb-2">Variables:</div>
            <div class="h-0.5 w-full bg-PE_dark_gray rounded-full my-4"></div>
            <div v-for="(value, key) in globalStore.variables" :key="key">
                <div class="text-xl font-bold text-PE_dark_gray mb-2">
                    <i v-if="value.type == 'image'" class="fa-solid fa-image"></i> 
                    <i v-if="value.type == 'text'" class="fa-solid fa-font"></i>
                    {{ key }}
                </div>
                <div class="flex flex-col gap-1 text-PE_dark_gray">
                    <input type="text" class="bg-PE_dark_gray bg-opacity-5 hover:bg-opacity-10 focus:bg-opacity-20 rounded px-2 w-full outline-none truncate transition-all duration-150" 
                    v-model="globalStore.variables[key].value">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useGlobalStore } from '@/stores/globalStore'
import Element_data from '@/components/element_settings/element_settings_data.vue';
import Element_settings_text from '@/components/element_settings/element_settings_text.vue';
import Element_settings_position from '@/components/element_settings/element_settings_position.vue';
import Element_settings_width from '@/components/element_settings/element_settings_width.vue';
import Element_settings_height from '@/components/element_settings/element_settings_height.vue';
import Element_settings_justify from '@/components/element_settings/element_settings_justify.vue';
import Element_settings_line from '@/components/element_settings/element_settings_line.vue';
import Element_settings_parent_height from '@/components/element_settings/Element_settings_parent_height.vue';
import Element_settings_image from '@/components//element_settings/element_settings_image.vue';
export default {
    name: "PDF_ElementSettings",
    setup() {
        const globalStore = useGlobalStore();
        return { globalStore };
    },
    components: { Element_data, Element_settings_text, Element_settings_position, Element_settings_width, Element_settings_height, Element_settings_justify, Element_settings_line, Element_settings_parent_height, Element_settings_image }
}
</script>