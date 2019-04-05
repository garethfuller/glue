<template>
  <img
    :src="src"
    :alt="alt"
    :width="width"
    :height="height"
    class="g-img">
</template>

<script>
export default {
  name: 'GImg',

  props: {
    src: { type: String },
    alt: { type: String, default: 'Image' },
    width: { type: String },
    height: { type: String }
  },

  data () {
    return {

    }
  }
}
</script>

<style scoped>
</style>
