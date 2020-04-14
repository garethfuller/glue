<template>
  <div id="app" class="p-24">
    <g-btn @click="show = true" color="blue">Open</g-btn>
    <g-dialog :show="show" @close="show = false">
      <g-card>
        <g-card-content class="h-64">

        </g-card-content>
      </g-card>
    </g-dialog>
  </div>
</template>

<script>
import { required } from './lib/validations'

export default {
  name: 'app',

  data() {
    return {
      show: false
    }
  }
}
</script>

<style>
</style>
