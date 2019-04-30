<template lang="html">
  <component
    :is="buttonTag"
    :class="['g-btn font-medium', classes]"
    v-bind="additionalAttrs"
    @click="clickHandler">
    <span class="g-btn-contents leading-none">
      <transition name="icon-switch" mode="out-in">
        <g-block-spinner v-if="loading" key="loader" :size="size" :color="textColor" class="mr-2"/>
        <g-icon v-if="!loading && icon" key="icon" :name="icon" :class="[{ 'mr-2': !circle }]" :size="iconSize" :color="textColor" />
      </transition>
      <slot></slot>
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
      validator: value => ['blue', 'red', 'green', 'orange', 'white', 'black', 'grey'].indexOf(value) !== -1,
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
    icon: { type: String },
    circle: { type: Boolean, default: false },
    rounded: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    to: { type: String },
    attrs: { type: Object, default: () => ({}) },
    block: { type: Boolean, default: false },
    subtle: { type: Boolean, default: false },
    outline: { type: Boolean, default: false },
    targetBlank: { type: Boolean, default: false }
  },

  computed: {
    classes() {
      return {
        'g-btn-disabled': this.disabled,
        'g-btn-flat': this.flat,
        'g-btn-circle': this.circle,
        [`g-btn-${this.color}`]: true,
        [`g-btn-${this.size}`]: true,
        rounded: !this.rounded,
        'rounded-full': this.rounded,
        'block w-full': this.block,
        'g-btn-subtle': this.subtle,
        'g-btn-outline': this.outline
      };
    },

    textColor() {
      if (this.color === 'white') return 'black'
      if (this.flat && this.color === 'black') return 'black'
      if (this.color === 'grey' && (this.flat || this.outline)) return 'grey-dark'
      if (this.flat || this.outline) return this.color;
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
      if (this.targetBlank) { additional.target = '_blank'; additional.rel = 'noreferrer' }
      return Object.assign({}, this.attrs, additional);
    },

    iconSize() {
      switch (this.size) {
        case 'small':
          return 'xs'
        case 'medium':
          return 'small'
        case 'large':
          return 'medium'
        default:
          return 'small'
      }
    }
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
    @apply text-sm h-8 px-2;
  }
}

.g-btn-medium {
  & .g-btn-contents {
    @apply text-base h-12 px-4;
  }
}

