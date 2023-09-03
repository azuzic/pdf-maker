<template>
    <draggable v-model="parent.list" :id="'parent_'+parent.id" item-key="id" group="pdfelements" :disabled="globalStore.selected != null"
        @change="updateList" :clone="clone" :group="{ name: 'pdfelements', pull: pullFunction }">
        <template #item="{ element, index }">
            <div class="-my-1 truncate cursor-pointer rounded select-none text-sm" @mouseup="globalStore.setSelected(element, element.type)" :id="'child_'+element.id"
                @mouseenter="globalStore.entered = true, globalStore.highlighted = element.id, scrollToElement(element.id)" @mouseleave="globalStore.entered = false, globalStore.highlighted = ''"
                :class="[globalStore.selected == element.id ? 'bg-lime-600' : 'bg-amber-600 hover:bg-lime-200',
                        globalStore.highlighted == element.id && globalStore.selected != element.id ? 'bg-lime-300' : '']">
                <span v-if="parent.list.length == index+1">╚═></span>
                <span v-else>╠═></span>
                <b v-if="element.type"><abbr class="no-underline" :title="element.type.toUpperCase() + ' ID: ' + element.id">{{ element.type.toUpperCase() }}:</abbr></b>
                <span v-if="element.type == 'image'"> FIPU logo </span>
                <span v-if="element.type == 'text'"><abbr class="no-underline" :title="element.innerHTML">{{ element.innerHTML }}</abbr></span>
                <span v-if="element.type == 'line'">{{ element.dashed ? ' Dashed' : ' Solid' }}</span>
            </div> 
        </template>
    </draggable>
</template>
<script>
import { useGlobalStore } from '@/stores/globalStore'
import cryptoRandomString from 'crypto-random-string';
import draggable from "vuedraggable";

export default {
    name: "nested2",
    props:  {
        list: Array,
        parent: Object
    },
    components: {
        draggable
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
            this.parent.list = this.parent.list.filter(item => item.id !== id);
            if (this.parent.list.length == 0) this.globalStore.PDFelements = this.globalStore.PDFelements.filter(item => item.id !== this.parent.id);
        },
        scrollToElement(id) {
            const element = document.getElementById('element_'+id);
            element.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
        },
        clone( item ) { 
            let temp = JSON.parse(JSON.stringify(item));
            let clone = { id: cryptoRandomString({ length: 32, type: 'alphanumeric' }), justify: this.parent.justify, list:[temp] };
            return clone;
        },
        updateList(change) {
            if (change.added) {
                let temp = JSON.parse(JSON.stringify(change.added.element.list[0]));
                temp.parentID = this.parent.id;
                let index = this.parent.list.findIndex(item => item.id === change.added.element.id);
                if (index !== -1) this.parent.list[index] = temp;
                else console.log("Element with ID " + targetId + " not found.");                
            }
            this.deleteItem(0);
        },
        pullFunction() {
            return "clone";
        },
    }
};
</script>