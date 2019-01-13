<template lang="html">
  <div :class="`g-grid flex flex-wrap sm:-mx-${spacing} mx-0`">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'GGrid',

  props: {
    spacing: { type: String, default: '2' },
    vertSpacing: { type: String, default: '2' }
  },

  mounted() {
    this.$children.forEach(item => {
      item.spacing = this.spacing
      item.vertSpacing = this.vertSpacing
    })
  }
};
</script>

<style lang="css" scoped>
</style>
