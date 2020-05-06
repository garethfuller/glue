<template>
  <div :class="['g-card-actions flex', classes]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'GCardActions',

  props: {
    left: { type: Boolean, default: false },
    flat: { type: Boolean, default: false },
  },

  computed: {
    classes() {
      return {
        'justify-end': !this.left,
        'p-4': !this.flat,
        'p-2': this.flat,
      };
    },
  },
};
</script>
