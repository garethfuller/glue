<template lang="html">
  <component
    :is="tag"
    v-bind="attrs"
    v-if="isActive && !noPanel"
    :class="['g-tab bg-white-500 p-8 rounded-b']">
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: 'GTab',

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
