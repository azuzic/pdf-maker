<template>
    
  <div  
  class="fixed left-0 top-0 flex justify-center items-center z-[1000] w-screen h-full" :class="showPrompt ? '' : 'pointer-events-none'">
    <div class="fixed left-0 top-0 w-screen h-full bg-black -z-10 transition-all duration-500" :class="showPrompt ? 'bg-opacity-75' : 'bg-opacity-0'">

    </div>
    <form :class="showPrompt ? 'opacity-100' : 'opacity-0'" class="rounded-2xl flex-col dark:bg-slate-900/70 hover:shadow-lg transition-all bg-white flex md:w-7/12 lg:w-5/12 xl:w-4/12 shadow-2xl md:mx-auto">
        <div class="flex-1 p-6"><div class="flex flex-col mb-6 -mt-6 -mr-6 -ml-6 animate-fade-in" is-placed-with-header="true">
            <div class="bg-blue-500 border-blue-500 text-white rounded-t-2xl flex flex-col p-6 transition-colors">
                <span>
                    {{ title }}
                </span>
            </div>
        </div>
        <div class="mb-6 last:mb-0">
            <label class="block font-bold mb-2 text-PE_dark_gray">{{variable}}:</label>
            <div class="relative" help="Your full name">
                <input v-model="value" :placeholder="placeholder" type="text" 
                class="text-PE_dark_white px-3 py-2 max-w-full focus:ring-4 ring-blue-600 focus:outline-none border-gray-700 rounded w-full placeholder-gray-400 h-12 border bg-slate-800">
            </div>
        </div>
        </div>
        <footer class="px-6 pb-3 flex justify-between">
            <button :disabled="value == ''" @mousedown="submitPrompt(true)"
                :class="value == '' ? 'cursor-not-allowed bg-blue-400 border-blue-400' : 'hover:bg-blue-600 hover:border-blue-600'"
                class="inline-flex justify-center items-center whitespace-nowrap focus:outline-none transition-colors focus:ring duration-150 border
                cursor-pointer rounded border-blue-500 ring-blue-700 bg-blue-500
                text-white py-2 px-3 mr-3 last:mr-0 mb-3" 
                type="submit">
                <span class="px-2">Submit</span>
            </button>
            <button @mousedown="submitPrompt(false)" class="inline-flex justify-center items-center whitespace-nowrap focus:outline-none transition-colors focus:ring duration-150 border cursor-pointer rounded border-blue-500 ring-blue-700 text-blue-500 hover:bg-blue-600 hover:text-white hover:border-blue-600 py-2 px-3 mr-3 last:mr-0 mb-3" type="submit">
                <span class="px-2">Cancel</span>
            </button>
        </footer>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    showPrompt: Boolean,
    title: String,
    variable: String,
    placeholder: String
  },
  data() {
    return {
        value: ""
    }
  },
  methods: {
    submitPrompt(value) {
      this.$emit('submitPrompt', this.value, value);
    }
  }
};
</script>
