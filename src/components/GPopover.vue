<template lang="html">
  <div
    v-g-click-outside="closePopover"
    class="g-popover relative inline-block"
    @mouseover="handleMouseover"
    @mouseout="handleMouseout">
    <div
      class="activator inline-block"
      ref="activator"
      @click="showPopover = !showPopover">
      <slot name="activator"></slot>
    </div>
    <transition name="popover-bottom">
      <div
        ref="contents"
        v-show="showPopover"
        :class="['g-popover-contents bg-white absolute shadow-lg rounded mt-1', contentClasses]"
        :style="contentStyles">
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
    height: { type: Number, default: 200 },
    onHover: { type: Boolean, default: false },
    top: { type: Boolean, default: false },
    left: { type: Boolean, default: false },
    right: { type: Boolean, default: false },
  },

  data: () => ({
    popoverXPosition: 0,
    popoverYPosition: 0,
    showPopover: false,
  }),

  mounted() {
    const activatorPosition = this.$refs.activator.getBoundingClientRect()

    if (this.right) {
      this.popoverXPosition = 0
    } else if (this.left) {
      this.popoverXPosition = this.width - activatorPosition.width
    } else {
      this.popoverXPosition = (this.width / 2) - (activatorPosition.width / 2);
    }

    if (this.top) {
      this.popoverYPosition = ((this.height / 2) + (activatorPosition.height / 2));
    } else {
      this.popoverYPosition = activatorPosition.height - 5;
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
        height: 'auto',
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
      if (this.onHover) this.showPopover = true
    },

    handleMouseout() {
      if (this.onHover) this.showPopover = false
    }
  },
};
</script>

<style lang="css" scoped>
.g-popover {
  z-index: 999;
}

/* .g-popover-contents-bottom:after {
  border-right: solid 10px transparent;
  border-left: solid 10px transparent;
  border-bottom: solid 10px white;
  transform: translateX(-50%);
  position: absolute;
  z-index: 10;
  content: '';
  top: -10px;
  left: 50%;
  height: 0;
  width: 0;
}

.g-popover-contents-bottom-left:after {
  border-right: solid 10px transparent;
  border-left: solid 10px transparent;
  border-bottom: solid 10px white;
  transform: translateX(-50%);
  position: absolute;
  z-index: 10;
  content: '';
  top: -10px;
  right: 10%;
  height: 0;
  width: 0;
}

.g-popover-contents-bottom-right:after {
  border-right: solid 10px transparent;
  border-left: solid 10px transparent;
  border-bottom: solid 10px white;
  transform: translateX(-50%);
  position: absolute;
  z-index: 10;
  content: '';
  top: -10px;
  left: 10%;
  height: 0;
  width: 0;
}

.g-popover-contents-top:after {
  border-right: solid 10px transparent;
  border-left: solid 10px transparent;
  border-top: solid 10px white;
  transform: translateX(-50%);
  position: absolute;
  content: '';
  top: 100%;
  left: 50%;
  height: 0;
  width: 0;
}

.g-popover-contents-top-left:after {
  border-right: solid 10px transparent;
  border-left: solid 10px transparent;
  border-top: solid 10px white;
  transform: translateX(-50%);
  position: absolute;
  content: '';
  top: 100%;
  right: 10%;
  height: 0;
  width: 0;
}

.g-popover-contents-top-right:after {
  border-right: solid 10px transparent;
  border-left: solid 10px transparent;
  border-top: solid 10px white;
  transform: translateX(-50%);
  position: absolute;
  content: '';
  top: 100%;
  left: 10%;
  height: 0;
  width: 0;
} */

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
