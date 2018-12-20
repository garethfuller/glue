const GForms = {
  methods: {
    errorHandler(err) {
      if (Object.keys(err).length > 0) {
        this.serverToVeeErrors(err).forEach((error) => {
          this.errors.add({
            field: error[0],
            msg: error[1],
          });
        });
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
