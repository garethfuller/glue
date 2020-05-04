<template>
  <div class="flex flex-col">
    <div class="p-4">
      <h1 class="font-black text-2xl mb-0 leading-none">
        Glue
        <span class="font-normal text-xs text-gray-700">for Vue</span>
      </h1>
    </div>

    <div class="p-4">
      <g-vert-nav bg-color="gray-100">
        <g-vert-nav-item tag="router-link" to="/" icon="fas fa-home" :active="isActive('/')">
          Gettings started
        </g-vert-nav-item>

        <h4 class="text-gray-600 mt-4 text-lg">Components</h4>
        <g-vert-nav-item
          v-for="(route, i) in compRoutes"
          :key="i"
          tag="router-link"
          :to="route.path"
          :active="isActive(route.path)">
          g-{{ route.component.name }}
        </g-vert-nav-item>
      </g-vert-nav>
    </div>

  </div>
</template>

<script>
export default {
  name: 'AppSidebar',

  data: () => ({
    compRoutes: []
  }),

  beforeMount() {
    this.compRoutes = this.$router.options.routes.filter(r => r.path.includes('/components'))
  },

  methods: {
    isActive(path) {
      return this.$route.path === path
    }
  }
}
</script>

<style scoped>
</style>
