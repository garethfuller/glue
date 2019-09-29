<template lang="html">
  <div v-g-click-outside="closeItems" :class="['g-select', classes]">
    <g-text-field
      v-model="textInputValue"
      :label="label"
      :name="name"
      :attrs="allAttrs"
      :required="required"
      :validations="validations"
      :validate-on="validateOn"
      :disabled="disabled"
      :size="size"
      :class="['g-select-input', inputClasses]"
      @focus="focusHandler"
      append>
      <div slot="append" class="cursor-pointer" @click="(!disabled) ? showItems = !showItems : null">
        <g-icon
          name="fas fa-chevron-down"
          color="grey"
          :class="['chevron', chevronClasses]"
        />
      </div>
    </g-text-field>
    <div class="relative">
      <transition name="fade-in-up">
        <div v-if="showItems" :ref="name" class="g-select-items rounded shadow bg-white absolute w-full z-50 overflow-y-scroll">
          <g-select-item
            v-for="(item, index) in internalItems"
            :text="textFor(item)"
            :key="index"
            :size="size"
            @click.native="itemSelected(item)"
            class=""
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

  inject: ['$validator'],

  props: {
    value: { type: String },
    label: { type: String, default: null },
    name: { type: String, default: '' },
    items: { type: Array },
    itemText: { type: String },
    itemValue: { type: String },
    filterable: { type: Boolean, default: false },
    raised: { type: Boolean, default: false },
    horizontal: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    validations: { type: String, default: '' },
    validateOn: { type: String, default: 'change' },
    inputAttrs: { type: Object, default: () => ({}) },
    disabled: { type: Boolean, default: false },
    size: {
      type: String,
      default: 'medium',
      validator: value => ['small', 'medium', 'large'].indexOf(value) !== -1,
    },
  },

  data() {
    return {
      inputValue: '',
      textInputValue: '',
      showItems: false,
      active: false,
      complete: false,
      success: false,
    };
  },

  watch: {
    value(newVal) {
      this.inputValue = newVal;
      this.textInputValue = this.labelFor(newVal)
    },

    showItems(newVal) {
      if (newVal) {
        this.adjustScrollPosition()
      } else {
        this.clearIfNotItem()
      }
    }
  },

  created() {
    this.inputValue = this.value;
    this.textInputValue = this.labelFor(this.value)
  },

  computed: {
    allAttrs() {
      const attrs = {}
      attrs.autocomplete = 'off'
      if (!this.filterable) attrs.readonly = 'readonly'
      return Object.assign({}, this.inputAttrs, attrs)
    },

    classes() {
      return {
        [`g-select-${this.size}`]: true,
        'g-select-horizontal': this.horizontal,
        'g-select-active': this.active,
        'g-select-complete': this.complete,
        'g-select-invalid': this.errors.has(this.name),
        'g-select-success': this.success,
        'g-select-raised': this.raised,
      };
    },

    inputClasses() {
      return {};
    },

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

    internalItems() {
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
      if (typeof item === 'string' || item instanceof String) return item;
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
      this.showItems = true;
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
          this.value = ''
          this.textInputValue = ''
          this.textInputValue = ''
          this.$validator.validate(this.name, '')
        }
      }
    }
  },
};
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
