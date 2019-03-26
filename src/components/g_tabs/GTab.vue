<template lang="html">
  <div v-if="isActive && !noPanel" :class="['g-tab bg-white p-8 rounded-b']">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'GTab',

  props: {
    name: { type: String },
    icon: { type: String },
    active: { type: Boolean, default: false },
    noPanel: { type: Boolean, default: false }
  },

  data() {
    return {
      isActive: false
    }
  },

  created() {
    this.isActive = this.active
  }
}
</script>

<style lang="css" scoped>
</style>
