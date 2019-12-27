<template lang="html">
  <a
    :class="`hover:underline cursor-pointer text-${_color} hover:text-${hoverColor} text-${size}`"
    v-bind="$attrs"
    v-on="listeners">
    <slot></slot>
  </a>
</template>

<script>
export default {
  name: 'GLink',

  props: {
    color: { type: String, default: 'blue' },
    size: { type: String, default: 'base' }
  },

  computed: {
    listeners() {
      return { ...this.$listeners }
    },

    _color() {
      if (['white', 'black'].includes(this.color)) return this.color
      return `${this.color}-500`
    },

    hoverColor() {
      if (['white', 'black'].includes(this.color)) return this.color
      return `${this.color}-400`
    }
  }
}
</script>
