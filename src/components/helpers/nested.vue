<template>
    <div class="w-full flex-1 bg-amber-200 px-1 rounded overflow-y-auto scrollbar-thin 
        scrollbar-track-amber-600 scrollbar-thumb-amber-900 hover:scrollbar-thumb-amber-950">
        <draggable :list="list" item-key="id" group="pdfelements" @change="checkList" v-if="globalStore.refresh">
            <template #item="{ element }">
                <div class="bg-amber-400 px-2 rounded my-1 text-left truncate w-full ">
                    <div class="truncate -mb-1 text-sm rounded" :id="'child_'+element.id"
                        :class=" globalStore.highlighted == element.id ? 'bg-lime-500' : 'bg-amber-700'"
                        @mouseenter="globalStore.entered = true, globalStore.highlighted = element.id, scrollToElement(element.id)" @mouseleave="globalStore.entered = false, globalStore.highlighted = ''">
                        ╓ <abbr class="no-underline font-bold" :title="element.id"> PARENT </abbr>
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