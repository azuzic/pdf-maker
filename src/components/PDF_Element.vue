<template>
    <div class="relative" @mouseup="globalStore.setSelected(id, main ? null : item.type)" @mouseenter="globalStore.entered = true" @mouseleave="globalStore.entered = false">
        <PDF_image v-if="item.type=='image'" :item="item" :main="main" :id="id"/>
        <PDF_text v-if="item.type=='text'" :item="item" :main="main" :id="id"/>
        <PDF_line v-if="item.type=='line'" :item="item" :main="main" :id="id"/>
    </div>
</template>

<script>
import { useGlobalStore } from '@/stores/globalStore'
import PDF_image from '@/components/PDF_Elements/PDF_image.vue';
import PDF_text from '@/components/PDF_Elements/PDF_text.vue';
import PDF_line from '@/components/PDF_Elements/PDF_line.vue';
import cryptoRandomString from 'crypto-random-string';
export default {
    name: "PDF_Element",
    components: { PDF_image, PDF_text, PDF_line },
    props: {
        item: Object,
        main: Boolean,
    },
    data() {
        return {
            id: cryptoRandomString({ length: 32, type: 'alphanumeric' }),
        }
    },
    setup() {
        const globalStore = useGlobalStore();
        return { globalStore };
    },
}
</script>