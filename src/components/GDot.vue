<template lang="html">
  <div :class="['g-dot inline-block', classes]" :style="styles">
  </div>
</template>

<script>
export default {
  name: 'GDot',

  props: {
    color: {
      type: String,
      default: 'green',
      validator: value => ['green', 'orange', 'red'].indexOf(value) !== -1,
    },
    radius: { type: Number, default: 5 },
  },

  computed: {
    classes() {
      return {
        [`g-dot-${this.color}`]: true,
      };
    },

    styles() {
      return {
        width: `${this.radius * 2}px`,
        height: `${this.radius * 2}px`,
        borderRadius: `${this.radius}px`,
      };
    },
  },
};
</script>

<style lang="css" scoped>
.g-dot-green {
  @apply .bg-green;
}
.g-dot-orange {
  @apply .bg-orange;
}
.g-dot-red {
  @apply .bg-red;
}
</style>
