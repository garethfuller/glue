<template lang="html">
  <component
    :is="tag"
    :class="`hover:underline cursor-pointer text-${color}-500 hover:text-${color}-400 text-${size}`"
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
    }
  }
}
</script>
