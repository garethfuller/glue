<template lang="html">
  <div :class="[`g-grid-item sm:px-${spacing} px-0 mb-${vertSpacting} md:mb-${spacing*2}`, classes]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'GGridItem',

  props: {
    width: { type: String }
  },

  data() {
    return {
      spacing: '2',
      vertSpacing: '2'
    }
  },

  computed: {
    classes() {
      return {
        [`w-full sm:w-${this.width}`]: this.width
      }
    }
  }
};
</script>

<style lang="css" scoped>
</style>
