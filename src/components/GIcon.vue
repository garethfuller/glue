<template lang="html">
  <i :class="['icon g-icon', `${name}`, classes]"></i>
</template>

<script>
export default {
  name: 'GIcon',

  props: {
    name: { type: String, required: true },
    color: { type: String, default: 'black' },
    size: {
      type: String,
      default: 'medium',
      validator: value => ['small', 'medium', 'large', 'xl', '2xl', '3xl', '4xl', '5xl'].indexOf(value) !== -1,
    },
  },

  computed: {
    classes() {
      return {
        [`text-${this.color}`]: true,
        [`g-icon-${this.size}`]: true,
      };
    },
  },
};
</script>

<style lang="css" scoped>
/* COLOR */
.g-icon-default {
  @apply text-black;
}
.g-icon-primary {
  @apply text-red;
}
.g-icon-primary-darkest {
  @apply text-red-darkest;
}
.g-icon-secondary {
  @apply text-blue;
}
.g-icon-red {
  @apply text-red;
}
.g-icon-green {
  @apply text-green;
}
.g-icon-white {
  @apply text-white;
}
.g-icon-grey-lightest {
  @apply text-grey-lightest;
}
.g-icon-grey-lighter {
  @apply text-grey-lighter;
}
.g-icon-grey-light {
  @apply text-grey-light;
}
.g-icon-grey {
  @apply text-grey;
}
.g-icon-grey-dark {
  @apply text-grey-dark;
}
.g-icon-white-dark {
  @apply text-white-dark;
}

/* SIZES */
.g-icon-small {
  @apply text-sm;
}
.g-icon-medium {
  @apply text-base;
}
.g-icon-large {
  @apply text-lg;
}
.g-icon-xl {
  @apply text-xl;
}
.g-icon-2xl {
  @apply text-2xl;
}
.g-icon-3xl {
  @apply text-3xl;
}
.g-icon-4xl {
  @apply text-4xl;
}
.g-icon-5xl {
  @apply text-5xl;
}
</style>
