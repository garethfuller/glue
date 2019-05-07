<template lang="html">
  <div :class="['g-chip rounded-full', classes]">
    <div class="flex items-center leading-none">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GChip',

  props: {
    color: {
      type: String,
      default: 'grey-lightest',
      validator: value => ['blue', 'red', 'green', 'orange', 'grey', 'grey-lightest'].indexOf(value) !== -1,
    },
    size: {
      type: String,
      default: 'medium',
      validator: value => ['small', 'medium', 'large'].indexOf(value) !== -1,
    },
    outline: { type: Boolean, default: false }
  },

  computed: {
    classes() {
      return {
        [`g-chip-${this.color}`]: !this.outline,
        [`g-chip-${this.size}`]: true,
        [`g-chip-outline-${this.color}`]: this.outline,
      };
    },
  },
};
</script>

<style lang="css" scoped>
.g-chip {
  white-space: nowrap;
  display: inline-block;
}
.g-chip-small {
  @apply .px-2 .h-6 .text-xs;
  & div {
    @apply h-full
  }
}
.g-chip-medium {
  @apply .px-3 h-8 .text-sm;
  & div {
    @apply h-full
  }
}
.g-chip-large {
  @apply .px-4 h-10 .text-base;
  & div {
    @apply h-full
  }
}
.g-chip-grey {
   @apply .bg-grey .text-grey-darkest;
}
.g-chip-grey-lightest {
   @apply .bg-grey-lightest .text-grey-darker;
}
.g-chip-blue {
   @apply .bg-blue .text-white;
}
.g-chip-red {
   @apply .bg-red .text-white;
}
.g-chip-green {
   @apply .bg-green .text-white;
}
.g-chip-orange {
   @apply .bg-orange .text-white;
}

.g-chip-outline-grey {
   @apply border bg-grey-lightest border-grey text-grey-dark;
}
.g-chip-outline-blue {
   @apply border bg-blue-lightest border-blue text-blue-dark;
}
.g-chip-outline-red {
   @apply border bg-red-lightest border-red text-red-dark;
}
.g-chip-outline-green {
   @apply border bg-green-lightest border-green text-green-dark;
}
.g-chip-outline-orange {
   @apply border bg-orange-lightest border-orange text-orange-dark;
}
</style>
