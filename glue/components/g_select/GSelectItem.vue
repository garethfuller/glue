<template>
  <div :class="['g-select-item text-gray-900 no-underline block cursor-pointer hover:bg-gray-100', classes]">
    <div class="flex items-center">
      <div v-if="icon" class="w-8">
        <g-icon :name="icon" class="text-lg" />
      </div>
      <slot>{{ text }}</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GSelectItem',

  props: {
    icon: { type: String },
    text: { type: String },
    size: { type: String },
  },

  computed: {
    classes() {
      return [
        this.sizeClasses
      ]
    },

    sizeClasses() {
      switch (this.size) {
        case 'large':
          return 'text-lg py-4 px-4'
        case 'small':
          return 'text-sm py-2 px-4'
        default:
          return 'text-base py-3 px-4'
      }
    }
  }
}
</script>

<style scoped>
.g-select-item{
  transition: background .4s ease;
}
</style>
