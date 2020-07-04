//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script = {
  name: 'GBtn',
  props: {
    tag: {
      type: String,
      default: 'button'
    },
    color: {
      type: String,
      default: 'primary'
    },
    size: {
      type: String,
      default: 'md',
      validator: value => ['sm', 'md', 'lg'].indexOf(value) !== -1
    },
    outline: {
      type: Boolean,
      default: false
    },
    flat: {
      type: Boolean,
      default: false
    },
    circle: {
      type: Boolean,
      default: false
    },
    block: {
      type: Boolean,
      default: false
    },
    rounded: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String
    }
  },
  computed: {
    listeners() {
      return { ...this.$listeners
      };
    },

    classes() {
      return [this.defaultClasses, this.sizeClasses, this.shapeClasses, this.bgClasses, this.textColorClasses, this.borderClasses, this.shadowClasses, this.displayClasses, this.opacityClasses, this.cursorClasses];
    },

    defaultClasses() {
      return `
        font-medium inline-block leading-snug
        ${this.disabled ? 'g-btn-disabled' : ''}
        ${!this.outline && !this.flat ? 'g-btn-dynamic' : ''}`;
    },

    sizeClasses() {
      if (this.circle) {
        switch (this.size) {
          case 'lg':
            return 'w-12 h-12 text-2xl';

          case 'sm':
            return 'w-6 h-6 text-xs';

          default:
            return 'w-8 h-8 text-base';
        }
      } else {
        switch (this.size) {
          case 'lg':
            return 'h-12 px-6 text-xl';

          case 'sm':
            return 'h-6 px-2 text-xs';

          default:
            return 'h-12 px-5 text-base';
        }
      }
    },

    shapeClasses() {
      if (this.rounded || this.circle) return 'rounded-full';
      return 'rounded';
    },

    bgClasses() {
      if (this.isBaseColor) {
        if (this.flat) return `bg-${this.color} bg-opacity-25`;
        return `bg-${this.color}`;
      }

      if (this.flat) return `bg-${this.color}-100 hover:bg-${this.color}-200 active:bg-${this.color}-300`;
      if (this.outline) return `bg-transparent hover:bg-${this.color}-100 active:bg-${this.color}-200`;
      return `bg-${this.color}-500`;
    },

    textColorClasses() {
      if (this.isBaseColor) {
        if (this.flat) return `text-${this.color}`;
        return this.color === 'white' ? 'text-gray-900' : 'text-white';
      }

      if (this.color === 'white' && !this.flat) return this.textColor || 'text-gray-900';
      if (this.color === 'gray' && (this.flat || this.outline)) return 'text-gray-600';
      if (this.flat || this.outline) return `text-${this.color}-500`;
      return 'text-white';
    },

    borderClasses() {
      if (this.flat) return 'border border-transparent';
      if (this.isBaseColor) return `border border-${this.color}`;
      return `border border-${this.color}-500`;
    },

    shadowClasses() {
      if (this.outline || this.flat) return '';
      if (this.disabled) return 'shadow-none hover:shadow-none';
      return 'shadow hover:shadow-md';
    },

    displayClasses() {
      if (this.block) return 'block w-full';
      return 'inline-block';
    },

    opacityClasses() {
      if (this.disabled) return 'opacity-50';
      return '';
    },

    cursorClasses() {
      if (this.disabled) return 'cursor-not-allowed';
      return 'cursor-pointer';
    },

    iconSize() {
      switch (this.size) {
        case 'sm':
          return 'xs';

        case 'md':
          return 'sm';

        case 'lg':
          return 'base';

        default:
          return 'sm';
      }
    },

    loadingColor() {
      if (this.color === 'white' && !this.flat) return this.textColor || 'gray-900';
      if (this.flat && this.color === 'black') return 'gray-900';
      if (this.color === 'gray' && (this.flat || this.outline)) return 'gray-600';
      if (this.flat || this.outline) return `${this.color}-500`;
      return 'white';
    },

    isBaseColor() {
      return ['black', 'white'].includes(this.color);
    }

  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c(_vm.tag, _vm._g(_vm._b({
    tag: "component",
    class: ['g-btn'].concat(_vm.classes),
    attrs: {
      "disabled": _vm.disabled
    }
  }, 'component', _vm.$attrs, false), _vm.listeners), [_c('div', {
    staticClass: "flex justify-center items-center w-full h-full"
  }, [_c('div', {
    staticClass: "absolute"
  }, [_vm.loading ? _c('g-loading-icon', {
    key: "loader",
    staticClass: "absolute",
    attrs: {
      "size": _vm.size,
      "color": _vm.loadingColor
    }
  }) : _vm._e()], 1), _vm._v(" "), _c('div', {
    class: [{
      'invisible': _vm.loading
    }]
  }, [_vm.icon ? _c('g-icon', {
    key: "icon",
    class: [_vm.textColorClasses, {
      'mr-2': !_vm.circle
    }],
    attrs: {
      "name": _vm.icon
    }
  }) : _vm._e(), _vm._v(" "), _vm._t("default")], 2)])]);
};

var __vue_staticRenderFns__ = [];
/* style */

const __vue_inject_styles__ = function (inject) {
  if (!inject) return;
  inject("data-v-5ae7e1fa_0", {
    source: ".g-btn[data-v-5ae7e1fa]{transition:all .2s ease;-webkit-transition:all .2s ease;-moz-transition:all .2s ease;-o-transition:all .2s ease;-ms-transition:all .2s ease;text-decoration:none!important}.g-btn[data-v-5ae7e1fa]:active,.g-btn[data-v-5ae7e1fa]:focus{outline:0}.g-btn-dynamic[data-v-5ae7e1fa]:hover{transform:translateY(-1px)}.g-btn-dynamic[data-v-5ae7e1fa]:active{transform:translateY(.5px);@apply shadow-none;}.g-btn-disabled[data-v-5ae7e1fa]:hover{transform:translateY(0)}.g-btn-disabled[data-v-5ae7e1fa]:active{transform:translateY(0)}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__ = "data-v-5ae7e1fa";
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$1 = {
  name: 'GTextInput',
  props: {
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: [String, Number],
      default: ''
    },
    label: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: 'input'
    },
    required: {
      type: Boolean,
      default: false
    },
    prepend: {
      type: Boolean,
      default: false
    },
    append: {
      type: Boolean,
      default: false
    },
    raised: {
      type: Boolean,
      default: false
    },
    uppercase: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    rules: {
      type: Array
    },
    validateOn: {
      type: String,
      default: 'blur'
    },
    noMargin: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: 'gray-300'
    },
    size: {
      type: String,
      default: 'md',
      validator: value => ['sm', 'md', 'lg'].indexOf(value) !== -1
    }
  },

  data() {
    return {
      focussed: false,
      errors: []
    };
  },

  computed: {
    listeners() {
      let vm = this;
      return { ...this.$listeners,
        input: event => {
          vm.$emit('input', event.target.value);
          if (this.validateOn === 'input') vm.validate(event.target.value);
        },
        focus: event => {
          vm.$emit('focus');
          vm.focussed = true;
        },
        blur: event => {
          vm.$emit('blur');
          vm.focussed = false;
          if (this.validateOn === 'blur') vm.validate(event.target.value);
        }
      };
    },

    hasError() {
      return this.errors.length > 0;
    },

    classes() {
      return [];
    },

    inputClasses() {
      return [this.bgClasses, this.shapeClasses, this.sizeClasses, this.inputBorderClasses, this.textColorClasses, this.textClasses, this.cursorClasses, this.shadowClasses, this.textSize];
    },

    labelClasses() {
      return [this.textSize];
    },

    prependClasses() {
      const borderClasses = 'border-t border-b border-l';
      let borderColor = `border-gray-200 focus:border-${this.color}`;
      if (this.raised) borderColor = 'border-white';
      if (this.hasError) borderColor = 'border-red-500';
      return [borderClasses, borderColor, this.bgClasses, this.shadowClasses, this.textSize];
    },

    appendClasses() {
      const borderClasses = 'border-t border-b border-r';
      let borderColor = `border-gray-200 focus:border-${this.color}`;
      if (this.raised) borderColor = 'border-white';
      if (this.hasError) borderColor = 'border-red-500';
      return [borderClasses, borderColor, this.bgClasses, this.shadowClasses, this.textSize];
    },

    bgClasses() {
      if (this.hasError) return 'bg-red-100';
      if (this.focussed && !this.raised) return 'bg-gray-100';
      if (this.raised) return 'bg-white';
      return 'bg-gray-200';
    },

    inputBorderClasses() {
      if (this.hasError) {
        if (this.prepend && this.append) return 'border-t border-b border-red-500';
        if (this.prepend) return 'border-t border-b border-r border-red-500';
        if (this.append) return 'border-t border-b border-l border-red-500';
        return 'border border-red-500';
      }

      if (this.raised) return 'border border-white';
      if (this.prepend && this.append) return `border-t border-b border-gray-200 focus:border-${this.color}`;
      if (this.prepend) return `border-t border-b border-r border-gray-200 focus:border-${this.color}`;
      if (this.append) return `border-t border-b border-l border-gray-200 focus:border-${this.color}`;
      return `border border-gray-200 focus:border-${this.color}`;
    },

    shapeClasses() {
      if (this.prepend && this.append) return '';
      if (this.prepend) return 'rounded-r';
      if (this.append) return 'rounded-l';
      return 'rounded';
    },

    textColorClasses() {
      if (this.disabled) return 'text-gray-600';
      if (this.hasError) return 'text-red-500';
      return 'text-gray-700';
    },

    textClasses() {
      if (this.uppercase) return 'uppercase';
      return '';
    },

    cursorClasses() {
      if (this.disabled) return 'cursor-not-allowed';
      return '';
    },

    shadowClasses() {
      if (this.raised) return 'shadow';
      return '';
    },

    textSize() {
      switch (this.size) {
        case 'lg':
          return 'text-lg';

        case 'sm':
          return 'text-sm';

        default:
          return 'text-base';
      }
    },

    sizeClasses() {
      switch (this.size) {
        case 'lg':
          return 'h-16 px-4';

        case 'sm':
          return 'h-8 px-4';

        default:
          return 'h-12 px-4';
      }
    }

  },
  methods: {
    validate(val) {
      this.errors = [];
      if (this.rules && this.rules.length > 0) this.rules.forEach(rule => {
        let result = rule(val);
        if (typeof result === 'string') this.errors.push(result);
      });
    }

  }
};

/* script */
const __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: ['g-text-field'].concat(_vm.classes, [{
      'mb-6': !_vm.noMargin
    }])
  }, [_c('div', {
    staticClass: "g-text-field-input-group"
  }, [_vm.label ? _c('label', {
    class: _vm.labelClasses,
    attrs: {
      "for": _vm.name
    }
  }, [_vm._v(_vm._s(_vm.label) + "\n      "), _vm.required ? _c('span', [_vm._v("*")]) : _vm._e()]) : _c('label', {
    class: _vm.labelClasses,
    attrs: {
      "for": _vm.name
    }
  }, [_vm._t("label")], 2), _vm._v(" "), _c('div', {
    staticClass: "g-text-field-input flex"
  }, [_vm.prepend ? _c('div', {
    class: ["prepend rounded-l"].concat(_vm.prependClasses)
  }, [_c('div', {
    staticClass: "flex items-center justify-center h-full"
  }, [_vm._t("prepend")], 2)]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "flex-1"
  }, [_c('input', _vm._g(_vm._b({
    class: ['w-full leading-none'].concat(_vm.inputClasses),
    attrs: {
      "type": _vm.type,
      "name": _vm.name,
      "disabled": _vm.disabled
    },
    domProps: {
      "value": _vm.value
    }
  }, 'input', _vm.$attrs, false), _vm.listeners))]), _vm._v(" "), _vm.append ? _c('div', {
    class: ["append rounded-r"].concat(_vm.appendClasses)
  }, [_c('div', {
    staticClass: "flex items-center justify-center h-full"
  }, [_vm._t("append")], 2)]) : _vm._e()])]), _vm._v(" "), _c('div', {
    class: ['relative'].concat(_vm.labelClasses)
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.hasError,
      expression: "hasError"
    }],
    staticClass: "g-text-field-error text-red-500 text-sm absolute"
  }, [_vm._v("\n      " + _vm._s(_vm.errors[0]) + "\n    ")])])]);
};

var __vue_staticRenderFns__$1 = [];
/* style */

const __vue_inject_styles__$1 = function (inject) {
  if (!inject) return;
  inject("data-v-8baed86c_0", {
    source: ".append[data-v-8baed86c],.prepend[data-v-8baed86c],input[data-v-8baed86c]{transition:all .3s ease;-webkit-appearance:none;-moz-appearance:none;appearance:none}input[data-v-8baed86c]:focus{outline:0}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$1 = "data-v-8baed86c";
/* module identifier */

const __vue_module_identifier__$1 = undefined;
/* functional template */

const __vue_is_functional_template__$1 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$1 = normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, createInjector, undefined, undefined);

//
//
//
//
//
//
//
//
//
//
//
var script$2 = {
  name: 'GCard',
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes() {
      return {};
    }

  }
};

/* script */
const __vue_script__$2 = script$2;
/* template */

var __vue_render__$2 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: ['g-card rounded shadow bg-white', _vm.classes]
  }, [_vm.loading ? _c('div', {
    staticClass: "h-24 flex items-center justify-center"
  }, [_c('g-loading-icon')], 1) : [_vm._t("default")]], 2);
};

var __vue_staticRenderFns__$2 = [];
/* style */

const __vue_inject_styles__$2 = undefined;
/* scoped */

const __vue_scope_id__$2 = undefined;
/* module identifier */

const __vue_module_identifier__$2 = undefined;
/* functional template */

const __vue_is_functional_template__$2 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$2 = normalizeComponent({
  render: __vue_render__$2,
  staticRenderFns: __vue_staticRenderFns__$2
}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, undefined, undefined, undefined);

//
//
//
//
//
//
var script$3 = {
  name: 'GCardActions',
  props: {
    left: {
      type: Boolean,
      default: false
    },
    flat: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes() {
      return {
        'justify-end': !this.left,
        'p-4': !this.flat,
        'p-2': this.flat
      };
    }

  }
};

/* script */
const __vue_script__$3 = script$3;
/* template */

var __vue_render__$3 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: ['g-card-actions flex', _vm.classes]
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$3 = [];
/* style */

