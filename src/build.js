import * as components from './components';
import * as mixins from './mixins';
import * as directives from './directives';
import './assets/css/main.css';

const Glue = {
  install(Vue) {
    Object.keys(components).forEach((component) => {
      Vue.component(components[component].name, components[component]);
    });

    Object.keys(mixins).forEach((mixin) => {
      Vue.mixin(mixins[mixin]);
    });

    Object.keys(directives).forEach((directive) => {
      Vue.directive(directives[directive].name, directives[directive].directive);
    });
  },
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Glue);
}

export default Glue;