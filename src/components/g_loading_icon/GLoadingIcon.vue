<template>
  <div :class="['spinner', sizeClasses]">
    <div :class="`double-bounce1 bg-${color}`" />
    <div :class="`double-bounce2 bg-${color}`" />
  </div>
</template>

<script>
export default {
  name: 'GLoadingIcon',

  props: {
    color: { type: String },
    size: {
      type: String,
      default: 'md',
      validator: value => ['sm', 'md', 'lg'].indexOf(value) !== -1,
    }
  },
  computed: {
    sizeClasses() {
      switch (this.size) {
        case 'lg':
          return 'w-12 h-12'
        case 'sm':
          return 'w-4 h-4'
        default:
          return 'w-6 h-6'
      }
    }
  }
}
</script>

<style scoped>
.spinner {
  position: relative;
}
.double-bounce1, .double-bounce2 {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;
  -webkit-animation: sk-bounce 2.0s infinite ease-in-out;
  animation: sk-bounce 2.0s infinite ease-in-out;
}
.double-bounce2 {
  -webkit-animation-delay: -1.0s;
  animation-delay: -1.0s;
}
@-webkit-keyframes sk-bounce {
  0%, 100% { -webkit-transform: scale(0.0) }
  50% { -webkit-transform: scale(1.0) }
}
@keyframes sk-bounce {
  0%, 100% {
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  } 50% {
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
  }
}
</style>
