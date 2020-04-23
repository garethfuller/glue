<template lang="html">
  <div v-g-click-outside="closeItems">
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
      <div slot="append" class="block cursor-pointer px-4" @click="(!disabled) ? showItems = !showItems : null">
        <g-icon name="fas fa-chevron-down" :class="['chevron text-gray-600', chevronClasses]" />
      </div>
    </g-text-input>
    <div class="relative">
      <transition name="fade-in-up">
        <div v-if="showItems" :ref="name" class="g-select-items rounded shadow-lg bg-white absolute w-full z-50 overflow-y-scroll -mt-6">
          <g-select-item
            v-for="(item, index) in _items"
            :text="textFor(item)"
            :key="index"
            :size="size"
            @click.native="itemSelected(item)"
          />
        </div>
      </transition>
      <div v-if="showItems" class="g-select-spacer w-full absolute" />
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
    items: { type: Array },
    itemText: { type: String, default: 'text' },
    itemValue: { type: String, default: 'value' },
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
      showItems: false
    };
  },

  watch: {
    value(newVal) {
      this.inputValue = newVal;
      this.textInputValue = this.labelFor(newVal)
      this.validate(newVal)
    },

    showItems(newVal) {
      if (newVal) {
        this.adjustScrollPosition()
      } else {
        this.clearIfNotItem()
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
        'chevron-active': this.showItems,
      };
    },

    inputLabel() {
      if (!this.value) return ''
      if (typeof this.items[0] === 'string' || this.items[0] instanceof String) return this.value

      const selectedItem = this.items.find(item => item[this.itemValue] === this.inputValue)
      if (selectedItem) {
        return selectedItem[this.itemText]
      } else {
        return this.value
      }
    },

    _items() {
      if (this.filterable) {
        if (typeof this.items[0] === 'string' || this.items[0] instanceof String) {
          return this.items.filter(text => text.includes(this.value))
        } else {
          const filteredTexts = this.items
            .map(item => item[this.itemText].toLowerCase())
            .filter(text => text.includes(this.textInputValue.toLowerCase()))

          return this.items.filter(item => filteredTexts.includes(item[this.itemText].toLowerCase()))
        }
      } else {
        return this.items
      }
    }
  },

  methods: {
    itemSelected(item) {
      this.$emit('input', this.valueFor(item))
      this.showItems = false
    },

    textFor(item) {
      if (typeof item === 'string' || item instanceof String) return item
      return item[this.itemText];
    },

    labelFor(value) {
      if (!this.value) return ''
      if (typeof this.items[0] === 'string' || this.items[0] instanceof String) return value

      const selectedItem = this.items.find(item => item[this.itemValue] === value)

      if (selectedItem) {
        return selectedItem[this.itemText]
      } else {
        return value
      }
    },

    valueFor(item) {
      if (typeof item === 'string' || item instanceof String) return item;
      return item[this.itemValue];
    },

    closeItems() {
      this.showItems = false;
    },

    focusHandler() {
      this.showItems = true
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

    clearIfNotItem() {
      if (typeof this.items[0] === 'string' || this.items[0] instanceof String) {
        if (!this.items.includes(this.value)) this.value = ''
      } else {
        if(!this.items.map(item => item[this.itemValue]).includes(this.value)) {
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

<style lang="css" scoped>
.g-select-items {
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
</style>
