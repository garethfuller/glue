<template lang="html">
  <div class="g-snackbar-list px-2 sm:px-0">
    <div class="g-snackbar-list-container">
      <g-snackbar v-for="(snackbar, index) in snackbars" :key="index" :snackbar="snackbar" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'GSnackbarList',

  components: {
    GSnackBar,
  },

  props: {
    snackbars: { type: Array },
  },
};
</script>

<style lang="css" scoped>
:root {
  --max-width: 350px;
}

.g-snackbar-list {
  z-index: 9999 !important;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  max-width: var(--max-width);

}
@screen sm {
  .g-snackbars {
    left: calc((100% / 2) - (350px / 2));
  }
}

.g-snackbar-list-container {
  flex-direction: column;
  width: 100% !important;
}
</style>
