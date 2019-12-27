<template lang="html">
  <form class="g-form"
    :action="action"
    :method="method"
    @submit.prevent="$emit('submit')">
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: 'GForm',

  props: {
    action: { type: String, default: '' },
    method: { type: String, default: 'post' },
  },

  data() {
    return {
      errors: []
    }
  },

  methods: {
    validate() {
      this.errors = []
      this.recursiveValidate(this.$children)
      if (this.errors.length > 0) return false
      return true
    },

    recursiveValidate(children) {
      children.forEach(child => {
        this.validateInput(child)
        if (child.$children.length > 0) this.recursiveValidate(child.$children)
      })
    },

    validateInput(input) {
      if (typeof input.validate === 'function') {
        if (['g-checkbox', 'g-switch'].includes(input.$options._componentTag)) {
          input.validate(input.$props.checked)
          this.handleInputErrors(input.$data.errors)
        } else {
          input.validate(input.$props.value)
          this.handleInputErrors(input.$data.errors)
        }
      }
    },

    handleInputErrors(errors) {
      if (errors && errors.length > 0) {
        this.errors.push(...errors)
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
