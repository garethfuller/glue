<template lang="html">
  <div class="flex flex-col md:flex-row items-start">
    <div class="flex flex-row md:flex-col w-full md:w-auto">
      <component
        v-for="(tab, i) in tabs"
        :key="i"
        :is="componentFor(tab)"
        v-bind="attrsFor(tab)"
        :class="btnTextClasses(tab)"
        @click="clicked(tab)">
        <div
          class="g-tabs-label flex flex-col md:flex-row items-center pb-6">
          <div class="w-8 text-center mr-0 md:mr-3 mb-1 md:mb-0">
            <g-icon
              v-if="tab.icon"
              :name="tab.icon"
              :color="(tab.isActive) ? color : null"
              size="xl"
              :class="iconClasses(tab)"
            />
          </div>
          <span>{{ tab.name }}</span>
        </div>
      </component>
    </div>
    <div class="tab-panels flex-1 ml-0 md:ml-16">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GVertNav',

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
    this.tabs = this.$children.filter(tab => tab.$options._componentTag == 'g-vert-nav-item')
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
        'w-full cursor-pointer flex flex-col justify-between h-full hover:no-underline text-grey': true,
        [`active text-${this.color}`]: tab.isActive,
        [`active text-grey-dark hover:text-grey-darkest`]: !tab.isActive,
        'text-right': this.right
      }
    },

    iconClasses(tab) {
      return {
        'text-grey-dark': true,
        [`text-${this.color}-dark`]: tab.active
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
