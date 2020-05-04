<template>
  <div>
    <g-layout-sidebar>
      <app-sidebar slot="sidebar" />
      <template slot="content">
        <router-view />
      </template>
    </g-layout-sidebar>
  </div>
</template>

<script>
import AppSidebar from './components/navs/AppSidebar.vue'

export default {
  name: 'app',

  components: {
    AppSidebar
  }
}
</script>

<style>
</style>
