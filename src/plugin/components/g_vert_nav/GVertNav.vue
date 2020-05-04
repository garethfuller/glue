<template>
  <div class="flex flex-col">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'GVertNav',

  props: {
    bgColor: { type: String, default: 'white' }
  },

  data: () => ({
    items: []
  }),

  mounted() {
    this.items = this.$children.filter(child => child.$options._componentTag == 'g-vert-nav-item')
    this.setItemData()
  },

  watch: {
    bgColor(newVal) {
      this.setItemData()
    }
  },

  methods: {
    setItemData() {
      this.items.forEach(item => {
        item.bgColor = this.bgColor
      })
    }
  }
}
</script>

<style scoped>
</style>
