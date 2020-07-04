<template>
  <div :class="[...classes, { 'mb-6': !noMargin }]">
    <label v-if="label" :for="name" :class="labelClasses">
      {{ label }}
    </label>
    <div :class="inputClasses" v-bind="$attrs" v-on="listeners">
      
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
  name: 'GTagSelect',

  props: {
    label: { type: String, default: null },
    name: { type: String, default: 'input' },
    rules: { type: Array },
    size: {
      type: String,
      default: 'md',
      validator: value => ['sm', 'md', 'lg'].indexOf(value) !== -1,
    },
    noMargin: { type: Boolean, default: false }
  },

  data: () => ({
    focussed: false,
    errors: []
  }),

  computed: {
    listeners() {
      return { ...this.$listeners }
    },

    hasError() {
      return this.errors.length > 0
    },

    classes() {
      return []
    },

    labelClasses() {
      return []
    }
  }
}
</script>