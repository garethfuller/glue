<template lang="html">
  <div :class="['inline-block', classes]" :style="styles">
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
        [`bg-${this.color}-500`]: true,
      };
    },

    styles() {
      return {
        width: `${this.radius * 2}px`,
        height: `${this.radius * 2}px`,
        borderRadius: `${this.radius}px`
      }
    }
  }
}
</script>

<style scoped>
</style>
