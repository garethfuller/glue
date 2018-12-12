<template lang="html">
  <div :class="['g-loading-animation', classes]">
    <div class="dot" :style="dotStyle"></div>
    <div class="dot dot-middle" :style="dotStyle"></div>
    <div class="dot" :style="dotStyle"></div>
  </div>
</template>

<script>
export default {
  name: 'GLoadingAnimation',

  props: {
    dotRadius: { type: Number, default: 5 },
    color: {
      type: String,
      default: 'blue',
      validator: value => ['blue', 'red', 'green', 'black', 'white'].indexOf(value) !== -1,
    },
  },

  data() {
    return {
      dotStyle: {
        width: `${this.dotRadius * 2}px`,
        height: `${this.dotRadius * 2}px`,
        borderRadius: `${this.dotRadius}px`,
        margin: '2px',
      },
    };
  },

  computed: {
    classes() {
      return {
        [`g-loading-animation-${this.color}`]: true,
      };
    },
  },
};
</script>

<style lang="css" scoped>
.g-loading-animation {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 2px;
  padding-bottom: 2px;
}
.g-loading-animation > .dot {
  @apply .bg-white;
}
.g-loading-animation.g-loading-animation-default > .dot {
  @apply .bg-blue;
}
.g-loading-animation.g-loading-animation-primary > .dot {
  @apply .bg-blue;
}
.g-loading-animation.g-loading-animation-primary-lightest > .dot {
  @apply .bg-blue-lightest;
}
.g-loading-animation.g-loading-animation-secondary > .dot {
  @apply .bg-orange;
}
.g-loading-animation.g-loading-animation-red > .dot {
  @apply .bg-red;
}
.g-loading-animation.g-loading-animation-green > .dot {
  @apply .bg-green;
}
.g-loading-animation.g-loading-animation-black > .dot {
  @apply .bg-black;
}
.g-loading-animation.g-loading-animation-white > .dot {
  @apply .bg-white;
}
.dot {
  animation-name: expand;
  animation-duration: 0.5s;
  animation-timing-function: linear;
  animation-direction: alternate;
  animation-iteration-count: infinite;
}
.dot-middle{
  animation-delay: 0.5s;
}
@keyframes expand{
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0.5;
    transform: scale(0.5);
  }
}
</style>
