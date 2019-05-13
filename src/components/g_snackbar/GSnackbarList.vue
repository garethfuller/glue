<template lang="html">
  <div class="g-snackbar-list px-2 pt-2 sm:px-0">
    <div class="g-snackbar-list-container">
      <g-snackbar
        v-for="(snackbar, index) in snackbars"
        :key="index"
        :snackbar="snackbar"
        @closed="closeHandler"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GSnackbarList',

  props: {
    snackbars: { type: Array },
  },

  methods: {
    closeHandler(snackbar) {
      this.$emit('closed', snackbar);
    },
  },
};
</script>

<style lang="css" scoped>
.g-snackbar-list {
  z-index: 9999 !important;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 400px;
  max-width: 100%;
}
@screen sm {
  .g-snackbar-list {
    left: calc((100% / 2) - (350px / 2));
  }
}

.g-snackbar-list-container {
  flex-direction: column;
  width: 100% !important;
}
</style>
