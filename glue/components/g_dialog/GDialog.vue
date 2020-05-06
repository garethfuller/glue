<template>
  <div class="inline">
    <template v-if="fullPage">
      <transition name="g-fullpage-dialog">
        <div
          v-if="show"
          :class="[`g-dialog-fullpage fixed top-0 left-0 w-full h-full bg-white shadow border-t-4 border-${borderColor}`]">
          <div v-if="navbar" class="w-full">
            <div class="container mx-auto flex flex-wrap justify-between items-center h-20 px-mobile">
              <div>
                <slot name="title">
                  <h2 class="heading-m">
                    {{ title }}
                  </h2>
                </slot>
              </div>
              <div>
                <slot name="navCenter"></slot>
              </div>
              <div v-if="closeBtn">
                <g-btn flat circle color="gray" @click.native="closeDialog" size="sm">
                  <g-icon name="fas fa-times" class="text-3xl" />
                </g-btn>
              </div>
            </div>
          </div>
          <slot></slot>
        </div>
      </transition>
    </template>
    <template v-else>
      <div v-if="show" class="g-dialog flex justify-center items-center" @click="$emit('close')">
        <transition name="g-dialog">
          <div v-g-click-outside="closeDialog" v-if="showContent" :class="['g-dialog-content w-full px-2 sm:px-0 relative', contentClasses]" :style="contentStyles" @click.stop>

            <div v-if="closeBtn" class="g-dialog-close-btn">
              <g-btn flat circle size="sm" color="gray" @click.native="closeDialog">
                <g-icon name="fas fa-times" />
              </g-btn>
            </div>

            <slot></slot>

          </div>
        </transition>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'GDialog',

  props: {
    show: { type: Boolean, default: false },
    maxWidth: { type: [String, Number], default: 500 },
    escClose: { type: Boolean, default: true },
    closeBtn: { type: Boolean, default: true },
    fullPage: { type: Boolean, default: false },
    navbar: { type: Boolean, default: false },
    borderColor: { type: String, default: 'white' },
    title: { type: String, default: 'Title' }
  },

  data: () => ({
    showContent: false,
  }),

  watch: {
    show() {
      this.gSleep(1).then(res => this.showContent = this.show);
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

<style scoped>
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
.g-dialog-content {
  max-height: 90vh;
  overflow: scroll;
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

.g-dialog-fullpage {
  z-index: 99999;
  overflow-y: scroll;
}
.g-fullpage-dialog-enter-active {
  animation: g-fullpage-dialog .5s ease;
}
.g-fullpage-dialog-leave-active {
  animation: g-fullpage-dialog .5s reverse ease;
}
@keyframes g-fullpage-dialog {
  0% {
    margin-top: 100%;
    height: 300%;
  }
  100% {
    margin-top: 0%;
    height: 100%;
  }
}
</style>