const __vue_inject_styles__$3 = undefined;
/* scoped */

const __vue_scope_id__$3 = undefined;
/* module identifier */

const __vue_module_identifier__$3 = undefined;
/* functional template */

const __vue_is_functional_template__$3 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$3 = normalizeComponent({
  render: __vue_render__$3,
  staticRenderFns: __vue_staticRenderFns__$3
}, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, false, undefined, undefined, undefined);

//
//
//
//
//
//
var script$4 = {
  name: 'GCardContent'
};

/* script */
const __vue_script__$4 = script$4;
/* template */

var __vue_render__$4 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "g-card-content px-4 py-2"
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$4 = [];
/* style */

const __vue_inject_styles__$4 = undefined;
/* scoped */

const __vue_scope_id__$4 = undefined;
/* module identifier */

const __vue_module_identifier__$4 = undefined;
/* functional template */

const __vue_is_functional_template__$4 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$4 = normalizeComponent({
  render: __vue_render__$4,
  staticRenderFns: __vue_staticRenderFns__$4
}, __vue_inject_styles__$4, __vue_script__$4, __vue_scope_id__$4, __vue_is_functional_template__$4, __vue_module_identifier__$4, false, undefined, undefined, undefined);

//
//
//
//
//
//
//
//
var script$5 = {
  name: 'GCardTitle',
  props: {
    center: {
      type: Boolean,
      default: false
    },
    headingClass: {
      type: String,
      default: 'headline'
    }
  },
  computed: {
    classes() {
      return {
        'justify-center': this.center,
        'justify-between': !this.center
      };
    }

  }
};

/* script */
const __vue_script__$5 = script$5;
/* template */

var __vue_render__$5 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "g-card-title p-4"
  }, [_c('h3', {
    class: ['m-0 flex items-center w-full', _vm.classes, _vm.headingClass]
  }, [_vm._t("default")], 2)]);
};

var __vue_staticRenderFns__$5 = [];
/* style */

const __vue_inject_styles__$5 = undefined;
/* scoped */

const __vue_scope_id__$5 = undefined;
/* module identifier */

const __vue_module_identifier__$5 = undefined;
/* functional template */

const __vue_is_functional_template__$5 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$5 = normalizeComponent({
  render: __vue_render__$5,
  staticRenderFns: __vue_staticRenderFns__$5
}, __vue_inject_styles__$5, __vue_script__$5, __vue_scope_id__$5, __vue_is_functional_template__$5, __vue_module_identifier__$5, false, undefined, undefined, undefined);

//
//
//
//
//
//
//
var script$6 = {
  name: 'GLoadingIcon',
  props: {
    color: {
      type: String
    },
    size: {
      type: String,
      default: 'md',
      validator: value => ['sm', 'md', 'lg'].indexOf(value) !== -1
    }
  },
  computed: {
    sizeClasses() {
      switch (this.size) {
        case 'lg':
          return 'w-12 h-12';

        case 'sm':
          return 'w-4 h-4';

        default:
          return 'w-6 h-6';
      }
    }

  }
};

/* script */
const __vue_script__$6 = script$6;
/* template */

var __vue_render__$6 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: ['spinner', _vm.sizeClasses]
  }, [_c('div', {
    class: "double-bounce1 bg-" + _vm.color
  }), _vm._v(" "), _c('div', {
    class: "double-bounce2 bg-" + _vm.color
  })]);
};

var __vue_staticRenderFns__$6 = [];
/* style */

const __vue_inject_styles__$6 = function (inject) {
  if (!inject) return;
  inject("data-v-4d36211d_0", {
    source: ".spinner[data-v-4d36211d]{position:relative}.double-bounce1[data-v-4d36211d],.double-bounce2[data-v-4d36211d]{width:100%;height:100%;border-radius:50%;opacity:.6;position:absolute;top:0;left:0;-webkit-animation:sk-bounce-data-v-4d36211d 2s infinite ease-in-out;animation:sk-bounce-data-v-4d36211d 2s infinite ease-in-out}.double-bounce2[data-v-4d36211d]{-webkit-animation-delay:-1s;animation-delay:-1s}@-webkit-keyframes sk-bounce-data-v-4d36211d{0%,100%{-webkit-transform:scale(0)}50%{-webkit-transform:scale(1)}}@keyframes sk-bounce-data-v-4d36211d{0%,100%{transform:scale(0);-webkit-transform:scale(0)}50%{transform:scale(1);-webkit-transform:scale(1)}}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$6 = "data-v-4d36211d";
/* module identifier */

const __vue_module_identifier__$6 = undefined;
/* functional template */

const __vue_is_functional_template__$6 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$6 = normalizeComponent({
  render: __vue_render__$6,
  staticRenderFns: __vue_staticRenderFns__$6
}, __vue_inject_styles__$6, __vue_script__$6, __vue_scope_id__$6, __vue_is_functional_template__$6, __vue_module_identifier__$6, false, createInjector, undefined, undefined);

//
//
//
//
//
//
//
//
var script$7 = {
  name: 'GChip',
  props: {
    textColor: {
      type: String,
      default: 'white'
    },
    color: {
      type: String,
      default: 'gray'
    },
    size: {
      type: String,
      default: 'md',
      validator: value => ['sm', 'md', 'lg'].indexOf(value) !== -1
    },
    outline: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    listeners() {
      return { ...this.$listeners
      };
    },

    classes() {
      return [this.sizeClasses, this.colorClasses, this.textClasses];
    },

    sizeClasses() {
      switch (this.size) {
        case 'sm':
          return 'px-2 h-6 text-xs';

        case 'lg':
          return 'px-4 h-10 text-base';

        default:
          return 'px-3 h-8 text-sm';
      }
    },

    colorClasses() {
      if (this.outline) return `bg-${this.color}-100 border border-${this.color}-500`;
      if (this.color === 'gray') return `bg-${this.color}-200`;
      return `bg-${this.color}-500 border border-${this.color}-500`;
    },

    textClasses() {
      if (this.color === 'gray' && !this.outline) return 'text-gray-700';
      if (this.outline) return `text-${this.color}-500`;
      return `text-white`;
    }

  }
};

/* script */
const __vue_script__$7 = script$7;
/* template */

var __vue_render__$7 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', _vm._g({
    class: ['inline-block whitespace-no-wrap rounded-full'].concat(_vm.classes)
  }, _vm.listeners), [_c('div', {
    staticClass: "flex items-center leading-none h-full"
  }, [_vm._t("default")], 2)]);
};

var __vue_staticRenderFns__$7 = [];
/* style */

const __vue_inject_styles__$7 = undefined;
/* scoped */

const __vue_scope_id__$7 = undefined;
/* module identifier */

const __vue_module_identifier__$7 = undefined;
/* functional template */

const __vue_is_functional_template__$7 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$7 = normalizeComponent({
  render: __vue_render__$7,
  staticRenderFns: __vue_staticRenderFns__$7
}, __vue_inject_styles__$7, __vue_script__$7, __vue_scope_id__$7, __vue_is_functional_template__$7, __vue_module_identifier__$7, false, undefined, undefined, undefined);

//
//
//
//
//
var script$8 = {
  name: 'GDot',
  props: {
    color: {
      type: String,
      default: 'green'
    },
    radius: {
      type: Number,
      default: 5
    }
  },
  computed: {
    classes() {
      return {
        [`bg-${this.color}-500`]: true
      };
    },

    styles() {
      return {
        width: `${this.radius * 2}px`,
        height: `${this.radius * 2}px`,
        borderRadius: `${this.radius}px`
      };
    }

  }
};

/* script */
const __vue_script__$8 = script$8;
/* template */

var __vue_render__$8 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: ['inline-block', _vm.classes],
    style: _vm.styles
  });
};

var __vue_staticRenderFns__$8 = [];
/* style */

const __vue_inject_styles__$8 = undefined;
/* scoped */

const __vue_scope_id__$8 = "data-v-139feb89";
/* module identifier */

const __vue_module_identifier__$8 = undefined;
/* functional template */

const __vue_is_functional_template__$8 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$8 = normalizeComponent({
  render: __vue_render__$8,
  staticRenderFns: __vue_staticRenderFns__$8
}, __vue_inject_styles__$8, __vue_script__$8, __vue_scope_id__$8, __vue_is_functional_template__$8, __vue_module_identifier__$8, false, undefined, undefined, undefined);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$9 = {
  name: 'GCopyAndPaste',
  props: {
    text: {
      type: String,
      required: true
    },
    inputBg: {
      type: String,
      default: 'bg-white'
    }
  },

  data() {
    return {
      tooltipText: 'Copy',
      copied: false
    };
  },

  methods: {
    copyToClipboard() {
      this.$refs.contents.select();
      document.execCommand('copy');
      this.tooltipText = 'Copied!';
      this.copied = true;
      this.gSleep(2000).then(() => {
        this.tooltipText = 'Copy';
        this.copied = false;
      });
    }

  }
};

/* script */
const __vue_script__$9 = script$9;
/* template */

var __vue_render__$9 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "g-copy-text-box block border border-gray-300 rounded flex justify-between"
  }, [_c('client-only', {
    staticClass: "w-full"
  }, [_c('input', {
    ref: "contents",
    class: ['contents px-2 py-1 w-full rounded', _vm.inputBg],
    attrs: {
      "type": "text",
      "readonly": ""
    },
    domProps: {
      "value": _vm.text
    }
  })]), _vm._v(" "), _c('g-tooltip', {
    attrs: {
      "text": _vm.tooltipText,
      "width": 70
    }
  }, [_c('div', {
    staticClass: "copy-btn w-12 py-1 flex justify-center bg-gray-300 border-t border-l border-b border-gray-300 h-full text-gray-600 flex items-center cursor-pointer",
    on: {
      "click": _vm.copyToClipboard
    }
  }, [_c('g-icon', {
    attrs: {
      "name": "ion-md-copy",
      "size": "large",
      "color": "gray"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "text-sm ml-1"
  }, [_c('transition', {
    attrs: {
      "name": "switch",
      "mode": "out-in"
    }
  }, [_vm.copied ? _c('g-icon', {
    key: "check",
    attrs: {
      "name": "fas fa-check-circle",
      "color": "green"
    }
  }) : _c('g-icon', {
    key: "copy",
    attrs: {
      "name": "fas fa-copy",
      "color": "gray"
    }
  })], 1)], 1)], 1)])], 1);
};

var __vue_staticRenderFns__$9 = [];
/* style */

const __vue_inject_styles__$9 = function (inject) {
  if (!inject) return;
  inject("data-v-8d859488_0", {
    source: ".switch-enter-active[data-v-8d859488],.switch-leave-active[data-v-8d859488]{transition:all .1s}.switch-enter[data-v-8d859488],.switch-leave-to[data-v-8d859488]{opacity:0;transform:scale(0)}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$9 = "data-v-8d859488";
/* module identifier */

const __vue_module_identifier__$9 = undefined;
/* functional template */

const __vue_is_functional_template__$9 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$9 = normalizeComponent({
  render: __vue_render__$9,
  staticRenderFns: __vue_staticRenderFns__$9
}, __vue_inject_styles__$9, __vue_script__$9, __vue_scope_id__$9, __vue_is_functional_template__$9, __vue_module_identifier__$9, false, createInjector, undefined, undefined);

//
//
//
//
//
//
//
//
//
var script$a = {
  name: 'GTooltip',
  props: {
    text: {
      type: String
    },
    width: {
      type: Number,
      default: 100
    }
  },
  computed: {
    textStyles() {
      return {
        minWidth: `${this.width}px`,
        marginLeft: `-${this.width / 2}px`
      };
    }

  }
};

/* script */
const __vue_script__$a = script$a;
/* template */

var __vue_render__$a = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "g-tooltip relative inline-block leading-none"
  }, [_vm._t("default"), _vm._v(" "), _c('span', {
    staticClass: "g-tooltip-text text-xs flex items-center justify-center",
    style: _vm.textStyles
  }, [_vm._t("text", [_vm._v(_vm._s(_vm.text))])], 2)], 2);
};

var __vue_staticRenderFns__$a = [];
/* style */

const __vue_inject_styles__$a = function (inject) {
  if (!inject) return;
  inject("data-v-56501742_0", {
    source: ".g-tooltip-text[data-v-56501742]{visibility:hidden;@apply bg-gray-900 text-white text-center rounded px-2 py-2;position:absolute;z-index:1;bottom:125%;left:50%;opacity:0;transition:opacity .5s}.g-tooltip .g-tooltip-text[data-v-56501742]::after{content:\"\";position:absolute;top:100%;left:50%;margin-left:-5px;border-width:5px;border-style:solid;border-color:theme('colors.black.5') transparent transparent transparent}.g-tooltip:hover .g-tooltip-text[data-v-56501742]{visibility:visible;opacity:1}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$a = "data-v-56501742";
/* module identifier */

const __vue_module_identifier__$a = undefined;
/* functional template */

const __vue_is_functional_template__$a = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$a = normalizeComponent({
  render: __vue_render__$a,
  staticRenderFns: __vue_staticRenderFns__$a
}, __vue_inject_styles__$a, __vue_script__$a, __vue_scope_id__$a, __vue_is_functional_template__$a, __vue_module_identifier__$a, false, createInjector, undefined, undefined);

//
//
//
//
//
//
//
var script$b = {
  name: 'GIcon',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    listeners() {
      return { ...this.$listeners
      };
    }

  }
};

/* script */
const __vue_script__$b = script$b;
/* template */

var __vue_render__$b = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('i', _vm._g(_vm._b({
    class: "icon " + _vm.name
  }, 'i', _vm.$attrs, false), _vm.listeners));
};

var __vue_staticRenderFns__$b = [];
/* style */

const __vue_inject_styles__$b = undefined;
/* scoped */

const __vue_scope_id__$b = undefined;
/* module identifier */

const __vue_module_identifier__$b = undefined;
/* functional template */

const __vue_is_functional_template__$b = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$b = normalizeComponent({
  render: __vue_render__$b,
  staticRenderFns: __vue_staticRenderFns__$b
}, __vue_inject_styles__$b, __vue_script__$b, __vue_scope_id__$b, __vue_is_functional_template__$b, __vue_module_identifier__$b, false, undefined, undefined, undefined);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$c = {
  name: 'GDialog',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    maxWidth: {
      type: [String, Number],
      default: 500
    },
    escClose: {
      type: Boolean,
      default: true
    },
    closeBtn: {
      type: Boolean,
      default: true
    },
    fullPage: {
      type: Boolean,
      default: false
    },
    navbar: {
      type: Boolean,
      default: false
    },
    borderColor: {
      type: String,
      default: 'white'
    },
    title: {
      type: String,
      default: 'Title'
    }
  },
  data: () => ({
    showContent: false
  }),
  watch: {
    show() {
      this.gSleep(1).then(res => this.showContent = this.show);
    }

  },

  mounted() {
    document.addEventListener('keydown', e => {
      if (this.escClose && e.keyCode == 27) {
        this.closeDialog();
      }
    });
  },

  computed: {
    contentClasses() {
      return {};
    },

    contentStyles() {
      return {
        maxWidth: this.maxWidthStr
      };
    },

    maxWidthStr() {
      if (Number.isInteger(this.maxWidth)) return `${this.maxWidth}px`;
      return this.maxWidth;
    }

  },
  methods: {
    closeDialog() {
      this.$emit('close');
    }

  }
};

