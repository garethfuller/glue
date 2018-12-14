<template lang="html">
  <div class="g-tooltip relative inline-block">
    <slot></slot>
    <span class="g-tooltip-text text-xs flex items-center justify-center">
      <slot name="text">{{ text }}</slot>
    </span>
  </div>
</template>

<script>
export default {
  name: 'GTooltip',

  props: {
    text: { type: String },
  },
};
</script>

<style lang="css" scoped>
.g-tooltip-text {
    visibility: hidden;
    min-width: 120px;
    @apply bg-black text-white text-center rounded-full px-2 py-1;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    margin-left: -60px;
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
    border-color: config('colors.black') transparent transparent transparent;
}
.g-tooltip:hover .g-tooltip-text {
    visibility: visible;
    opacity: 1;
}
</style>
