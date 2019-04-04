<template>
  <div>
    <label
      :class="['g-checkbox', checkboxClasses]"
      @mouseover="hovered = true"
      @mouseout="hovered = false"><slot>{{ label }}</slot>
        <input
        type="checkbox"
        :name="name"
        :checked="checked"
        v-validate="validations"
        :data-vv-validate-on="validateOn"
        v-bind="attrs"
        @change="$emit('change', $event.target.checked)">
        <span :class="['checkmark', checkmarkClasses]"></span>
    </label>
    <div
      v-show="errors.has(name)"
      class="g-text-field-error text-red text-sm absolute mt-1">
      {{ errors.first(name) }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'GCheckbox',

  inject: ['$validator'],

  model: {
    prop: 'checked',
    event: 'change'
  },

  props: {
    name: { type: String, default: 'checkbox' },
    checked: { type: Boolean, default: false },
    label: { type: String, default: '' },
    color: { type: String, default: 'blue' },
    size: {
      type: String,
      default: 'medium',
      validator: value => ['small', 'medium', 'large'].indexOf(value) !== -1,
    },
    validations: { type: String, default: '' },
    validateOn: { type: String, default: 'change' },
    attrs: { type: Object, default: () => ({}) },
  },

  data () {
    return {
      hovered: false
    }
  },

  computed: {
    checkboxClasses() {
      return {
        [`g-checkbox-${this.size}`]: true
      }
    },

    checkmarkClasses() {
      return {
        'bg-grey-lightest': !this.checked && !this.hovered,
        'bg-grey-light': !this.checked && this.hovered,
        [`bg-${this.color}`]: this.checked,
        [`g-checkmark-${this.size}`]: true
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
}

.g-checkbox-small {
  height: 20px;
}
.g-checkmark-small {
  height: 20px;
  width: 20px;
}

.g-checkbox-medium {
  height: 25px;
}
.g-checkmark-medium {
  height: 25px;
  width: 25px;
}

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
.g-checkbox-medium .checkmark:after {
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

.g-checkbox-small .checkmark:after {
 left: 6.5px;
 top: 3px;
 width: 7px;
 height: 12px;
 border: solid white;
 border-width: 0 3.5px 3.5px 0;
 -webkit-transform: rotate(45deg);
 -ms-transform: rotate(45deg);
 transform: rotate(45deg);
}
</style>
