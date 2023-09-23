<template>
    <div class="relative" @mouseup="globalStore.setSelected(item, main ? null : item.type); move = false" 
        @mouseenter="globalStore.entered = true; globalStore.highlighted = item.id; scrollToElement(item.id)" @mouseleave="globalStore.entered = false; globalStore.highlighted = ''">
        
        
        <div v-if="main || (globalStore.moving == item.id && move)" 
                class="flex items-center cursor-grab w-48 py-3 px-4 rounded bg-PE_dark_primary hover:bg-[#0e1420]
                text-PE_dark_gray hover:text-PE_dark_white">
            <i class="fa-solid fa-image mr-8"></i>
            <span class="grow">Image</span>
        </div>

        <div class="relative mb-2" :class="globalStore.highlighted == item.id && globalStore.selected != item.id ? 'outline-dotted outline-1' : ''" v-else>
            <img :class="globalStore.selected == item.id ? 'outline rounded outline-1' : 'hover:outline-dotted outline-1'" :src="item.url" alt="">
            
            <div v-if="globalStore.selected == item.id"  class="cursor-pointer absolute -top-2 -right-2 z-10 bg-sky-950 rounded-full h-4 w-4 flex justify-center items-center">
                <i v-if="globalStore.selected == item.id" @click="deleteSelf()" 
                class="fa-solid fa-xmark-circle text-rose-600 hover:text-rose-500 cursor-pointer text-xl z-10"></i>
            </div>
            <i v-if="globalStore.selected == item.id" @mousedown="cloneItem()"
                class="fa-solid fa-clone text-sky-400 hover:text-sky-300 cursor-pointer text-sm absolute bg-PE_dark_primary p-1 rounded-full
                    -bottom-2 -right-2 z-10 handle">
            </i>            
            <i v-if="globalStore.selected == item.id && item.absolute" @mousedown="startDrag" @mouseup="stopDrag" @mouseleave="stopDrag" @mousemove="drag"
                class="fa-solid fa-up-down-left-right text-green-600 hover:text-green-500 cursor-pointer text-xl absolute -top-2 -left-2 z-10"></i>

            <div v-if="globalStore.selected == item.id"  class="cursor-pointer text-2xl absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10 py-2 px-3 bg-sky-950 rounded-full">
                <i @click="globalStore.imageUrl = item; globalStore.showImagePrompt = true" 
                class="fa-solid fa-image text-sky-400 hover:text-sky-300"></i>
            </div>
        </div>
        <i v-if="globalStore.highlighted == item.id && globalStore.selected != item.id && !main && globalStore.selected == null" 
            @mousedown="move = true; globalStore.moving = item.id;"
            class="fa-solid fa-up-down-left-right text-sky-400 hover:text-sky-300 cursor-pointer text-sm absolute bg-sky-950 p-1 rounded-full
                    -top-2 -left-2 z-10 handle">
        </i>
    </div>
    
</template>

<script>
import { useGlobalStore } from '@/stores/globalStore'
export default {
    name: "PDF_image",
    props: {
        item: Object,
        index: Number,
        main: false,
        list: Array,
    },
    data() {
        return {
            text: "IMAGE",
            isDragging: false,
            initialX: 0,
            initialY: 0,
            offsetX: 0,
            offsetY: 0,
            el: null,
            move: true,
        };
    },
    setup() {
        const globalStore = useGlobalStore();
        return { globalStore };
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
            this.el = document.getElementById('element_' + this.item.id);
            this.isDragging = true;
            if (this.offsetX == 0) {
                if (this.globalStore.selectedItem.initialX != 0) {
                    this.initialX = this.globalStore.selectedItem.initialX;
                    this.initialY = this.globalStore.selectedItem.initialY;
                    this.offsetX = this.globalStore.selectedItem.offsetX;
                    this.offsetY = this.globalStore.selectedItem.offsetY;
                }
                else {
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
                const newX = event.clientX - this.offsetX + 5;
                const newY = event.clientY - this.offsetY + 9;
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
            const element = document.getElementById('child_' + id);
            if (element != null)
                element.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
        }
    },
}
</script>