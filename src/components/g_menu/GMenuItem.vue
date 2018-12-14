<template lang="html">
  <component :is="tag" v-bind="attrs" class="g-menu-item cursor-pointer px-6 py-4">
    <div class="g-menu-item-container flex items-center">
      <div v-if="icon" class="icon w-8">
        <g-icon :name="icon" size="large" />
      </div>
      <slot></slot>
    </div>
  </component>
</template>

<script>
export default {
  name: 'GMenuItem',

  props: {
    to: { type: String, default: '' },
    icon: { type: String },
  },

  computed: {
    tag() {
      if (this.to.length > 0) return 'a';
      return 'div';
    },

    attrs() {
      const attrs = {};
      if (this.to.length > 0) attrs.href = this.to;
      return attrs;
    },
  },
};
</script>

<style lang="css" scoped>
.g-menu-item{
  transition: background .4s ease;
  @apply text-black no-underline block;
}
.g-menu-item:hover {
  @apply bg-white-dark;
}
</style>
