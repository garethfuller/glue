<template lang="html">
  <component
    is="div"
    v-if="isActive && !noPanel">
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: 'GVertNavItem',

  props: {
    name: { type: String },
    path: { type: String },
    icon: { type: String },
    active: { type: Boolean, default: false },
    noPanel: { type: Boolean, default: false },
    to: { type: String }
  },

  data() {
    return {
      isActive: false
    }
  },

  watch: {
    active(newVal) {
      this.isActive = this.active
    }
  },

  created() {
    this.isActive = this.active
  }
}
</script>

<style lang="css" scoped>
</style>
