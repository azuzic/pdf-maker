<template>
    <div class="relative">
        <draggable v-if="!main" class="flex w-full" v-model="list2" item-key="id" group="pdfelements">
            <template #item="{ element }">
                <div class="grow">
                    <PDF_image v-if="element.type=='image'" :item="element" :main="main" :id="element.id"/>
                    <PDF_text v-if="element.type=='text'" :item="element" :main="main" :id="element.id"/>
                    <PDF_line v-if="element.type=='line'" :item="element" :main="main" :id="element.id"/>
                </div>
            </template>
        </draggable>
        <div v-else>
            <PDF_image v-if="item.type=='image'" :item="item" :main="main" :id="item.id"/>
            <PDF_text v-if="item.type=='text'" :item="item" :main="main" :id="item.id"/>
            <PDF_line v-if="item.type=='line'" :item="item" :main="main" :id="item.id"/>
        </div>
    </div>
</template>

<script>
import { useGlobalStore } from '@/stores/globalStore'
import PDF_image from '@/components/PDF_Elements/PDF_image.vue';
import PDF_text from '@/components/PDF_Elements/PDF_text.vue';
import PDF_line from '@/components/PDF_Elements/PDF_line.vue';
import draggable from 'vuedraggable'
export default {
    name: "PDF_Element",
    components: { PDF_image, PDF_text, PDF_line, draggable },
    props: {
        item: Object,
        main: Boolean,
    },
    data() {
        return {
            list2: []
        }
    },
    mounted() {
        this.list2.push(this.item);
    },
    setup() {
        const globalStore = useGlobalStore();
        return { globalStore };
    },
    test(a) {
        console.log(a);
    }
}
</script>