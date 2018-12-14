<template lang="html">
  <div v-click-outside="closePopover" class="g-popover relative">
    <div class="activator" ref="activator" @click="showPopover = !showPopover">
      <slot name="activator"></slot>
    </div>
    <transition name="popover-bottom">
      <div v-show="showPopover" :class="['g-popover-contents bg-white absolute shadow-lg rounded mt-1', contentClasses]" :style="contentStyles">
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
    position: {
      type: String,
      default: 'bottom',
      validator: value => ['bottom', 'top', 'left', 'right'].indexOf(value) !== -1,
    },
  },

  data: () => ({
    popoverXPosition: 0,
    popoverYPosition: 0,
    showPopover: false,
  }),

  mounted() {
    const position = this.$refs.activator.getBoundingClientRect();
    this.popoverXPosition = this.width / 2 - position.width / 2;
    this.popoverYPosition = this.height + position.height / 2;
  },

  computed: {
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
      switch (this.position) {
        case 'bottom':
          return {
            left: `-${this.popoverXPosition}px`,
          };
        case 'top':
          return {
            left: `-${this.popoverXPosition}px`,
            top: `-${this.popoverYPosition}px`,
          };
      }
    },
  },

  methods: {
    closePopover() {
      this.showPopover = false;
    },
  },
};
</script>

<style lang="css" scoped>
.g-popover {
  z-index: 999;
}

.g-popover-contents-bottom:after {
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
