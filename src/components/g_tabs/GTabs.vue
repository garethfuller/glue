<template lang="html">
  <div class="g-tabs h-full">
    <div class="tab-btns flex flex-col h-full">
      <div :class="['flex h-full', { 'justify-center': center, 'justify-end': right }]">
        <div
          v-for="(tab, i) in tabs"
          :key="i"
          :class="btnTextClasses(tab)"
          @click="clicked(tab)">
          <div></div>
          <div class="flex px-6">
            <g-icon
              v-if="tab.icon"
              :name="tab.icon"
              :color="(tab.isActive) ? color : null"
              :class="[{ 'mr-2': !center, 'mb-2': center }]"
            />
            {{ tab.name }}
          </div>
          <div :class="btnBarClasses(tab)"/>
        </div>
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
    center: { type: Boolean, default: false },
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
    console.log(this)
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
        'w-full cursor-pointer flex flex-col justify-between h-full': true,
        [`active text-${this.color}`]: tab.isActive,
        [`active text-grey-dark hover:text-grey-darkest`]: !tab.isActive,
        'text-center flex-col': this.center,
        'text-right': this.right
      }
    },

    btnBarClasses(tab) {
      return {
        'w-full h-1 rounded': true,
        [`active bg-${this.color}`]: tab.isActive
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
