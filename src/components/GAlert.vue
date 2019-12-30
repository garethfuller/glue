<template>
  <div :class="`g-alert bg-white-500 ${shadow} rounded border-l-4 border-${color}-500`">
    <div v-if="!persistent" class="relative">
      <div class="absolute right-0 mr-1 mt-1">
        <g-btn flat circle @click.native="$emit('close')" size="small" color="gray">
          <g-icon name="fas fa-times" class="text-sm text-gray-600"></g-icon>
        </g-btn>
      </div>
    </div>

    <div class="flex items-center">
      <div v-if="icon" class="px-6 flex items-center">
        <g-icon :name="icon" :class="`text-2xl text-${color}-500`" />
      </div>
      <div :class="['w-full content py-6 pr-4', { 'pl-4': !icon }]">
        <h3 class="font-medium text-lg mb-0">
          <slot name="title">
            {{ title }}
          </slot>
        </h3>
        <div class="text-gray-700">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GAlert',

  props: {
    title: { type: String },
    color: { type: String, default: 'blue' },
    icon: { type: String },
    persistent: { type: Boolean, default: false },
    shadow: { type: String, default: 'shadow-lg' }
  }
}
</script>

<style scoped>
</style>
