<template>
    <div class="bg-slate-950 w-screen h-screen flex relative">
        <GlobalStoreDebug/>
        <RouterView />
    </div>
</template>

<script>
import router from "@/router"
import GlobalStoreDebug from "@/components/GlobalStoreDebug.vue";
export default {
    name: "App",
    components: { GlobalStoreDebug },
}
</script>