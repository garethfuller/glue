<template lang="html">
  <component
    :is="buttonTag"
    :class="['g-btn font-medium', classes]"
    v-bind="additionalAttrs"
    @click="clickHandler">
    <div class="g-btn-contents">
      <slot></slot>
    </div>
  </component>
</template>

<script>
export default {
  name: 'GBtn',

  props: {
    color: {
      type: String,
      default: 'default',
      validator: value => ['default', 'primary', 'secondary', 'red', 'green', 'white', 'white-dark', 'grey'].indexOf(value) !== -1,
    },
    size: {
      type: String,
      default: 'medium',
      validator: value => ['small', 'medium', 'large'].indexOf(value) !== -1,
    },
    tag: {
      type: String,
      default: 'button',
      validator: value => ['button', 'div', 'a'].indexOf(value) !== -1,
    },
    disabled: { type: Boolean, default: false },
    flat: { type: Boolean, default: false },
    icon: { type: Boolean, default: false },
    circle: { type: Boolean, default: false },
    rounded: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    bgShade: {
      type: String,
      default: 'light',
      validator: value => ['light', 'dark'].indexOf(value) !== -1,
    },
    to: { type: String },
    attrs: { type: Object, default: () => ({}) },
    block: { type: Boolean, default: false },
  },

  computed: {
    classes() {
      return {
        'g-btn-disabled': this.disabled,
        'g-btn-flat': this.flat,
        'g-btn-icon': this.icon,
        'g-btn-circle': this.circle,
        [`g-btn-${this.color}`]: true,
        [`g-btn-${this.size}`]: true,
        [`g-btn-bg-shade-${this.bgShade}`]: true,
        rounded: !this.rounded,
        'rounded-full': this.rounded,
        block: this.block,
      };
    },

    loadingAnimationColor() {
      if (this.color === 'default') {
        if (this.flat) return 'black';
        return 'primary';
      }
      if (this.flat) return this.color;
      return 'white';
    },

    buttonTag() {
      if (this.to) return 'a';
      return this.tag;
    },

    additionalAttrs() {
      const additional = {};
      if (this.to) additional.href = this.to;
      if (this.disabled) additional.disabled = this.disabled;
      return Object.assign({}, this.attrs, additional);
    },
  },

  methods: {
    clickHandler() {
      this.$emit('clicked');
    },
  },
};
</script>

<style lang="css" scoped>
</style>
