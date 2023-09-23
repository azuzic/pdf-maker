<template>
    <div class="relative" @mouseup="globalStore.setSelected(item, main ? null : item.type); move = false;"
        @mouseenter="globalStore.entered = true; globalStore.highlighted = item.id; scrollToElement(item.id)" @mouseleave="globalStore.entered = false; globalStore.highlighted = ''">
        
        <div v-if="main || (globalStore.moving == item.id && move)" 
                class="flex items-center cursor-grab w-48 py-3 px-4 rounded bg-PE_dark_primary hover:bg-[#0e1420]
                text-PE_dark_gray hover:text-PE_dark_white">
            <i class="fa-solid fa-font mr-8"></i>
            <span class="grow">Text</span>
        </div>

        <div class="relative my-[3px]" :class="globalStore.highlighted == item.id && globalStore.selected != item.id ? 'outline-dotted outline-1 rounded' : ''" v-else>
            <div ref="innerHTML" :innerHTML="computedInnerHTML" class="outline-none bg-slate-300 bg-opacity-0 border-0 rounded 
                -my-[3px] px-2 pdf-text hover:bg-opacity-25 w-full"></div>
            <div class="absolute top-1 left-0 w-full"
                :class="globalStore.selected == item.id ? 'h-full -my-1 px-2 bg-gray-400 bg-opacity-25 rounded' : 'h-0 p-0 m-0 bg-opacity-0'">
                <QuillEditor v-if="globalStore.selected == item.id" v-model:content="innerHTML" contentType="html" theme="snow" toolbar="#epictoolbar"/>
            </div>
            <div v-if="globalStore.selected == item.id"  class="cursor-pointer absolute -top-2 -right-1 z-10 bg-sky-950 rounded-full h-4 w-4 flex justify-center items-center">
                <i v-if="globalStore.selected == item.id" @mouseup="deleteSelf()" 
                class="fa-solid fa-xmark-circle text-rose-600 hover:text-rose-500 cursor-pointer text-xl z-10"></i>
            </div>
            <i v-if="globalStore.selected == item.id" @mousedown="cloneItem()"
                class="fa-solid fa-clone text-sky-400 hover:text-sky-300 cursor-pointer text-xs absolute bg-PE_dark_primary p-1 rounded-full
                    -bottom-3 -right-1.5 z-10 handle">
            </i>
            <i v-if="globalStore.selected == item.id && item.absolute" @mousedown="startDrag" @mouseup="stopDrag" @mouseleave="stopDrag" @mousemove="drag"
                class="fa-solid fa-up-down-left-right text-green-600 hover:text-green-500 cursor-pointer text-xl absolute -top-2 -left-2 z-10"></i>
        </div>
        <i v-if="globalStore.highlighted == item.id && globalStore.selected != item.id && !main && globalStore.selected == null" 
            @mousedown="move = true; globalStore.moving = item.id;"
            class="fa-solid fa-up-down-left-right text-sky-400 hover:text-sky-300 cursor-pointer text-sm absolute bg-PE_dark_primary p-1 rounded-full
                    -top-2 -left-2 z-10 handle">
        </i>
    </div>
    
</template>

<script>
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { useGlobalStore } from '@/stores/globalStore'
export default {
    name: "PDF_text",
    props: {
        item: Object,
        index: Number,
        main: false,
        list: Array,
    },
    setup() {
        const globalStore = useGlobalStore();
        return { globalStore };
    },
    data() {
        return {
            text: "TEXT",
            innerHTML: this.item.innerHTML,
            showQuill: false,
            isDragging: false,
            initialX: 0,
            initialY: 0,
            offsetX: 0,
            offsetY: 0,
            el: null,
            move: true,
        };
    },
    async mounted() {
        window.katex = katex;
        await this.globalStore.wait(0.1);
        this.move = false;
    },
    methods: {
        deleteSelf() {
            this.$emit('deleteItem', this.item.id);
        },
        cloneItem() {
            this.$emit('cloneInnerItem', this.item, this.index);
        },
        startDrag(event) {
            this.el = document.getElementById('element_'+this.item.id);
            this.isDragging = true;
            if (this.offsetX == 0) {

                if (this.globalStore.selectedItem.initialX != 0) {
                    this.initialX = this.globalStore.selectedItem.initialX;
                    this.initialY = this.globalStore.selectedItem.initialY;
                    this.offsetX = this.globalStore.selectedItem.offsetX;
                    this.offsetY = this.globalStore.selectedItem.offsetY;
                } else {
                    this.initialX = event.clientX;
                    this.initialY = event.clientY;
                    this.offsetX = this.initialX - event.target.offsetLeft;
                    this.offsetY = this.initialY - event.target.offsetTop;

                    this.globalStore.selectedItem.initialX = this.initialX;
                    this.globalStore.selectedItem.initialY = this.initialY;
                    this.globalStore.selectedItem.offsetX = this.offsetX;
                    this.globalStore.selectedItem.offsetY = this.offsetY;
                }
            }
        },
        drag(event) {
            if (this.isDragging) {
                const newX = event.clientX - this.offsetX+5;
                const newY = event.clientY - this.offsetY+9;

                this.el.style.left = newX + 'px';
                this.el.style.top = newY + 'px';

                this.globalStore.selectedItem.left = newX;
                this.globalStore.selectedItem.top = newY;
            }
        },
        stopDrag() {
            this.isDragging = false;
        },
        scrollToElement(id) {
            const element = document.getElementById('child_'+id);
            if (element != null) element.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
        }
    },
    computed: {
        computedInnerHTML() {
            if (this.innerHTML == undefined) return;
            let innerHTML = this.innerHTML.replace(/  /g, "&nbsp;&nbsp;");
            this.item.innerHTML = innerHTML;
            if (this.item.id == this.globalStore.selected) this.globalStore.selectedItem = this.item;
            this.innerHTML = innerHTML;
            return this.innerHTML;
        },
    },
}
</script>