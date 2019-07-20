<template lang="html">
  <component :is="tag" v-bind="attrs" class="g-menu-item cursor-pointer px-6 py-4">
    <div class="g-menu-item-container flex items-center">
      <div v-if="icon" class="icon w-8">
        <g-icon :name="icon" size="large" color="grey-dark" />
      </div>
      <slot></slot>
    </div>
  </component>
</template>

<script>
export default {
  name: 'GMenuItem',

  props: {
    to: { type: String },
    href: { type: String },
    icon: { type: String },
  },

  computed: {
    tag() {
      if (this.to) return 'nuxt-link'
      if (this.href) return 'a'
      return 'div';
    },

    attrs() {
      const attrs = {};
      if (this.to) attrs.to = this.to
      if (this.href) attrs.href = this.href
      return attrs;
    },
  },
};
</script>

<style lang="css" scoped>
.g-menu-item{
  transition: background .4s ease;
  @apply text-grey-darkest no-underline block;
}
.g-menu-item:hover {
  @apply bg-white-dark text-black;
}
</style>
