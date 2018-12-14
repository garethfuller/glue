<template lang="html">
  <form class="g-form"
    :action="action"
    :method="method"
    @submit.prevent="$emit('submit')">
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: 'GForm',

  inject: ['$validator'],

  props: {
    action: { type: String, default: '' },
    method: { type: String, default: 'post' },
  },
};
</script>

<style lang="css" scoped>
</style>
