<template>
    <div class="flex relative h-full w-full">
        <PDF_EditorBar/>
        <HTML_PreviewEditor/>  
    </div>
</template>

<script>
import { useGlobalStore } from '@/stores/globalStore'
import HTML_PreviewEditor from '@/components/HTML_PreviewEditor.vue';
import PDF_EditorBar from '@/components/PDF_EditorBar.vue';
export default {
    name: "HomeView",
    components: { HTML_PreviewEditor, PDF_EditorBar },
    setup() {
        const globalStore = useGlobalStore();
        return { globalStore };
    },
}
</script>