<template>
  <div class="g-tooltip relative inline-block leading-none">
    <slot></slot>
    <span class="g-tooltip-text bg-gray-900 text-white text-center rounded px-2 py-2 text-xs flex items-center justify-center" :style="textStyles">
      <slot name="text">{{ text }}</slot>
    </span>
  </div>
</template>

<script>
export default {
  name: 'GTooltip',

  props: {
    text: { type: String },
    width: { type: Number, default: 100 }
  },

  computed: {
    textStyles() {
      return {
        minWidth: `${this.width}px`,
        marginLeft: `-${this.width/2}px`
      }
    }
  }
};
</script>

<style scoped>
.g-tooltip-text {
  visibility: hidden;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  opacity: 0;
  transition: opacity 0.5s;
}
.g-tooltip .g-tooltip-text::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: theme('colors.gray.900') transparent transparent transparent;
}
.g-tooltip:hover .g-tooltip-text {
  visibility: visible;
  opacity: 1;
}
</style>