/* script */
const __vue_script__$c = script$c;
/* template */

var __vue_render__$c = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "inline"
  }, [_vm.fullPage ? [_c('transition', {
    attrs: {
      "name": "g-fullpage-dialog"
    }
  }, [_vm.show ? _c('div', {
    class: ["g-dialog-fullpage fixed top-0 left-0 w-full h-full bg-white shadow border-t-4 border-" + _vm.borderColor]
  }, [_vm.navbar ? _c('div', {
    staticClass: "w-full"
  }, [_c('div', {
    staticClass: "container mx-auto flex flex-wrap justify-between items-center h-20 px-mobile"
  }, [_c('div', [_vm._t("title", [_c('h2', {
    staticClass: "heading-m"
  }, [_vm._v("\n                  " + _vm._s(_vm.title) + "\n                ")])])], 2), _vm._v(" "), _c('div', [_vm._t("navCenter")], 2), _vm._v(" "), _vm.closeBtn ? _c('div', [_c('g-btn', {
    attrs: {
      "flat": "",
      "circle": "",
      "color": "gray",
      "size": "sm"
    },
    nativeOn: {
      "click": function ($event) {
        return _vm.closeDialog($event);
      }
    }
  }, [_c('g-icon', {
    staticClass: "text-3xl",
    attrs: {
      "name": "fas fa-times"
    }
  })], 1)], 1) : _vm._e()])]) : _vm._e(), _vm._v(" "), _vm._t("default")], 2) : _vm._e()])] : [_vm.show ? _c('div', {
    staticClass: "g-dialog flex justify-center items-center",
    on: {
      "click": function ($event) {
        return _vm.$emit('close');
      }
    }
  }, [_c('transition', {
    attrs: {
      "name": "g-dialog"
    }
  }, [_vm.showContent ? _c('div', {
    directives: [{
      name: "g-click-outside",
      rawName: "v-g-click-outside",
      value: _vm.closeDialog,
      expression: "closeDialog"
    }],
    class: ['g-dialog-content w-full px-2 sm:px-0 relative', _vm.contentClasses],
    style: _vm.contentStyles,
    on: {
      "click": function ($event) {
        $event.stopPropagation();
      }
    }
  }, [_vm.closeBtn ? _c('div', {
    staticClass: "g-dialog-close-btn"
  }, [_c('g-btn', {
    attrs: {
      "flat": "",
      "circle": "",
      "size": "sm",
      "color": "gray"
    },
    nativeOn: {
      "click": function ($event) {
        return _vm.closeDialog($event);
      }
    }
  }, [_c('g-icon', {
    attrs: {
      "name": "fas fa-times"
    }
  })], 1)], 1) : _vm._e(), _vm._v(" "), _vm._t("default")], 2) : _vm._e()])], 1) : _vm._e()]], 2);
};

var __vue_staticRenderFns__$c = [];
/* style */

const __vue_inject_styles__$c = function (inject) {
  if (!inject) return;
  inject("data-v-43b54ffc_0", {
    source: ".g-dialog[data-v-43b54ffc]{position:fixed;z-index:9999;left:0;top:0;width:100%;height:100%;overflow:auto;background-color:#000;background-color:rgba(0,0,0,.4)}.g-dialog-content[data-v-43b54ffc]{max-height:90vh;overflow:scroll}.g-dialog-close-btn[data-v-43b54ffc]{position:absolute;right:5px;top:5px}.g-dialog-enter-active[data-v-43b54ffc]{animation:zoom-in-data-v-43b54ffc .3s}.g-dialog-leave-active[data-v-43b54ffc]{animation:zoom-in-data-v-43b54ffc .3s reverse}@keyframes zoom-in-data-v-43b54ffc{0%{opacity:0;transform:scale(0)}100%{opacity:1;transform:scale(1)}}.g-dialog-fullpage[data-v-43b54ffc]{z-index:99999;overflow-y:scroll}.g-fullpage-dialog-enter-active[data-v-43b54ffc]{animation:g-fullpage-dialog-data-v-43b54ffc .5s ease}.g-fullpage-dialog-leave-active[data-v-43b54ffc]{animation:g-fullpage-dialog-data-v-43b54ffc .5s reverse ease}@keyframes g-fullpage-dialog-data-v-43b54ffc{0%{margin-top:100%;height:300%}100%{margin-top:0;height:100%}}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$c = "data-v-43b54ffc";
/* module identifier */

const __vue_module_identifier__$c = undefined;
/* functional template */

const __vue_is_functional_template__$c = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$c = normalizeComponent({
  render: __vue_render__$c,
  staticRenderFns: __vue_staticRenderFns__$c
}, __vue_inject_styles__$c, __vue_script__$c, __vue_scope_id__$c, __vue_is_functional_template__$c, __vue_module_identifier__$c, false, createInjector, undefined, undefined);

//
//
//
//
//
//
//
//
//
var script$d = {
  name: 'GForm',
  props: {
    action: {
      type: String,
      default: ''
    },
    method: {
      type: String,
      default: 'post'
    }
  },

  data() {
    return {
      errors: []
    };
  },

  methods: {
    validate() {
      this.errors = [];
      this.recursiveValidate(this.$children);
      if (this.errors.length > 0) return false;
      return true;
    },

    recursiveValidate(children) {
      children.forEach(child => {
        this.validateInput(child);
        if (child.$children.length > 0) this.recursiveValidate(child.$children);
      });
    },

    validateInput(input) {
      if (typeof input.validate === 'function') {
        if (['g-checkbox', 'g-switch'].includes(input.$options._componentTag)) {
          input.validate(input.$props.checked);
          this.handleInputErrors(input.$data.errors); // } else if (['g-select-input'].includes(input.$options._componentTag)) {
          //   console.log(input);
        } else {
          input.validate(input.$props.value);
          this.handleInputErrors(input.$data.errors);
        }
      }
    },

    handleInputErrors(errors) {
      if (errors && errors.length > 0) {
        this.errors.push(...errors);
      }
    }

  }
};

/* script */
const __vue_script__$d = script$d;
/* template */

var __vue_render__$d = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('form', {
    staticClass: "g-form",
    attrs: {
      "action": _vm.action,
      "method": _vm.method
    },
    on: {
      "submit": function ($event) {
        $event.preventDefault();
        return _vm.$emit('submit');
      }
    }
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$d = [];
/* style */

const __vue_inject_styles__$d = undefined;
/* scoped */

const __vue_scope_id__$d = "data-v-402be848";
/* module identifier */

const __vue_module_identifier__$d = undefined;
/* functional template */

const __vue_is_functional_template__$d = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$d = normalizeComponent({
  render: __vue_render__$d,
  staticRenderFns: __vue_staticRenderFns__$d
}, __vue_inject_styles__$d, __vue_script__$d, __vue_scope_id__$d, __vue_is_functional_template__$d, __vue_module_identifier__$d, false, undefined, undefined, undefined);

//
//
//
//
//
//
//
//
var script$e = {
  name: 'GGrid',
  props: {
    spacing: {
      type: String,
      default: '4'
    },
    vSpacing: {
      type: String,
      default: '4'
    },
    noWrap: {
      type: Boolean,
      default: false
    }
  },

  mounted() {
    this.$children.forEach(item => {
      item.spacing = this.spacing;
      item.vSpacing = this.vSpacing;
    });
  }

};

/* script */
const __vue_script__$e = script$e;
/* template */

var __vue_render__$e = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: "px-" + _vm.spacing / 2
  }, [_c('div', {
    class: ["flex -mx-" + this.spacing, {
      'flex-wrap': !_vm.noWrap
    }]
  }, [_vm._t("default")], 2)]);
};

var __vue_staticRenderFns__$e = [];
/* style */

const __vue_inject_styles__$e = undefined;
/* scoped */

const __vue_scope_id__$e = "data-v-32d9715c";
/* module identifier */

const __vue_module_identifier__$e = undefined;
/* functional template */

const __vue_is_functional_template__$e = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$e = normalizeComponent({
  render: __vue_render__$e,
  staticRenderFns: __vue_staticRenderFns__$e
}, __vue_inject_styles__$e, __vue_script__$e, __vue_scope_id__$e, __vue_is_functional_template__$e, __vue_module_identifier__$e, false, undefined, undefined, undefined);

//
//
//
//
//
//
var script$f = {
  name: 'GGridItem',
  props: {
    width: {
      type: String,
      default: '1/2'
    }
  },

  data() {
    return {
      spacing: '4',
      vSpacing: '4'
    };
  }

};

/* script */
const __vue_script__$f = script$f;
/* template */

var __vue_render__$f = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: ["px-" + this.spacing / 2 + " pb-" + this.vSpacing + " w-" + this.width]
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$f = [];
/* style */

const __vue_inject_styles__$f = undefined;
/* scoped */

const __vue_scope_id__$f = "data-v-ced57d98";
/* module identifier */

const __vue_module_identifier__$f = undefined;
/* functional template */

const __vue_is_functional_template__$f = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$f = normalizeComponent({
  render: __vue_render__$f,
  staticRenderFns: __vue_staticRenderFns__$f
}, __vue_inject_styles__$f, __vue_script__$f, __vue_scope_id__$f, __vue_is_functional_template__$f, __vue_module_identifier__$f, false, undefined, undefined, undefined);

//
//
//
//
//
//
var script$g = {
  name: 'GMenu'
};

/* script */
const __vue_script__$g = script$g;
/* template */

var __vue_render__$g = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "g-menu py-2"
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$g = [];
/* style */

const __vue_inject_styles__$g = undefined;
/* scoped */

const __vue_scope_id__$g = "data-v-19c45c8c";
/* module identifier */

const __vue_module_identifier__$g = undefined;
/* functional template */

const __vue_is_functional_template__$g = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$g = normalizeComponent({
  render: __vue_render__$g,
  staticRenderFns: __vue_staticRenderFns__$g
}, __vue_inject_styles__$g, __vue_script__$g, __vue_scope_id__$g, __vue_is_functional_template__$g, __vue_module_identifier__$g, false, undefined, undefined, undefined);

//
//
//
//
//
//
//
//
//
//
//
var script$h = {
  name: 'GMenuItem',
  props: {
    to: {
      type: String
    },
    href: {
      type: String
    },
    icon: {
      type: String
    }
  },
  computed: {
    tag() {
      if (this.to) return 'nuxt-link';
      if (this.href) return 'a';
      return 'div';
    },

    attrs() {
      const attrs = {};
      if (this.to) attrs.to = this.to;
      if (this.href) attrs.href = this.href;
      return attrs;
    }

  }
};

/* script */
const __vue_script__$h = script$h;
/* template */

var __vue_render__$h = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c(_vm.tag, _vm._b({
    tag: "component",
    staticClass: "g-menu-item cursor-pointer px-6 py-4"
  }, 'component', _vm.attrs, false), [_c('div', {
    staticClass: "g-menu-item-container flex items-center"
  }, [_vm.icon ? _c('div', {
    staticClass: "icon w-8"
  }, [_c('g-icon', {
    attrs: {
      "name": _vm.icon,
      "size": "large",
      "color": "gray-600"
    }
  })], 1) : _vm._e(), _vm._v(" "), _vm._t("default")], 2)]);
};

var __vue_staticRenderFns__$h = [];
/* style */

const __vue_inject_styles__$h = function (inject) {
  if (!inject) return;
  inject("data-v-bfcd2edc_0", {
    source: ".g-menu-item[data-v-bfcd2edc]{transition:background .3s ease;@apply text-gray-600 no-underline block;}.g-menu-item[data-v-bfcd2edc]:hover{@apply bg-gray-100 text-gray-800;}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$h = "data-v-bfcd2edc";
/* module identifier */

const __vue_module_identifier__$h = undefined;
/* functional template */

const __vue_is_functional_template__$h = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$h = normalizeComponent({
  render: __vue_render__$h,
  staticRenderFns: __vue_staticRenderFns__$h
}, __vue_inject_styles__$h, __vue_script__$h, __vue_scope_id__$h, __vue_is_functional_template__$h, __vue_module_identifier__$h, false, createInjector, undefined, undefined);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$i = {
  name: 'GPopover',
  props: {
    width: {
      type: Number,
      default: 200
    },
    height: {
      type: Number,
      default: 0
    },
    onHover: {
      type: Boolean,
      default: false
    },
    top: {
      type: Boolean,
      default: false
    },
    bottom: {
      type: Boolean,
      default: false
    },
    left: {
      type: Boolean,
      default: false
    },
    right: {
      type: Boolean,
      default: false
    },
    rightAligned: {
      type: Boolean,
      default: false
    },
    leftAligned: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      popoverXPosition: 0,
      popoverYPosition: 0,
      showPopover: false,
      isOverContent: false,
      isOverActivator: false,
      timer: null
    };
  },

  mounted() {
    const activatorPosition = this.$refs.activator.getBoundingClientRect();

    if (this.right) {
      this.popoverXPosition = 0;
    } else if (this.left) {
      this.popoverXPosition = this.width;
    } else if (this.leftAligned) {
      this.popoverXPosition = 0;
    } else if (this.rightAligned) {
      this.popoverXPosition = this.width - activatorPosition.width;
    } else {
      this.popoverXPosition = this.width / 2 - activatorPosition.width / 2;
    }

    if (this.top && this.height !== 0) {
      this.popoverYPosition = this.height + 5;
    } else if (this.bottom) {
      this.popoverYPosition = activatorPosition.height;
    }
  },

  computed: {
    position() {
      if (this.top) {
        if (this.left) return 'top-left';
        if (this.right) return 'top-right';
        return 'top';
      } else {
        if (this.left) return 'bottom-left';
        if (this.right) return 'bottom-right';
        return 'bottom';
      }
    },

    contentClasses() {
      return {
        [`g-popover-contents-${this.position}`]: true
      };
    },

    contentStyles() {
      return {
        width: `${this.width}px`,
        height: this.height === 0 ? 'auto' : `${this.height}px`,
        ...this.contentPostiton
      };
    },

    contentPostiton() {
      if (this.top) {
        return {
          left: `-${this.popoverXPosition}px`,
          top: `-${this.popoverYPosition}px`
        };
      } else {
        return {
          left: `-${this.popoverXPosition}px`,
          top: `${this.popoverYPosition}px`
        };
      }
    }

  },
  methods: {
    closePopover() {
      this.showPopover = false;
    },

    handleMouseover() {
      if (this.onHover) {
        let vm = this;
        this.timer = setTimeout(() => {
          vm.showPopover = true;
        }, 200);
      }
    },

    handleMouseout() {
      if (this.onHover) {
        let vm = this;
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          if (!vm.isOverContent && !vm.isOverActivator) {
            vm.showPopover = false;
          }
        }, 200);
      }
    }

  }
};

/* script */
const __vue_script__$i = script$i;
/* template */

var __vue_render__$i = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    directives: [{
      name: "g-click-outside",
      rawName: "v-g-click-outside",
      value: _vm.closePopover,
      expression: "closePopover"
    }],
    staticClass: "g-popover relative inline-block",
    on: {
      "mouseover": _vm.handleMouseover,
      "mouseout": _vm.handleMouseout
    }
  }, [_c('div', {
    ref: "activator",
    staticClass: "activator inline-block",
    on: {
      "click": function ($event) {
        _vm.showPopover = !_vm.showPopover;
      },
      "mouseover": function ($event) {
        _vm.isOverActivator = true;
      },
      "mouseout": function ($event) {
        _vm.isOverActivator = false;
      }
    }
  }, [_vm._t("activator")], 2), _vm._v(" "), _c('transition', {
    attrs: {
      "name": "popover-bottom"
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.showPopover,
      expression: "showPopover"
    }],
    ref: "contents",
    class: ['g-popover-contents bg-white absolute shadow-lg rounded mt-1', _vm.contentClasses],
    style: _vm.contentStyles,
    on: {
      "mouseover": function ($event) {
        _vm.isOverContent = true;
      },
      "mouseout": function ($event) {
        _vm.isOverContent = false;
      }
    }
  }, [_vm._t("default")], 2)])], 1);
};

