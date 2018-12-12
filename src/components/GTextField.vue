<template lang="html">
  <div :class="['g-text-field', classes]">
    <div class="g-text-field-input-group">
      <label v-if="label.length > 0" :for="name">{{ label }}
        <span v-if="required">*</span>
      </label>
      <label v-else :for="name">
        <slot name="label"></slot>
      </label>
      <div class="g-text-field-input">
        <div v-if="prepend" :class="['g-text-field-prepend', prependClasses]">
          <slot name="prepend"></slot>
        </div>
        <input
          class="w-full rounded bg-grey-lighter border border-transparent leading-none"
          :type="type"
          :value="value"
          :placeholder="placeholder"
          :name="name"
          :required="required"
          v-bind="attrs"
          v-validate="validations"
          :data-vv-validate-on="validateOn"
          ref="input"
          @input="input"
          @blur="blur"
          @focus="focus"
        />
      </div>
    </div>
    <div
      v-show="errors.has(name)"
      class="g-text-field-error text-red text-sm absolute">
      {{ errors.first(name) }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'GTextField',

  inject: ['$validator'],

  props: {
    type: { type: String, default: 'text' },
    value: { type: String, default: '' },
    label: { type: String, default: '' },
    name: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    horizontal: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    prepend: { type: Boolean, default: false },
    raised: { type: Boolean, default: false },
    validations: { type: String, default: '' },
    validateOn: { type: String, default: 'blur' },
    attrs: { type: Object, default: () => ({}) },
    size: {
      type: String,
      default: 'medium',
      validator: value => ['small', 'medium', 'large'].indexOf(value) !== -1,
    },
  },

  data() {
    return {
      active: false,
      complete: false,
      success: false,
    };
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
        [`g-text-field-${this.size}`]: true,
        'g-text-field-horizontal': this.horizontal,
        'g-text-field-active': this.active,
        'g-text-field-complete': this.complete,
        'g-text-field-invalid': this.errors.has(this.name),
        'g-text-field-success': this.success,
        'g-text-field-prepended': this.prepend,
        'g-text-field-raised': this.raised,
      };
    },

    prependClasses() {
      return {
        [`g-text-field-prepend-${this.size}`]: true,
        'g-text-field-prepend-horizontal': this.horizontal,
        'g-text-field-prepend-active': this.active,
        'g-text-field-prepend-complete': this.complete,
        'g-text-field-prepend-invalid': this.errors.has(this.name),
        'g-text-field-prepend-success': this.success,
      };
    },
  },

  methods: {
    input(e) {
      this.$emit('input', e.target.value);
    },

    focus() {
      this.active = true;
      this.complete = false;
    },

    blur() {
      this.active = false;
      if (this.value.length > 0) this.complete = true;
    },
  },
};
</script>

<style lang="css" scoped>
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

.g-text-field-prepend {
  position: absolute;
  display: block;
  z-index: 10;
}

.g-text-field-small {
  @apply text-sm;

  & input {
    @apply text-sm py-2 px-4;
  }
}

.g-text-field-medium {
  @apply text-base;

  & input {
    @apply text-base py-3 px-4;
  }
}

.g-text-field-large {
  @apply text-lg;

  & input {
    @apply text-lg py-4 px-4;
  }
}

.g-text-field-active {
  & input {
    @apply border-grey-lighter bg-transparent;
  }

  & label {
    @apply text-red;
  }
}

.g-text-field-complete {
  & input {
    @apply bg-white-dark border-white-dark text-grey-darkest;
  }
}

.g-text-field-invalid {
  & input {
    @apply border-red text-red-light bg-transparent;

    & ::placeholder {
      @apply text-red-light;
    }
  }
}

.g-text-field-horizontal {
  display: flex;
  flex-direction: column;

  & > .g-text-field-input-group {
    display: flex;
    text-align: left;
    @apply flex-col;

    @screen sm {
      @apply flex-row;
    }

    & > .g-text-field-input {
      flex: 68%;
    }

    & > label {
      align-self: start;
      flex: 32%;
      @apply mr-1;

      @screen sm {
        align-self: center;
      }
    }
  }

  & > .g-text-field-error {
    width: 100%;
    align-self: flex-start;

    @screen sm {
      width: 68%;
      align-self: flex-end;
    }
  }
}

.g-text-field-raised {
  & > input {
    @apply bg-white shadow;
  }

  &.g-text-field-active {
    & > input {
      @apply bg-white border-white;
    }
  }

  &.g-text-field-complete {
    & > input {
      @apply bg-white border-white text-grey-darkest;
    }
  }
}
</style>
