<template lang="html">
  <div :class="['g-text-field', classes]">
    <div class="g-text-field-input-group">
      <label v-if="label.length > 0" :for="name">{{ label }}
        <span v-if="required">*</span>
      </label>
      <label v-else :for="name">
        <slot name="label"></slot>
      </label>
      <div class="g-text-field-input">
        <div v-if="prepend" :class="['g-text-field-prepend', prependClasses]">
          <slot name="prepend"></slot>
        </div>
        <input
          class="w-full rounded bg-grey-lightest border border-transparent"
          :type="type"
          :value="value"
          :placeholder="placeholder"
          :name="name"
          :required="required"
          v-bind="attrs"
          v-validate="validations"
          :data-vv-validate-on="validateOn"
          ref="input"
          @input="input"
          @blur="blur"
          @focus="focus"
        />
      </div>
    </div>
    <div
      v-show="errors.has(name)"
      class="g-text-field-error text-red text-sm absolute">
      {{ errors.first(name) }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'GTextField',

  props: {
    type: { type: String, default: 'text' },
    value: { type: String, default: '' },
    label: { type: String, default: '' },
    name: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    horizontal: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    prepend: { type: Boolean, default: false },
    raised: { type: Boolean, default: false },
    validations: { type: String, default: '' },
    validateOn: { type: String, default: 'blur' },
    attrs: { type: Object, default: () => ({}) },
    size: {
      type: String,
      default: 'medium',
      validator: value => ['small', 'medium', 'large'].indexOf(value) !== -1,
    },
  },

  data() {
    return {
      active: false,
      complete: false,
      success: false,
    };
  },

  watch: {
    value(newVal) {
      if (newVal.length > 0 && !this.complete && !this.active) {
        this.complete = true;
      } else if (newVal.length === 0) {
        this.complete = false;
      }
    },
  },

  computed: {
    classes() {
      return {
        [`g-text-field-${this.size}`]: true,
        'g-text-field-horizontal': this.horizontal,
        'g-text-field-active': this.active,
        'g-text-field-complete': this.complete,
        'g-text-field-invalid': this.errors.has(this.name),
        'g-text-field-success': this.success,
        'g-text-field-prepended': this.prepend,
        'g-text-field-raised': this.raised,
      };
    },

    prependClasses() {
      return {
        [`g-text-field-prepend-${this.size}`]: true,
        'g-text-field-prepend-horizontal': this.horizontal,
        'g-text-field-prepend-active': this.active,
        'g-text-field-prepend-complete': this.complete,
        'g-text-field-prepend-invalid': this.errors.has(this.name),
        'g-text-field-prepend-success': this.success,
      };
    },
  },

  methods: {
    input(e) {
      this.$emit('input', e.target.value);
    },

    focus() {
      this.active = true;
      this.complete = false;
    },

    blur() {
      this.active = false;
      if (this.value.length > 0) this.complete = true;
    },
  },
};
</script>

<style lang="css" scoped>
</style>