var __vue_staticRenderFns__$i = [];
/* style */

const __vue_inject_styles__$i = function (inject) {
  if (!inject) return;
  inject("data-v-e62a523e_0", {
    source: ".g-popover[data-v-e62a523e]{z-index:999}.popover-bottom-enter-active[data-v-e62a523e]{transform-origin:top center;animation:popover-in-data-v-e62a523e .25s;animation-timing-function:ease-in-out}.popover-bottom-leave-active[data-v-e62a523e]{transform-origin:top center;animation:popover-in-data-v-e62a523e .25s reverse;animation-timing-function:ease-in-out}@keyframes popover-in-data-v-e62a523e{0%{opacity:0;transform:skewX(3deg) translateY(3px)}100%{opacity:1;transform:skewX(0) translateY(0)}}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$i = "data-v-e62a523e";
/* module identifier */

const __vue_module_identifier__$i = undefined;
/* functional template */

const __vue_is_functional_template__$i = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$i = normalizeComponent({
  render: __vue_render__$i,
  staticRenderFns: __vue_staticRenderFns__$i
}, __vue_inject_styles__$i, __vue_script__$i, __vue_scope_id__$i, __vue_is_functional_template__$i, __vue_module_identifier__$i, false, createInjector, undefined, undefined);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$j = {
  name: 'GSnackbar',
  props: {
    snackbar: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      visible: false
    };
  },

  created() {
    const self = this;

    if (!this.snackbar.persistent) {
      this.gSleep(5000).then(res => self.$emit('closed', self.snackbar));
    }
  },

  mounted() {
    this.visible = true;
  },

  computed: {
    color() {
      switch (this.snackbar.type) {
        case 'default':
          return 'blue';

        case 'error':
          return 'red';

        case 'warning':
          return 'orange';

        case 'success':
          return 'green';

        default:
          return 'blue';
      }
    },

    persistent() {
      return !!this.snackbar.persistent;
    }

  },
  methods: {
    handleClose() {
      this.$emit('closed', this.snackbar);
    }

  }
};

/* script */
const __vue_script__$j = script$j;
/* template */

var __vue_render__$j = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_c('transition', {
    attrs: {
      "name": "bounce",
      "enter-active-class": "bounceInDown",
      "leave-active-class": "bounceOutUp"
    }
  }, [_vm.visible ? _c('g-alert', {
    staticClass: "mb-2",
    attrs: {
      "title": _vm.snackbar.title,
      "icon": _vm.snackbar.icon,
      "color": _vm.color
    },
    on: {
      "close": _vm.handleClose
    }
  }, [_c('div', {
    domProps: {
      "innerHTML": _vm._s(_vm.snackbar.description)
    }
  })]) : _vm._e()], 1)], 1);
};

var __vue_staticRenderFns__$j = [];
/* style */

const __vue_inject_styles__$j = undefined;
/* scoped */

const __vue_scope_id__$j = "data-v-628ea780";
/* module identifier */

const __vue_module_identifier__$j = undefined;
/* functional template */

const __vue_is_functional_template__$j = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$j = normalizeComponent({
  render: __vue_render__$j,
  staticRenderFns: __vue_staticRenderFns__$j
}, __vue_inject_styles__$j, __vue_script__$j, __vue_scope_id__$j, __vue_is_functional_template__$j, __vue_module_identifier__$j, false, undefined, undefined, undefined);

//
//
//
//
//
//
//
//
//
//
//
//
//
var script$k = {
  name: 'GSnackbarList',
  props: {
    snackbars: {
      type: Array
    }
  },
  methods: {
    closeHandler(snackbar) {
      this.$emit('closed', snackbar);
    }

  }
};

/* script */
const __vue_script__$k = script$k;
/* template */

var __vue_render__$k = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "g-snackbar-list px-2 pt-2 sm:px-0"
  }, [_c('div', {
    staticClass: "g-snackbar-list-container"
  }, _vm._l(_vm.snackbars, function (snackbar, index) {
    return _c('g-snackbar', {
      key: index,
      attrs: {
        "snackbar": snackbar
      },
      on: {
        "closed": _vm.closeHandler
      }
    });
  }), 1)]);
};

var __vue_staticRenderFns__$k = [];
/* style */

const __vue_inject_styles__$k = function (inject) {
  if (!inject) return;
  inject("data-v-69b4ea48_0", {
    source: ".g-snackbar-list[data-v-69b4ea48]{z-index:99999!important;display:flex;justify-content:center;position:fixed;top:0;left:0;width:400px;max-width:100%}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$k = "data-v-69b4ea48";
/* module identifier */

const __vue_module_identifier__$k = undefined;
/* functional template */

const __vue_is_functional_template__$k = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$k = normalizeComponent({
  render: __vue_render__$k,
  staticRenderFns: __vue_staticRenderFns__$k
}, __vue_inject_styles__$k, __vue_script__$k, __vue_scope_id__$k, __vue_is_functional_template__$k, __vue_module_identifier__$k, false, createInjector, undefined, undefined);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$l = {
  name: 'GSelect',
  props: {
    value: {
      type: String
    },
    label: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: ''
    },
    options: {
      type: Array
    },
    optionText: {
      type: String,
      default: 'label'
    },
    optionValue: {
      type: String,
      default: 'value'
    },
    filterable: {
      type: Boolean,
      default: false
    },
    raised: {
      type: Boolean,
      default: false
    },
    horizontal: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    rules: {
      type: Array
    },
    validateOn: {
      type: String,
      default: 'blur'
    },
    size: {
      type: String,
      default: 'md',
      validator: value => ['sm', 'md', 'lg'].indexOf(value) !== -1
    }
  },

  data() {
    return {
      inputValue: '',
      textInputValue: '',
      showOptions: false
    };
  },

  watch: {
    value(newVal) {
      this.inputValue = newVal;
      this.textInputValue = this.labelFor(newVal);
      this.validate(newVal);
    },

    showOptions(newVal) {
      if (newVal) {
        this.adjustScrollPosition();
      } else {
        this.clearIfNotOption();
        this.validate(this.textInputValue);
      }
    }

  },

  created() {
    this.inputValue = this.value;
    this.textInputValue = this.labelFor(this.value);
  },

  computed: {
    chevronClasses() {
      return {
        'chevron-active': this.showOptions
      };
    },

    inputLabel() {
      if (!this.value) return '';
      if (typeof this.options[0] === 'string' || this.options[0] instanceof String) return this.value;
      const selectedOption = this.options.find(option => option[this.optionValue] === this.inputValue);

      if (selectedOption) {
        return selectedOption[this.optionText];
      } else {
        return this.value;
      }
    },

    _options() {
      if (this.filterable) {
        if (typeof this.options[0] === 'string' || this.options[0] instanceof String) {
          return this.options.filter(text => text.includes(this.value));
        } else {
          const filteredTexts = this.options.map(options => options[this.optionText].toLowerCase()).filter(text => text.includes(this.textInputValue.toLowerCase()));
          return this.options.filter(option => filteredTexts.includes(option[this.optionText].toLowerCase()));
        }
      } else {
        return this.options;
      }
    }

  },
  methods: {
    optionSelected(option) {
      this.$emit('input', this.valueFor(option));
      this.showOptions = false;
    },

    textFor(option) {
      if (typeof option === 'string' || option instanceof String) return option;
      return option[this.optionText];
    },

    labelFor(value) {
      if (!this.value) return '';
      if (typeof this.options[0] === 'string' || this.options[0] instanceof String) return value;
      const selectedOption = this.options.find(option => option[this.optionValue] === value);

      if (selectedOption) {
        return selectedOption[this.optionText];
      } else {
        return value;
      }
    },

    valueFor(option) {
      if (typeof option === 'string' || option instanceof String) return option;
      return option[this.optionValue];
    },

    closeOptions() {
      this.showOptions = false;
    },

    focusHandler() {
      this.showOptions = true;
      this.$emit('focus');
    },

    adjustScrollPosition() {
      this.$nextTick().then(() => {
        let el = this.$refs[this.name];
        let bounding = el.getBoundingClientRect();

        if (bounding.bottom > (window.innerHeight || document.documentElement.clientHeight)) {
          let currentScrollPos = document.documentElement.scrollTop;
          let overflow = bounding.bottom - Math.min(window.innerHeight, document.documentElement.clientHeight);
          let newPos = currentScrollPos + overflow + 50;
          window.scrollTo(0, newPos);
        }
      });
    },

    clearIfNotOption() {
      if (typeof this.options[0] === 'string' || this.options[0] instanceof String) {
        if (!this.options.includes(this.value)) this.value = '';
      } else {
        if (!this.options.map(option => option[this.optionValue]).includes(this.value)) {
          this.inputValue = '';
          this.textInputValue = '';
        }
      }
    },

    validate(val) {
      this.$children.forEach(input => {
        if (typeof input.validate === 'function') {
          input.validate(val);
        }
      });
    }

  }
};

/* script */
const __vue_script__$l = script$l;
/* template */

var __vue_render__$l = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    directives: [{
      name: "g-click-outside",
      rawName: "v-g-click-outside",
      value: _vm.closeOptions,
      expression: "closeOptions"
    }]
  }, [_c('g-text-input', {
    staticClass: "g-select-input",
    attrs: {
      "label": _vm.label,
      "name": _vm.name,
      "rules": _vm.rules,
      "validate-on": "none",
      "required": _vm.required,
      "disabled": _vm.disabled,
      "readonly": !_vm.filterable,
      "size": _vm.size,
      "autocomplete": "off",
      "append": ""
    },
    on: {
      "focus": _vm.focusHandler
    },
    model: {
      value: _vm.textInputValue,
      callback: function ($$v) {
        _vm.textInputValue = $$v;
      },
      expression: "textInputValue"
    }
  }, [_c('div', {
    staticClass: "block cursor-pointer px-4",
    attrs: {
      "slot": "append"
    },
    on: {
      "click": function ($event) {
        !_vm.disabled ? _vm.showOptions = !_vm.showOptions : null;
      }
    },
    slot: "append"
  }, [_c('g-icon', {
    class: ['chevron text-gray-600', _vm.chevronClasses],
    attrs: {
      "name": "fas fa-chevron-down"
    }
  })], 1)]), _vm._v(" "), _c('div', {
    staticClass: "relative"
  }, [_c('transition', {
    attrs: {
      "name": "select-in-up"
    }
  }, [_vm.showOptions ? _c('div', {
    ref: _vm.name,
    staticClass: "g-select-options rounded shadow-lg bg-white absolute w-full z-50 overflow-y-scroll -mt-6"
  }, _vm._l(_vm._options, function (option, index) {
    return _c('g-select-option', {
      key: index,
      attrs: {
        "text": _vm.textFor(option),
        "size": _vm.size
      },
      nativeOn: {
        "click": function ($event) {
          return _vm.optionSelected(option);
        }
      }
    });
  }), 1) : _vm._e()]), _vm._v(" "), _vm.showOptions ? _c('div', {
    staticClass: "g-select-spacer w-full absolute"
  }) : _vm._e()], 1)], 1);
};

var __vue_staticRenderFns__$l = [];
/* style */

