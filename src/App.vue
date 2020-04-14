<template>
  <div id="app" class="p-24">
    <g-form ref="form" @submit="submit">
      <g-select-input
        v-model="select"
        :options="options"
        default-text="Please select"
        class="mb-4"
        size="md"
        color="blue-500"
        :rules="[required('select')]"
      />
      <g-btn type="submit">Submit</g-btn>
    </g-form>

  </div>
</template>

<script>
import { required } from './lib/validations'

export default {
  name: 'app',

  data() {
    return {
      select: '',
      options: [
        { label: 'Bananas', value: 'b' },
        { label: 'Oranges', value: 'o' },
        { label: 'Grapes', value: 'g' },
      ],
      text: ''
    }
  },

  watch: {
    select(newVal) {
      console.log(newVal)
    }
  },

  methods: {
    required,

    submit() {
      this.$refs.form.validate()
    }
  }
}
</script>

<style>
</style>
