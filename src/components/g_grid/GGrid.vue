<template lang="html">
  <div :class="[`g-grid flex sm:-mx-${spacing} mx-0`, classes]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'GGrid',

  props: {
    spacing: { type: String, default: '2' },
    vertSpacing: { type: String, default: '2' },
    wrap: { type: Boolean, default: false },
    itemsCenter: { type: Boolean, default: false },
    itemsEnd: { type: Boolean, default: false },
    justifyBetween: { type: Boolean, default: false },
    justifyAround: { type: Boolean, default: false },
    justifyCenter: { type: Boolean, default: false },
  },

  mounted() {
    this.$children.forEach(item => {
      item.spacing = this.spacing
      item.vertSpacing = this.vertSpacing
    })
  },

  computed: {
    classes() {
      return {
        'flex-wrap': this.wrap,
        'items-center': this.itemsCenter,
        'items-end': this.itemsEnd,
        'justify-between': this.justifyBetween,
        'justify-around': this.justifyAround,
        'justify-center': this.justifyCenter
      }
    }
  }
};
</script>

<style lang="css" scoped>
</style>
