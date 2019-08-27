<template>
  <div :class="['flex items-center justify-center rounded-full', classes]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'GCircle',

  props: {
    size: { type: [Number, String], default: 10 },
    color: { type: String, default: 'grey' }
  },

  computed: {
    classes() {
      return {
        [`w-${this.size} h-${this.size}`]: true,
        [`bg-${this.color}`]: true
      }
    }
  }
}
</script>

<style scoped>
</style>
