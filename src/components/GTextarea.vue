<template>
  <div :class="['g-textarea', classes]">
    <div class="g-textarea-input-group">
      <label v-if="label" :for="name">{{ label }}
        <span v-if="required">*</span>
      </label>
      <label v-else :for="name">
        <slot name="label"></slot>
      </label>
      <div class="g-textarea-input flex">
        <textarea
          :class="['w-full bg-grey-lightest border rounded border-grey-lightest leading-none', inputClasses]"
          :type="type"
          :value="value"
          :placeholder="placeholder"
          :name="name"
          :required="required"
          v-bind="attrs"
          v-validate="validations"
          :data-vv-validate-on="validateOn"
          ref="input"
          size="1"
          :disabled="disabled"
          @input="input"
          @blur="blur"
          @focus="focus"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GTextarea',

  inject: ['$validator'],

  props: {
    type: { type: String, default: 'text' },
    value: { type: String, default: '' },
    label: { type: String, default: null },
    name: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    required: { type: Boolean, default: false },
    raised: { type: Boolean, default: false },
    uppercase: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    validations: { type: String, default: '' },
    validateOn: { type: String, default: 'blur' },
    attrs: { type: Object, default: () => ({}) },
    size: {
      type: String,
      default: 'medium',
      validator: value => ['small', 'medium', 'large'].indexOf(value) !== -1,
    }
  },

  data () {
    return {
      active: false,
      complete: false,
      success: false,
    }
  },

  watch: {
    value(newVal) {
      if (newVal.length > 0 && !this.complete && !this.active) {
        this.complete = true;
      } else if (newVal.length === 0) {
        this.complete = false;
      }
    },
  },

  computed: {
    classes() {
      return {
        [`g-textarea-${this.size}`]: true,
        'g-textarea-active': this.active,
        'g-textarea-complete': this.complete,
        'g-textarea-invalid': this.errors.has(this.name),
        'g-textarea-success': this.success,
        'g-textarea-raised': this.raised,
      }
    },

    inputClasses() {
      return {
        uppercase: this.uppercase,
      }
    }
  },

  methods: {
    input(e) {
      this.$emit('input', e.target.value);
    },

    focus() {
      this.active = true;
      this.complete = false;
      this.$emit('focus');
    },

    blur() {
      this.active = false;
      if (this.value.length > 0) this.complete = true;
    }
  }
}
</script>

<style scoped>
.g-textarea{
  & textarea {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    box-shadow: none;
  }
}

.g-textarea-input-group {
  & label {
    @apply text-grey-darker font-medium;
  }
}

.g-textarea-small {
  @apply text-sm;
  & textarea {
    @apply text-sm p-4;
  }
}
.g-textarea-medium {
  @apply text-base;
  & textarea {
    @apply text-base p-4;
  }
}
.g-textarea-large {
  @apply text-lg;
  & textarea {
    @apply text-lg p-4;
  }
}

.g-textarea-active {
  & textarea {
    @apply border-grey-light bg-transparent;
  }

  & label {
    @apply text-black;
  }
}
.g-textarea-complete {
  & textarea {
    @apply bg-grey-lightest border-grey-lightest text-grey-darkest;
  }
}
.g-textarea-invalid {
  & textarea {
    @apply border-red text-red-light bg-transparent;

    & ::placeholder {
      @apply text-red-light;
    }
  }
}

.g-textarea-raised {
  & textarea {
    @apply bg-white shadow;
  }

  &.g-textarea-active {
    & textarea {
      @apply bg-white border-white;
    }
  }

  &.g-textarea-complete {
    & textarea {
      @apply bg-white border-white text-grey-darkest;
    }
  }
}

::-webkit-input-placeholder { /* WebKit, Blink, Edge */
  @apply text-grey-dark;
}
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
   @apply text-grey-dark;
   opacity:  1;
}
::-moz-placeholder { /* Mozilla Firefox 19+ */
   @apply text-grey-dark;
   opacity:  1;
}
:-ms-input-placeholder { /* Internet Explorer 10-11 */
   @apply text-grey-dark;
}
::-ms-input-placeholder { /* Microsoft Edge */
   @apply text-grey-dark;
}

::placeholder { /* Most modern browsers support this now. */
   @apply text-grey-dark;
}
</style>