const __vue_inject_styles__$l = function (inject) {
  if (!inject) return;
  inject("data-v-3da4b9ac_0", {
    source: ".g-select-options[data-v-3da4b9ac]{max-height:250px}.g-select-spacer[data-v-3da4b9ac]{height:300px}.chevron[data-v-3da4b9ac]{transition:transform .2s ease-in-out}.chevron-active[data-v-3da4b9ac]{transform:rotateZ(180deg)}.select-in-up-leave-active[data-v-3da4b9ac]{transition:all .3s ease}.select-in-up-enter[data-v-3da4b9ac],.select-in-up-leave-to[data-v-3da4b9ac]{opacity:0;transform:translateY(-10px)}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$l = "data-v-3da4b9ac";
/* module identifier */

const __vue_module_identifier__$l = undefined;
/* functional template */

const __vue_is_functional_template__$l = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$l = normalizeComponent({
  render: __vue_render__$l,
  staticRenderFns: __vue_staticRenderFns__$l
}, __vue_inject_styles__$l, __vue_script__$l, __vue_scope_id__$l, __vue_is_functional_template__$l, __vue_module_identifier__$l, false, createInjector, undefined, undefined);

//
//
//
//
//
//
//
//
//
//
//
var script$m = {
  name: 'GSelectOption',
  props: {
    icon: {
      type: String
    },
    text: {
      type: String
    },
    size: {
      type: String
    }
  },
  computed: {
    classes() {
      return [this.sizeClasses];
    },

    sizeClasses() {
      switch (this.size) {
        case 'large':
          return 'text-lg py-4 px-4';

        case 'small':
          return 'text-sm py-2 px-4';

        default:
          return 'text-base py-3 px-4';
      }
    }

  }
};

/* script */
const __vue_script__$m = script$m;
/* template */

var __vue_render__$m = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: ['g-select-option text-gray-900 no-underline block cursor-pointer hover:bg-gray-100', _vm.classes]
  }, [_c('div', {
    staticClass: "flex items-center"
  }, [_vm.icon ? _c('div', {
    staticClass: "w-8"
  }, [_c('g-icon', {
    staticClass: "text-lg",
    attrs: {
      "name": _vm.icon
    }
  })], 1) : _vm._e(), _vm._v(" "), _vm._t("default", [_vm._v(_vm._s(_vm.text))])], 2)]);
};

var __vue_staticRenderFns__$m = [];
/* style */

const __vue_inject_styles__$m = function (inject) {
  if (!inject) return;
  inject("data-v-5dd2240d_0", {
    source: ".g-select-option[data-v-5dd2240d]{transition:background .4s ease}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$m = "data-v-5dd2240d";
/* module identifier */

const __vue_module_identifier__$m = undefined;
/* functional template */

const __vue_is_functional_template__$m = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$m = normalizeComponent({
  render: __vue_render__$m,
  staticRenderFns: __vue_staticRenderFns__$m
}, __vue_inject_styles__$m, __vue_script__$m, __vue_scope_id__$m, __vue_is_functional_template__$m, __vue_module_identifier__$m, false, createInjector, undefined, undefined);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$n = {
  name: 'GSwitch',
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    name: {
      type: String
    },
    round: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: 'primary'
    },
    checked: {
      type: Boolean,
      default: false
    },
    rules: {
      type: Array
    },
    validateOn: {
      type: String,
      default: 'change'
    },
    noMargin: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'md',
      validator: value => ['sm', 'md', 'lg'].indexOf(value) !== -1
    }
  },

  data() {
    return {
      errors: []
    };
  },

  computed: {
    listeners() {
      let vm = this;
      return { ...this.$listeners,
        change: event => {
          vm.$emit('change', event.target.checked);
          if (this.validateOn === 'change') vm.validate(event.target.checked);
        }
      };
    },

    hasError() {
      return this.errors.length > 0;
    }

  },
  methods: {
    validate(val) {
      this.errors = [];
      if (this.rules && this.rules.length > 0) this.rules.forEach(rule => {
        let result = rule(val);
        if (typeof result === 'string') this.errors.push(result);
      });
    }

  }
};

/* script */
const __vue_script__$n = script$n;
/* template */

var __vue_render__$n = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: {
      'mb-6': !_vm.noMargin
    }
  }, [_c('label', {
    class: "g-switch g-switch-" + _vm.size
  }, [_c('input', _vm._g(_vm._b({
    attrs: {
      "type": "checkbox",
      "name": _vm.name
    },
    domProps: {
      "checked": _vm.checked
    }
  }, 'input', _vm.$attrs, false), _vm.listeners)), _vm._v(" "), _c('span', {
    class: ["slider slider-" + _vm.color + " slider-" + _vm.size, {
      round: _vm.round
    }]
  })]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.hasError,
      expression: "hasError"
    }],
    staticClass: "g-text-field-error text-red-500 text-sm absolute mt-1"
  }, [_vm._v("\n    " + _vm._s(_vm.errors[0]) + "\n  ")])]);
};

var __vue_staticRenderFns__$n = [];
/* style */

const __vue_inject_styles__$n = function (inject) {
  if (!inject) return;
  inject("data-v-35f8e4f9_0", {
    source: ".g-switch[data-v-35f8e4f9]{position:relative;display:inline-block}.g-switch input[data-v-35f8e4f9]{opacity:0;width:0;height:0}.slider[data-v-35f8e4f9]{@apply bg-gray-300;position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;-webkit-transition:.4s;transition:.4s}.slider[data-v-35f8e4f9]:before{@apply bg-white;position:absolute;content:\"\";-webkit-transition:.4s;transition:.4s}.slider.round[data-v-35f8e4f9]:before{border-radius:50%}input:checked+.slider-blue[data-v-35f8e4f9]{@apply bg-blue-500;}input:focus+.slider-blue[data-v-35f8e4f9]{box-shadow:0 0 1px theme('colors.blue-500')}input:checked+.slider-red[data-v-35f8e4f9]{@apply bg-red-500;}input:focus+.slider-red[data-v-35f8e4f9]{box-shadow:0 0 1px theme('colors.red-500')}input:checked+.slider-green[data-v-35f8e4f9]{@apply bg-green-500;}input:focus+.slider-green[data-v-35f8e4f9]{box-shadow:0 0 1px theme('colors.green-500')}input:checked+.slider-orange[data-v-35f8e4f9]{@apply bg-orange-500;}input:focus+.slider-orange[data-v-35f8e4f9]{box-shadow:0 0 1px theme('colors.orange-500')}input:checked+.slider-gray[data-v-35f8e4f9]{@apply bg-gray-900;}input:focus+.slider-gray[data-v-35f8e4f9]{box-shadow:0 0 1px theme('colors.gray-900')}input:checked+.slider-primary[data-v-35f8e4f9]{@apply bg-primary-500;}input:focus+.slider-primary[data-v-35f8e4f9]{box-shadow:0 0 1px theme('colors.primary-500')}input:checked+.slider-black[data-v-35f8e4f9]{@apply bg-black;}input:focus+.slider-black[data-v-35f8e4f9]{box-shadow:0 0 1px theme('colors.black')}.g-switch-sm[data-v-35f8e4f9]{width:30px;height:20px}.slider-sm[data-v-35f8e4f9]:before{height:12px;width:12px;left:4px;bottom:4px}.slider-sm.round[data-v-35f8e4f9]{border-radius:20px}input:checked+.slider-sm[data-v-35f8e4f9]:before{-webkit-transform:translateX(10px);-ms-transform:translateX(10px);transform:translateX(10px)}.g-switch-md[data-v-35f8e4f9]{width:50px;height:30px}.slider-md[data-v-35f8e4f9]:before{height:22px;width:22px;left:4px;bottom:4px}.slider-md.round[data-v-35f8e4f9]{border-radius:30px}input:checked+.slider-md[data-v-35f8e4f9]:before{-webkit-transform:translateX(20px);-ms-transform:translateX(20px);transform:translateX(20px)}.g-switch-lg[data-v-35f8e4f9]{width:70px;height:40px}.slider-lg[data-v-35f8e4f9]:before{height:32px;width:32px;left:4px;bottom:4px}.slider-lg.round[data-v-35f8e4f9]{border-radius:40px}input:checked+.slider-lg[data-v-35f8e4f9]:before{-webkit-transform:translateX(30px);-ms-transform:translateX(30px);transform:translateX(30px)}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$n = "data-v-35f8e4f9";
/* module identifier */

const __vue_module_identifier__$n = undefined;
/* functional template */

const __vue_is_functional_template__$n = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$n = normalizeComponent({
  render: __vue_render__$n,
  staticRenderFns: __vue_staticRenderFns__$n
}, __vue_inject_styles__$n, __vue_script__$n, __vue_scope_id__$n, __vue_is_functional_template__$n, __vue_module_identifier__$n, false, createInjector, undefined, undefined);

//
var script$o = {
  name: 'GCode',
  components: {
    GBtn: __vue_component__,
    GDot: __vue_component__$8
  },
  props: {
    langs: {
      type: Array,
      default: () => ['ruby', 'python', 'javascript', 'bash', 'html']
    },
    lang: {
      type: String,
      default: 'bash'
    },
    code: {
      type: Object,
      required: true
    },
    shadow: {
      type: String,
      default: 'shadow-lg'
    }
  },
  data: () => ({
    internalLang: '',
    langLabels: {
      ruby: 'Ruby',
      python: 'Python',
      javascript: 'Javascript',
      bash: 'Bash',
      html: 'HTML'
    }
  }),

  created() {
    this.internalLang = this.lang;
  },

  computed: {
    selectedCodeSnippet() {
      return this.code[this.internalLang];
    },

    classes() {
      return {};
    }

  },
  methods: {
    changeLangTo(lang) {
      this.internalLang = lang;
    },

    isActive(lang) {
      return this.internalLang === lang;
    },

    labelFor(lang) {
      return this.langLabels[lang];
    }

  }
};

/* script */
const __vue_script__$o = script$o;
/* template */

var __vue_render__$o = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: ['g-code', _vm.classes, _vm.shadow]
  }, [_c('div', {
    staticClass: "header bg-black w-full block rounded-t px-2 py-1"
  }, [_c('div', {
    staticClass: "contents flex justify-between"
  }, [_c('div', {
    staticClass: "fake-controls"
  }, [_c('g-dot', {
    staticClass: "mr-2",
    attrs: {
      "color": "red"
    }
  }), _vm._v(" "), _c('g-dot', {
    staticClass: "mr-2",
    attrs: {
      "color": "orange"
    }
  }), _vm._v(" "), _c('g-dot', {
    attrs: {
      "color": "green"
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "nav text-white"
  }, _vm._l(_vm.langs, function (lang, i) {
    return _c('g-btn', {
      key: i,
      class: ['ml-2', {
        'code-is-active': _vm.isActive(lang)
      }],
      attrs: {
        "flat": "",
        "color": "white",
        "size": "sm"
      },
      nativeOn: {
        "click": function ($event) {
          return _vm.changeLangTo(lang);
        }
      }
    }, [_vm._v("\n          " + _vm._s(_vm.labelFor(lang)) + "\n        ")]);
  }), 1)])]), _vm._v(" "), _c('div', {
    staticClass: "code-container bg-black rounded-b"
  }, [_c('pre', {
    directives: [{
      name: "highlightjs",
      rawName: "v-highlightjs",
      value: _vm.selectedCodeSnippet,
      expression: "selectedCodeSnippet"
    }]
  }, [_c('code', {
    class: [_vm.internalLang, 'rounded p-4']
  })])])]);
};

var __vue_staticRenderFns__$o = [];
/* style */

const __vue_inject_styles__$o = function (inject) {
  if (!inject) return;
  inject("data-v-fa7fba26_0", {
    source: ".code-is-active{border:1px solid rgba(255,255,255,.5)}.code-container{width:100%;min-height:100px}code{@apply .text-sm;overflow:hidden;white-space:pre-wrap;background:0 0}.hljs{display:block;overflow-x:auto;color:#abb2bf}.hljs-comment,.hljs-quote{color:#5c6370;font-style:italic}.hljs-doctag,.hljs-formula,.hljs-keyword{color:#c678dd}.hljs-deletion,.hljs-name,.hljs-section,.hljs-selector-tag,.hljs-subst{color:#e06c75}.hljs-literal{color:#56b6c2}.hljs-addition,.hljs-attribute,.hljs-meta-string,.hljs-regexp,.hljs-string{color:#98c379}.hljs-built_in,.hljs-class .hljs-title{color:#e6c07b}.hljs-attr,.hljs-number,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-pseudo,.hljs-template-variable,.hljs-type,.hljs-variable{color:#d19a66}.hljs-bullet,.hljs-link,.hljs-meta,.hljs-selector-id,.hljs-symbol,.hljs-title{color:#61aeee}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}.hljs-link{text-decoration:underline}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$o = undefined;
/* module identifier */

const __vue_module_identifier__$o = undefined;
/* functional template */

const __vue_is_functional_template__$o = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$o = normalizeComponent({
  render: __vue_render__$o,
  staticRenderFns: __vue_staticRenderFns__$o
}, __vue_inject_styles__$o, __vue_script__$o, __vue_scope_id__$o, __vue_is_functional_template__$o, __vue_module_identifier__$o, false, createInjector, undefined, undefined);

//
//
//
//
//
//
//
//
//
//
var script$p = {
  name: 'GLink',
  props: {
    color: {
      type: String,
      default: 'primary'
    },
    size: {
      type: String,
      default: 'base'
    },
    tag: {
      type: String,
      default: 'a'
    }
  },
  computed: {
    listeners() {
      return { ...this.$listeners
      };
    },

    textColor() {
      if (this.color === 'black') return `text-gray-800 hover:text-${this.color}`;
      return `text-${this.color}-500 hover:text-${this.color}-400 `;
    }

  }
};

/* script */
const __vue_script__$p = script$p;
/* template */

var __vue_render__$p = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c(_vm.tag, _vm._g(_vm._b({
    tag: "component",
    class: "g-link hover:underline cursor-pointer " + _vm.textColor + " text-" + _vm.size
  }, 'component', _vm.$attrs, false), _vm.listeners), [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$p = [];
/* style */

const __vue_inject_styles__$p = function (inject) {
  if (!inject) return;
  inject("data-v-67a69141_0", {
    source: ".g-link{transition:all .3s ease}",
    map: undefined,
    media: "screen"
  });
};
/* scoped */


const __vue_scope_id__$p = undefined;
/* module identifier */

const __vue_module_identifier__$p = undefined;
/* functional template */

const __vue_is_functional_template__$p = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$p = normalizeComponent({
  render: __vue_render__$p,
  staticRenderFns: __vue_staticRenderFns__$p
}, __vue_inject_styles__$p, __vue_script__$p, __vue_scope_id__$p, __vue_is_functional_template__$p, __vue_module_identifier__$p, false, createInjector, undefined, undefined);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$q = {
  name: 'GTabs',
  props: {
    right: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: 'blue',
      validator: value => ['blue', 'red', 'green', 'orange', 'white', 'black'].indexOf(value) !== -1
    }
  },

  data() {
    return {
      tabs: []
    };
  },

  mounted() {
    this.tabs = this.$children.filter(tab => tab.$options._componentTag == 'g-tab');
    this.setDefaultActiveTab();
  },

  computed: {
    activeTab() {
      return this.tabs.find(tab => tab.isActive);
    }

  },
  methods: {
    clicked(tab) {
      this.tabs.forEach(t => t.isActive = t === tab);
      this.$emit('changed', this.activeTab);
    },

    setDefaultActiveTab() {
      if (!this.activeTab) this.tabs[0].isActive = true;
    },

    btnTextClasses(tab) {
      return {
        'w-full cursor-pointer flex flex-col justify-between h-full hover:no-underline': true,
        [`active text-${this.color}-500`]: tab.isActive,
        [`active text-gray-600 hover:text-gray-800`]: !tab.isActive,
        'text-right': this.right
      };
    },

    btnBarClasses(tab) {
      return {
        'w-full h-px': true,
        [`active bg-${this.color}-500`]: tab.isActive
      };
    },

    componentFor(tab) {
      if (tab.to) return 'nuxt-link';
      return 'div';
    },

    attrsFor(tab) {
      let attrs = {};
      if (tab.to) attrs.to = tab.to;
      return attrs;
    }

  }
};

/* script */
const __vue_script__$q = script$q;
/* template */

var __vue_render__$q = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "g-tabs w-full"
  }, [_c('div', {
    staticClass: "tab-btns flex flex-col h-full"
  }, [_c('div', {
    class: ['flex h-full', {
      'justify-end': _vm.right
    }]
  }, _vm._l(_vm.tabs, function (tab, i) {
    return _c(_vm.componentFor(tab), _vm._b({
      key: i,
      tag: "component",
      class: _vm.btnTextClasses(tab),
      on: {
        "click": function ($event) {
          return _vm.clicked(tab);
        }
      }
    }, 'component', _vm.attrsFor(tab), false), [_c('div', {
      staticClass: "h-1"
    }), _vm._v(" "), _c('div', {
      staticClass: "g-tabs-label flex flex-col md:flex-row items-center justify-center md:justify-start pr-0 md:pr-12 pb-4"
    }, [tab.icon ? _c('g-icon', {
      staticClass: "mb-2 md:mb-0 mr-0 md:mr-3",
      attrs: {
        "name": tab.icon,
        "color": tab.isActive ? _vm.color : null
      }
    }) : _vm._e(), _vm._v(" "), _c('span', {
      staticClass: "text-xs md:text-base"
    }, [_vm._v(_vm._s(tab.name))])], 1), _vm._v(" "), _c('div', {
      class: _vm.btnBarClasses(tab)
    })]);
  }), 1)]), _vm._v(" "), _c('div', {
    staticClass: "tab-panels"
  }, [_vm._t("default")], 2)]);
};

var __vue_staticRenderFns__$q = [];
/* style */

const __vue_inject_styles__$q = function (inject) {
  if (!inject) return;
  inject("data-v-b78dd494_0", {
    source: ".g-tabs-label[data-v-b78dd494]{transition:color .3s ease}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$q = "data-v-b78dd494";
/* module identifier */

const __vue_module_identifier__$q = undefined;
/* functional template */

const __vue_is_functional_template__$q = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$q = normalizeComponent({
  render: __vue_render__$q,
  staticRenderFns: __vue_staticRenderFns__$q
}, __vue_inject_styles__$q, __vue_script__$q, __vue_scope_id__$q, __vue_is_functional_template__$q, __vue_module_identifier__$q, false, createInjector, undefined, undefined);

//
//
//
//
//
//
//
//
//
//
var script$r = {
  name: 'GTab',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    name: {
      type: String
    },
    path: {
      type: String
    },
    icon: {
      type: String
    },
    active: {
      type: Boolean,
      default: false
    },
    noPanel: {
      type: Boolean,
      default: false
    },
    to: {
      type: String
    }
  },

  data() {
    return {
      isActive: false
    };
  },

  watch: {
    active(newVal) {
      this.isActive = this.active;
    }

  },

  created() {
    this.isActive = this.active;
  }

};

/* script */
const __vue_script__$r = script$r;
/* template */

var __vue_render__$r = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _vm.isActive && !_vm.noPanel ? _c(_vm.tag, _vm._b({
    tag: "component",
    class: ['g-tab bg-white p-8 rounded-b']
  }, 'component', _vm.$attrs, false), [_vm._t("default")], 2) : _vm._e();
};

var __vue_staticRenderFns__$r = [];
/* style */

const __vue_inject_styles__$r = undefined;
/* scoped */

const __vue_scope_id__$r = "data-v-ec0e3f38";
/* module identifier */

const __vue_module_identifier__$r = undefined;
/* functional template */

const __vue_is_functional_template__$r = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$r = normalizeComponent({
  render: __vue_render__$r,
  staticRenderFns: __vue_staticRenderFns__$r
}, __vue_inject_styles__$r, __vue_script__$r, __vue_scope_id__$r, __vue_is_functional_template__$r, __vue_module_identifier__$r, false, undefined, undefined, undefined);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$s = {
  name: 'GCheckbox',
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    name: {
      type: String,
      default: 'checkbox'
    },
    checked: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: 'primary'
    },
    rules: {
      type: Array
    },
    validateOn: {
      type: String,
      default: 'change'
    },
    noMargin: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'medium',
      validator: value => ['small', 'medium', 'large'].indexOf(value) !== -1
    }
  },

  data() {
    return {
      hovered: false,
      errors: []
    };
  },

  computed: {
    listeners() {
      let vm = this;
      return { ...this.$listeners,
        change: event => {
          vm.$emit('change', event.target.checked);
          if (this.validateOn === 'change') vm.validate(event.target.checked);
        }
      };
    },

    hasError() {
      return this.errors.length > 0;
    },

    checkboxClasses() {
      return {
        [`g-checkbox-${this.size}`]: true
      };
    },

    checkmarkClasses() {
      return {
        'bg-gray-300': !this.checked && !this.hovered,
        'bg-gray-400': !this.checked && this.hovered,
        [`bg-${this.color}-500`]: this.checked,
        [`g-checkmark-${this.size}`]: true
      };
    }

  },
  methods: {
    validate(val) {
      this.errors = [];
      if (this.rules && this.rules.length > 0) this.rules.forEach(rule => {
        let result = rule(val);
        if (typeof result === 'string') this.errors.push(result);
      });
    }

  }
};

/* script */
const __vue_script__$s = script$s;
/* template */

var __vue_render__$s = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: {
      'mb-6': !_vm.noMargin
    }
  }, [_c('label', {
    class: ['g-checkbox', _vm.checkboxClasses],
    on: {
      "mouseover": function ($event) {
        _vm.hovered = true;
      },
      "mouseout": function ($event) {
        _vm.hovered = false;
      }
    }
  }, [_vm._t("default", [_vm._v(_vm._s(_vm.label))]), _vm._v(" "), _c('input', _vm._g(_vm._b({
    attrs: {
      "type": "checkbox",
      "name": _vm.name
    },
    domProps: {
      "checked": _vm.checked
    }
  }, 'input', _vm.$attrs, false), _vm.listeners)), _vm._v(" "), _c('span', {
    class: ['checkmark', _vm.checkmarkClasses]
  })], 2), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.hasError,
      expression: "hasError"
    }],
    staticClass: "g-text-field-error text-red-500 text-sm absolute mt-1"
  }, [_vm._v("\n    " + _vm._s(_vm.errors[0]) + "\n  ")])]);
};

