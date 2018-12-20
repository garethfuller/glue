<template lang="html">
  <component
    :is="buttonTag"
    :class="['g-btn font-medium', classes]"
    v-bind="additionalAttrs"
    @click="clickHandler">
    <span class="g-btn-contents leading-none">
      <g-loading-animation v-if="loading" :color="loadingAnimationColor" />
      <slot v-else></slot>
    </span>
  </component>
</template>

<script>
export default {
  name: 'GBtn',

  props: {
    color: {
      type: String,
      default: 'white',
      validator: value => ['blue', 'red', 'green', 'orange', 'white', 'white-dark', 'grey'].indexOf(value) !== -1,
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
        rounded: !this.rounded,
        'rounded-full': this.rounded,
        'block w-full': this.block,
      };
    },

    loadingAnimationColor() {
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
.g-btn {
  padding: 0;
  border: none;
  text-decoration: none;
  display: inline-block;
  line-height: 1.3em;
  transition: all .2s ease;
  -webkit-transition: all .2s ease;
  -moz-transition: all .2s ease;
  -o-transition: all .2s ease;
  -ms-transition: all .2s ease;

  &:active, &:focus {
    outline: none;
  }
}

.g-btn-contents {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.g-btn-small {
  & .g-btn-contents {
    @apply text-sm py-1 px-2;
  }
}

.g-btn-medium {
  & .g-btn-contents {
    @apply text-base py-3 px-4;
  }
}

.g-btn-large {
  & .g-btn-contents {
    @apply text-lg py-4 px-6;
  }
}

.g-btn:hover {
  cursor: pointer;
  transform: translateY(-1px);
  @apply shadow-md;
}

.g-btn:active {
  @apply shadow-none;
  transform: translateY(.5px);
}

.g-btn.g-btn-flat:hover {
  cursor: pointer;
  transform: translateY(0px) !important;
  box-shadow: none !important;
}

.g-btn.g-btn-flat:active {
  transform: translateY(0px) !important;
  box-shadow: none !important;
}

.g-btn.g-btn-flat.g-btn-green:hover {
  background-color: config('colors.green-lightest')33;
}
.g-btn.g-btn-flat.g-btn-green:active {
  background-color: config('colors.green-lightest')66;
}

.g-btn.g-btn-flat.g-btn-blue:hover {
  background-color: config('colors.blue-lightest')33;
}
.g-btn.g-btn-flat.g-btn-blue:active {
  background-color: config('colors.blue-lightest')66;
}

.g-btn.g-btn-flat.g-btn-red:hover {
  background-color: config('colors.red-lightest')33;
}
.g-btn.g-btn-flat.g-btn-red:active {
  background-color: config('colors.red-lightest')66;
}

.g-btn.g-btn-flat.g-btn-orange:hover {
  background-color: config('colors.orange-lightest')33;
}
.g-btn.g-btn-flat.g-btn-orange:active {
  background-color: config('colors.orange-lightest')66;
}

.g-btn.g-btn-flat.g-btn-white:hover {
  background-color: rgba(255,255,255, .3);
}
.g-btn.g-btn-flat.g-btn-white:active {
  background-color: rgba(255,255,255, .1);
}

.g-btn.g-btn-flat.g-btn-grey:hover {
  @apply .bg-white-dark;
}

.g-btn.g-btn-flat.g-btn-grey:active {
  @apply .bg-grey-lightest;
}

.g-btn-blue {
  @apply .bg-blue text-white shadow;
}
.g-btn-flat.g-btn-blue {
  @apply bg-transparent text-blue shadow-none;
}

.g-btn-red {
  @apply bg-red text-white shadow;
}
.g-btn-flat.g-btn-red {
  @apply .bg-transparent text-red shadow-none;
}

.g-btn-green {
  @apply .bg-green text-white shadow;
}
.g-btn-flat.g-btn-green {
  @apply bg-transparent text-green shadow-none;
}

.g-btn-orange {
  @apply bg-orange text-white shadow;
}
.g-btn-flat.g-btn-orange {
  @apply bg-transparent text-orange shadow-none;
}

.g-btn-white {
  @apply bg-white text-black shadow;
}
.g-btn-flat.g-btn-white {
  @apply bg-transparent text-black shadow-none;
}

.g-btn-flat.g-btn-white-dark {
  @apply .bg-transparent .text-black .shadow-none;
  &:hover {
    background-color: darken($white-dark, 3%);
    transform: translateY(0px) !important;
  }
  &:active {
    background-color: darken($white-dark, 5%);
    transform: translateY(0px) !important;
  }
}

.g-btn-flat.g-btn-grey {
  @apply .bg-transparent .text-grey .shadow-none;
}

.g-btn-disabled {
  opacity: 0.5;
  @apply .shadow-none;
}

.g-btn-disabled:hover {
  @apply .shadow-none;
  cursor: not-allowed;
  transform: translateY(0px) !important;
}

.g-btn-disabled:active {
  @apply .shadow-none;
  cursor: not-allowed;
  transform: translateY(0px) !important;
}

.g-btn-circle.g-btn-small {
  @apply .text-sm .rounded-full .w-6 .h-6;
  & > .g-btn-contents {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.g-btn-circle.g-btn-medium {
  @apply .text-base .rounded-full .w-8 .h-8;
  & > .g-btn-contents {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.g-btn-circle.g-btn-large {
  @apply .text-lg .rounded-full .w-12 .h-12;
  & > .g-btn-contents {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
