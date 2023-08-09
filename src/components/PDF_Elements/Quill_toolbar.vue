<template>
    <div id="epictoolbar">      
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
            <select className="ql-color" defaultValue="false">
                <option value="#000000">#000000</option>
                <option value="#06060a">#06060a</option>
                <option value="#13131f">#13131f</option>
                <option value="#0f1119">#0f1119</option>
                <option value="#EF5350">#EF5350</option>
                <option value="#16a34a">#16a34a</option>
                <option value="#15171e">#15171e</option>
                <option value="#cbd5e1">#cbd5e1</option>
                <option value="#e2e8f0">#e2e8f0</option>
                <option value="#94a3eb">#94a3eb</option>
                <option value="#94a3b8">#94a3b8</option>
            </select>
            <select className="ql-background" defaultValue="false">
                <option value="#00000000">#00000000</option>
                <option value="#06060a">#06060a</option>
                <option value="#13131f">#13131f</option>
                <option value="#0f1119">#0f1119</option>
                <option value="#EF5350">#EF5350</option>
                <option value="#16a34a">#16a34a</option>
                <option value="#15171e">#15171e</option>
                <option value="#cbd5e1">#cbd5e1</option>
                <option value="#e2e8f0">#e2e8f0</option>
                <option value="#94a3eb">#94a3eb</option>
                <option value="#94a3b8">#94a3b8</option>
            </select>
        </div>
        <div class="h-6 w-0.5 rounded-full bg-gray-500"></div>
        <div class="flex">
            <button class="ql-script" value="sub"></button>
            <button class="ql-script" value="super"></button>
            <button class="ql-clean"></button>
        </div>
    </div>
</template>

<script>
export default {
    name: "Quill_toolbar",
}
</script>

<style lang="scss">
.custom-select-heading {
    width: fit-content !important;
    justify-content: center !important;
    justify-items: center !important;
    padding: 1px !important;
    svg { display:none;}
    .ql-picker-options {
        padding: 0px !important;
        margin: 0px !important;
        background-color: rgb(200, 250, 200) !important;
        border: 1px solid !important;
        border-radius: 4px;
        z-index: 300;
    }
}
.dp__menu, .dp__overlay_container {
    background-color: rgba(6, 6, 10) !important;
    border: 1px solid rgb(75, 85, 99) !important;
    .dp__arrow_top, .dp__arrow_bottom {
        background-color: #EF5350 !important;
        border: 1px solid rgb(75, 85, 99) !important;
    }
    .dp__active_date, .dp__overlay_cell_active {
        background-color: #EF5350 !important;
        color: rgba(6, 6, 10) !important;
    }
    .dp__cell_inner, .dp__month_year_select, .dp__overlay_cell {
        &:hover {
            background-color: rgba(75, 85, 99) !important;
        }
    }
}
.dp__overlay_action {
    background-color: rgba(6, 6, 10) !important;
    border: 1px solid rgb(75, 85, 99) !important;
    color: #EF5350 !important;
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
    display: flex;
    justify-content: center !important;
    align-items: center !important;
    z-index: 32;
    background-color: rgb(200, 200, 200);
    border-radius: 4px;
    padding: 4px 8px !important;

    .ql-picker-options {
        padding: 0px !important;
        margin: 0px !important;
        background-color: rgb(200, 200, 200) !important;
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
        color: black !important;
        svg {filter: brightness(50%);}
        .ql-stroke {filter: brightness(50%);}

        &:hover {
            background-color: white !important;
            font-weight: bold !important;
            svg {filter: brightness(0%);}
        }
    }
    .ql-picker-option, .ql-picker-item {
        display: flex !important;
        justify-content: center !important;
        justify-items: center !important;
        padding: 2px !important;
        border-radius: 4px !important;
        svg {            
            filter: brightness(100%) !important ;
        }
    }
}

.ql-editor {
    width: 100% !important;
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
    font-weight: normal;
    &:hover {
        transform: scale(110%);
        font-weight: normal;
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
        color: #EF5350;
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
            border: 1px solid white !important;
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