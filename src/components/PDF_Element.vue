<template>
    <div class="relative">
        <draggable v-if="!main" class="flex w-full" :id="'element_'+item.id" 
            :class="[
                item.justify=='Start' ? 'justify-start':'', 
                item.justify=='Center' ? 'justify-center':'', 
                item.justify=='End' ? 'justify-end':'', 
                item.justify=='Between' ? 'justify-between':'', 
                item.justify=='Around' ? 'justify-around':'', 
                item.justify=='Evenly' ? 'justify-evenly':'']"
            v-model="item.list" item-key="id" group="pdfelements" :disabled="globalStore.selected != null"
            @change="updateList" :clone="clone" :group="{ name: 'pdfelements', pull: pullFunction }">
            <template #item="{ element }">
                <div :id="'element_'+element.id"
                    :class="[element.type=='text' ? element.widthClasses : '', element.absolute ? ' absolute z-20' : '']" 
                    :style="{
                        width: element.widthClasses === 'w' ? (element.width + 'px') : (element.type=='line' ? '100%' : 'auto') ,
                        left: element.absolute ? (element.left + 'px') : 'auto',
                        top: element.absolute ? (element.top + 'px') : 'auto'
                    }">
                    <PDF_text v-if="element.type=='text'" :item="element" :main="main" :list="item.list" @deleteItem="deleteItem"/>
                    <PDF_image v-if="element.type=='image'" :item="element" :main="main" :list="item.list" @deleteItem="deleteItem"/>
                    <PDF_line v-if="element.type=='line'" :item="element" :main="main" :list="item.list" @deleteItem="deleteItem"/>
                </div>
            </template>
        </draggable>
        <div v-else>
            <PDF_text v-if="item.list[0].type=='text'" :item="item.list[0]" :main="main" :id="item.id" :list="globalStore.PDFelements" @deleteItem="deleteItem"/>
            <PDF_image v-if="item.list[0].type=='image'" :item="item.list[0]" :main="main" :id="item.id" :list="globalStore.PDFelements" @deleteItem="deleteItem"/>
            <PDF_line v-if="item.list[0].type=='line'" :item="item.list[0]" :main="main" :id="item.id" :list="globalStore.PDFelements" @deleteItem="deleteItem"/>
        </div>
    </div>
</template>

<script>
import { useGlobalStore } from '@/stores/globalStore'
import PDF_image from '@/components/PDF_Elements/PDF_image.vue';
import PDF_text from '@/components/PDF_Elements/PDF_text.vue';
import PDF_line from '@/components/PDF_Elements/PDF_line.vue';
import cryptoRandomString from 'crypto-random-string';
import draggable from 'vuedraggable'

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
    methods: {
        deleteItem(id) {
            this.globalStore.entered = false;
            this.globalStore.selected = null;
            this.globalStore.type==null;
            this.item.list = this.item.list.filter(item => item.id !== id);
            if (this.item.list.length == 0) this.globalStore.PDFelements = this.globalStore.PDFelements.filter(item => item.id !== this.item.id);
        },
        clone( item ) { 
            let temp = JSON.parse(JSON.stringify(item));
            let clone = { id: cryptoRandomString({ length: 32, type: 'alphanumeric' }), justify: this.item.justify, list:[temp] };
            return clone;
        },
        updateList(change) {
            if (change.added) {
                let temp = JSON.parse(JSON.stringify(change.added.element.list[0]));
                temp.parentID = this.item.id;
                let index = this.item.list.findIndex(item => item.id === change.added.element.id);
                if (index !== -1) this.item.list[index] = temp;
                else console.log("Element with ID " + targetId + " not found.");                
            }
            this.deleteItem(0);
        },
        pullFunction() {
            return "clone";
        },
    },
}
</script>