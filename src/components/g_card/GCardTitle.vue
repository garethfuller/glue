<template lang="html">
  <div class="g-card-title p-4">
    <h3 :class="['m-0 flex items-center w-full', classes, headingClass]">
      <slot></slot>
    </h3>
  </div>
</template>

<script>
export default {
  name: 'GCardTitle',

  props: {
    center: { type: Boolean, default: false },
    headingClass: { type: String, default: 'headline' },
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
