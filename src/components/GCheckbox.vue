<template>
  <label
  class="g-checkbox"
  @mouseover="hovered = true"
  @mouseout="hovered = false"><slot>{{ label }}</slot>
    <input
    type="checkbox"
    :name="name"
    :checked="checked"
    @change="$emit('change', $event.target.checked)">
    <span :class="['checkmark', checkmarkClasses]"></span>
  </label>
</template>

<script>
export default {
  name: 'GCheckbox',

  model: {
    prop: 'checked',
    event: 'change'
  },

  props: {
    name: { type: String, default: 'checkbox' },
    checked: { type: Boolean, default: false },
    label: { type: String, default: 'Label' },
    color: { type: String, default: 'blue' },
    size: {
      type: String,
      default: 'medium',
      validator: value => ['small', 'medium', 'large'].indexOf(value) !== -1,
    },
  },

  data () {
    return {
      hovered: false
    }
  },

  computed: {
    checkmarkClasses() {
      return {
        'bg-grey-lightest': !this.checked && !this.hovered,
        'bg-grey-light': !this.checked && this.hovered,
        [`bg-${this.color}`]: this.checked,
        [`g-checkbox-${this.size}`]: true
      }
    }
  }
}
</script>

<style scoped>
/* Customize the label (the container) */
.g-checkbox {
 display: block;
 position: relative;
 padding-left: 35px;
 margin-bottom: 12px;
 cursor: pointer;
 -webkit-user-select: none;
 -moz-user-select: none;
 -ms-user-select: none;
 user-select: none;
}

.g-checkbox-small {
  @apply text-sm;
}
.g-checkbox-medium {
  @apply text-base;
}
.g-checkbox-large {
  @apply text-lg;
}

/* Hide the browser's default checkbox */
.g-checkbox input {
 position: absolute;
 opacity: 0;
 cursor: pointer;
 height: 0;
 width: 0;
}

/* Create a custom checkbox */
.checkmark {
  @apply rounded;
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
}

/* On mouse-over, add a grey background color */
.g-checkbox:hover input ~ .checkmark {
 /* @apply bg-grey-lighter; */
}

/* When the checkbox is checked, add a blue background */
/* .g-checkbox input:checked ~ .checkmark {
 background-color: #2196F3;
} */

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
 content: "";
 position: absolute;
 display: none;
}

/* Show the checkmark when checked */
.g-checkbox input:checked ~ .checkmark:after {
 display: block;
}

/* Style the checkmark/indicator */
.g-checkbox .checkmark:after {
 left: 7.5px;
 top: 3.5px;
 width: 10px;
 height: 15px;
 border: solid white;
 border-width: 0 5px 5px 0;
 -webkit-transform: rotate(45deg);
 -ms-transform: rotate(45deg);
 transform: rotate(45deg);
}
</style>
