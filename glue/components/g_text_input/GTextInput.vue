<template>
  <div :class="['g-text-field', ...classes, { 'mb-6': !noMargin }]">
    <div class="g-text-field-input-group">
      <label v-if="label" :for="name" :class="labelClasses">{{ label }}
        <span v-if="required">*</span>
      </label>
      <label v-else :for="name" :class="labelClasses">
        <slot name="label"></slot>
      </label>
      <div class="g-text-field-input flex">
        <div v-if="prepend"
          :class="[`prepend rounded-l`, ...prependClasses]">
          <div class="flex items-center justify-center h-full">
            <slot name="prepend"></slot>
          </div>
        </div>
        <div class="flex-1">
          <input
            :class="['w-full leading-none', ...inputClasses]"
            :type="type"
            :name="name"
            :value="value"
            v-bind="$attrs"
            v-on="listeners"
            :disabled="disabled"
          />
        </div>
        <div v-if="append"
          :class="[`append rounded-r`, ...appendClasses]">
          <div class="flex items-center justify-center h-full">
            <slot name="append"></slot>
          </div>
        </div>
      </div>
    </div>
    <div :class="['relative', ...labelClasses]">
      <div
        v-show="hasError"
        class="g-text-field-error text-red-500 text-sm absolute">
        {{ errors[0] }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GTextInput',

  props: {
    type: { type: String, default: 'text' },
    value: { type: [String, Number], default: '' },
    label: { type: String, default: null },
    name: { type: String, default: 'input' },
    required: { type: Boolean, default: false },
    prepend: { type: Boolean, default: false },
    append: { type: Boolean, default: false },
    raised: { type: Boolean, default: false },
    uppercase: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    rules: { type: Array },
    validateOn: { type: String, default: 'blur' },
    noMargin: { type: Boolean, default: false },
    color: { type: String, default: 'gray-300' },
    size: {
      type: String,
      default: 'md',
      validator: value => ['sm', 'md', 'lg'].indexOf(value) !== -1,
    },
  },

  data() {
    return {
      focussed: false,
      errors: []
    };
  },

  computed: {
    listeners() {
      let vm = this
      return {
        ...this.$listeners,
        input: event => {
          vm.$emit('input', event.target.value)
          if (this.validateOn === 'input') vm.validate(event.target.value)
        },
        focus: event => {
          vm.$emit('focus')
          vm.focussed = true
        },
        blur: event => {
          vm.$emit('blur')
          vm.focussed = false
          if (this.validateOn === 'blur') vm.validate(event.target.value)
        }
      }
    },

    hasError() {
      return this.errors.length > 0
    },

    classes() {
      return []
    },

    inputClasses() {
      return [
        this.bgClasses,
        this.shapeClasses,
        this.sizeClasses,
        this.inputBorderClasses,
        this.textColorClasses,
        this.textClasses,
        this.cursorClasses,
        this.shadowClasses,
        this.textSize
      ]
    },

    labelClasses() {
      return [
        this.textSize
      ]
    },

    prependClasses() {
      const borderClasses = 'border-t border-b border-l'
      let borderColor = `border-gray-200 focus:border-${this.color}`
      if (this.raised) borderColor = 'border-white'
      if (this.hasError) borderColor = 'border-red-500'

      return [
        borderClasses,
        borderColor,
        this.bgClasses,
        this.shadowClasses,
        this.textSize
      ]
    },

    appendClasses() {
      const borderClasses = 'border-t border-b border-r'
      let borderColor = `border-gray-200 focus:border-${this.color}`
      if (this.raised) borderColor = 'border-white'
      if (this.hasError) borderColor = 'border-red-500'

      return [
        borderClasses,
        borderColor,
        this.bgClasses,
        this.shadowClasses,
        this.textSize
      ]
    },

    bgClasses() {
      if (this.hasError) return 'bg-red-100'
      if (this.focussed && !this.raised) return 'bg-gray-100'
      if (this.raised) return 'bg-white'
      return 'bg-gray-200'
    },

    inputBorderClasses() {
      if (this.hasError) {
        if (this.prepend && this.append) return 'border-t border-b border-red-500'
        if (this.prepend) return 'border-t border-b border-r border-red-500'
        if (this.append) return 'border-t border-b border-l border-red-500'
        return 'border border-red-500'
      }
      if (this.raised) return 'border border-white'

      if (this.prepend && this.append) return `border-t border-b border-gray-200 focus:border-${this.color}`
      if (this.prepend) return `border-t border-b border-r border-gray-200 focus:border-${this.color}`
      if (this.append) return `border-t border-b border-l border-gray-200 focus:border-${this.color}`
      return `border border-gray-200 focus:border-${this.color}`
    },

    shapeClasses() {
      if (this.prepend && this.append) return ''
      if (this.prepend) return 'rounded-r'
      if (this.append) return 'rounded-l'
      return 'rounded'
    },

    textColorClasses() {
      if (this.disabled) return 'text-gray-600'
      if (this.hasError) return 'text-red-500'
      return 'text-gray-700'
    },

    textClasses() {
      if (this.uppercase) return 'uppercase'
      return ''
    },

    cursorClasses() {
      if (this.disabled) return 'cursor-not-allowed'
      return ''
    },

    shadowClasses() {
      if (this.raised) return 'shadow'
      return ''
    },

    textSize() {
      switch (this.size) {
        case 'lg':
          return 'text-lg'
        case 'sm':
          return 'text-sm'
        default:
          return 'text-base'
      }
    },

    sizeClasses() {
      switch (this.size) {
        case 'lg':
          return 'h-16 px-4'
        case 'sm':
          return 'h-8 px-4'
        default:
          return 'h-12 px-4'
      }
    }
  },

  methods: {
    validate(val) {
      this.errors = []
      if (this.rules && this.rules.length > 0) this.rules.forEach(rule => {
        let result = rule(val)
        if (typeof result === 'string') this.errors.push(result)
      })
    }
  }
}
</script>

<style lang="css" scoped>
input, .prepend, .append {
  transition: all .3s ease;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

input:focus {
  outline: none;
}
</style>
