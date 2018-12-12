<template lang="html">
  <div :class="['g-card rounded shadow bg-white', classes]">
    <div v-if="loading" class="h-24 flex items-center justify-center">
      <g-loading-animation />
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
};
</script>

<style lang="css" scoped>
</style>
