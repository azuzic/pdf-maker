<template>
    <div class="flex">
        <label class="relative inline-flex items-center">
            <input type="checkbox" @input="value = !value; $emit('selected', value)" :checked="value"  class="sr-only peer">  
            <div class="w-9 h-5 rounded-full bg-red-600 peer-checked:after:translate-x-full after:absolute after:top-1 after:left-[2px] 
            after:bg-slate-950 after:hover:bg-slate-900 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-600">
            </div>
        </label>
        <div class="ml-2">{{ label }}</div>
    </div>
</template>

<script>
export default {
    name: "LogCheckBox",
    props: {
        label: String,
        value: Boolean,
    },
}
</script>