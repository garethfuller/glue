<template>
  <div>
    <g-btn
        circle
        :flat="flat"
        :outline="outline"
        :color="color"
        :size="size"
        :subtle="subtle"
        @click.native="copyToClipboard">
        <transition name="switch" mode="out-in">
          <g-icon v-if="copied" key="check" name="fas fa-check-circle" :size="iconSize" :color="iconColor" />
          <g-icon v-else key="copy" name="far fa-clone" :size="iconSize" :color="iconColor"/>
        </transition>
      </g-btn>
    <textarea name="text" ref="contents" class="input -ml-2 absolute" :value="text"></textarea>
  </div>
</template>

<script>
export default {
  name: 'GCopyBtn',

  props: {
    text: { type: String, required: true },
    color: { type: String, default: 'white' },
    flat: { type: Boolean, default: false },
    outline: { type: Boolean, default: false },
    subtle: { type: Boolean, default: false },
    size: {
      type: String,
      default: 'md',
      validator: value => ['sm', 'md', 'lg'].indexOf(value) !== -1,
    },
  },

  data () {
    return {
      copied: false
    }
  },

  computed: {
    iconColor() {
      if (this.color === 'white' && !this.flat) return 'black'
      if (this.flat && this.color === 'black') return 'black'
      if (this.color === 'gray' && (this.flat || this.outline)) return 'gray-600'
      if (this.flat || this.outline) return this.color;
      return 'white';
    },

    iconSize() {
      switch (this.size) {
        case 'sm':
          return 'xs'
        case 'md':
          return 'small'
        case 'lg':
          return 'medium'
        default:
          return 'small'
      }
    }
  },

  methods: {
    copyToClipboard() {
      let textarea = document.createElement('textarea')
      textarea.textContent = this.text
      document.body.appendChild(textarea)
      textarea.select()
    
      document.execCommand('cut')
      document.body.removeChild(textarea)
      
      this.copied = true
      this.gSleep(2000).then(() => {
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
