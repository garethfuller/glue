<template lang="html">
  <label :class="['g-switch', classes]">
    <input type="checkbox" :name="name" :value="internalVal" @click="clickHandler">
    <span :class="['slider', sliderClasses]"></span>
  </label>
</template>

<script>
export default {
  name: 'GSwitch',

  props: {
    value: { type: Boolean },
    name: { type: String },
    round: { type: Boolean, default: false },
    color: { type: String, default: 'blue' },
    size: {
      type: String,
      default: 'medium',
      validator: value => ['small', 'medium', 'large'].indexOf(value) !== -1,
    },
  },

  data() {
    return {
      internalVal: false
    }
  },

  created() {
    console.log(this.round);
    this.internalVal = this.value
  },

  computed: {
    classes() {
      return {
        [`g-switch-${this.size}`]: true
      }
    },

    sliderClasses() {
      return {
        'round': this.round,
        [`slider-${this.color}`]: true,
        [`slider-${this.size}`]: true
      }
    }
  },

  methods: {
    clickHandler(e) {
      this.internalVal = !this.internalVal
      this.$emit('input', this.internalVal)
    }
  }
}
</script>

<style lang="css" scoped>
.g-switch {
  position: relative;
  display: inline-block;
}
.g-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  @apply bg-grey-light;
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  -webkit-transition: .4s;
  transition: .4s;
}
.slider:before {
  @apply bg-white;
  position: absolute;
  content: "";
  -webkit-transition: .4s;
  transition: .4s;
}

.slider.round:before {
  border-radius: 50%;
}

/* COLORS */
input:checked + .slider-blue {
  @apply bg-blue;
}
input:focus + .slider-blue {
  box-shadow: 0 0 1px config('colors.blue');
}
input:checked + .slider-red {
  @apply bg-red;
}
input:focus + .slider-red {
  box-shadow: 0 0 1px config('colors.red');
}
input:checked + .slider-green {
  @apply bg-green;
}
input:focus + .slider-green {
  box-shadow: 0 0 1px config('colors.green');
}
input:checked + .slider-orange {
  @apply bg-orange;
}
input:focus + .slider-orange {
  box-shadow: 0 0 1px config('colors.orange');
}
input:checked + .slider-black {
  @apply bg-black;
}
input:focus + .slider-black {
  box-shadow: 0 0 1px config('colors.black');
}

/* SIZES */
.g-switch-small {
  width: 30px;
  height: 20px;
}
.slider-small:before {
  height: 12px;
  width: 12px;
  left: 4px;
  bottom: 4px;
}
.slider-small.round {
  border-radius: 20px;
}
input:checked + .slider-small:before {
  -webkit-transform: translateX(10px);
  -ms-transform: translateX(10px);
  transform: translateX(10px);
}

.g-switch-medium {
  width: 50px;
  height: 30px;
}
.slider-medium:before {
  height: 22px;
  width: 22px;
  left: 4px;
  bottom: 4px;
}
.slider-medium.round {
  border-radius: 30px;
}
input:checked + .slider-medium:before {
  -webkit-transform: translateX(20px);
  -ms-transform: translateX(20px);
  transform: translateX(20px);
}

.g-switch-large {
  width: 70px;
  height: 40px;
}
.slider-large:before {
  height: 32px;
  width: 32px;
  left: 4px;
  bottom: 4px;
}
.slider-large.round {
  border-radius: 40px;
}
input:checked + .slider-large:before {
  -webkit-transform: translateX(30px);
  -ms-transform: translateX(30px);
  transform: translateX(30px);
}
</style>
