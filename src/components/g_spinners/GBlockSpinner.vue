<template>
  <div class="self-building-square-spinner" :style="containerStyles">
    <div :class="[`square bg-${color}`]" :style="squareStyles" />
    <div :class="[`square bg-${color}`]" :style="squareStyles" />
    <div :class="[`square bg-${color}`]" :style="squareStyles" />
    <div :class="[`square clear bg-${color}`]" :style="squareStyles" />
    <div :class="[`square bg-${color}`]" :style="squareStyles" />
    <div :class="[`square bg-${color}`]" :style="squareStyles" />
    <div :class="[`square clear bg-${color}`]" :style="squareStyles" />
    <div :class="[`square bg-${color}`]" :style="squareStyles" />
    <div :class="[`square bg-${color}`]" :style="squareStyles" />
  </div>
</template>

<script>
export default {
  name: 'GBlockSpinner',

  props: {
    color: { type: String, default: 'white' },
    size: { type: String, default: 'medium' }
  },

  computed: {
    sizePx() {
      switch (this.size) {
        case 'small':
          return 8
        case 'medium':
          return 12
        case 'large':
          return 16
      }
    },

    containerStyles() {
      const top = ((-this.sizePx/4) * 2) / 3
      return {
        width: `${this.sizePx}px`,
        height: `${this.sizePx}px`,
        top: `${top}px`
      }
    },

    squareStyles() {
      const top = ((-this.sizePx/4) * 2) / 3
      const margin = (this.sizePx/4) / 3
      return {
        width: `${this.sizePx/4}px`,
        height: `${this.sizePx/4}px`,
        top: `${top}px`,
        marginRight: `${margin}px`,
        marginTop: `${margin}px`
      }
    }
  }
}
</script>

<style scoped>
.self-building-square-spinner, .self-building-square-spinner * {
  box-sizing: border-box;
}

.self-building-square-spinner .square {
  float: left;
  position:relative;
  opacity: 0;
  animation: self-building-square-spinner 6s infinite;
}

.self-building-square-spinner .square:nth-child(1) {
  animation-delay: calc(200ms * 6);
}

.self-building-square-spinner .square:nth-child(2) {
  animation-delay: calc(200ms * 7);
}

.self-building-square-spinner .square:nth-child(3) {
  animation-delay: calc(200ms * 8);
}

.self-building-square-spinner .square:nth-child(4) {
  animation-delay: calc(200ms * 3);
}

.self-building-square-spinner .square:nth-child(5) {
  animation-delay: calc(200ms * 4);
}

.self-building-square-spinner .square:nth-child(6) {
  animation-delay: calc(200ms * 5);
}

.self-building-square-spinner .square:nth-child(7) {
  animation-delay: calc(200ms * 0);
}

.self-building-square-spinner .square:nth-child(8) {
  animation-delay: calc(200ms * 1);
}

.self-building-square-spinner .square:nth-child(9) {
  animation-delay: calc(200ms * 2);
}

.self-building-square-spinner .clear{
  clear: both;
}

@keyframes self-building-square-spinner {
  0% {
    opacity: 0;
  }
  5% {
    opacity: 1;
    top: 0;
  }
  50.9% {
    opacity: 1;
    top: 0;
  }
  55.9% {
    opacity: 0;
    top: inherit;
  }
}
</style>
