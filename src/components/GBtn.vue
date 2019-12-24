<template>
  <component :is="tag" v-on="listeners" :class="['g-btn', ...classes]" v-bind="$attrs" :disabled="disabled">
    <div class="flex justify-center items-center">
      <transition name="icon-switch" mode="out-in">
          <g-block-spinner v-if="loading" key="loader" :size="size" :color="loadingColor" class="mr-2"/>
          <g-icon v-if="!loading && icon" key="icon" :name="icon" :class="[textColorClasses, { 'mr-2': !circle }]" />
        </transition>
      <slot></slot>
    </div>
  </component>
</template>

<script>
export default {
  name: 'GBtn',

  props: {
    tag: { type: String, default: 'button' },
    color: {
      type: String,
      default: 'blue',
      validator: value => ['blue', 'red', 'green', 'orange', 'white', 'black', 'gray'].indexOf(value) !== -1,
    },
    size: {
      type: String,
      default: 'medium',
      validator: value => ['small', 'medium', 'large'].indexOf(value) !== -1,
    },
    outline: { type: Boolean, default: false },
    flat: { type: Boolean, default: false },
    circle: { type: Boolean, default: false },
    block: { type: Boolean, default: false },
    rounded: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    icon: { type: String }
  },

  computed: {
    listeners() {
      return { ...this.$listeners }
    },

    classes() {
      return [
        this.defaultClasses,
        this.sizeClasses,
        this.shapeClasses,
        this.bgClasses,
        this.textColorClasses,
        this.borderClasses,
        this.shadowClasses,
        this.displayClasses,
        this.opacityClasses,
        this.cursorClasses
      ]
    },

    defaultClasses() {
      return `
        font-medium inline-block leading-snug
        ${ this.disabled ? 'g-btn-disabled' : '' }
        ${ !this.outline && !this.flat ? 'g-btn-dynamic' : '' }`
    },

    sizeClasses() {
      if (this.circle) {
        switch (this.size) {
          case 'large':
            return 'w-12 h-12 text-2xl'
          case 'small':
            return 'w-6 h-6 text-xs'
          default:
            return 'w-10 h-10 text-lg'
        }
      } else {
        switch (this.size) {
          case 'large':
            return 'h-16 px-6 text-2xl'
          case 'small':
            return 'h-8 px-2 text-sm'
          default:
            return 'h-12 px-4 text-base'
        }
      }
    },

    shapeClasses() {
      if (this.rounded || this.circle) return 'rounded-full'
      return 'rounded'
    },

    bgClasses() {
      if (this.flat) return `bg-${this.color}-100 hover:bg-${this.color}-200 active:bg-${this.color}-300`
      if (this.outline) return `bg-transparent hover:bg-${this.color}-100 active:bg-${this.color}-200`
      return `bg-${this.color}${this.colorShade}`
    },

    textColorClasses() {
      if (this.color === 'white' && !this.flat) return this.textColor || 'text-gray-900'
      if (this.flat && this.color === 'black') return 'text-gray-900'
      if (this.color === 'gray' && (this.flat || this.outline)) return 'text-gray-600'
      if (this.flat || this.outline) return `text-${this.color}${this.colorShade}`
      return 'text-white'
    },

    borderClasses() {
      if (this.flat) return 'border border-transparent'
      return `border border-${this.color}${this.colorShade}`
    },

    shadowClasses() {
      if (this.outline || this.flat) return ''
      if (this.disabled) return 'shadow-none hover:shadow-none'
      return 'shadow hover:shadow-md'
    },

    displayClasses() {
      if (this.block) return 'block w-full'
      return 'inline-block'
    },

    opacityClasses() {
      if (this.disabled) return 'opacity-50'
      return ''
    },

    cursorClasses() {
      if (this.disabled) return 'cursor-not-allowed'
      return 'cursor-pointer'
    },

    iconSize() {
      switch (this.size) {
        case 'small':
          return 'xs'
        case 'medium':
          return 'sm'
        case 'large':
          return 'base'
        default:
          return 'sm'
      }
    },

    colorShade() {
      return ['white', 'black'].includes(this.color) ? '' : '-500'
    },

    loadingColor() {
      if (this.color === 'white' && !this.flat) return this.textColor || 'gray-900'
      if (this.flat && this.color === 'black') return 'gray-900'
      if (this.color === 'gray' && (this.flat || this.outline)) return 'gray-600'
      if (this.flat || this.outline) return `${this.color}${this.colorShade}`
      return 'white'
    }
  }
}
</script>

<style scoped>
.g-btn {
  transition: all .2s ease;
  -webkit-transition: all .2s ease;
  -moz-transition: all .2s ease;
  -o-transition: all .2s ease;
  -ms-transition: all .2s ease;
  &:active, &:focus {
    outline: none;
  }
}

.g-btn-dynamic:hover {
  transform: translateY(-1px);
}

.g-btn-dynamic:active {
  transform: translateY(.5px);
  @apply shadow-none;
}

.g-btn-disabled:hover {
  transform: translateY(0px);
}
.g-btn-disabled:active {
  transform: translateY(0px);
}
</style>