var __vue_staticRenderFns__$s = [];
/* style */

const __vue_inject_styles__$s = function (inject) {
  if (!inject) return;
  inject("data-v-76b9f181_0", {
    source: ".g-checkbox[data-v-76b9f181]{display:block;position:relative;padding-left:35px;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.g-checkbox-small[data-v-76b9f181]{@apply text-sm;}.g-checkbox-medium[data-v-76b9f181]{@apply text-base;}.g-checkbox-large[data-v-76b9f181]{@apply text-lg;}.g-checkbox input[data-v-76b9f181]{position:absolute;opacity:0;cursor:pointer;height:0;width:0}.checkmark[data-v-76b9f181]{@apply rounded;position:absolute;top:0;left:0}.g-checkbox-small[data-v-76b9f181]{height:20px}.g-checkmark-small[data-v-76b9f181]{height:20px;width:20px}.g-checkbox-medium[data-v-76b9f181]{height:25px}.g-checkmark-medium[data-v-76b9f181]{height:25px;width:25px}.checkmark[data-v-76b9f181]:after{content:\"\";position:absolute;display:none}.g-checkbox input:checked~.checkmark[data-v-76b9f181]:after{display:block}.g-checkbox-medium .checkmark[data-v-76b9f181]:after{left:7.5px;top:3.5px;width:10px;height:15px;border:solid #fff;border-width:0 5px 5px 0;-webkit-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg)}.g-checkbox-small .checkmark[data-v-76b9f181]:after{left:6.5px;top:3px;width:7px;height:12px;border:solid #fff;border-width:0 3.5px 3.5px 0;-webkit-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg)}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$s = "data-v-76b9f181";
/* module identifier */

const __vue_module_identifier__$s = undefined;
/* functional template */

const __vue_is_functional_template__$s = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$s = normalizeComponent({
  render: __vue_render__$s,
  staticRenderFns: __vue_staticRenderFns__$s
}, __vue_inject_styles__$s, __vue_script__$s, __vue_scope_id__$s, __vue_is_functional_template__$s, __vue_module_identifier__$s, false, createInjector, undefined, undefined);

//
//
//
//
//
//
//
//
//
var script$t = {
  name: 'GImg',
  props: {
    src: {
      type: String
    },
    alt: {
      type: String,
      default: 'Image'
    },
    width: {
      type: String
    },
    height: {
      type: String
    }
  }
};

/* script */
const __vue_script__$t = script$t;
/* template */

var __vue_render__$t = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('img', {
    staticClass: "g-img",
    attrs: {
      "src": _vm.src,
      "alt": _vm.alt,
      "width": _vm.width,
      "height": _vm.height
    }
  });
};

var __vue_staticRenderFns__$t = [];
/* style */

const __vue_inject_styles__$t = undefined;
/* scoped */

const __vue_scope_id__$t = "data-v-ee2d7148";
/* module identifier */

const __vue_module_identifier__$t = undefined;
/* functional template */

const __vue_is_functional_template__$t = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$t = normalizeComponent({
  render: __vue_render__$t,
  staticRenderFns: __vue_staticRenderFns__$t
}, __vue_inject_styles__$t, __vue_script__$t, __vue_scope_id__$t, __vue_is_functional_template__$t, __vue_module_identifier__$t, false, undefined, undefined, undefined);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$u = {
  name: 'GBlockSpinner',
  props: {
    color: {
      type: String,
      default: 'white'
    },
    size: {
      type: String,
      default: 'medium'
    }
  },
  computed: {
    sizePx() {
      switch (this.size) {
        case 'small':
          return 8;

        case 'medium':
          return 12;

        case 'large':
          return 16;

        case 'xl':
          return 40;

        default:
          return 12;
      }
    },

    containerStyles() {
      const top = -this.sizePx / 4 * 2 / 3;
      return {
        width: `${this.sizePx}px`,
        height: `${this.sizePx}px`,
        top: `${top}px`
      };
    },

    squareStyles() {
      const top = -this.sizePx / 4 * 2 / 3;
      const margin = this.sizePx / 4 / 3;
      return {
        width: `${this.sizePx / 4}px`,
        height: `${this.sizePx / 4}px`,
        top: `${top}px`,
        marginRight: `${margin}px`,
        marginTop: `${margin}px`
      };
    }

  }
};

/* script */
const __vue_script__$u = script$u;
/* template */

var __vue_render__$u = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "self-building-square-spinner",
    style: _vm.containerStyles
  }, [_c('div', {
    class: ["square bg-" + _vm.color],
    style: _vm.squareStyles
  }), _vm._v(" "), _c('div', {
    class: ["square bg-" + _vm.color],
    style: _vm.squareStyles
  }), _vm._v(" "), _c('div', {
    class: ["square bg-" + _vm.color],
    style: _vm.squareStyles
  }), _vm._v(" "), _c('div', {
    class: ["square clear bg-" + _vm.color],
    style: _vm.squareStyles
  }), _vm._v(" "), _c('div', {
    class: ["square bg-" + _vm.color],
    style: _vm.squareStyles
  }), _vm._v(" "), _c('div', {
    class: ["square bg-" + _vm.color],
    style: _vm.squareStyles
  }), _vm._v(" "), _c('div', {
    class: ["square clear bg-" + _vm.color],
    style: _vm.squareStyles
  }), _vm._v(" "), _c('div', {
    class: ["square bg-" + _vm.color],
    style: _vm.squareStyles
  }), _vm._v(" "), _c('div', {
    class: ["square bg-" + _vm.color],
    style: _vm.squareStyles
  })]);
};

var __vue_staticRenderFns__$u = [];
/* style */

