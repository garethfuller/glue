<template>
  <div class="w-full md:w-2/3 p-8">
    <readme class="markdown" />
  </div>
</template>

<script>
import Readme from '../../README.md'

export default {
  name: 'Index',

  components: {
    Readme
  }
}
</script>

<style scoped>
</style>
