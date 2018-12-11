import * as components from './components';

const Glue = {
  install(Vue) {
    Object.keys(components).forEach((component) => {
      Vue.component(components[component].name, components[component]);
    });
  },
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Glue);
}

export default Glue;
