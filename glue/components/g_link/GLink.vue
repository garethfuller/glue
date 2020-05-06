<template>
  <component
    :is="tag"
    :class="`g-link hover:underline cursor-pointer ${textColor} text-${size}`"
    v-bind="$attrs"
    v-on="listeners">
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: 'GLink',

  props: {
    color: { type: String, default: 'primary' },
    size: { type: String, default: 'base' },
    tag: { type: String, default: 'a' }
  },

  computed: {
    listeners() {
      return { ...this.$listeners }
    },

    textColor() {
      if (this.color === 'black') return `text-gray-800 hover:text-${this.color}`
      return `text-${this.color}-500 hover:text-${this.color}-400 `
    }
  }
}
</script>

<style media="screen">
.g-link {
  transition: all .3s ease;
}
</style>
