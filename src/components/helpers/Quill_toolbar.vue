<script setup>
import { useGlobalStore } from '@/stores/globalStore'
import Quill_toolbar_height from '@/components/helpers/Quill_toolbar_height.vue';
const globalStore = useGlobalStore();
</script>
<template>
    <div class="relative flex justify-center items-center w-full transition-all duration-300" 
        :class="globalStore.selected != null && globalStore.type=='text' ? 'h-8 opacity-100' : 'h-0 opacity-0'">
        <Quill_toolbar_height class="opacity-0 -z-20 pointer-events-none"/>
        <div class="absolute w-full h-full bg-PE_dark_primary -z-20"></div> 
        <div class="absolute w-full z-50" id="epictoolbar" @mouseenter="globalStore.entered = true" @mouseleave="globalStore.entered = false"
        v-if="globalStore.selected != null && globalStore.type=='text'">      
            <div class="flex">
                <button class="ql-bold"></button>
                <button class="ql-italic"></button>
                <button class="ql-underline"></button>
                <button class="ql-strike"></button>
            </div>
            <div class="h-6 w-0.5 rounded-full bg-gray-500"></div>
            <div class="flex">
                <button class="ql-list" value="bullet"></button>
                <button class="ql-blockquote"></button>
                <button class="ql-code-block"></button>
                <button class="ql-formula"></button>
            </div>
            <div class="h-6 w-0.5 rounded-full bg-gray-500"></div>
            <div class="flex">
                <select className="ql-align" defaultValue="false">
                    <option label="left"></option>
                    <option label="center" value="center"></option>
                    <option label="right" value="right"></option>
                    <option label="justify" value="justify"></option>
                </select>
                <button class="ql-indent" value="-1"></button>
                <button class="ql-indent" value="+1"></button>
            </div>
            <div class="h-6 w-0.5 rounded-full bg-gray-500"></div>
            <div class="flex">
                <select class="ql-header custom-select-heading" defaultValue="false">
                    <option value="">Normal</option>
                    <option value="1">H1</option>
                    <option value="2">H2</option>
                    <option value="3">H3</option>
                    <option value="4">H4</option>
                    <option value="5">H5</option>
                    <option value="6">H6</option>
                </select>
            </div>
            <div class="h-6 w-0.5 rounded-full bg-gray-500"></div>
            <div class="flex">
                <select className="ql-color" defaultValue="false">
                    <option v-for="value in [
                        '#000000', '#06060a', '#13131f', '#0f1119', '#15171e', '#111827', '#1f2937', 
                        '#374151', '#475569', '#64748b', '#94a3b8', '#cbd5e1', '#cbd5e1', '#e2e8f0', 
                        '#f1f5f9', '#94a3eb', '#3b82f6', '#2563eb', '#1d4ed8', '#16a34a', '#10b981',                         
                        '#ef4444', '#eab308'
                    ]" 
                    :value="value">{{value}}</option>
                </select>
                <select className="ql-background" defaultValue="false">
                    <option v-for="value in [
                        '#000000', '#06060a', '#13131f', '#0f1119', '#15171e', '#111827', '#1f2937', 
                        '#374151', '#475569', '#64748b', '#94a3b8', '#cbd5e1', '#cbd5e1', '#e2e8f0', 
                        '#f1f5f9', '#94a3eb', '#3b82f6', '#2563eb', '#1d4ed8', '#16a34a', '#10b981',                         
                        '#ef4444', '#eab308'
                    ]" 
                    :value="value">{{value}}</option>
                </select>
            </div>
            <div class="h-6 w-0.5 rounded-full bg-gray-500"></div>
            <div class="flex">
                <button class="ql-script" value="sub"></button>
                <button class="ql-script" value="super"></button>
                <button class="ql-clean"></button>
            </div>
        </div>
    </div>
</template>

<script> 
export default {
    name: "Quill_toolbar",
}
</script>

