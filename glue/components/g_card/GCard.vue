<template>
  <div :class="['g-card rounded shadow bg-white', classes]">
    <div v-if="loading" class="h-24 flex items-center justify-center">
      <g-loading-icon />
    </div>
    <template v-else>
      <slot></slot>
    </template>
  </div>
</template>

<script>
export default {
  name: 'GCard',

  props: {
    loading: { type: Boolean, default: false },
  },

  computed: {
    classes() {
      return {};
    },
  },
};
</script>