const __vue_inject_styles__$u = function (inject) {
  if (!inject) return;
  inject("data-v-56d72917_0", {
    source: ".self-building-square-spinner[data-v-56d72917],.self-building-square-spinner *[data-v-56d72917]{box-sizing:border-box}.self-building-square-spinner .square[data-v-56d72917]{float:left;position:relative;opacity:0;animation:self-building-square-spinner-data-v-56d72917 6s infinite}.self-building-square-spinner .square[data-v-56d72917]:nth-child(1){animation-delay:calc(200ms * 6)}.self-building-square-spinner .square[data-v-56d72917]:nth-child(2){animation-delay:calc(200ms * 7)}.self-building-square-spinner .square[data-v-56d72917]:nth-child(3){animation-delay:calc(200ms * 8)}.self-building-square-spinner .square[data-v-56d72917]:nth-child(4){animation-delay:calc(200ms * 3)}.self-building-square-spinner .square[data-v-56d72917]:nth-child(5){animation-delay:calc(200ms * 4)}.self-building-square-spinner .square[data-v-56d72917]:nth-child(6){animation-delay:calc(200ms * 5)}.self-building-square-spinner .square[data-v-56d72917]:nth-child(7){animation-delay:calc(200ms * 0)}.self-building-square-spinner .square[data-v-56d72917]:nth-child(8){animation-delay:calc(200ms * 1)}.self-building-square-spinner .square[data-v-56d72917]:nth-child(9){animation-delay:calc(200ms * 2)}.self-building-square-spinner .clear[data-v-56d72917]{clear:both}@keyframes self-building-square-spinner-data-v-56d72917{0%{opacity:0}5%{opacity:1;top:0}50.9%{opacity:1;top:0}55.9%{opacity:0;top:inherit}}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$u = "data-v-56d72917";
/* module identifier */

const __vue_module_identifier__$u = undefined;
/* functional template */

const __vue_is_functional_template__$u = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$u = normalizeComponent({
  render: __vue_render__$u,
  staticRenderFns: __vue_staticRenderFns__$u
}, __vue_inject_styles__$u, __vue_script__$u, __vue_scope_id__$u, __vue_is_functional_template__$u, __vue_module_identifier__$u, false, createInjector, undefined, undefined);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$v = {
  name: 'GTextarea',
  props: {
    value: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    raised: {
      type: Boolean,
      default: false
    },
    uppercase: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    rules: {
      type: Array
    },
    validateOn: {
      type: String,
      default: 'blur'
    },
    noMargin: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'medium',
      validator: value => ['small', 'medium', 'large'].indexOf(value) !== -1
    }
  },

  data() {
    return {
      focussed: false,
      errors: []
    };
  },

  computed: {
    listeners() {
      let vm = this;
      return { ...this.$listeners,
        input: event => {
          vm.$emit('input', event.target.value);
          if (this.validateOn === 'input') vm.validate(event.target.value);
        },
        focus: event => {
          vm.$emit('focus');
          vm.focussed = true;
        },
        blur: event => {
          vm.$emit('blur');
          vm.focussed = false;
          if (this.validateOn === 'blur') vm.validate(event.target.value);
        }
      };
    },

    hasError() {
      return this.errors.length > 0;
    },

    inputClasses() {
      return [this.bgClasses, this.inputBorderClasses, this.textColorClasses, this.textClasses, this.cursorClasses, this.shadowClasses, this.sizeClasses, this.textSize];
    },

    labelClasses() {
      return [this.textSize];
    },

    bgClasses() {
      if (this.hasError) return 'bg-red-100';
      if (this.focussed && !this.raised) return 'bg-gray-100';
      if (this.raised) return 'bg-white';
      return 'bg-gray-300';
    },

    inputBorderClasses() {
      if (this.raised) return 'border border-white';
      if (this.hasError) return 'border border-red-500';
      return 'border border-gray-300';
    },

    shapeClasses() {
      if (this.prepend && this.append) return '';
      if (this.prepend) return 'rounded-r';
      if (this.append) return 'rounded-l';
      return 'rounded';
    },

    textColorClasses() {
      if (this.hasError) return 'text-red-500';
      return '';
    },

    textClasses() {
      if (this.disabled) return 'text-gray-600';
      if (this.uppercase) return 'uppercase';
      return '';
    },

    cursorClasses() {
      if (this.disabled) return 'cursor-not-allowed';
      return '';
    },

    shadowClasses() {
      if (this.raised) return 'shadow';
      return '';
    },

    textSize() {
      switch (this.size) {
        case 'large':
          return 'text-lg';

        case 'small':
          return 'text-sm';

        default:
          return 'text-base';
      }
    },

    sizeClasses() {
      switch (this.size) {
        case 'large':
          return 'p-4';

        case 'small':
          return 'p-4';

        default:
          return 'p-4';
      }
    }

  },
  methods: {
    validate(val) {
      this.errors = [];
      if (this.rules && this.rules.length > 0) this.rules.forEach(rule => {
        let result = rule(val);
        if (typeof result === 'string') this.errors.push(result);
      });
    }

  }
};

/* script */
const __vue_script__$v = script$v;
/* template */

var __vue_render__$v = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: ['g-textarea', {
      'mb-6': !_vm.noMargin
    }]
  }, [_c('div', {
    staticClass: "g-textarea-input-group"
  }, [_vm.label ? _c('label', {
    class: _vm.labelClasses,
    attrs: {
      "for": _vm.name
    }
  }, [_vm._v(_vm._s(_vm.label) + "\n      "), _vm.required ? _c('span', [_vm._v("*")]) : _vm._e()]) : _c('label', {
    attrs: {
      "for": _vm.name
    }
  }, [_vm._t("label")], 2), _vm._v(" "), _c('div', {
    staticClass: "g-textarea-input flex"
  }, [_c('textarea', _vm._g(_vm._b({
    class: ['w-full rounded  leading-none'].concat(_vm.inputClasses),
    attrs: {
      "name": _vm.name,
      "disabled": _vm.disabled,
      "size": "1"
    },
    domProps: {
      "value": _vm.value
    }
  }, 'textarea', _vm.$attrs, false), _vm.listeners))]), _vm._v(" "), _c('div', {
    class: ['relative'].concat(_vm.labelClasses)
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.hasError,
      expression: "hasError"
    }],
    staticClass: "g-text-field-error text-red-500 text-sm absolute"
  }, [_vm._v("\n        " + _vm._s(_vm.errors[0]) + "\n      ")])])])]);
};

var __vue_staticRenderFns__$v = [];
/* style */

const __vue_inject_styles__$v = function (inject) {
  if (!inject) return;
  inject("data-v-46d9d076_0", {
    source: "textarea[data-v-46d9d076]{transition:all .3s ease;-webkit-appearance:none;-moz-appearance:none;appearance:none;box-shadow:none}textarea[data-v-46d9d076]:focus{outline:0}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$v = "data-v-46d9d076";
/* module identifier */

const __vue_module_identifier__$v = undefined;
/* functional template */

const __vue_is_functional_template__$v = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$v = normalizeComponent({
  render: __vue_render__$v,
  staticRenderFns: __vue_staticRenderFns__$v
}, __vue_inject_styles__$v, __vue_script__$v, __vue_scope_id__$v, __vue_is_functional_template__$v, __vue_module_identifier__$v, false, createInjector, undefined, undefined);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$w = {
  name: 'GAlert',
  props: {
    title: {
      type: String
    },
    color: {
      type: String,
      default: 'blue'
    },
    icon: {
      type: String
    },
    persistent: {
      type: Boolean,
      default: false
    },
    shadow: {
      type: String,
      default: 'shadow-lg'
    }
  }
};

/* script */
const __vue_script__$w = script$w;
/* template */

var __vue_render__$w = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: "g-alert bg-white " + _vm.shadow + " rounded border-l-4 border-" + _vm.color + "-500"
  }, [!_vm.persistent ? _c('div', {
    staticClass: "relative"
  }, [_c('div', {
    staticClass: "absolute right-0 mr-1 mt-1"
  }, [_c('g-btn', {
    attrs: {
      "flat": "",
      "circle": "",
      "size": "sm",
      "color": "gray"
    },
    nativeOn: {
      "click": function ($event) {
        return _vm.$emit('close');
      }
    }
  }, [_c('g-icon', {
    staticClass: "text-sm text-gray-600",
    attrs: {
      "name": "fas fa-times"
    }
  })], 1)], 1)]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "flex items-center"
  }, [_vm.icon ? _c('div', {
    staticClass: "px-6 flex items-center"
  }, [_c('g-icon', {
    class: "text-2xl text-" + _vm.color + "-500",
    attrs: {
      "name": _vm.icon
    }
  })], 1) : _vm._e(), _vm._v(" "), _c('div', {
    class: ['w-full content py-6 pr-4', {
      'pl-4': !_vm.icon
    }]
  }, [_c('h3', {
    staticClass: "font-medium text-lg mb-0"
  }, [_vm._t("title", [_vm._v("\n          " + _vm._s(_vm.title) + "\n        ")])], 2), _vm._v(" "), _c('div', {
    staticClass: "text-gray-700"
  }, [_vm._t("default")], 2)])])]);
};

var __vue_staticRenderFns__$w = [];
/* style */

const __vue_inject_styles__$w = undefined;
/* scoped */

const __vue_scope_id__$w = "data-v-c5019222";
/* module identifier */

const __vue_module_identifier__$w = undefined;
/* functional template */

const __vue_is_functional_template__$w = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$w = normalizeComponent({
  render: __vue_render__$w,
  staticRenderFns: __vue_staticRenderFns__$w
}, __vue_inject_styles__$w, __vue_script__$w, __vue_scope_id__$w, __vue_is_functional_template__$w, __vue_module_identifier__$w, false, undefined, undefined, undefined);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$x = {
  name: 'GCopyBtn',
  props: {
    text: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: 'white'
    },
    flat: {
      type: Boolean,
      default: false
    },
    outline: {
      type: Boolean,
      default: false
    },
    subtle: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'md',
      validator: value => ['sm', 'md', 'lg'].indexOf(value) !== -1
    }
  },

  data() {
    return {
      tooltipText: 'Copy',
      copied: false
    };
  },

  computed: {
    iconColor() {
      if (this.color === 'white' && !this.flat) return 'black';
      if (this.flat && this.color === 'black') return 'black';
      if (this.color === 'gray' && (this.flat || this.outline)) return 'gray-600';
      if (this.flat || this.outline) return this.color;
      return 'white';
    },

    iconSize() {
      switch (this.size) {
        case 'sm':
          return 'xs';

        case 'md':
          return 'small';

        case 'lg':
          return 'medium';

        default:
          return 'small';
      }
    }

  },
  methods: {
    copyToClipboard() {
      this.$refs.contents.select();
      document.execCommand('copy');
      this.tooltipText = 'Copied!';
      this.copied = true;
      this.gSleep(2000).then(() => {
        this.tooltipText = 'Copy';
        this.copied = false;
      });
    }

  }
};

/* script */
const __vue_script__$x = script$x;
/* template */

var __vue_render__$x = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_c('g-tooltip', {
    attrs: {
      "text": _vm.tooltipText,
      "width": 70
    }
  }, [_c('g-btn', {
    attrs: {
      "circle": "",
      "flat": _vm.flat,
      "outline": _vm.outline,
      "color": _vm.color,
      "size": _vm.size,
      "subtle": _vm.subtle
    },
    nativeOn: {
      "click": function ($event) {
        return _vm.copyToClipboard($event);
      }
    }
  }, [_c('transition', {
    attrs: {
      "name": "switch",
      "mode": "out-in"
    }
  }, [_vm.copied ? _c('g-icon', {
    key: "check",
    attrs: {
      "name": "fas fa-check-circle",
      "size": _vm.iconSize,
      "color": _vm.iconColor
    }
  }) : _c('g-icon', {
    key: "copy",
    attrs: {
      "name": "far fa-clone",
      "size": _vm.iconSize,
      "color": _vm.iconColor
    }
  })], 1)], 1)], 1), _vm._v(" "), _c('textarea', {
    ref: "contents",
    staticClass: "input -ml-2 absolute",
    attrs: {
      "name": "text"
    },
    domProps: {
      "value": _vm.text
    }
  })], 1);
};

var __vue_staticRenderFns__$x = [];
/* style */

