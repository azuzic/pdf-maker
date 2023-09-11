<template>
    <div class="flex">
        <label class="relative inline-flex items-center">
            <input type="checkbox" @input="value = !value; $emit('selected', value)" :checked="value"  class="sr-only peer">  
            <div class="w-9 h-5 rounded-full bg-PE_dark_red peer-checked:after:translate-x-full after:absolute after:top-1 after:left-[2px] 
            after:bg-PE_dark_primary after:hover:bg-PE_dark_secondary after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-PE_dark_green">
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