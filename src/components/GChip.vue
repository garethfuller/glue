<template lang="html">
  <div v-on="listeners" :class="['inline-block whitespace-no-wrap rounded-full', ...classes]">
    <div class="flex items-center leading-none h-full">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GChip',

  props: {
    textColor: { type: String, default: 'white' },
    color: {
      type: String,
      default: 'gray',
      validator: value => ['blue', 'red', 'green', 'orange', 'gray'].indexOf(value) !== -1,
    },
    size: {
      type: String,
      default: 'medium',
      validator: value => ['small', 'medium', 'large'].indexOf(value) !== -1,
    },
    outline: { type: Boolean, default: false }
  },

  computed: {
    listeners() {
      return { ...this.$listeners }
    },

    classes() {
      return [this.sizeClasses, this.colorClasses, this.textClasses]
    },

    sizeClasses() {
      switch (this.size) {
        case 'small':
          return 'px-2 h-6 text-xs'
        case 'large':
          return 'px-4 h-10 text-base'
        default:
          return 'px-3 h-8 text-sm'
      }
    },

    colorClasses() {
      if (this.outline) return `bg-${this.color}-100 border border-${this.color}-500`
      if (this.color === 'gray') return `bg-${this.color}-200`
      return `bg-${this.color}-500 border border-${this.color}-500`
    },

    textClasses() {
      if (this.color === 'gray' && !this.outline) return 'text-gray-700'
      if (this.outline) return `text-${this.color}-500`
      return `text-${this.textColor}-500`
    }
  }
}
</script>
