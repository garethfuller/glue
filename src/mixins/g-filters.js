const GFilters = {
  filters: {
    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },

    upcase(str) {
      return str.toUpperCase();
    },

    titleize(str) {
      return str.replace(
        /\w\S*/g,
        txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
      );
    },
  },
};

export default GFilters;
