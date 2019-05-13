<template>
  <div :class="`g-alert bg-white shadow-lg rounded border-l-4 border-${color}`">
    <div class="relative">
      <div class="absolute pin-r mr-1 mt-1">
        <g-btn flat circle @click.native="$emit('close')" size="small" color="grey">
          <g-icon name="fas fa-times" size="small" color="grey-dark"></g-icon>
        </g-btn>
      </div>
    </div>

    <div class="flex items-center">
      <div v-if="icon" class="px-6">
        <g-icon :name="icon" :color="color" size="2xl" />
      </div>
      <div :class="['content py-6 pr-4', { 'pl-4': !icon }]">
        <h3 class="headline mb-1">
          <slot name="title">
            {{ title }}
          </slot>
        </h3>
        <div class="text-grey-darker">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GAlert',

  props: {
    title: { type: String },
    color: { type: String, default: 'blue' },
    icon: { type: String }
  },

  data () {
    return {

    }
  }
}
</script>

<style scoped>
</style>
