<template>
  <div class="flex">
    <div :class="`min-h-screen w-${width} bg-${sidebarColor} border-r border-gray-200`">
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
    width: { type: String, default: '1/4' },
    sidebarColor: { type: String, default: 'gray-100' },
    contentColor: { type: String, default: 'white' }
  }
}
</script>

<style scoped>
</style>
