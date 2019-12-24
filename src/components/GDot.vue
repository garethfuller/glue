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
.g-dot-green-500 {
  @apply .bg-green-500;
}
.g-dot-orange-500 {
  @apply .bg-orange-500;
}
.g-dot-red-500 {
  @apply .bg-red-500;
}
</style>
