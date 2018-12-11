import * as components from './components';

const Glue = {
  install(Vue) {
    Object.keys(components).forEach((component) => {
      Vue.component(components[component].name, components[component]);
    });
  },
};

export default Glue;
