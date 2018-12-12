<template lang="html">
  <div class="g-card-title p-4">
    <h3 :class="['heading-m flex items-center w-full', classes]">
      <slot></slot>
    </h3>
  </div>
</template>

<script>
export default {
  name: 'GCardTitle',

  props: {
    center: { type: Boolean, default: false },
  },

  computed: {
    classes() {
      return {
        'justify-center': this.center,
        'justify-between': !this.center,
      };
    },
  },
};
</script>

<style lang="css" scoped>
</style>
