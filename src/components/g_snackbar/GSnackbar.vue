<template lang="html">
  <transition
    name="bounce"
    enter-active-class="bounceInDown"
    leave-active-class="bounceOutUp">
    <g-alert
      v-if="visible"
      :title="snackbar.title"
      :icon="snackbar.icon"
      :color="color"
      class="mb-2"
      @closed="handleClose">
      <div v-html="snackbar.description" />
    </g-alert>
  </transition>
</template>

<script>
export default {
  name: 'GSnackbar',

  props: {
    snackbar: { type: Object, required: true },
  },

  data() {
    return {
      visible: false,
    };
  },

  created() {
    const self = this;
    if (!this.snackbar.persistent) {
      this.gSleep(5000).then(res => self.$emit('closed', self.snackbar))
    }
  },

  mounted() {
    this.visible = true;
  },

  computed: {
    color() {
      switch (this.snackbar.type) {
        case 'default':
          return 'blue'
        case 'error':
          return 'red'
        case 'warning':
          return 'orange'
        case 'success':
          return 'green'
        default:
          return 'blue'
      }
    },

    persistent() {
      return !!(this.snackbar.persistent);
    },
  },

  methods: {
    handleClose() {
      this.$emit('closed', this.snackbar);
    },
  },
};
</script>

<style scoped>
</style>
