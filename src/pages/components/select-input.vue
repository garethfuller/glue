<template>
  <div>
    <div class="w-full p-8">
      <h1 class="text-2xl">Select Input</h1>
    </div>
    <div :class="containerClasses">

      <div class="w-1/4">
        <g-select-input v-model="input" :options="options" />
      </div>

    </div>

    <div class="p-8">
      <g-grid>
        <g-grid-item width="1/4">
          <g-select-input 
            v-model="controls.bgColor" 
            label="Background color" 
            :options="bgColorOpts" 
            size="sm" 
            no-margin
          />
        </g-grid-item>

      </g-grid>

    </div>
  </div>
</template>

<script>
export default {
  name: 'select-input',

  data: () => ({
    activeItem: 1,
    input: 'option_a',
    options: [
      { label: 'Option A', value: 'option_a' },
      { label: 'Option B', value: 'option_b' },
      { label: 'Option C', value: 'option_c' }
    ],
    controls: {
      bgColor: 'white'
    },
    bgColorOpts: ['white', 'black', 'gray-100', 'gray-200', 'gray-300']
  }),

  computed: {
    containerClasses() {
      return [
        'flex justify-center items-center p-8 border-t border-b border-gray-200',
        `bg-${this.controls.bgColor}`
      ]
    }
  },

  methods: {
    isActiveItem(n) {
      return n === this.activeItem
    }
  },
}
</script>

<style scoped>
</style>
