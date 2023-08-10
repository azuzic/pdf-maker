<template>
    <div class="bg-slate-950 h-screen w-screen relative overflow-hidden">
        <GlobalStoreDebug/>
        <RouterView />
    </div>
</template>

<script>
import GlobalStoreDebug from "@/components/helpers/GlobalStoreDebug.vue";
export default {
    name: "App",
    components: { GlobalStoreDebug },
}
</script>