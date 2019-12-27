<template>
  <div :class="['g-textarea', { 'mb-6': !noMargin }]">
    <div class="g-textarea-input-group">
      <label v-if="label" :for="name" :class="labelClasses">{{ label }}
        <span v-if="required">*</span>
      </label>
      <label v-else :for="name">
        <slot name="label"></slot>
      </label>
      <div class="g-textarea-input flex">
        <textarea
          :value="value"
          :name="name"
          v-bind="$attrs"
          v-on="listeners"
          :disabled="disabled"
          size="1"
          :class="['w-full rounded  leading-none', ...inputClasses]"
        />
      </div>
      <div  :class="['relative', ...labelClasses]">
        <div
          v-show="hasError"
          class="g-text-field-error text-red-500 text-sm absolute">
          {{ errors[0] }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GTextarea',

  props: {
    value: { type: String, default: '' },
    label: { type: String, default: null },
    name: { type: String, default: '' },
    required: { type: Boolean, default: false },
    raised: { type: Boolean, default: false },
    uppercase: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    rules: { type: Array },
    validateOn: { type: String, default: 'blur' },
    noMargin: { type: Boolean, default: false },
    size: {
      type: String,
      default: 'medium',
      validator: value => ['small', 'medium', 'large'].indexOf(value) !== -1,
    }
  },

  data () {
    return {
      focussed: false,
      errors: []
    }
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

    inputClasses() {
      return [
        this.bgClasses,
        this.inputBorderClasses,
        this.textColorClasses,
        this.textClasses,
        this.cursorClasses,
        this.shadowClasses,
        this.sizeClasses,
        this.textSize
      ]
    },

    labelClasses() {
      return [
        this.textSize
      ]
    },

    bgClasses() {
      if (this.hasError) return 'bg-red-100'
      if (this.focussed && !this.raised) return 'bg-gray-100'
      if (this.raised) return 'bg-white-500'
      return 'bg-gray-300'
    },

    inputBorderClasses() {
      if (this.raised) return 'border border-white-500'
      if (this.hasError) return 'border border-red-500'
      return 'border border-gray-300'
    },

    shapeClasses() {
      if (this.prepend && this.append) return ''
      if (this.prepend) return 'rounded-r'
      if (this.append) return 'rounded-l'
      return 'rounded'
    },

    textColorClasses() {
      if (this.hasError) return 'text-red-500'
      return ''
    },

    textClasses() {
      if (this.disabled) return 'text-gray-600'
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
        case 'large':
          return 'text-lg'
        case 'small':
          return 'text-sm'
        default:
          return 'text-base'
      }
    },

    sizeClasses() {
      switch (this.size) {
        case 'large':
          return 'p-4'
        case 'small':
          return 'p-4'
        default:
          return 'p-4'
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

<style scoped>
textarea {
  transition: all .3s ease;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  box-shadow: none;
}

textarea:focus {
  outline: none;
}
</style>
