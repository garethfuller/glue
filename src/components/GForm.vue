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

  methods: {
    validate() {
      this.recursiveValidate(this.$children)
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
        } else {
          input.validate(input.$props.value)
        }
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
