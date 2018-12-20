<template lang="html">
  <transition
    name="bounce"
    enter-active-class="bounceInDown"
    leave-active-class="bounceOutUp">
    <div v-if="visible" :class="['g-snackbar rounded shadow-lg', classes]">
      <div class="g-snackbar-icon" v-if="hasIcon">
        <g-icon class="icon" :name="snackbar.icon" color="white" size="large"></g-icon>
      </div>
      <div class="contents">
        <h2 class="heading-s" v-html="snackbar.title"></h2>
        <p class="rm-margin" v-html="snackbar.description"></p>
      </div>
      <div v-if="persistent" class="g-snackbar-close">
        <g-btn flat circle @click.native="handleClose" size="small" color="white">
          <g-icon name="ion-md-close" color="white" size="small"></g-icon>
        </g-btn>
      </div>
    </div>
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
      this.sleep(5000).then(res => self.$emit('closed', self.snackbar));
    }
  },

  mounted() {
    this.visible = true;
  },

  computed: {
    classes() {
      return {
        [`g-snackbar-${this.type}`]: true,
      };
    },

    hasIcon() {
      return !!((this.snackbar.icon && this.snackbar.icon.length > 0));
    },

    type() {
      if (this.snackbar.type && this.snackbar.type.length > 0) {
        return this.snackbar.type;
      }
      return 'default';
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

<style lang="css" scoped>
.g-snackbar-icon {
  @apply pr-2;
}

.g-snackbar-close {
  margin-left: auto;
}

.g-snackbar {
  @apply p-2 mt-2;
  display: flex;
}

.g-snackbar-default {
  @apply bg-black text-white;
  & h2 { @apply .text-white; }
}

.g-snackbar-error {
  @apply bg-red text-white;
  & h2 { @apply text-white; }
}

.g-snackbar-warning {
  @apply bg-orange text-white;
  & h2 { @apply text-white; }
}

.g-snackbar-success {
  @apply bg-green text-white;
  & h2 { @apply text-white; }
}

.g-snackbar-red {
  @apply bg-red text-white;
  & h2 { @apply text-white; }
}
</style>
