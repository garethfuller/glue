<template>
  <div>
    <div class="w-full p-8">
      <h1 class="text-2xl">Veritcal Navigation</h1>
    </div>
    <div :class="containerClasses">

      <div class="w-1/4">
        <g-vert-nav :bg-color="controls.bgColor">
          <g-vert-nav-item icon="fas fa-user-circle" :active="isActiveItem(1)" @click="activeItem = 1">
            Item 1
          </g-vert-nav-item>
          <g-vert-nav-item icon="fas fa-home" badge-count="3" :active="isActiveItem(2)" @click="activeItem = 2">
            Item 2
          </g-vert-nav-item>
          <g-vert-nav-item icon="fas fa-address-book" :active="isActiveItem(3)" @click="activeItem = 3">
            Item 3
          </g-vert-nav-item>
        </g-vert-nav>
      </div>

    </div>

    <div class="p-8">
      <g-grid>
        <g-grid-item width="1/4">
          <g-text-input v-model="controls.bgColor" label="Background Color" size="sm"/>
        </g-grid-item>

      </g-grid>

    </div>
  </div>
</template>

<script>
export default {
  name: 'vert-nav',

  data: () => ({
    activeItem: 1,
    controls: {
      bgColor: 'white'
    }
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
