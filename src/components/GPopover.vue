<template lang="html">
  <div
    v-g-click-outside="closePopover"
    class="g-popover relative inline-block"
    @mouseover="handleMouseover"
    @mouseout="handleMouseout">
    <div
      class="activator inline-block"
      ref="activator"
      @click="showPopover = !showPopover"
      @mouseover="isOverActivator=true"
      @mouseout="isOverActivator=false">
      <slot name="activator"></slot>
    </div>
    <transition name="popover-bottom">
      <div
        ref="contents"
        v-show="showPopover"
        :class="['g-popover-contents bg-white-500 absolute shadow-lg rounded mt-1', contentClasses]"
        :style="contentStyles"
        @mouseover="isOverContent=true"
        @mouseout="isOverContent=false">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'GPopover',

  props: {
    width: { type: Number, default: 200 },
    height: { type: Number, default: 0 },
    onHover: { type: Boolean, default: false },
    top: { type: Boolean, default: false },
    bottom: { type: Boolean, default: false },
    left: { type: Boolean, default: false },
    right: { type: Boolean, default: false },
    rightAligned: { type: Boolean, default: false },
    leftAligned: { type: Boolean, default: false },
  },

  data () {
    return {
      popoverXPosition: 0,
      popoverYPosition: 0,
      showPopover: false,
      isOverContent: false,
      isOverActivator: false,
      timer: null
    }
  },

  mounted() {
    const activatorPosition = this.$refs.activator.getBoundingClientRect()

    if (this.right) {
      this.popoverXPosition = 0
    } else if (this.left) {
      this.popoverXPosition = this.width
    } else if (this.leftAligned) {
      this.popoverXPosition = 0;
    } else if (this.rightAligned) {
      this.popoverXPosition = this.width - activatorPosition.width;
    } else {
      this.popoverXPosition = (this.width / 2) - (activatorPosition.width / 2);
    }

    if (this.top && this.height !== 0) {
      this.popoverYPosition = this.height + 5
    } else if (this.bottom) {
      this.popoverYPosition = activatorPosition.height;
    }
  },

  computed: {
    position() {
      if (this.top) {
        if (this.left) return 'top-left'
        if (this.right) return 'top-right'
        return 'top'
      } else {
        if (this.left) return 'bottom-left'
        if (this.right) return 'bottom-right'
        return 'bottom'
      }
    },

    contentClasses() {
      return {
        [`g-popover-contents-${this.position}`]: true,
      };
    },

    contentStyles() {
      return {
        width: `${this.width}px`,
        height: (this.height === 0) ? 'auto' : `${this.height}px`,
        ...this.contentPostiton,
      };
    },

    contentPostiton() {
      if (this.top) {
        return {
          left: `-${this.popoverXPosition}px`,
          top: `-${this.popoverYPosition}px`,
        };
      } else {
        return {
          left: `-${this.popoverXPosition}px`,
          top: `${this.popoverYPosition}px`,
        };
      }
    },
  },

  methods: {
    closePopover() {
      this.showPopover = false;
    },

    handleMouseover() {
      if (this.onHover) {
        let vm = this
        this.timer = setTimeout(() => {
          vm.showPopover = true
        }, 200)
      }
    },

    handleMouseout() {
      if (this.onHover) {
        let vm = this
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          if (!vm.isOverContent && !vm.isOverActivator) {
            vm.showPopover = false
          }
        }, 200)
      }
    }
  },
};
</script>

<style lang="css" scoped>
.g-popover {
  z-index: 999;
}

.popover-bottom-enter-active {
  transform-origin: top center;
  animation: popover-in .25s;
  animation-timing-function: ease-in-out;
}

.popover-bottom-leave-active {
  transform-origin: top center;
  animation: popover-in .25s reverse;
  animation-timing-function: ease-in-out;
}

@keyframes popover-in {
  0% {
    opacity: 0;
    transform: skewX(3deg) translateY(3px);
  }
  100% {
    opacity: 1;
    transform: skewX(0deg) translateY(0px);
  }
}
</style>
