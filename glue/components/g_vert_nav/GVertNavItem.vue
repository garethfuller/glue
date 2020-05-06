<template>
  <component :is="tag" v-on="listeners" v-bind="$attrs" :class="classes">
    <div class="flex">
      <div v-if="icon" class="w-6 text-center mr-2">
        <g-icon :name="icon"/>
      </div>
      <slot></slot>
    </div>
    <div v-if="badgeCount" :class="badgeClasses">
      {{ badgeCount }}
    </div>
  </component>
</template>

<script>
export default {
  name: 'GVertNavItem',

  props: {
    tag: { type: String, default: 'div' },
    icon: { type: String, default: null },
    active: { type: Boolean, default: false },
    badgeCount: { type: [String, Number], default: null }
  },

  data: () => ({
    bgColor: 'white'
  }),

  computed: {
    listeners() {
      return { ...this.$listeners }
    },

    bgColorName() {
      return this.bgColor.split('-')[0]
    },

    bgVariant() {
      return Number(this.bgColor.split('-')[1])
    },

    classes() {
      return [
        'nav-item flex justify-between p-3 rounded cursor-pointer font-medium',
        this.bgClasses,
        this.textClasses
      ]
    },

    bgClasses() {
      if (this.active) {
        if (this.bgVariant) return `bg-${this.bgColorName}-${this.bgVariant+100}`
        return 'bg-gray-100'
      } else {
        return `bg-${this.bgColor}`
      }
    },

    textClasses() {
      if (this.active) {
        if (this.bgVariant) return `text-${this.bgColorName}-${this.bgVariant+600}`
        return 'text-gray-700'
      } else {
        if (this.bgVariant) return `text-${this.bgColorName}-${this.bgVariant+400} hover:text-${this.bgColorName}-${this.bgVariant+600}`
        return 'text-gray-500 hover:text-gray-700'
      }
    },

    badgeClasses() {
      return [
        'py-px px-3 text-xs flex items-center justify-center rounded-full',
        this.badgeBgClass,
        this.textClasses
      ]
    },

    badgeBgClass() {
      if (this.active) {
        return `bg-${this.bgColor}`
      } else {
        if (this.bgVariant) return `bg-${this.bgColorName}-${this.bgVariant+100}`
        return 'bg-gray-100'
      }
    }
  }
}
</script>

<style scoped>
.nav-item {
  transition: all .3s ease;
}
</style>
