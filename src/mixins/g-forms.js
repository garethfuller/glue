const GForms = {
  methods: {
    errorHandler(err) {
      if (Object.keys(err).length > 0) {
        console.error(err);
        this.serverToVeeErrors(err).forEach(error => this.$validator.errors.add(...error));
      }
    },

    serverToVeeErrors(serverErrors) {
      const veeErrors = Object.keys(serverErrors).map(key => [
        key,
        serverErrors[key][0],
      ]);
      return veeErrors;
    },
  },
};

export default GForms;
