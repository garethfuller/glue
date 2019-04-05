<template lang="html">
    <div v-if="show" class="g-dialog flex justify-center items-center" @click="$emit('close')">
      <transition name="g-dialog">
        <div v-g-click-outside="closeDialog" v-if="showContent" :class="['g-dialog-content w-full px-2 sm:px-0 relative', contentClasses]" :style="contentStyles" @click.stop>

          <div v-if="closeBtn" class="g-dialog-close-btn">
            <g-btn flat circle @click.native="closeDialog" size="small">
              <g-icon name="fas fa-times" />
            </g-btn>
          </div>

          <slot></slot>

        </div>
      </transition>
    </div>
</template>

<script>
export default {
  name: 'GDialog',

  props: {
    show: { type: Boolean, default: false },
    maxWidth: { type: [String, Number], default: 500 },
    escClose: { type: Boolean, default: true },
    closeBtn: { type: Boolean, default: true }
  },

  data: () => ({
    showContent: false,
  }),

  watch: {
    show() {
      this.sleep(1).then(res => this.showContent = this.show);
    },
  },

  mounted() {
    document.addEventListener('keydown', (e) => {
      if (this.escClose && e.keyCode == 27) {
        this.closeDialog()
      }
    });
  },

  computed: {
    contentClasses() {
      return {
      };
    },

    contentStyles() {
      return {
        maxWidth: this.maxWidthStr,
      };
    },

    maxWidthStr() {
      if (Number.isInteger(this.maxWidth)) return `${this.maxWidth}px`;
      return this.maxWidth;
    },
  },

  methods: {
    closeDialog() {
      this.$emit('close')
    }
  }
};
</script>

<style lang="css" scoped>
.g-dialog {
  position: fixed; /* Stay in place */
  z-index: 9999; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}
.g-dialog-close-btn {
  position: absolute;
  right: 5px;
  top: 5px;
}
.g-dialog-enter-active {
  animation: zoom-in .3s;
}
.g-dialog-leave-active {
  animation: zoom-in .3s reverse;
}
@keyframes zoom-in {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
