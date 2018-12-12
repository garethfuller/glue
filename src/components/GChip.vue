<template lang="html">
  <div :class="['g-chip rounded-full', classes]">
    <slot></slot>
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
  },

  computed: {
    classes() {
      return {
        [`g-chip-${this.color}`]: true,
        [`g-chip-${this.size}`]: true,
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
  @apply .px-2 .py-1 .text-xs;
}
.g-chip-medium {
  @apply .px-3 .py-1 .text-sm .font-medium;
}
.g-chip-large {
  @apply .px-4 .py-2 .text-base;
}
.g-chip-grey {
   @apply .bg-grey .text-black;
}
.g-chip-grey-lightest {
   @apply .bg-grey-lightest .text-black;
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
</style>
