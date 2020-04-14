<template>
  <div :class="[{ 'mb-6': !noMargin }]">
    <div class="relative">
      <select
        v-bind="$attrs"
        v-on="listeners"
        :class="selectClasses">
        <option v-if="defaultText" value="" hidden>{{ defaultText }}</option>
        <option
          v-for="(option, i) in options"
          :key="i"
          :value="optionValue(option)">
          {{ optionLabel(option) }}
        </option>
      </select>
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
      </div>
    </div>
    <div class="relative">
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
  name: 'GSelectInput',

  props: {
    options: { type: Array, required: true },
    value: { type: [String, Number], default: '' },
    defaultText: { type: String },
    color: { type: String, default: 'gray-300' },
    rules: { type: Array },
    noMargin: { type: Boolean, default: false },
    size: {
      type: String,
      default: 'md',
      validator: value => ['sm', 'md', 'lg'].indexOf(value) !== -1,
    },
  },

  data() {
    return {
      errors: []
    }
  },

  computed: {
    listeners() {
      const vm = this
      return {
        ...this.$listeners,
        input: event => {
          vm.$emit('input', event.target.value)
          vm.validate(event.target.value)
        },
      }
    },

    hasError() {
      return this.errors.length > 0
    },

    selectClasses() {
      return [
        'block appearance-none w-full pr-8 rounded leading-none focus:outline-none',
        this.borderClasses,
        this.textClasses,
        this.bgClasses,
        this.sizeClasses,
        this.textSize
      ]
    },

    borderClasses() {
      if (this.hasError) return 'border border-red-500'
      if (this.raised) return 'border border-white'
      return `border border-gray-200 focus:border-${this.color}`
    },

    textClasses() {
      if (this.disabled) return 'text-gray-600'
      if (this.hasError) return 'text-red-500'
      return 'text-gray-700'
    },

    bgClasses() {
      if (this.hasError) return 'bg-red-100'
      if (this.raised) return 'bg-white'
      return 'bg-gray-200 focus:bg-gray-100'
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
  },

  methods: {
    optionValue(option) {
      if (typeof option === 'string' || option instanceof String) return option
      return option.value
    },

    optionLabel(option) {
      if (typeof option === 'string' || option instanceof String) return option
      return option.label
    },

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
</style>
