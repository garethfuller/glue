<template>
  <div>
    <g-tooltip :text="tooltipText" :width="70">
      <g-btn circle :flat="flat" :outline="outline" :color="color" @click.native="copyToClipboard">
        <transition name="switch" mode="out-in">
          <g-icon v-if="copied" key="check" name="fas fa-check-circle" color="green"/>
          <g-icon v-else key="copy" name="far fa-clone" :color="iconColor"/>
        </transition>
      </g-btn>
    </g-tooltip>
    <textarea name="text" ref="contents" class="input" :value="text"></textarea>
  </div>
</template>

<script>
export default {
  name: 'GCopyBtn',

  props: {
    text: { type: String, required: true },
    color: { type: String, default: 'white' },
    flat: { type: Boolean, default: false },
    outline: { type: Boolean, default: false }
  },

  data () {
    return {
      tooltipText: 'Copy',
      copied: false
    }
  },

  computed: {
    iconColor() {
      if (this.color === 'white' && !this.flat) return 'black'
      if (this.flat && this.color === 'black') return 'black'
      if (this.color === 'grey' && (this.flat || this.outline)) return 'grey-dark'
      if (this.flat || this.outline) return this.color;
      return 'white';
    },
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
    }
  }
}
</script>

<style scoped>
.switch-enter-active, .switch-leave-active {
  transition: all .1s;
}
.switch-enter, .switch-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: scale(0);
}
.input {
  width: 0px;
  height: 0px;
  resize: none;
  border: none;
  outline: none;
}
</style>
