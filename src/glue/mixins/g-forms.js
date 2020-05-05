const GForms = {
  methods: {
    handleServerErrors(serverErrors) {
      Object.keys(serverErrors).forEach(key => {
        this.$refs[key].errors.push(serverErrors[key][0])
      })
    }
  }
}

export default GForms;