.g-btn-large {
  & .g-btn-contents {
    @apply text-lg h-16 px-6;
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

.g-btn.g-btn-flat:hover, .g-btn.g-btn-outline:hover {
  cursor: pointer;
  transform: translateY(0px) !important;
  box-shadow: none !important;
}

.g-btn.g-btn-flat:active, .g-btn.g-btn-outline:active {
  transform: translateY(0px) !important;
  box-shadow: none !important;
}


.g-btn-small.g-btn-outline {
  & .g-btn-contents {
    height: calc(2rem - 4px);
  }
}
.g-btn-medium.g-btn-outline {
  & .g-btn-contents {
    height: calc(3rem - 4px);
  }
}
.g-btn-large.g-btn-outline {
  & .g-btn-contents {
    height: calc(4rem - 4px);
  }
}

.g-btn.g-btn-flat.g-btn-green:hover {
  background-color: config('colors.green-lightest')B3;
}
.g-btn.g-btn-flat.g-btn-green:active {
  background-color: config('colors.green-lightest')80;
}

.g-btn.g-btn-flat.g-btn-blue:hover {
  background-color: config('colors.blue-lightest')B3;
}
.g-btn.g-btn-flat.g-btn-blue:active {
  background-color: config('colors.blue-lightest')80;
}

.g-btn.g-btn-flat.g-btn-red:hover {
  background-color: config('colors.red-lightest')B3;
}
.g-btn.g-btn-flat.g-btn-red:active {
  background-color: config('colors.red-lightest')80;
}

.g-btn.g-btn-flat.g-btn-orange:hover {
  background-color: config('colors.orange-lightest')B3;
}
.g-btn.g-btn-flat.g-btn-orange:active {
  background-color: config('colors.orange-lightest')80;
}

.g-btn.g-btn-flat.g-btn-white:hover {
  background-color: rgba(0,0,0, .1);
}
.g-btn.g-btn-flat.g-btn-white:active {
  background-color: rgba(0,0,0, .05);
}

.g-btn.g-btn-flat.g-btn-black:hover {
  background-color: config('colors.black')1A;
}
.g-btn.g-btn-flat.g-btn-black:active {
  background-color: config('colors.black')0D;
}

.g-btn.g-btn-flat.g-btn-grey:hover {
  @apply .bg-grey-lightest;
}
.g-btn.g-btn-flat.g-btn-grey:active {
  @apply .bg-white-dark;
}
.g-btn-outline.g-btn-grey {
  @apply bg-transparent text-grey-dark shadow-none border border-grey;
}

.g-btn.g-btn-outline.g-btn-red:hover {
  background-color: config('colors.red-lighter')B3;
}
.g-btn.g-btn-outline.g-btn-red:active {
  background-color: config('colors.red-lighter')80;
}
.g-btn.g-btn-outline.g-btn-green:hover {
  background-color: config('colors.green-lighter')B3;
}
.g-btn.g-btn-outline.g-btn-green:active {
  background-color: config('colors.green-lighter')80;
}
.g-btn.g-btn-outline.g-btn-blue:hover {
  background-color: config('colors.blue-lighter')B3;
}
.g-btn.g-btn-outline.g-btn-blue:active {
  background-color: config('colors.blue-lighter')80;
}
.g-btn.g-btn-outline.g-btn-orange:hover {
  background-color: config('colors.orange-lighter')B3;
}
.g-btn.g-btn-outline.g-btn-orange:active {
  background-color: config('colors.orange-lighter')80;
}
.g-btn.g-btn-outline.g-btn-grey:hover {
  background-color: config('colors.grey-lighter')B3;
}
.g-btn.g-btn-outline.g-btn-grey:active {
  background-color: config('colors.grey-lighter')80;
}


.g-btn-blue {
  @apply .bg-blue text-white shadow;
}
.g-btn-flat.g-btn-blue {
  @apply bg-transparent text-blue shadow-none;
}
.g-btn-outline.g-btn-red {
  @apply bg-transparent text-blue shadow-none border border-blue;
}


.g-btn-red {
  @apply bg-red text-white shadow;
}
.g-btn-flat.g-btn-red {
  @apply .bg-transparent text-red shadow-none;
}
.g-btn-outline.g-btn-red {
  @apply bg-transparent text-red shadow-none border border-red;
}

.g-btn-green {
  @apply .bg-green text-white shadow;
}
.g-btn-flat.g-btn-green {
  @apply bg-transparent text-green shadow-none;
}
.g-btn-outline.g-btn-green {
  @apply bg-transparent text-green shadow-none border border-green;
}

.g-btn-orange {
  @apply bg-orange text-white shadow;
}
.g-btn-flat.g-btn-orange {
  @apply bg-transparent text-orange shadow-none;
}
.g-btn-outline.g-btn-orange {
  @apply bg-transparent text-orange shadow-none border border-orange;
}

.g-btn-white {
  @apply bg-white text-black shadow;
}
.g-btn-flat.g-btn-white {
  @apply bg-transparent text-white shadow-none;
}

.g-btn-black {
  @apply bg-black text-white shadow;
}
.g-btn-flat.g-btn-black {
  @apply bg-transparent text-black shadow-none;
}

.g-btn-flat.g-btn-grey {
  @apply bg-transparent text-grey-dark shadow-none;
}
.g-btn-flat.g-btn-subtle.g-btn-grey {
  @apply bg-grey-lighter;
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
    @apply h-full;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.g-btn-circle.g-btn-medium {
  @apply .text-base .rounded-full .w-8 .h-8;
  & > .g-btn-contents {
    @apply h-full;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.g-btn-circle.g-btn-large {
  @apply .text-lg .rounded-full .w-12 .h-12;
  & > .g-btn-contents {
    @apply h-full;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.icon-switch-enter-active, .icon-switch-leave-active {
  transition: all .3s;
}
.icon-switch-enter, .icon-switch-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
