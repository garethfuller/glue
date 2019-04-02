<template lang="html">
  <div v-g-click-outside="closeItems" :class="['g-select', classes]">
    <g-text-field
      v-model="inputLabel"
      :label="label"
      :name="name"
      :attrs="inputAttrs"
      :required="required"
      :validations="validations"
      :validate-on="validateOn"
      :append="true"
      :size="size"
      :class="['g-select-input', inputClasses]"
      @focus="focusHandler">
      <div slot="append" class="cursor-pointer" @click="showItems = !showItems">
        <g-icon
          name="fas fa-chevron-down"
          color="grey"
          :class="['chevron', chevronClasses]"
        />
      </div>
    </g-text-field>
    <div class="relative pb-12">
      <transition name="fade-in-up">
        <div v-if="showItems" class="g-select-items rounded shadow bg-white absolute w-full z-50 h-64 overflow-y-scroll">
          <g-select-item
            v-for="(item, index) in items"
            :text="textFor(item)"
            :key="index"
            :size="size"
            @click.native="itemSelected(item)"
            class=""
          />
        </div>
      </transition>
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
    validateOn: { type: String, default: 'blur' },
    size: {
      type: String,
      default: 'medium',
      validator: value => ['small', 'medium', 'large'].indexOf(value) !== -1,
    },
  },

  data() {
    return {
      inputValue: '',
      showItems: false,
      active: false,
      complete: false,
      success: false,
    };
  },

  watch: {
    value(newVal) {
      this.inputValue = newVal;
    },
  },

  created() {
    this.inputValue = this.value;
  },

  computed: {
    inputAttrs() {
      const attrs = {};
      if (!this.filterable) attrs.readonly = 'readonly';

      return attrs;
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
      if (typeof this.items[0] === 'string' || this.items[0] instanceof String) return this.value;
      return this.items.find(item => item[this.itemValue] === this.inputValue)[this.itemText];
    },
  },

  methods: {
    itemSelected(item) {
      this.$emit('input', this.valueFor(item));
      this.showItems = false;
    },

    textFor(item) {
      if (typeof item === 'string' || item instanceof String) return item;
      return item[this.itemText];
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
  },
};
</script>

<style lang="css" scoped>
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
