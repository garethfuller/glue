<template lang="html">
  <div class="g-copy-text-box block border border-grey-lightest rounded flex justify-between">
    <no-ssr>
      <input :value="text" type="text" class="contents px-2 py-1 w-full rounded" ref="contents" readonly/>
    </no-ssr>
    <g-tooltip :text="tooltipText">
      <div
        class="copy-btn px-4 py-1 bg-grey-lightest text-grey-dark flex items-center cursor-pointer"
        @click="copyToClipboard">
        <g-icon name="ion-md-copy" size="large" color="grey" />
        <span class="text-sm ml-2">Copy</span>
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

  data: () => ({
    tooltipText: 'Copy to clipboard',
  }),

  methods: {
    copyToClipboard() {
      this.$refs.contents.select();
      document.execCommand('copy');
      this.tooltipText = 'Copied!';
      this.gSleep(2000).then(res => this.tooltipText = 'Copy to clipboard');
    },
  },
};
</script>

<style lang="css" scoped>
</style>
