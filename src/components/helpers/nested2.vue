<template>
    <draggable v-model="parent.list" :id="'parent_'+parent.id" item-key="id" group="pdfelements" :disabled="globalStore.selected != null"
        @change="updateList" :clone="clone" :group="{ name: 'pdfelements', pull: pullFunction }">
        <template #item="{ element, index }">
            <div class="-my-[3px] truncate cursor-pointer select-none text-sm border-x text-PE_dark_gray transition-all" 
                @mouseup="globalStore.setSelected(element, element.type)" :id="'child_'+element.id"
                @mouseenter="globalStore.entered = true, globalStore.highlighted = element.id, scrollToElement(element.id)" @mouseleave="globalStore.entered = false, globalStore.highlighted = ''"
                :class="[(globalStore.highlighted == element.id && globalStore.selected != element.id) || globalStore.selected == element.id ? 
                        'bg-PE_dark_accent_pressed border-PE_dark_accent_pressed' : 'border-PE_dark_blue'],
                        parent.list.length == index+1 ? 'rounded-b border-b mb-[1px]' : '' ">
                
                <span v-if="parent.list.length == index+1" :class=" globalStore.highlighted == element.id ? 'text-PE_dark_white' : ''">╚═></span>
                <span v-else  :class="globalStore.highlighted == element.id || globalStore.selected == element.id ? 'text-PE_dark_white' : ''">╠═></span>
                <b v-if="element.type">
                    <abbr :class="globalStore.highlighted == element.id || globalStore.selected == element.id ? 'text-PE_dark_white' : ''" class="no-underline text-PE_dark_gray" 
                        :title="element.type.toUpperCase() + ' ID: ' + element.id">{{ element.type.toUpperCase() }}:
                    </abbr>
                </b>

                <span v-if="element.type == 'image'" :class="globalStore.highlighted == element.id ? 'text-PE_dark_white' : ''" class="text-PE_dark_blue"> 
                    FIPU logo 
                </span>
                <span v-if="element.type == 'text'">
                    <abbr :class="globalStore.highlighted == element.id || globalStore.selected == element.id ? 'text-PE_dark_white' : ''" class="no-underline text-PE_dark_blue" 
                        :title="element.innerHTML">{{ element.innerHTML }}
                    </abbr>
                </span>
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
                if (index !== -1) {
                    this.parent.list[index] = temp;
                    this.parent.list.splice(index, 1);
                }
                else console.log("Element with ID " + index + " not found."); 
                let i = index;
                change.added.element.list.forEach(element => {
                    this.parent.list.splice(i, 0, element);
                    i++;
                });     
            }
            this.deleteItem(0);
        },
        pullFunction() {
            return "clone";
        },
    }
};
</script>