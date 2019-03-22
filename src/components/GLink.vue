<template lang="html">
  <a :href="href" :class="['g-link no-underline hover:no-underline cursor-pointer leading-none', classes]" @click="clicked">
    <slot></slot>
  </a>
</template>

<script>
export default {
  name: 'GLink',

  props: {
    to: { type: String, default: null },
    href: { type: String, default: null },
    color: {
      type: String,
      default: 'blue',
      validator: value => ['black', 'blue', 'orange', 'blue', 'white', 'red'].indexOf(value) !== -1,
    },
    size: {
      type: String,
      default: 'base',
      validator: value => ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'].indexOf(value) !== -1,
    },
  },

  computed: {
    classes() {
      return {
        [`text-${this.color} hover:text-${this.color}-light`]: true,
        [`text-${this.size}`]: true,
      };
    },
  },

  methods: {
    clicked(e) {
      if (this.to) e.preventDefault();
      this.$emit('clicked');
      this.$router.push(this.to);
    },
  },
};
</script>

<style lang="css" scoped>
.g-link:hover {
  text-decoration: underline;
}
</style>
