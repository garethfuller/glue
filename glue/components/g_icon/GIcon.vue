<template>
  <i
    v-bind="$attrs"
    v-on="listeners"
    :class="`icon ${name}`"></i>
</template>

<script>
export default {
  name: 'GIcon',

  props: {
    name: { type: String, required: true }
  },

  computed: {
    listeners() {
      return { ...this.$listeners }
    }
  }
}
</script>
