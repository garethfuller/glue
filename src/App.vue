<template>
  <div id="app" class="p-2">
    <g-form @submit="submit" ref="form">
      <g-text-field
        v-model="text"
        label="Name"
        :rules="rules.text"
      />
      <g-textarea
        v-model="description"
        label="Description"
        :rules="rules.description"
      />
      <g-select
        v-model="select"
        :items="items"
        :rules="rules.select"
        label="Choose"
      />
      <g-checkbox
        v-model="check"
        :rules="rules.check"
        label="check"

      />
      <g-switch
        v-model="toggle"
        :rules="rules.toggle"
        label="toggle"
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
      text: '',
      description: '',
      select: '',
      check: false,
      toggle: false,
      items: [
        { value: 'val_1', text: 'Value 1' },
        { value: 'val_2', text: 'Value 2' },
        { value: 'val_3', text: 'Value 3' }
      ],
      rules: {
        text: [
          required('Text'),
          v => v && v.length > 6 || 'Must be longer than 6 chars'
        ],
        description: [
          required('Description')
        ],
        select: [
          required('Select')
        ],
        check: [
          required('Check')
        ],
        toggle: [
          required('Toggle')
        ]
      }
    }
  },

  methods: {
    submit() {
      this.$refs.form.validate()
    }
  }
};
</script>

<style>
</style>