<style lang="scss">
.dp__menu, .dp__overlay_container {
    background-color: #111827 !important;
    border: 1px solid rgb(75, 85, 99) !important;
    .dp__arrow_top, .dp__arrow_bottom {
        background-color: #3b82f6 !important;
        border: 1px solid rgb(75, 85, 99) !important;
    }
    .dp__active_date, .dp__overlay_cell_active {
        background-color: #3b82f6 !important;
        color: #111827 !important;
    }
    .dp__cell_inner, .dp__month_year_select, .dp__overlay_cell {
        &:hover {
            background-color: rgba(75, 85, 99) !important;
        }
    }
}
.dp__overlay_action {
    background-color: #111827 !important;
    border: 1px solid rgb(75, 85, 99) !important;
    color: #3b82f6 !important;
    &:hover {
        text-decoration: underline;
    }   
    &::after {
        content: "BACK";
    }
}
.dp__icon {
    display: none !important;
}
.dp__input_wrap, .dp__input {
    opacity: 0;
    cursor: pointer !important;
}
.ql-snow {
    border: none !important;
}
.ql-toolbar {
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
    position: fixed;
    display: flex;
    justify-content: center !important;
    align-items: center !important;
    z-index: 32;
    width: 100%;
    justify-content: space-left;
    background-color: #111827;
    border-left: 0px !important;
    border-right: 0px !important;
    border-top: 0px !important;

    .ql-picker-options {
        background-color: #111827 !important;
        border: 1px solid !important;
        border-radius: 4px;
        z-index: 300;
    }

    .ql-formats {
        margin-right: 0px !important;
        display: flex !important;
        flex-wrap: nowrap !important;
        justify-items: center;
        align-items: center;
    }

    button,
    .ql-picker,
    .ql-picker-label {
        border-radius: 4px;
        border: none !important;
        transition: all 0.2s !important;
        svg {filter: brightness(150%);}

        &:hover {
            background-color: #3b82f6 !important;
            font-weight: bold !important;
            svg {filter: brightness(0%);}
        }
    }
    .ql-picker-option, .ql-picker-item {
        svg {filter: brightness(100%) !important ;}
    }
}

.ql-editor {
    width: 100% !important;
    min-width: 10px !important;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 16px !important;
    line-height: 20px !important;
    overflow: visible !important;
    border-radius: 4px !important;
    margin: 0px !important;
    padding: 0px !important;
}

.ql-picker-item {
    transition: all 0.1s !important;
    border: 1px solid rgb(75, 85, 99) !important;
    &:hover {
        transform: scale(120%);
    }
}

.ql-tooltip {
    z-index: 2000;
    position: fixed !important;
    left: 50% !important;
    transform: translate(-50%, -50%) !important;
    width: fit-content !important;
    box-shadow: none !important;
    background-color: rgba(6, 6, 10, 1) !important;
    border: 1px solid rgb(75, 85, 99) !important;
    border-radius: 4px;
    &::before {
        content: none !important;
    }
    .ql-action, .ql-remove {
        color: #3b82f6;
        &:hover {
            text-decoration: underline !important;
        }
    }
    .ql-preview {
        max-width: 150px !important;
        text-decoration: underline !important;
    }
    input {
        color: #cbd5e1;
        transition: all 0.2s !important;
        background-color: rgba(24, 24, 32, 1) !important;
        border: 1px solid rgba(6, 6, 10, 1) !important;
        border-radius: 4px;
        outline: none;
        &:hover {
            border: 1px solid #cbd5e1 !important;
        }
        &:focus {
            border: 1px solid #3b82f6 !important;
        }
    }
}
.ql-editor ul {
    padding-left: 0px !important;
    li {
        margin-left: 0px !important;
        padding-left: 21px !important; 
        &::before {
            margin-left: -21px !important;
            margin-right: 9.5px !important;
            content: "•" !important;
        }
    }
}
.pdf-text ul {
    padding-left: 13px !important;
    li {
        margin-left: 0px !important;
        padding-left: 21px !important; 
        &::before {
            margin-left: -21px !important;
            margin-right: 9.5px !important;
            content: "•" !important;
        }
    }
}
</style>