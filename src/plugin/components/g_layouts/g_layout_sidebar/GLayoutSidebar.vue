<template>
  <div class="flex">
    <div :class="`min-h-screen w-${width} bg-${sidebarColor}`">
      <slot name="sidebar"></slot>
    </div>
    <div :class="`min-h-screen w-full bg-${contentColor}`">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GLayoutSidebar',

  props: {
    width: { type: String, default: '1/5' },
    sidebarColor: { type: String, default: 'gray-200' },
    contentColor: { type: String, default: 'white' }
  }
}
</script>

<style scoped>
</style>