const __vue_inject_styles__$x = function (inject) {
  if (!inject) return;
  inject("data-v-68c68150_0", {
    source: ".switch-enter-active[data-v-68c68150],.switch-leave-active[data-v-68c68150]{transition:all .1s}.switch-enter[data-v-68c68150],.switch-leave-to[data-v-68c68150]{opacity:0;transform:scale(0)}.input[data-v-68c68150]{width:0;height:0;resize:none;border:none;outline:0}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$x = "data-v-68c68150";
/* module identifier */

const __vue_module_identifier__$x = undefined;
/* functional template */

const __vue_is_functional_template__$x = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$x = normalizeComponent({
  render: __vue_render__$x,
  staticRenderFns: __vue_staticRenderFns__$x
}, __vue_inject_styles__$x, __vue_script__$x, __vue_scope_id__$x, __vue_is_functional_template__$x, __vue_module_identifier__$x, false, createInjector, undefined, undefined);

//
//
//
//
//
//
var script$y = {
  name: 'GVertNav',
  props: {
    bgColor: {
      type: String,
      default: 'white'
    }
  },
  data: () => ({
    items: []
  }),

  mounted() {
    this.items = this.$children.filter(child => child.$options._componentTag == 'g-vert-nav-item');
    this.setItemData();
  },

  watch: {
    bgColor(newVal) {
      this.setItemData();
    }

  },
  methods: {
    setItemData() {
      this.items.forEach(item => {
        item.bgColor = this.bgColor;
      });
    }

  }
};

/* script */
const __vue_script__$y = script$y;
/* template */

var __vue_render__$y = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "flex flex-col"
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$y = [];
/* style */

const __vue_inject_styles__$y = undefined;
/* scoped */

const __vue_scope_id__$y = "data-v-53e1ea86";
/* module identifier */

const __vue_module_identifier__$y = undefined;
/* functional template */

const __vue_is_functional_template__$y = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$y = normalizeComponent({
  render: __vue_render__$y,
  staticRenderFns: __vue_staticRenderFns__$y
}, __vue_inject_styles__$y, __vue_script__$y, __vue_scope_id__$y, __vue_is_functional_template__$y, __vue_module_identifier__$y, false, undefined, undefined, undefined);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$z = {
  name: 'GVertNavItem',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    icon: {
      type: String,
      default: null
    },
    active: {
      type: Boolean,
      default: false
    },
    badgeCount: {
      type: [String, Number],
      default: null
    }
  },
  data: () => ({
    bgColor: 'white'
  }),
  computed: {
    listeners() {
      return { ...this.$listeners
      };
    },

    bgColorName() {
      return this.bgColor.split('-')[0];
    },

    bgVariant() {
      return Number(this.bgColor.split('-')[1]);
    },

    classes() {
      return ['nav-item flex justify-between p-3 rounded cursor-pointer font-medium', this.bgClasses, this.textClasses];
    },

    bgClasses() {
      if (this.active) {
        if (this.bgVariant) return `bg-${this.bgColorName}-${this.bgVariant + 100}`;
        return 'bg-gray-100';
      } else {
        return `bg-${this.bgColor}`;
      }
    },

    textClasses() {
      if (this.active) {
        if (this.bgVariant) return `text-${this.bgColorName}-${this.bgVariant + 600}`;
        return 'text-gray-700';
      } else {
        if (this.bgVariant) return `text-${this.bgColorName}-${this.bgVariant + 400} hover:text-${this.bgColorName}-${this.bgVariant + 600}`;
        return 'text-gray-500 hover:text-gray-700';
      }
    },

    badgeClasses() {
      return ['py-px px-3 text-xs flex items-center justify-center rounded-full', this.badgeBgClass, this.textClasses];
    },

    badgeBgClass() {
      if (this.active) {
        return `bg-${this.bgColor}`;
      } else {
        if (this.bgVariant) return `bg-${this.bgColorName}-${this.bgVariant + 100}`;
        return 'bg-gray-100';
      }
    }

  }
};

/* script */
const __vue_script__$z = script$z;
/* template */

var __vue_render__$z = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c(_vm.tag, _vm._g(_vm._b({
    tag: "component",
    class: _vm.classes
  }, 'component', _vm.$attrs, false), _vm.listeners), [_c('div', {
    staticClass: "flex"
  }, [_vm.icon ? _c('div', {
    staticClass: "w-6 text-center mr-2"
  }, [_c('g-icon', {
    attrs: {
      "name": _vm.icon
    }
  })], 1) : _vm._e(), _vm._v(" "), _vm._t("default")], 2), _vm._v(" "), _vm.badgeCount ? _c('div', {
    class: _vm.badgeClasses
  }, [_vm._v("\n    " + _vm._s(_vm.badgeCount) + "\n  ")]) : _vm._e()]);
};

var __vue_staticRenderFns__$z = [];
/* style */

const __vue_inject_styles__$z = function (inject) {
  if (!inject) return;
  inject("data-v-70c32154_0", {
    source: ".nav-item[data-v-70c32154]{transition:all .3s ease}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$z = "data-v-70c32154";
/* module identifier */

const __vue_module_identifier__$z = undefined;
/* functional template */

const __vue_is_functional_template__$z = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$z = normalizeComponent({
  render: __vue_render__$z,
  staticRenderFns: __vue_staticRenderFns__$z
}, __vue_inject_styles__$z, __vue_script__$z, __vue_scope_id__$z, __vue_is_functional_template__$z, __vue_module_identifier__$z, false, createInjector, undefined, undefined);

//
//
//
//
//
//
var script$A = {
  name: 'GCircle',
  props: {
    size: {
      type: [Number, String],
      default: 10
    },
    color: {
      type: String,
      default: 'gray-500'
    }
  },
  computed: {
    classes() {
      return {
        [`w-${this.size} h-${this.size}`]: true,
        [`bg-${this.color}`]: true
      };
    }

  }
};

/* script */
const __vue_script__$A = script$A;
/* template */

var __vue_render__$A = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: ['flex items-center justify-center rounded-full', _vm.classes]
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$A = [];
/* style */

const __vue_inject_styles__$A = undefined;
/* scoped */

const __vue_scope_id__$A = "data-v-1a7a5fcf";
/* module identifier */

const __vue_module_identifier__$A = undefined;
/* functional template */

const __vue_is_functional_template__$A = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$A = normalizeComponent({
  render: __vue_render__$A,
  staticRenderFns: __vue_staticRenderFns__$A
}, __vue_inject_styles__$A, __vue_script__$A, __vue_scope_id__$A, __vue_is_functional_template__$A, __vue_module_identifier__$A, false, undefined, undefined, undefined);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$B = {
  name: 'GSelectInput',
  props: {
    options: {
      type: Array,
      required: true
    },
    value: {
      type: [String, Number],
      default: ''
    },
    label: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: 'selectInput'
    },
    defaultText: {
      type: String
    },
    color: {
      type: String,
      default: 'gray-300'
    },
    rules: {
      type: Array
    },
    noMargin: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'md',
      validator: value => ['sm', 'md', 'lg'].indexOf(value) !== -1
    }
  },

  data() {
    return {
      errors: []
    };
  },

  computed: {
    listeners() {
      const vm = this;
      return { ...this.$listeners,
        input: event => {
          vm.$emit('input', event.target.value);
          vm.validate(event.target.value);
        }
      };
    },

    hasError() {
      return this.errors.length > 0;
    },

    selectClasses() {
      return ['block appearance-none w-full pr-8 rounded leading-none focus:outline-none', this.borderClasses, this.textClasses, this.bgClasses, this.sizeClasses, this.textSize];
    },

    labelClasses() {
      return [this.textSize];
    },

    borderClasses() {
      if (this.hasError) return 'border border-red-500';
      if (this.raised) return 'border border-white';
      return `border border-gray-200 focus:border-${this.color}`;
    },

    textClasses() {
      if (this.disabled) return 'text-gray-600';
      if (this.hasError) return 'text-red-500';
      return 'text-gray-700';
    },

    bgClasses() {
      if (this.hasError) return 'bg-red-100';
      if (this.raised) return 'bg-white';
      return 'bg-gray-200 focus:bg-gray-100';
    },

    sizeClasses() {
      switch (this.size) {
        case 'lg':
          return 'h-16 px-4';

        case 'sm':
          return 'h-8 px-4';

        default:
          return 'h-12 px-4';
      }
    },

    textSize() {
      switch (this.size) {
        case 'lg':
          return 'text-lg';

        case 'sm':
          return 'text-sm';

        default:
          return 'text-base';
      }
    }

  },
  methods: {
    optionValue(option) {
      if (typeof option === 'string' || option instanceof String) return option;
      return option.value;
    },

    optionLabel(option) {
      if (typeof option === 'string' || option instanceof String) return option;
      return option.label;
    },

    validate(val) {
      this.errors = [];
      if (this.rules && this.rules.length > 0) this.rules.forEach(rule => {
        let result = rule(val);
        if (typeof result === 'string') this.errors.push(result);
      });
    }

  }
};

/* script */
const __vue_script__$B = script$B;
/* template */

var __vue_render__$B = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: [{
      'mb-6': !_vm.noMargin
    }]
  }, [_vm.label ? _c('label', {
    class: _vm.labelClasses,
    attrs: {
      "for": _vm.name
    }
  }, [_vm._v("\n    " + _vm._s(_vm.label) + "\n  ")]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "relative"
  }, [_c('select', _vm._g(_vm._b({
    class: _vm.selectClasses,
    attrs: {
      "name": _vm.name
    },
    domProps: {
      "value": _vm.value
    }
  }, 'select', _vm.$attrs, false), _vm.listeners), [_vm.defaultText ? _c('option', {
    attrs: {
      "value": "",
      "hidden": ""
    }
  }, [_vm._v(_vm._s(_vm.defaultText))]) : _vm._e(), _vm._v(" "), _vm._l(_vm.options, function (option, i) {
    return _c('option', {
      key: i,
      domProps: {
        "value": _vm.optionValue(option)
      }
    }, [_vm._v("\n        " + _vm._s(_vm.optionLabel(option)) + "\n      ")]);
  })], 2), _vm._v(" "), _c('div', {
    staticClass: "pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
  }, [_c('svg', {
    staticClass: "fill-current h-4 w-4",
    attrs: {
      "xmlns": "http://www.w3.org/2000/svg",
      "viewBox": "0 0 20 20"
    }
  }, [_c('path', {
    attrs: {
      "d": "M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
    }
  })])])]), _vm._v(" "), _c('div', {
    staticClass: "relative"
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.hasError,
      expression: "hasError"
    }],
    staticClass: "g-text-field-error text-red-500 text-sm absolute"
  }, [_vm._v("\n      " + _vm._s(_vm.errors[0]) + "\n    ")])])]);
};

var __vue_staticRenderFns__$B = [];
/* style */

const __vue_inject_styles__$B = undefined;
/* scoped */

const __vue_scope_id__$B = "data-v-f728c220";
/* module identifier */

const __vue_module_identifier__$B = undefined;
/* functional template */

const __vue_is_functional_template__$B = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$B = normalizeComponent({
  render: __vue_render__$B,
  staticRenderFns: __vue_staticRenderFns__$B
}, __vue_inject_styles__$B, __vue_script__$B, __vue_scope_id__$B, __vue_is_functional_template__$B, __vue_module_identifier__$B, false, undefined, undefined, undefined);

//
//
//
//
//
//
//
//
//
//
//
var script$C = {
  name: 'GLayoutSidebar',
  props: {
    width: {
      type: String,
      default: '1/4'
    },
    sidebarColor: {
      type: String,
      default: 'gray-100'
    },
    contentColor: {
      type: String,
      default: 'white'
    }
  }
};

/* script */
const __vue_script__$C = script$C;
/* template */

var __vue_render__$C = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "flex"
  }, [_c('div', {
    class: "min-h-screen w-" + _vm.width + " bg-" + _vm.sidebarColor + " border-r border-gray-200"
  }, [_vm._t("sidebar")], 2), _vm._v(" "), _c('div', {
    class: "min-h-screen w-full bg-" + _vm.contentColor
  }, [_vm._t("content")], 2)]);
};

var __vue_staticRenderFns__$C = [];
/* style */

const __vue_inject_styles__$C = undefined;
/* scoped */

const __vue_scope_id__$C = "data-v-0f2f3018";
/* module identifier */

const __vue_module_identifier__$C = undefined;
/* functional template */

const __vue_is_functional_template__$C = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$C = normalizeComponent({
  render: __vue_render__$C,
  staticRenderFns: __vue_staticRenderFns__$C
}, __vue_inject_styles__$C, __vue_script__$C, __vue_scope_id__$C, __vue_is_functional_template__$C, __vue_module_identifier__$C, false, undefined, undefined, undefined);

var components = /*#__PURE__*/Object.freeze({
  __proto__: null,
  GBtn: __vue_component__,
  GTextInput: __vue_component__$1,
  GCard: __vue_component__$2,
  GCardActions: __vue_component__$3,
  GCardContent: __vue_component__$4,
  GCardTitle: __vue_component__$5,
  GLoadingIcon: __vue_component__$6,
  GChip: __vue_component__$7,
  GDot: __vue_component__$8,
  GCopyAndPaste: __vue_component__$9,
  GTooltip: __vue_component__$a,
  GIcon: __vue_component__$b,
  GDialog: __vue_component__$c,
  GForm: __vue_component__$d,
  GGrid: __vue_component__$e,
  GGridItem: __vue_component__$f,
  GMenu: __vue_component__$g,
  GMenuItem: __vue_component__$h,
  GPopover: __vue_component__$i,
  GSnackbar: __vue_component__$j,
  GSnackbarList: __vue_component__$k,
  GSelect: __vue_component__$l,
  GSelectOption: __vue_component__$m,
  GSwitch: __vue_component__$n,
  GCode: __vue_component__$o,
  GLink: __vue_component__$p,
  GTabs: __vue_component__$q,
  GTab: __vue_component__$r,
  GCheckbox: __vue_component__$s,
  GImg: __vue_component__$t,
  GBlockSpinner: __vue_component__$u,
  GTextarea: __vue_component__$v,
  GAlert: __vue_component__$w,
  GCopyBtn: __vue_component__$x,
  GVertNav: __vue_component__$y,
  GVertNavItem: __vue_component__$z,
  GCircle: __vue_component__$A,
  GSelectInput: __vue_component__$B,
  GLayoutSidebar: __vue_component__$C
});

var forms = {
  methods: {
    handleServerErrors(serverErrors) {
      Object.keys(serverErrors).forEach(key => {
        this.$refs[key].errors.push(serverErrors[key][0]);
      });
    }

  }
};

var mixins = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Forms: forms
});

var gClickOutside = {
  name: 'g-click-outside',
  directive: {
    bind(el, binding, vNode) {
      // Provided expression must evaluate to a function.
      if (typeof binding.value !== 'function') {
        const compName = vNode.context.name;
        let warn = `[Vue-g-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`;

        if (compName) {
          warn += `Found in component '${compName}'`;
        }

        console.warn(warn);
      } // Define Handler and cache it on the element


      const bubble = binding.modifiers.bubble;

      const handler = e => {
        if (bubble || !el.contains(e.target) && el !== e.target) {
          binding.value(e);
        }
      };

      el.__vueGClickOutside__ = handler; // add Event Listeners

      document.addEventListener('click', handler);
    },

    unbind(el, binding) {
      // Remove Event Listeners
      document.removeEventListener('click', el.__vueGClickOutside__);
      el.__vueGClickOutside__ = null;
    }

  }
};

var directives = /*#__PURE__*/Object.freeze({
  __proto__: null,
  GClickOutside: gClickOutside
});

// Import vue components

const install = function installGlue(Vue) {
  if (install.installed) return;
  install.installed = true;
  Object.entries(components).forEach(([componentName, component]) => {
    Vue.component(componentName, component);
  });
  Object.keys(mixins).forEach(mixin => {
    Vue.mixin(mixins[mixin]);
  });
  Object.keys(directives).forEach(directive => {
    Vue.directive(directives[directive].name, directives[directive].directive);
  });
}; // Create module definition for Vue.use()


const plugin = {
  install
}; // To auto-install on non-es builds, when vue is found

export default plugin;
export { __vue_component__$w as GAlert, __vue_component__$u as GBlockSpinner, __vue_component__ as GBtn, __vue_component__$2 as GCard, __vue_component__$3 as GCardActions, __vue_component__$4 as GCardContent, __vue_component__$5 as GCardTitle, __vue_component__$s as GCheckbox, __vue_component__$7 as GChip, __vue_component__$A as GCircle, __vue_component__$o as GCode, __vue_component__$9 as GCopyAndPaste, __vue_component__$x as GCopyBtn, __vue_component__$c as GDialog, __vue_component__$8 as GDot, __vue_component__$d as GForm, __vue_component__$e as GGrid, __vue_component__$f as GGridItem, __vue_component__$b as GIcon, __vue_component__$t as GImg, __vue_component__$C as GLayoutSidebar, __vue_component__$p as GLink, __vue_component__$6 as GLoadingIcon, __vue_component__$g as GMenu, __vue_component__$h as GMenuItem, __vue_component__$i as GPopover, __vue_component__$l as GSelect, __vue_component__$B as GSelectInput, __vue_component__$m as GSelectOption, __vue_component__$j as GSnackbar, __vue_component__$k as GSnackbarList, __vue_component__$n as GSwitch, __vue_component__$r as GTab, __vue_component__$q as GTabs, __vue_component__$1 as GTextInput, __vue_component__$v as GTextarea, __vue_component__$a as GTooltip, __vue_component__$y as GVertNav, __vue_component__$z as GVertNavItem };
