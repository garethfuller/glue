<template>
  <div :class="{ 'mb-6': !noMargin }">
    <label
      :class="['g-checkbox', checkboxClasses]"
      @mouseover="hovered = true"
      @mouseout="hovered = false"><slot>{{ label }}</slot>
        <input
        type="checkbox"
        :name="name"
        :checked="checked"
        v-bind="$attrs"
        v-on="listeners">
        <span :class="['checkmark', checkmarkClasses]"></span>
    </label>
    <div
      v-show="hasError"
      class="g-text-field-error text-red-500 text-sm absolute mt-1">
      {{ errors[0] }}
    </div>
  </div>
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
    label: { type: String, default: '' },
    color: { type: String, default: 'primary' },
    rules: { type: Array },
    validateOn: { type: String, default: 'change' },
    noMargin: { type: Boolean, default: false },
    size: {
      type: String,
      default: 'medium',
      validator: value => ['small', 'medium', 'large'].indexOf(value) !== -1,
    }
  },

  data () {
    return {
      hovered: false,
      errors: []
    }
  },

  computed: {
    listeners() {
      let vm = this
      return {
        ...this.$listeners,
        change: event => {
          vm.$emit('change', event.target.checked)
          if (this.validateOn === 'change') vm.validate(event.target.checked)
        }
      }
    },

    hasError() {
      return this.errors.length > 0
    },

    checkboxClasses() {
      return {
        [`g-checkbox-${this.size}`]: true
      }
    },

    checkmarkClasses() {
      return {
        'bg-gray-300': !this.checked && !this.hovered,
        'bg-gray-400': !this.checked && this.hovered,
        [`bg-${this.color}-500`]: this.checked,
        [`g-checkmark-${this.size}`]: true
      }
    }
  },

  methods: {
    validate(val) {
      this.errors = []
      if (this.rules && this.rules.length > 0) this.rules.forEach(rule => {
        let result = rule(val)
        if (typeof result === 'string') this.errors.push(result)
      })
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
