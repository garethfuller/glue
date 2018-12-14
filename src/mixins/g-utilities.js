const GUtilities = {
  methods: {
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },

    timeout(ms, promise) {
      const timeout = new Promise((resolve, reject) => {
        const id = setTimeout(() => {
          clearTimeout(id);
          reject();
        }, ms);
      });
      // Return either the provided promise or the timeout, whichever finishes first
      return Promise.race([promise, timeout]);
    },

    uuid() {
      return Math.random()
        .toString(36)
        .substr(2, 10);
    },
  },
};

export default GUtilities;
