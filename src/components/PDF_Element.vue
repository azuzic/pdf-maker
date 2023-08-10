<template>
    <div class="relative">
        <draggable v-if="!main" class="flex w-full" v-model="list" item-key="id" group="pdfelements" :disabled="globalStore.selected != null">
            <template #item="{ element }">
                <div :id="'element_'+element.id" :class="[element.type=='text' ? element.classes : '']" :style="[element.classes == 'w' ? 'width: '+element.width+' px' : '']">
                    <PDF_text v-if="element.type=='text'" :item="element" :main="main" :id="item.id" :list="list" @deleteItem="deleteItem"/>
                    <PDF_image v-if="element.type=='image'" :item="element" :main="main" :id="item.id" :list="list" @deleteItem="deleteItem"/>
                    <PDF_line v-if="element.type=='line'" :item="element" :main="main"/>
                </div>
            </template>
        </draggable>
        <div v-else>
            <PDF_text v-if="item.type=='text'" :item="item" :main="main" :id="item.id" :list="globalStore.PDFelements" @deleteItem="deleteItem"/>
            <PDF_image v-if="item.type=='image'" :item="item" :main="main" :id="item.id" :list="globalStore.PDFelements" @deleteItem="deleteItem"/>
            <PDF_line v-if="item.type=='line'" :item="item" :main="main"/>
        </div>
    </div>
</template>

<script>
import { useGlobalStore } from '@/stores/globalStore'
import PDF_image from '@/components/PDF_Elements/PDF_image.vue';
import PDF_text from '@/components/PDF_Elements/PDF_text.vue';
import PDF_line from '@/components/PDF_Elements/PDF_line.vue';
import draggable from 'vuedraggable'

let wait = function (seconds) {
    return new Promise((resolveFn) => {
        setTimeout(resolveFn, seconds * 1000);
    });
};

export default {
    name: "PDF_Element",
    components: { PDF_image, PDF_text, PDF_line, draggable },
    props: {
        item: Object,
        main: Boolean,
    },
    setup() {
        const globalStore = useGlobalStore();
        return { globalStore };
    },
    data() {
        return {
            list: []
        }
    },
    mounted() {
        this.list.push(this.item);
    },
    methods: {
        deleteItem(id) {
            this.globalStore.entered = false;
            this.globalStore.selected = null;
            this.globalStore.type==null;
            this.list = this.list.filter(item => item.id !== id);
            if (this.list.length == 0) this.globalStore.PDFelements = this.globalStore.PDFelements.filter(item => item.id !== this.item.id);
        },
    },
}
</script>