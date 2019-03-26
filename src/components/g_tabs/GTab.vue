<template lang="html">
  <component
    :is="tag"
    v-bind="attrs"
    v-if="isActive && !noPanel"
    :class="['g-tab bg-white p-8 rounded-b']">
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: 'GTab',

  props: {
    name: { type: String },
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

  created() {
    this.isActive = this.active
  },

  computed: {
    tag() {
      if (this.to) return 'nuxt-link'
      return 'div'
    },

    attrs() {
      let attrs = {}
      if (this.to) attrs.to = this.to
      return attrs
    }
  }
}
</script>

<style lang="css" scoped>
</style>
