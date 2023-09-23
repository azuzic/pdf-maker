<template>
    <div class="relative outline-1 handle" :id="'parent_element_'+item.id" 
        @mouseover="globalStore.entered ? '' : globalStore.highlighted = item.id; scrollToElement(item.id)"
        @mouseleave="globalStore.highlighted = null"
        :class="[
            item.heightType=='Fit' ? 'flex-none':'', 
            item.heightType=='Divide' ? 'flex-1':'', 
            item.heightType=='Grow' ? 'grow':'',
            globalStore.highlighted == item.id && globalStore.selected == null ? 'outline-dotted outline-1 rounded' : '',
            ]"
            :style="{
                height: item.heightType === 'Set' ? (item.height + 'px') : '',
            }">
        <draggable v-if="!main" class="flex w-full" :id="'element_'+item.id" handle=".handle" 
            :class="[
                item.justify=='Start' ? 'justify-start':'', 
                item.justify=='Center' ? 'justify-center':'', 
                item.justify=='End' ? 'justify-end':'', 
                item.justify=='Between' ? 'justify-between':'', 
                item.justify=='Around' ? 'justify-around':'', 
                item.justify=='Evenly' ? 'justify-evenly':''
                ]"

            v-model="item.list" item-key="id" group="pdfelements" :disabled="globalStore.selected != null"
            @change="updateList" :clone="clone" :group="{ name: 'pdfelements', pull: pullFunction }">
            <template #item="{ element, index }">
                <div :id="'element_'+element.id" class="my-[3px]"
                    :class="[element.type=='text' ? element.widthClasses : '', element.absolute ? ' absolute z-20' : 'relative']" 
                    :style="{
                        width: element.widthClasses === 'w' ? (element.width + 'px') : (element.type=='line' ? '100%' : 'auto') ,
                        left: element.absolute ? (element.left + 'px') : 'auto',
                        top: element.absolute ? (element.top + 'px') : 'auto'
                    }">
                    <PDF_text v-if="element.type=='text'" :item="element" :main="main" :list="item.list" @deleteItem="deleteItem" @cloneInnerItem="cloneInnerItem" :index="index"/>
                    <PDF_image v-if="element.type=='image'" :item="element" :main="main" :list="item.list" @deleteItem="deleteItem" @cloneInnerItem="cloneInnerItem"  :index="index"/>
                    <PDF_line v-if="element.type=='line'" :item="element" :main="main" :list="item.list" @deleteItem="deleteItem" @cloneInnerItem="cloneInnerItem"  :index="index"/>
                </div>
            </template>
        </draggable>
        <div v-else>
            <PDF_text v-if="item.list[0].type=='text'" :item="item.list[0]" :main="main" :id="item.id" :list="globalStore.PDFelements" @deleteItem="deleteItem"/>
            <PDF_image v-if="item.list[0].type=='image'" :item="item.list[0]" :main="main" :id="item.id" :list="globalStore.PDFelements" @deleteItem="deleteItem"/>
            <PDF_line v-if="item.list[0].type=='line'" :item="item.list[0]" :main="main" :id="item.id" :list="globalStore.PDFelements" @deleteItem="deleteItem"/>
        </div>
        <div v-if="globalStore.highlighted == item.id && globalStore.selected == null && !main"  class="cursor-pointer absolute -bottom-2 -left-2 z-10 bg-sky-950 rounded-full h-4 w-4 flex justify-center items-center">
            <i @mousedown="deleteSelf()" class="fa-solid fa-xmark-circle text-rose-600 hover:text-rose-500 cursor-pointer text-xl z-10"></i>
        </div>
        <i v-if="globalStore.highlighted == item.id && globalStore.selected == null && !main" @mousedown="cloneItem()"
            class="fa-solid fa-clone text-sky-400 hover:text-sky-300 cursor-pointer text-sm absolute bg-PE_dark_primary p-1 rounded-full
                   -bottom-2 -right-2 z-10 handle">
        </i>
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
        index: Number,
        main: Boolean,
    },
    setup() {
        const globalStore = useGlobalStore();
        return { globalStore };
    },
    methods: {
        deleteSelf() {
            this.globalStore.PDFelements = this.globalStore.PDFelements.filter(item => item.id !== this.item.id);
        },
        deleteItem(id) {
            this.globalStore.entered = false;
            this.globalStore.selected = null;
            this.globalStore.type==null;
            this.item.list = this.item.list.filter(item => item.id !== id);
            if (this.item.list.length == 0) this.globalStore.PDFelements = this.globalStore.PDFelements.filter(item => item.id !== this.item.id);
        },
        cloneInnerItem(item, index) {
            let clone = JSON.parse(JSON.stringify(item));
            clone.id = cryptoRandomString({ length: 32, type: 'alphanumeric' })
            this.item.list.splice(index+1, 0, clone);
        },
        clone(item) { 
            let temp = JSON.parse(JSON.stringify(item));
            let clone = { id: cryptoRandomString({ length: 32, type: 'alphanumeric' }), 
                            justify: this.item.justify, 
                            heightType: this.item.heightType, 
                            height: this.item.height, 
                            list:[temp] };
            return clone;
        },
        cloneItem() {
            let temp = JSON.parse(JSON.stringify(this.item.list));
            let clone = { id: cryptoRandomString({ length: 32, type: 'alphanumeric' }), 
                            justify: this.item.justify, 
                            heightType: this.item.heightType, 
                            height: this.item.height, 
                            list: temp };
            clone.list.forEach(e => {
                e.id = cryptoRandomString({ length: 32, type: 'alphanumeric' })
            })
            this.globalStore.PDFelements.splice(this.index+1, 0, clone);
        },
        updateList(change) {
            if (change.added) {
                let temp = JSON.parse(JSON.stringify(change.added.element.list[0]));
                temp.parentID = this.item.id;
                let index = this.item.list.findIndex(item => item.id === change.added.element.id);
                if (index !== -1) {
                    this.item.list[index] = temp;
                    this.item.list.splice(index, 1);
                }
                else console.log("Element with ID " + index + " not found."); 
                let i = index;
                change.added.element.list.forEach(element => {
                    element.parentID = this.item.id;
                    this.item.list.splice(i, 0, element);
                    i++;
                });            
            }
            this.deleteItem(0);
        },
        pullFunction() {
            return "clone";
        },
        scrollToElement(id) {
            const element = document.getElementById('child_'+id);
            if (element != null) element.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
        }
    },
}
</script>