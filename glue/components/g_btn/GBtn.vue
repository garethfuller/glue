<template>
  <component :is="tag" v-on="listeners" :class="['g-btn', ...classes]" v-bind="$attrs" :disabled="disabled">
    <div class="flex justify-center items-center w-full h-full">
      <div class="absolute">
        <g-loading-icon v-if="loading" key="loader" :size="size" :color="loadingColor" class="absolute"/>
      </div>
      <div :class="[{ 'invisible': loading }]">
        <g-icon v-if="icon" key="icon" :name="icon" :class="[textColorClasses, { 'mr-2': !circle }]" />
        <slot></slot>
      </div>
    </div>
  </component>
</template>

<script>
export default {
  name: 'GBtn',

  props: {
    tag: { type: String, default: 'button' },
    color: { type: String, default: 'black' },
    size: {
      type: String,
      default: 'md',
      validator: value => ['sm', 'md', 'lg'].indexOf(value) !== -1,
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
          case 'lg':
            return 'w-12 h-12 text-2xl'
          case 'sm':
            return 'w-6 h-6 text-xs'
          default:
            return 'w-8 h-8 text-base'
        }
      } else {
        switch (this.size) {
          case 'lg':
            return 'h-12 px-6 text-xl'
          case 'sm':
            return 'h-6 px-2 text-xs'
          default:
            return 'h-12 px-5 text-base'
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
      if (this.color === 'white') return 'bg-white'
      if (this.color === 'black') return 'bg-black'
      return `bg-${this.color}-500`
    },

    textColorClasses() {
      if (this.color === 'white' && !this.flat) return this.textColor || 'text-gray-900'
      if (this.color === 'gray' && (this.flat || this.outline)) return 'text-gray-600'
      if (this.flat || this.outline) return `text-${this.color}-500`
      return 'text-white'
    },

    borderClasses() {
      if (this.flat) return 'border border-transparent'
      if (['black', 'white'].includes(this.color)) return `border border-${this.color}`
      return `border border-${this.color}-500`
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
        case 'sm':
          return 'xs'
        case 'md':
          return 'sm'
        case 'lg':
          return 'base'
        default:
          return 'sm'
      }
    },

    loadingColor() {
      if (this.color === 'white' && !this.flat) return this.textColor || 'gray-900'
      if (this.flat && this.color === 'black') return 'gray-900'
      if (this.color === 'gray' && (this.flat || this.outline)) return 'gray-600'
      if (this.flat || this.outline) return `${this.color}-500`
      return 'white'
    }
  }
}
</script>

<style lang="css" scoped>
.g-btn {
  transition: all .2s ease;
  -webkit-transition: all .2s ease;
  -moz-transition: all .2s ease;
  -o-transition: all .2s ease;
  -ms-transition: all .2s ease;
  text-decoration: none !important;
  
}
.g-btn:active, .g-btn:focus {
  outline: none;
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
