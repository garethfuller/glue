<template>
  <component :is="tag" v-bind="attrs" class="g-menu-item cursor-pointer px-6 py-4">
    <div class="g-menu-item-container flex items-center">
      <div v-if="icon" class="icon w-8">
        <g-icon :name="icon" size="large" color="gray-600" />
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

<style scoped>
.g-menu-item{
  transition: background .3s ease;
  @apply text-gray-600 no-underline block;
}
.g-menu-item:hover {
  @apply bg-gray-100 text-gray-800;
}
</style>
