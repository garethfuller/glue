<template>
  <div v-g-click-outside="closeOptions">
    <g-text-input
      v-model="textInputValue"
      :label="label"
      :name="name"
      :rules="rules"
      validate-on="none"
      :required="required"
      :disabled="disabled"
      :readonly="!filterable"
      :size="size"
      autocomplete="off"
      class="g-select-input"
      @focus="focusHandler"
      append>
      <div slot="append" class="block cursor-pointer px-4" @click="(!disabled) ? showOptions = !showOptions : null">
        <g-icon name="fas fa-chevron-down" :class="['chevron text-gray-600', chevronClasses]" />
      </div>
    </g-text-input>
    <div class="relative">
      <transition name="select-in-up">
        <div v-if="showOptions" :ref="name" class="g-select-options rounded shadow-lg bg-white absolute w-full z-50 overflow-y-scroll -mt-6">
          <g-select-option
            v-for="(option, index) in _options"
            :text="textFor(option)"
            :key="index"
            :size="size"
            @click.native="optionSelected(option)"
          />
        </div>
      </transition>
      <div v-if="showOptions" class="g-select-spacer w-full absolute" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'GSelect',

  props: {
    value: { type: String },
    label: { type: String, default: null },
    name: { type: String, default: '' },
    options: { type: Array },
    optionText: { type: String, default: 'label' },
    optionValue: { type: String, default: 'value' },
    filterable: { type: Boolean, default: false },
    raised: { type: Boolean, default: false },
    horizontal: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    rules: { type: Array },
    validateOn: { type: String, default: 'blur' },
    size: {
      type: String,
      default: 'md',
      validator: value => ['sm', 'md', 'lg'].indexOf(value) !== -1,
    },
  },

  data() {
    return {
      inputValue: '',
      textInputValue: '',
      showOptions: false
    };
  },

  watch: {
    value(newVal) {
      this.inputValue = newVal;
      this.textInputValue = this.labelFor(newVal)
      this.validate(newVal)
    },

    showOptions(newVal) {
      if (newVal) {
        this.adjustScrollPosition()
      } else {
        this.clearIfNotOption()
        this.validate(this.textInputValue)
      }
    }
  },

  created() {
    this.inputValue = this.value;
    this.textInputValue = this.labelFor(this.value)
  },

  computed: {
    chevronClasses() {
      return {
        'chevron-active': this.showOptions,
      };
    },

    inputLabel() {
      if (!this.value) return ''
      if (typeof this.options[0] === 'string' || this.options[0] instanceof String) return this.value

      const selectedOption = this.options.find(option => option[this.optionValue] === this.inputValue)
      if (selectedOption) {
        return selectedOption[this.optionText]
      } else {
        return this.value
      }
    },

    _options() {
      if (this.filterable) {
        if (typeof this.options[0] === 'string' || this.options[0] instanceof String) {
          return this.options.filter(text => text.includes(this.value))
        } else {
          const filteredTexts = this.options
            .map(options => options[this.optionText].toLowerCase())
            .filter(text => text.includes(this.textInputValue.toLowerCase()))

          return this.options.filter(option => filteredTexts.includes(option[this.optionText].toLowerCase()))
        }
      } else {
        return this.options
      }
    }
  },

  methods: {
    optionSelected(option) {
      this.$emit('input', this.valueFor(option))
      this.showOptions = false
    },

    textFor(option) {
      if (typeof option === 'string' || option instanceof String) return option
      return option[this.optionText];
    },

    labelFor(value) {
      if (!this.value) return ''
      if (typeof this.options[0] === 'string' || this.options[0] instanceof String) return value

      const selectedOption = this.options.find(option => option[this.optionValue] === value)

      if (selectedOption) {
        return selectedOption[this.optionText]
      } else {
        return value
      }
    },

    valueFor(option) {
      if (typeof option === 'string' || option instanceof String) return option;
      return option[this.optionValue];
    },

    closeOptions() {
      this.showOptions = false;
    },

    focusHandler() {
      this.showOptions = true
      this.$emit('focus')
    },

    adjustScrollPosition() {
      this.$nextTick().then(() => {
        let el = this.$refs[this.name]
        let bounding = el.getBoundingClientRect()
        if (bounding.bottom > (window.innerHeight || document.documentElement.clientHeight)) {
          let currentScrollPos = document.documentElement.scrollTop
          let overflow = bounding.bottom - Math.min(window.innerHeight, document.documentElement.clientHeight)
          let newPos = currentScrollPos + overflow + 50
          window.scrollTo(0, newPos)
        }
      })
    },

    clearIfNotOption() {
      if (typeof this.options[0] === 'string' || this.options[0] instanceof String) {
        if (!this.options.includes(this.value)) this.value = ''
      } else {
        if(!this.options.map(option => option[this.optionValue]).includes(this.value)) {
          this.inputValue = ''
          this.textInputValue = ''
        }
      }
    },

    validate(val) {
      this.$children.forEach(input => {
        if (typeof input.validate === 'function') {
          input.validate(val)
        }
      })
    }
  }
}
</script>

<style scoped>
.g-select-options {
  max-height: 250px;
}

.g-select-spacer {
  height: 300px;
}

.chevron {
  transition: transform 0.2s ease-in-out;
}

.chevron-active {
  transform: rotateZ(180deg);
}

.g-select-input:hover {
  & .chevron {
    transform: rotateZ(90deg);
  }
}

.select-in-up-enter-active, .select-in-up-leave-active {
  transition: all .3s ease;
}
.select-in-up-enter, .select-in-up-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
