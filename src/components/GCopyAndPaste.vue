<template lang="html">
  <div class="g-copy-text-box block border border-grey-lightest rounded flex justify-between">
    <no-ssr>
      <input :value="text" type="text" class="contents px-2 py-1 w-full rounded" ref="contents" readonly/>
    </no-ssr>
    <g-tooltip :text="tooltipText" :width="70">
      <div
        class="copy-btn w-12 py-1 flex justify-center bg-grey-lightest h-full text-grey-dark flex items-center cursor-pointer"
        @click="copyToClipboard">
        <g-icon name="ion-md-copy" size="large" color="grey" />
        <span class="text-sm ml-1">
          <transition name="switch" mode="out-in">
            <g-icon v-if="copied" key="check" name="fas fa-check-circle" color="green"/>
            <g-icon v-else key="copy" name="fas fa-copy" color="grey"/>
          </transition>
        </span>
      </div>
    </g-tooltip>
  </div>
</template>

<script>
export default {
  name: 'GCopyAndPaste',

  props: {
    text: { type: String, required: true },
  },

  data() {
    return {
      tooltipText: 'Copy',
      copied: false
    }
  },

  methods: {
    copyToClipboard() {
      this.$refs.contents.select();
      document.execCommand('copy');
      this.tooltipText = 'Copied!';
      this.copied = true
      this.gSleep(2000).then(() => {
        this.tooltipText = 'Copy'
        this.copied = false
      })
    },
  },
};
</script>

<style lang="css" scoped>
.switch-enter-active, .switch-leave-active {
  transition: all .1s;
}
.switch-enter, .switch-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: scale(0);
}
</style>
