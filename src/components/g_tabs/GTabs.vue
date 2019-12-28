<template lang="html">
  <div class="g-tabs h-full w-full">
    <div class="tab-btns flex flex-col h-full">
      <div :class="['flex h-full', { 'justify-end': right }]">
        <component
          v-for="(tab, i) in tabs"
          :key="i"
          :is="componentFor(tab)"
          v-bind="attrsFor(tab)"
          :class="btnTextClasses(tab)"
          @click="clicked(tab)">
          <div class="h-1"></div>
          <div
            class="g-tabs-label flex flex-col md:flex-row items-center justify-center md:justify-start pr-0 md:pr-12">
            <g-icon
              v-if="tab.icon"
              :name="tab.icon"
              :color="(tab.isActive) ? color : null"
              class="mb-2 md:mb-0 mr-0 md:mr-3"
            />
            <span class="text-xs md:text-base">{{ tab.name }}</span>
          </div>
          <div :class="btnBarClasses(tab)"/>
        </component>
      </div>
    </div>
    <div class="tab-panels">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GTabs',

  props: {
    right: { type: Boolean, default: false },
    color: {
      type: String,
      default: 'blue',
      validator: value => ['blue', 'red', 'green', 'orange', 'white', 'black'].indexOf(value) !== -1,
    }
  },

  data() {
    return {
      tabs: []
    }
  },

  mounted() {
    this.tabs = this.$children.filter(tab => tab.$options._componentTag == 'g-tab')
    this.setDefaultActiveTab()
  },

  computed: {
    activeTab() {
      return this.tabs.find(tab => tab.isActive)
    }
  },

  methods: {
    clicked(tab) {
      this.tabs.forEach(t => t.isActive = (t === tab))
      this.$emit('changed', this.activeTab)
    },

    setDefaultActiveTab() {
      if (!this.activeTab) this.tabs[0].isActive = true
    },

    btnTextClasses(tab) {
      return {
        'w-full cursor-pointer flex flex-col justify-between h-full hover:no-underline': true,
        [`active text-${this.color}-500`]: tab.isActive,
        [`active text-gray-600 hover:text-gray-800`]: !tab.isActive,
        'text-right': this.right
      }
    },

    btnBarClasses(tab) {
      return {
        'w-full h-px': true,
        [`active bg-${this.color}-500`]: tab.isActive
      }
    },

    componentFor(tab) {
      if (tab.to) return 'nuxt-link'
      return 'div'
    },

    attrsFor(tab) {
      let attrs = {}
      if (tab.to) attrs.to = tab.to
      return attrs
    }
  }
}
</script>

<style lang="css" scoped>
.g-tabs-label {
  transition: color .3s ease;
}
</style>
