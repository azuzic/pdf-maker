<template>
    <div class="w-full flex-1 bg-PE_dark_secondary border border-PE_dark_border px-2 py-1 rounded overflow-y-auto scrollbar-thin 
        scrollbar-thumb-PE_dark_scrollbar hover:scrollbar-thumb-PE_dark_scrollbar_pressed scrollbar-thumb-rounded-full">
        <draggable :list="list" item-key="id" group="pdfelements" @change="checkList" v-if="globalStore.refresh">
            <template #item="{ element }">
                <div class="text-left truncate overflow-hidden rounded bg-PE_dark_primary my-0.5">
                    <div class="truncate text-sm text-PE_dark_gray border-t border-l border-r rounded-t transition-all" :id="'child_'+element.id"
                        :class=" globalStore.highlighted == element.id ? 'bg-PE_dark_accent_pressed border-PE_dark_accent_pressed' : 'border-PE_dark_blue'"
                        @mouseenter="globalStore.entered = true, globalStore.highlighted = element.id, scrollToElement(element.id)" @mouseleave="globalStore.entered = false, globalStore.highlighted = ''">
                        ╓ <abbr :class=" globalStore.highlighted == element.id ? 'text-PE_dark_white' : ''"
                        class="no-underline font-bold text-PE_dark_blue" :title="'PARENT ID: ' + element.id"> PARENT </abbr>
                    </div>
                    <Nested2 :list="list" :parent="element"/>
                </div>
            </template>
        </draggable>
    </div>
    
</template>
<script>
import { useGlobalStore } from '@/stores/globalStore'
import draggable from "vuedraggable";
import Nested2 from '@/components/helpers/nested2.vue';

export default {
    name: "nested",
    props:  {
        list: Array
    },
    components: { draggable, Nested2 },
    setup() {
        const globalStore = useGlobalStore();
        return { globalStore };
    },
    methods: {
        scrollToElement(id) {
            const element = document.getElementById('parent_element_'+id);
            element.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
        },
        checkList(change) {
            if (change.added) {
                let temp = JSON.parse(JSON.stringify(change.added.element)); 
                temp.list[0].parentID = temp.id;
                let index = this.globalStore.PDFelements.findIndex(item => item.id === temp.id);
                if (index !== -1) this.globalStore.PDFelements[index] = temp;
                else console.log("Element with ID " + targetId + " not found.");                
            }
            this.globalStore.resetPredefinedPDFelements()
        }
    }
};
</script>