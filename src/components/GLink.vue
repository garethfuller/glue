<template lang="html">
  <a
    :class="`hover:underline cursor-pointer text-${color}-500 hover:text-${color}-400 text-${size}`"
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
    }
  }
}
</script>
