<template lang="html">
  <div :class="['g-text-field', classes]">
    <div class="g-text-field-input-group">
      <label v-if="label" :for="name">{{ label }}
        <span v-if="required">*</span>
      </label>
      <label v-else :for="name">
        <slot name="label"></slot>
      </label>
      <div class="g-text-field-input flex">
        <div v-if="prepend"
          :class="[
            `g-text-field-prepend bg-grey-lightest border-t border-b border-l
            border-grey-lightest rounded-l`,
            prependClasses]">
            <div class="flex items-center justify-center h-full">
              <slot name="prepend"></slot>
            </div>
        </div>
        <input
          :class="['w-full bg-grey-lightest border-grey-lightest leading-none', inputClasses]"
          :type="type"
          :value="value"
          :placeholder="placeholder"
          :name="name"
          :required="required"
          v-bind="attrs"
          v-validate="validations"
          :data-vv-validate-on="validateOn"
          :ref="inputRef"
          size="1"
          :disabled="disabled"
          @input="input"
          @blur="blur"
          @focus="focus"
        />
        <div v-if="append"
          :class="[`g-text-field-append bg-grey-lightest border-grey-lightest
          border-t border-b border-r rounded-r`, appendClasses]">
          <div class="flex items-center justify-center h-full">
            <slot name="append"></slot>
          </div>
        </div>
      </div>
    </div>
    <div class="relative">
      <div
        v-show="errors.has(name)"
        class="g-text-field-error text-red text-sm absolute">
        {{ errors.first(name) }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GTextField',

  inject: ['$validator'],

  props: {
    type: { type: String, default: 'text' },
    value: { type: [String, Number], default: '' },
    label: { type: String, default: null },
    name: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    required: { type: Boolean, default: false },
    prepend: { type: Boolean, default: false },
    append: { type: Boolean, default: false },
    raised: { type: Boolean, default: false },
    uppercase: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    validations: { type: String, default: '' },
    validateOn: { type: String, default: 'blur' },
    attrs: { type: Object, default: () => ({}) },
    inputRef: { type: String, default: 'input' },
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
        'g-text-field-active': this.active,
        'g-text-field-complete': this.complete,
        'g-text-field-invalid': this.errors.has(this.name),
        'g-text-field-success': this.success,
        'g-text-field-prepended': this.prepend,
        'g-text-field-raised': this.raised,
      };
    },

    inputClasses() {
      return {
        'rounded border': !this.append && !this.prepend,
        'rounded-l': !this.prepend,
        'rounded-r': !this.append,
        'border-t border-b': this.append && this.prepend,
        'border-t border-b border-l': this.append && !this.prepend,
        'border-t border-b border-r': !this.append && this.prepend,
        uppercase: this.uppercase,
      };
    },

    prependClasses() {
      return {
        [`g-text-field-prepend-${this.size}`]: true,
        'g-text-field-prepend-active': this.active,
        'g-text-field-prepend-complete': this.complete,
        'g-text-field-prepend-invalid': this.errors.has(this.name),
        'g-text-field-prepend-success': this.success,
      };
    },

    appendClasses() {
      return {
        [`g-text-field-append-${this.size}`]: true,
        'g-text-field-append-active': this.active,
        'g-text-field-append-complete': this.complete,
        'g-text-field-append-invalid': this.errors.has(this.name),
        'g-text-field-append-success': this.success,
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
      this.$emit('focus');
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

.g-text-field {
  & input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    box-shadow: none;
  }
}

.g-text-field-input-group {
  & label {
    @apply text-grey-darker font-medium;
  }
}

.g-text-field-small {
  @apply text-sm;

  & input {
    @apply text-sm h-8 px-4;
  }
}

.g-text-field-medium {
  @apply text-base;

  & input {
    @apply text-base h-12 px-4;
  }
}

.g-text-field-large {
  @apply text-lg;

  & input {
    @apply text-lg h-16 px-4;
  }
}

.g-text-field-active {
  & input {
    @apply border-grey-light bg-transparent;
  }

  & label {
    @apply text-black;
  }
}

.g-text-field-complete {
  & input {
    @apply bg-grey-lightest border-grey-lightest text-grey-darkest;
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

/* APPEND & PREPEND */
.g-text-field-prepend-small {
  @apply text-sm h-8 pl-4;
}
.g-text-field-prepend-medium {
  @apply text-base h-12 pl-4;
}
.g-text-field-prepend-large {
  @apply text-lg h-16 pl-4;
}

.g-text-field-append-small {
  @apply text-sm h-8 pr-4;
}
.g-text-field-append-medium {
  @apply text-base h-12 pr-4;
}
.g-text-field-append-large {
  @apply text-lg h-16 pr-4;
}

.g-text-field-prepend-active {
  @apply bg-transparent border-grey-light;
}
.g-text-field-append-active {
  @apply bg-transparent border-grey-light;
}

.g-text-field-append-invalid {
  @apply border-red text-red-light bg-transparent;
}
</style>
