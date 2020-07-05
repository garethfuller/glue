export default {
  methods: {
    gSleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    }
  }
}
