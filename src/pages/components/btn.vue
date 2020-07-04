<template>
  <div>
    <div class="w-full p-8">
      <h1 class="text-2xl">Button</h1>
    </div>
    <div :class="containerClasses">

      <div class="w-1/4">
        <g-btn :color="controls.color" :flat="controls.flat" :rounded="controls.rounded">Click me</g-btn>
      </div>

    </div>

    <div class="p-8">
      <g-grid>
        <g-grid-item width="1/4">
          <g-select-input v-model="controls.bgColor" label="Background color" :options="bgColorOpts" size="sm" no-margin/>
          <g-select-input v-model="controls.color" label="Color" :options="colorOpts" size="sm" />

          <div class="flex">
            <div>
              <span class="text-sm">Flat</span>
              <g-switch v-model="controls.flat" label="Flat" round no-margin/>
            </div>
            <div class="ml-4">
              <span class="text-sm">Rounded</span>
              <g-switch v-model="controls.rounded" label="Flat" round />
            </div>
          </div>
          
        </g-grid-item>

      </g-grid>

    </div>
  </div>
</template>

<script>
export default {
  name: 'btn',

  data: () => ({
    activeItem: 1,
    controls: {
      bgColor: 'white',
      flat: false,
      color: 'primary',
      rounded: false
    },
    colorOpts: ['primary', 'black', 'white', 'red', 'blue', 'green'],
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
