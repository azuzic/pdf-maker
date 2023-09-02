<template>
    <div class="w-full flex-1 bg-amber-200 px-1 rounded overflow-y-auto scrollbar-thin scrollbar-track-amber-600 scrollbar-thumb-amber-900 hover:scrollbar-thumb-amber-950">
        <div v-for="parent in list">
            <div class="bg-amber-400 px-1 rounded my-1 text-left truncate w-full ">
                <div class="truncate -mb-1 text-sm">
                    ╓ <abbr class="no-underline" :title="parent.id">{{ parent.id }}</abbr>
                </div>
                <div v-for="child, id in parent.list">
                    <div class="-my-1 truncate cursor-pointer rounded select-none text-sm" @mouseup="globalStore.setSelected(child, child.type)" :id="'child_'+child.id"
                        @mouseenter="globalStore.entered = true, globalStore.highlighted = child.id, scrollToElement(child.id)" @mouseleave="globalStore.entered = false, globalStore.highlighted = ''"
                        :class="[globalStore.selected == child.id ? 'bg-lime-600' : 'bg-amber-600 hover:bg-lime-200',
                                globalStore.highlighted == child.id && globalStore.selected != child.id ? 'bg-lime-300' : '']">
                        <span v-if="parent.list.length == id+1">╚═></span>
                        <span v-else>╠═></span>
                        <b v-if="child.type"><abbr class="no-underline" :title="child.type.toUpperCase() + ' ID: ' + child.id">{{ child.type.toUpperCase() }}:</abbr></b>
                        <span v-if="child.type == 'image'"> FIPU logo </span>
                        <span v-if="child.type == 'text'"><abbr class="no-underline" :title="child.innerHTML">{{ child.innerHTML }}</abbr></span>
                        <span v-if="child.type == 'line'">{{ child.dashed ? ' Dashed' : ' Solid' }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>
<script>
import { useGlobalStore } from '@/stores/globalStore'
import draggable from "vuedraggable";

export default {
    name: "nested-draggable",
    props:  {
        list: Array
    },
    components: {
        draggable
    },
    setup() {
        const globalStore = useGlobalStore();
        return { globalStore };
    },
    methods: {
        scrollToElement(id) {
            const element = document.getElementById('element_'+id);
            element.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
        }
    }
};
</script>