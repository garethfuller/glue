<template lang="html">
  <div :class="['g-select-item cursor-pointer', classes]">
    <div class="g-select-item-container flex items-center">
      <div v-if="icon" class="icon w-8">
        <g-icon :name="icon" size="large" />
      </div>
      <slot>
        {{ text }}
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GSelectItem',

  props: {
    icon: { type: String },
    text: { type: String },
    size: { type: String },
  },

  computed: {
    classes() {
      return {
        [`g-select-item-${this.size}`]: true,
      }
    }
  }
};
</script>

<style lang="css" scoped>
.g-select-item{
  transition: background .4s ease;
  @apply text-black no-underline block;
}
.g-select-item:hover {
  @apply bg-white-dark;
}

/* SIZES */
.g-select-item-small {
  @apply text-sm py-2 px-4;
}

.g-select-item-medium {
  @apply text-base py-3 px-4;
}

.g-select-item-large {
  @apply text-lg py-4 px-4;
}
</style>
