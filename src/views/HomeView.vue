<template>
    <div class="flex relative h-full w-full">
        <PDF_EditorBar/>
        <HTML_PreviewEditor/>  
        <PDF_ElementSettings/>
    </div>
</template>

<script>
import { useGlobalStore } from '@/stores/globalStore'
import HTML_PreviewEditor from '@/components/HTML_PreviewEditor.vue';
import PDF_EditorBar from '@/components/PDF_EditorBar.vue';
import PDF_ElementSettings from '../components/PDF_ElementSettings.vue';
export default {
    name: "HomeView",
    components: { HTML_PreviewEditor, PDF_EditorBar, PDF_ElementSettings },
    setup() {
        const globalStore = useGlobalStore();
        return { globalStore };
    },
}
</script>