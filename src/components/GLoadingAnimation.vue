<template lang="html">
  <div :class="['flex justify-center items-center g-loading-animation', classes]">
    <div :class="['dot', colorClass]" :style="dotStyle"></div>
    <div :class="['dot dot-middle', colorClass]" :style="dotStyle"></div>
    <div :class="['dot', colorClass]" :style="dotStyle"></div>
  </div>
</template>

<script>
export default {
  name: 'GLoadingAnimation',

  props: {
    dotRadius: { type: Number, default: 5 },
    color: { type: String, default: 'primary' },
    colorShade: { type: String, default: '500' }
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
    colorClass() {
      return `bg-${this.color}-${this.colorShade}`
    },
  },
};
</script>

<style scoped>
.g-loading-animation {
  padding-top: 2px;
  padding-bottom: 2px;
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
