const GUtilities = {
  methods: {
    gSleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },

    gTimeout(ms, promise) {
      const timeout = new Promise((resolve, reject) => {
        const id = setTimeout(() => {
          clearTimeout(id);
          reject();
        }, ms);
      });
      // Return either the provided promise or the timeout, whichever finishes first
      return Promise.race([promise, timeout]);
    },

    gUuid() {
      return Math.random()
        .toString(36)
        .substr(2, 10);
    },

    gPoll(fn, {params=[], timeout=60000, interval=3000}={}) {
      let endTime = Number(new Date()) + (timeout)

      let checkCondition = async (resolve, reject) => {
        let result = await fn(...params)

        if (result) {
          resolve(result)
        } else if (Number(new Date()) < endTime) {
          setTimeout(checkCondition, interval, resolve, reject)
        } else {
          reject(new Error('timed out for ' + fn + ': ' + arguments))
        }
      }

      return new Promise(checkCondition)
    }
  },
};

export default GUtilities;
