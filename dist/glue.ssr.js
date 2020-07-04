'use strict';Object.defineProperty(exports,'__esModule',{value:true});function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}//
//
//
//
//
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
      validator: function validator(value) {
        return ['sm', 'md', 'lg'].indexOf(value) !== -1;
      }
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
    listeners: function listeners() {
      return _objectSpread2({}, this.$listeners);
    },
    classes: function classes() {
      return [this.defaultClasses, this.sizeClasses, this.shapeClasses, this.bgClasses, this.textColorClasses, this.borderClasses, this.shadowClasses, this.displayClasses, this.opacityClasses, this.cursorClasses];
    },
    defaultClasses: function defaultClasses() {
      return "\n        font-medium inline-block leading-snug\n        ".concat(this.disabled ? 'g-btn-disabled' : '', "\n        ").concat(!this.outline && !this.flat ? 'g-btn-dynamic' : '');
    },
    sizeClasses: function sizeClasses() {
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
    shapeClasses: function shapeClasses() {
      if (this.rounded || this.circle) return 'rounded-full';
      return 'rounded';
    },
    bgClasses: function bgClasses() {
      if (this.isBaseColor) {
        if (this.flat) return "bg-".concat(this.color, " bg-opacity-25");
        return "bg-".concat(this.color);
      }

      if (this.flat) return "bg-".concat(this.color, "-100 hover:bg-").concat(this.color, "-200 active:bg-").concat(this.color, "-300");
      if (this.outline) return "bg-transparent hover:bg-".concat(this.color, "-100 active:bg-").concat(this.color, "-200");
      return "bg-".concat(this.color, "-500");
    },
    textColorClasses: function textColorClasses() {
      if (this.isBaseColor) {
        if (this.flat) return "text-".concat(this.color);
        return this.color === 'white' ? 'text-gray-900' : 'text-white';
      }

      if (this.color === 'white' && !this.flat) return this.textColor || 'text-gray-900';
      if (this.color === 'gray' && (this.flat || this.outline)) return 'text-gray-600';
      if (this.flat || this.outline) return "text-".concat(this.color, "-500");
      return 'text-white';
    },
    borderClasses: function borderClasses() {
      if (this.flat) return 'border border-transparent';
      if (this.isBaseColor) return "border border-".concat(this.color);
      return "border border-".concat(this.color, "-500");
    },
    shadowClasses: function shadowClasses() {
      if (this.outline || this.flat) return '';
      if (this.disabled) return 'shadow-none hover:shadow-none';
      return 'shadow hover:shadow-md';
    },
    displayClasses: function displayClasses() {
      if (this.block) return 'block w-full';
      return 'inline-block';
    },
    opacityClasses: function opacityClasses() {
      if (this.disabled) return 'opacity-50';
      return '';
    },
    cursorClasses: function cursorClasses() {
      if (this.disabled) return 'cursor-not-allowed';
      return 'cursor-pointer';
    },
    iconSize: function iconSize() {
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
    loadingColor: function loadingColor() {
      if (this.color === 'white' && !this.flat) return this.textColor || 'gray-900';
      if (this.flat && this.color === 'black') return 'gray-900';
      if (this.color === 'gray' && (this.flat || this.outline)) return 'gray-600';
      if (this.flat || this.outline) return "".concat(this.color, "-500");
      return 'white';
    },
    isBaseColor: function isBaseColor() {
      return ['black', 'white'].includes(this.color);
    }
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
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
}function createInjectorSSR(context) {
    if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
    }
    if (!context)
        return () => { };
    if (!('styles' in context)) {
        context._styles = context._styles || {};
        Object.defineProperty(context, 'styles', {
            enumerable: true,
            get: () => context._renderStyles(context._styles)
        });
        context._renderStyles = context._renderStyles || renderStyles;
    }
    return (id, style) => addStyle(id, style, context);
}
function addStyle(id, css, context) {
    const group =  css.media || 'default' ;
    const style = context._styles[group] || (context._styles[group] = { ids: [], css: '' });
    if (!style.ids.includes(id)) {
        style.media = css.media;
        style.ids.push(id);
        let code = css.source;
        style.css += code + '\n';
    }
}
function renderStyles(styles) {
    let css = '';
    for (const key in styles) {
        const style = styles[key];
        css +=
            '<style data-vue-ssr-id="' +
                Array.from(style.ids).join(' ') +
                '"' +
                (style.media ? ' media="' + style.media + '"' : '') +
                '>' +
                style.css +
                '</style>';
    }
    return css;
}/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
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

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-5ae7e1fa_0", {
    source: ".g-btn[data-v-5ae7e1fa]{transition:all .2s ease;-webkit-transition:all .2s ease;-moz-transition:all .2s ease;-o-transition:all .2s ease;-ms-transition:all .2s ease;text-decoration:none!important}.g-btn[data-v-5ae7e1fa]:active,.g-btn[data-v-5ae7e1fa]:focus{outline:0}.g-btn-dynamic[data-v-5ae7e1fa]:hover{transform:translateY(-1px)}.g-btn-dynamic[data-v-5ae7e1fa]:active{transform:translateY(.5px);@apply shadow-none;}.g-btn-disabled[data-v-5ae7e1fa]:hover{transform:translateY(0)}.g-btn-disabled[data-v-5ae7e1fa]:active{transform:translateY(0)}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__ = "data-v-5ae7e1fa";
/* module identifier */

var __vue_module_identifier__ = "data-v-5ae7e1fa";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject shadow dom */

var __vue_component__ = normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, createInjectorSSR, undefined);//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      validator: function validator(value) {
        return ['sm', 'md', 'lg'].indexOf(value) !== -1;
      }
    }
  },
  data: function data() {
    return {
      focussed: false,
      errors: []
    };
  },
  computed: {
    listeners: function listeners() {
      var _this = this;

      var vm = this;
      return _objectSpread2({}, this.$listeners, {
        input: function input(event) {
          vm.$emit('input', event.target.value);
          if (_this.validateOn === 'input') vm.validate(event.target.value);
        },
        focus: function focus(event) {
          vm.$emit('focus');
          vm.focussed = true;
        },
        blur: function blur(event) {
          vm.$emit('blur');
          vm.focussed = false;
          if (_this.validateOn === 'blur') vm.validate(event.target.value);
        }
      });
    },
    hasError: function hasError() {
      return this.errors.length > 0;
    },
    classes: function classes() {
      return [];
    },
    inputClasses: function inputClasses() {
      return [this.bgClasses, this.shapeClasses, this.sizeClasses, this.inputBorderClasses, this.textColorClasses, this.textClasses, this.cursorClasses, this.shadowClasses, this.textSize];
    },
    labelClasses: function labelClasses() {
      return [this.textSize];
    },
    prependClasses: function prependClasses() {
      var borderClasses = 'border-t border-b border-l';
      var borderColor = "border-gray-200 focus:border-".concat(this.color);
      if (this.raised) borderColor = 'border-white';
      if (this.hasError) borderColor = 'border-red-500';
      return [borderClasses, borderColor, this.bgClasses, this.shadowClasses, this.textSize];
    },
    appendClasses: function appendClasses() {
      var borderClasses = 'border-t border-b border-r';
      var borderColor = "border-gray-200 focus:border-".concat(this.color);
      if (this.raised) borderColor = 'border-white';
      if (this.hasError) borderColor = 'border-red-500';
      return [borderClasses, borderColor, this.bgClasses, this.shadowClasses, this.textSize];
    },
    bgClasses: function bgClasses() {
      if (this.hasError) return 'bg-red-100';
      if (this.focussed && !this.raised) return 'bg-gray-100';
      if (this.raised) return 'bg-white';
      return 'bg-gray-200';
    },
    inputBorderClasses: function inputBorderClasses() {
      if (this.hasError) {
        if (this.prepend && this.append) return 'border-t border-b border-red-500';
        if (this.prepend) return 'border-t border-b border-r border-red-500';
        if (this.append) return 'border-t border-b border-l border-red-500';
        return 'border border-red-500';
      }

      if (this.raised) return 'border border-white';
      if (this.prepend && this.append) return "border-t border-b border-gray-200 focus:border-".concat(this.color);
      if (this.prepend) return "border-t border-b border-r border-gray-200 focus:border-".concat(this.color);
      if (this.append) return "border-t border-b border-l border-gray-200 focus:border-".concat(this.color);
      return "border border-gray-200 focus:border-".concat(this.color);
    },
    shapeClasses: function shapeClasses() {
      if (this.prepend && this.append) return '';
      if (this.prepend) return 'rounded-r';
      if (this.append) return 'rounded-l';
      return 'rounded';
    },
    textColorClasses: function textColorClasses() {
      if (this.disabled) return 'text-gray-600';
      if (this.hasError) return 'text-red-500';
      return 'text-gray-700';
    },
    textClasses: function textClasses() {
      if (this.uppercase) return 'uppercase';
      return '';
    },
    cursorClasses: function cursorClasses() {
      if (this.disabled) return 'cursor-not-allowed';
      return '';
    },
    shadowClasses: function shadowClasses() {
      if (this.raised) return 'shadow';
      return '';
    },
    textSize: function textSize() {
      switch (this.size) {
        case 'lg':
          return 'text-lg';

        case 'sm':
          return 'text-sm';

        default:
          return 'text-base';
      }
    },
    sizeClasses: function sizeClasses() {
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
    validate: function validate(val) {
      var _this2 = this;

      this.errors = [];
      if (this.rules && this.rules.length > 0) this.rules.forEach(function (rule) {
        var result = rule(val);
        if (typeof result === 'string') _this2.errors.push(result);
      });
    }
  }
};/* script */
var __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: ['g-text-field'].concat(_vm.classes, [{
      'mb-6': !_vm.noMargin
    }])
  }, [_vm._ssrNode("<div class=\"g-text-field-input-group\">", "</div>", [_vm.label ? _vm._ssrNode("<label" + _vm._ssrAttr("for", _vm.name) + _vm._ssrClass(null, _vm.labelClasses) + ">", "</label>", [_vm._ssrNode(_vm._ssrEscape(_vm._s(_vm.label) + "\n      ") + (_vm.required ? "<span>*</span>" : "<!---->"))], 2) : _vm._ssrNode("<label" + _vm._ssrAttr("for", _vm.name) + _vm._ssrClass(null, _vm.labelClasses) + ">", "</label>", [_vm._t("label")], 2), _vm._ssrNode(" "), _vm._ssrNode("<div class=\"g-text-field-input flex\">", "</div>", [_vm.prepend ? _vm._ssrNode("<div" + _vm._ssrClass(null, ["prepend rounded-l"].concat(_vm.prependClasses)) + ">", "</div>", [_vm._ssrNode("<div class=\"flex items-center justify-center h-full\">", "</div>", [_vm._t("prepend")], 2)]) : _vm._e(), _vm._ssrNode(" <div class=\"flex-1\"><input" + _vm._ssrAttr("type", _vm.type) + _vm._ssrAttr("name", _vm.name) + _vm._ssrAttr("disabled", _vm.disabled) + _vm._ssrAttr("value", _vm.value) + _vm._ssrAttrs(_vm.$attrs) + _vm._ssrClass(null, ['w-full leading-none'].concat(_vm.inputClasses)) + "></div> "), _vm.append ? _vm._ssrNode("<div" + _vm._ssrClass(null, ["append rounded-r"].concat(_vm.appendClasses)) + ">", "</div>", [_vm._ssrNode("<div class=\"flex items-center justify-center h-full\">", "</div>", [_vm._t("append")], 2)]) : _vm._e()], 2)], 2), _vm._ssrNode(" <div" + _vm._ssrClass(null, ['relative'].concat(_vm.labelClasses)) + "><div class=\"g-text-field-error text-red-500 text-sm absolute\"" + _vm._ssrStyle(null, null, {
    display: _vm.hasError ? '' : 'none'
  }) + ">" + _vm._ssrEscape("\n      " + _vm._s(_vm.errors[0]) + "\n    ") + "</div></div>")], 2);
};

var __vue_staticRenderFns__$1 = [];
/* style */

var __vue_inject_styles__$1 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-8baed86c_0", {
    source: ".append[data-v-8baed86c],.prepend[data-v-8baed86c],input[data-v-8baed86c]{transition:all .3s ease;-webkit-appearance:none;-moz-appearance:none;appearance:none}input[data-v-8baed86c]:focus{outline:0}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$1 = "data-v-8baed86c";
/* module identifier */

var __vue_module_identifier__$1 = "data-v-8baed86c";
/* functional template */

var __vue_is_functional_template__$1 = false;
/* style inject shadow dom */

var __vue_component__$1 = normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, createInjectorSSR, undefined);//
//
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
    classes: function classes() {
      return {};
    }
  }
};/* script */
var __vue_script__$2 = script$2;
/* template */

var __vue_render__$2 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: ['g-card rounded shadow bg-white', _vm.classes]
  }, [_vm.loading ? _vm._ssrNode("<div class=\"h-24 flex items-center justify-center\">", "</div>", [_c('g-loading-icon')], 1) : [_vm._t("default")]], 2);
};

var __vue_staticRenderFns__$2 = [];
/* style */

var __vue_inject_styles__$2 = undefined;
/* scoped */

var __vue_scope_id__$2 = undefined;
/* module identifier */

var __vue_module_identifier__$2 = "data-v-a1171e34";
/* functional template */

var __vue_is_functional_template__$2 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$2 = normalizeComponent({
  render: __vue_render__$2,
  staticRenderFns: __vue_staticRenderFns__$2
}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, undefined, undefined, undefined);//
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
    classes: function classes() {
      return {
        'justify-end': !this.left,
        'p-4': !this.flat,
        'p-2': this.flat
      };
    }
  }
};/* script */
var __vue_script__$3 = script$3;
/* template */

var __vue_render__$3 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: ['g-card-actions flex', _vm.classes]
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$3 = [];
/* style */

var __vue_inject_styles__$3 = undefined;
/* scoped */

var __vue_scope_id__$3 = undefined;
/* module identifier */

var __vue_module_identifier__$3 = "data-v-527fad4d";
/* functional template */

var __vue_is_functional_template__$3 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$3 = normalizeComponent({
  render: __vue_render__$3,
  staticRenderFns: __vue_staticRenderFns__$3
}, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, false, undefined, undefined, undefined);//
//
//
//
//
//
var script$4 = {
  name: 'GCardContent'
};/* script */
var __vue_script__$4 = script$4;
/* template */

var __vue_render__$4 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "g-card-content px-4 py-2"
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$4 = [];
/* style */

var __vue_inject_styles__$4 = undefined;
/* scoped */

var __vue_scope_id__$4 = undefined;
/* module identifier */

var __vue_module_identifier__$4 = "data-v-10e64eb9";
/* functional template */

var __vue_is_functional_template__$4 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$4 = normalizeComponent({
  render: __vue_render__$4,
  staticRenderFns: __vue_staticRenderFns__$4
}, __vue_inject_styles__$4, __vue_script__$4, __vue_scope_id__$4, __vue_is_functional_template__$4, __vue_module_identifier__$4, false, undefined, undefined, undefined);//
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
    classes: function classes() {
      return {
        'justify-center': this.center,
        'justify-between': !this.center
      };
    }
  }
};/* script */
var __vue_script__$5 = script$5;
/* template */

var __vue_render__$5 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "g-card-title p-4"
  }, [_vm._ssrNode("<h3" + _vm._ssrClass(null, ['m-0 flex items-center w-full', _vm.classes, _vm.headingClass]) + ">", "</h3>", [_vm._t("default")], 2)]);
};

var __vue_staticRenderFns__$5 = [];
/* style */

var __vue_inject_styles__$5 = undefined;
/* scoped */

var __vue_scope_id__$5 = undefined;
/* module identifier */

var __vue_module_identifier__$5 = "data-v-6af42b2c";
/* functional template */

var __vue_is_functional_template__$5 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$5 = normalizeComponent({
  render: __vue_render__$5,
  staticRenderFns: __vue_staticRenderFns__$5
}, __vue_inject_styles__$5, __vue_script__$5, __vue_scope_id__$5, __vue_is_functional_template__$5, __vue_module_identifier__$5, false, undefined, undefined, undefined);//
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
      validator: function validator(value) {
        return ['sm', 'md', 'lg'].indexOf(value) !== -1;
      }
    }
  },
  computed: {
    sizeClasses: function sizeClasses() {
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
};/* script */
var __vue_script__$6 = script$6;
/* template */

var __vue_render__$6 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: ['spinner', _vm.sizeClasses]
  }, [_vm._ssrNode("<div" + _vm._ssrClass(null, "double-bounce1 bg-" + _vm.color) + "></div> <div" + _vm._ssrClass(null, "double-bounce2 bg-" + _vm.color) + "></div>")]);
};

var __vue_staticRenderFns__$6 = [];
/* style */

var __vue_inject_styles__$6 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-4d36211d_0", {
    source: ".spinner[data-v-4d36211d]{position:relative}.double-bounce1[data-v-4d36211d],.double-bounce2[data-v-4d36211d]{width:100%;height:100%;border-radius:50%;opacity:.6;position:absolute;top:0;left:0;-webkit-animation:sk-bounce-data-v-4d36211d 2s infinite ease-in-out;animation:sk-bounce-data-v-4d36211d 2s infinite ease-in-out}.double-bounce2[data-v-4d36211d]{-webkit-animation-delay:-1s;animation-delay:-1s}@-webkit-keyframes sk-bounce-data-v-4d36211d{0%,100%{-webkit-transform:scale(0)}50%{-webkit-transform:scale(1)}}@keyframes sk-bounce-data-v-4d36211d{0%,100%{transform:scale(0);-webkit-transform:scale(0)}50%{transform:scale(1);-webkit-transform:scale(1)}}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$6 = "data-v-4d36211d";
/* module identifier */

var __vue_module_identifier__$6 = "data-v-4d36211d";
/* functional template */

var __vue_is_functional_template__$6 = false;
/* style inject shadow dom */

var __vue_component__$6 = normalizeComponent({
  render: __vue_render__$6,
  staticRenderFns: __vue_staticRenderFns__$6
}, __vue_inject_styles__$6, __vue_script__$6, __vue_scope_id__$6, __vue_is_functional_template__$6, __vue_module_identifier__$6, false, undefined, createInjectorSSR, undefined);//
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
      validator: function validator(value) {
        return ['sm', 'md', 'lg'].indexOf(value) !== -1;
      }
    },
    outline: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    listeners: function listeners() {
      return _objectSpread2({}, this.$listeners);
    },
    classes: function classes() {
      return [this.sizeClasses, this.colorClasses, this.textClasses];
    },
    sizeClasses: function sizeClasses() {
      switch (this.size) {
        case 'sm':
          return 'px-2 h-6 text-xs';

        case 'lg':
          return 'px-4 h-10 text-base';

        default:
          return 'px-3 h-8 text-sm';
      }
    },
    colorClasses: function colorClasses() {
      if (this.outline) return "bg-".concat(this.color, "-100 border border-").concat(this.color, "-500");
      if (this.color === 'gray') return "bg-".concat(this.color, "-200");
      return "bg-".concat(this.color, "-500 border border-").concat(this.color, "-500");
    },
    textClasses: function textClasses() {
      if (this.color === 'gray' && !this.outline) return 'text-gray-700';
      if (this.outline) return "text-".concat(this.color, "-500");
      return "text-white";
    }
  }
};/* script */
var __vue_script__$7 = script$7;
/* template */

var __vue_render__$7 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', _vm._g({
    class: ['inline-block whitespace-no-wrap rounded-full'].concat(_vm.classes)
  }, _vm.listeners), [_vm._ssrNode("<div class=\"flex items-center leading-none h-full\">", "</div>", [_vm._t("default")], 2)]);
};

var __vue_staticRenderFns__$7 = [];
/* style */

var __vue_inject_styles__$7 = undefined;
/* scoped */

var __vue_scope_id__$7 = undefined;
/* module identifier */

var __vue_module_identifier__$7 = "data-v-638dc752";
/* functional template */

var __vue_is_functional_template__$7 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$7 = normalizeComponent({
  render: __vue_render__$7,
  staticRenderFns: __vue_staticRenderFns__$7
}, __vue_inject_styles__$7, __vue_script__$7, __vue_scope_id__$7, __vue_is_functional_template__$7, __vue_module_identifier__$7, false, undefined, undefined, undefined);//
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
    classes: function classes() {
      return _defineProperty({}, "bg-".concat(this.color, "-500"), true);
    },
    styles: function styles() {
      return {
        width: "".concat(this.radius * 2, "px"),
        height: "".concat(this.radius * 2, "px"),
        borderRadius: "".concat(this.radius, "px")
      };
    }
  }
};/* script */
var __vue_script__$8 = script$8;
/* template */

var __vue_render__$8 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: ['inline-block', _vm.classes],
    style: _vm.styles
  }, []);
};

var __vue_staticRenderFns__$8 = [];
/* style */

var __vue_inject_styles__$8 = undefined;
/* scoped */

var __vue_scope_id__$8 = "data-v-139feb89";
/* module identifier */

var __vue_module_identifier__$8 = "data-v-139feb89";
/* functional template */

var __vue_is_functional_template__$8 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$8 = normalizeComponent({
  render: __vue_render__$8,
  staticRenderFns: __vue_staticRenderFns__$8
}, __vue_inject_styles__$8, __vue_script__$8, __vue_scope_id__$8, __vue_is_functional_template__$8, __vue_module_identifier__$8, false, undefined, undefined, undefined);//
//
//
//
//
//
//
//
//
//
//
//
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
  data: function data() {
    return {
      tooltipText: 'Copy',
      copied: false
    };
  },
  methods: {
    copyToClipboard: function copyToClipboard() {
      var _this = this;

      this.$refs.contents.select();
      document.execCommand('copy');
      this.tooltipText = 'Copied!';
      this.copied = true;
      this.gSleep(2000).then(function () {
        _this.tooltipText = 'Copy';
        _this.copied = false;
      });
    }
  }
};/* script */
var __vue_script__$9 = script$9;
/* template */

var __vue_render__$9 = function __vue_render__() {
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
  })]), _vm._ssrNode(" "), _c('g-tooltip', {
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
  })], 1)], 1)], 1)])], 2);
};

var __vue_staticRenderFns__$9 = [];
/* style */

var __vue_inject_styles__$9 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-8d859488_0", {
    source: ".switch-enter-active[data-v-8d859488],.switch-leave-active[data-v-8d859488]{transition:all .1s}.switch-enter[data-v-8d859488],.switch-leave-to[data-v-8d859488]{opacity:0;transform:scale(0)}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$9 = "data-v-8d859488";
/* module identifier */

var __vue_module_identifier__$9 = "data-v-8d859488";
/* functional template */

var __vue_is_functional_template__$9 = false;
/* style inject shadow dom */

var __vue_component__$9 = normalizeComponent({
  render: __vue_render__$9,
  staticRenderFns: __vue_staticRenderFns__$9
}, __vue_inject_styles__$9, __vue_script__$9, __vue_scope_id__$9, __vue_is_functional_template__$9, __vue_module_identifier__$9, false, undefined, createInjectorSSR, undefined);//
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
    textStyles: function textStyles() {
      return {
        minWidth: "".concat(this.width, "px"),
        marginLeft: "-".concat(this.width / 2, "px")
      };
    }
  }
};/* script */
var __vue_script__$a = script$a;
/* template */

var __vue_render__$a = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "g-tooltip relative inline-block leading-none"
  }, [_vm._t("default"), _vm._ssrNode(" "), _vm._ssrNode("<span class=\"g-tooltip-text text-xs flex items-center justify-center\"" + _vm._ssrStyle(null, _vm.textStyles, null) + ">", "</span>", [_vm._t("text", [_vm._v(_vm._s(_vm.text))])], 2)], 2);
};

var __vue_staticRenderFns__$a = [];
/* style */

var __vue_inject_styles__$a = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-56501742_0", {
    source: ".g-tooltip-text[data-v-56501742]{visibility:hidden;@apply bg-gray-900 text-white text-center rounded px-2 py-2;position:absolute;z-index:1;bottom:125%;left:50%;opacity:0;transition:opacity .5s}.g-tooltip .g-tooltip-text[data-v-56501742]::after{content:\"\";position:absolute;top:100%;left:50%;margin-left:-5px;border-width:5px;border-style:solid;border-color:theme('colors.black.5') transparent transparent transparent}.g-tooltip:hover .g-tooltip-text[data-v-56501742]{visibility:visible;opacity:1}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$a = "data-v-56501742";
/* module identifier */

var __vue_module_identifier__$a = "data-v-56501742";
/* functional template */

var __vue_is_functional_template__$a = false;
/* style inject shadow dom */

var __vue_component__$a = normalizeComponent({
  render: __vue_render__$a,
  staticRenderFns: __vue_staticRenderFns__$a
}, __vue_inject_styles__$a, __vue_script__$a, __vue_scope_id__$a, __vue_is_functional_template__$a, __vue_module_identifier__$a, false, undefined, createInjectorSSR, undefined);//
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
    listeners: function listeners() {
      return _objectSpread2({}, this.$listeners);
    }
  }
};/* script */
var __vue_script__$b = script$b;
/* template */

var __vue_render__$b = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('i', _vm._g(_vm._b({
    class: "icon " + _vm.name
  }, 'i', _vm.$attrs, false), _vm.listeners), []);
};

var __vue_staticRenderFns__$b = [];
/* style */

var __vue_inject_styles__$b = undefined;
/* scoped */

var __vue_scope_id__$b = undefined;
/* module identifier */

var __vue_module_identifier__$b = "data-v-69944ea6";
/* functional template */

var __vue_is_functional_template__$b = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$b = normalizeComponent({
  render: __vue_render__$b,
  staticRenderFns: __vue_staticRenderFns__$b
}, __vue_inject_styles__$b, __vue_script__$b, __vue_scope_id__$b, __vue_is_functional_template__$b, __vue_module_identifier__$b, false, undefined, undefined, undefined);//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  data: function data() {
    return {
      showContent: false
    };
  },
  watch: {
    show: function show() {
      var _this = this;

      this.gSleep(1).then(function (res) {
        return _this.showContent = _this.show;
      });
    }
  },
  mounted: function mounted() {
    var _this2 = this;

    document.addEventListener('keydown', function (e) {
      if (_this2.escClose && e.keyCode == 27) {
        _this2.closeDialog();
      }
    });
  },
  computed: {
    contentClasses: function contentClasses() {
      return {};
    },
    contentStyles: function contentStyles() {
      return {
        maxWidth: this.maxWidthStr
      };
    },
    maxWidthStr: function maxWidthStr() {
      if (Number.isInteger(this.maxWidth)) return "".concat(this.maxWidth, "px");
      return this.maxWidth;
    }
  },
  methods: {
    closeDialog: function closeDialog() {
      this.$emit('close');
    }
  }
};/* script */
var __vue_script__$c = script$c;
/* template */

var __vue_render__$c = function __vue_render__() {
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
      "click": function click($event) {
        return _vm.closeDialog($event);
      }
    }
  }, [_c('g-icon', {
    staticClass: "text-3xl",
    attrs: {
      "name": "fas fa-times"
    }
  })], 1)], 1) : _vm._e()])]) : _vm._e(), _vm._v(" "), _vm._t("default")], 2) : _vm._e()])] : [_vm.show ? _vm._ssrNode("<div class=\"g-dialog flex justify-center items-center\">", "</div>", [_c('transition', {
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
      "click": function click($event) {
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
      "click": function click($event) {
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

var __vue_inject_styles__$c = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-43b54ffc_0", {
    source: ".g-dialog[data-v-43b54ffc]{position:fixed;z-index:9999;left:0;top:0;width:100%;height:100%;overflow:auto;background-color:#000;background-color:rgba(0,0,0,.4)}.g-dialog-content[data-v-43b54ffc]{max-height:90vh;overflow:scroll}.g-dialog-close-btn[data-v-43b54ffc]{position:absolute;right:5px;top:5px}.g-dialog-enter-active[data-v-43b54ffc]{animation:zoom-in-data-v-43b54ffc .3s}.g-dialog-leave-active[data-v-43b54ffc]{animation:zoom-in-data-v-43b54ffc .3s reverse}@keyframes zoom-in-data-v-43b54ffc{0%{opacity:0;transform:scale(0)}100%{opacity:1;transform:scale(1)}}.g-dialog-fullpage[data-v-43b54ffc]{z-index:99999;overflow-y:scroll}.g-fullpage-dialog-enter-active[data-v-43b54ffc]{animation:g-fullpage-dialog-data-v-43b54ffc .5s ease}.g-fullpage-dialog-leave-active[data-v-43b54ffc]{animation:g-fullpage-dialog-data-v-43b54ffc .5s reverse ease}@keyframes g-fullpage-dialog-data-v-43b54ffc{0%{margin-top:100%;height:300%}100%{margin-top:0;height:100%}}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$c = "data-v-43b54ffc";
/* module identifier */

var __vue_module_identifier__$c = "data-v-43b54ffc";
/* functional template */

var __vue_is_functional_template__$c = false;
/* style inject shadow dom */

var __vue_component__$c = normalizeComponent({
  render: __vue_render__$c,
  staticRenderFns: __vue_staticRenderFns__$c
}, __vue_inject_styles__$c, __vue_script__$c, __vue_scope_id__$c, __vue_is_functional_template__$c, __vue_module_identifier__$c, false, undefined, createInjectorSSR, undefined);//
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
  data: function data() {
    return {
      errors: []
    };
  },
  methods: {
    validate: function validate() {
      this.errors = [];
      this.recursiveValidate(this.$children);
      if (this.errors.length > 0) return false;
      return true;
    },
    recursiveValidate: function recursiveValidate(children) {
      var _this = this;

      children.forEach(function (child) {
        _this.validateInput(child);

        if (child.$children.length > 0) _this.recursiveValidate(child.$children);
      });
    },
    validateInput: function validateInput(input) {
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
    handleInputErrors: function handleInputErrors(errors) {
      if (errors && errors.length > 0) {
        var _this$errors;

        (_this$errors = this.errors).push.apply(_this$errors, _toConsumableArray(errors));
      }
    }
  }
};/* script */
var __vue_script__$d = script$d;
/* template */

var __vue_render__$d = function __vue_render__() {
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
      "submit": function submit($event) {
        $event.preventDefault();
        return _vm.$emit('submit');
      }
    }
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$d = [];
/* style */

var __vue_inject_styles__$d = undefined;
/* scoped */

var __vue_scope_id__$d = "data-v-402be848";
/* module identifier */

var __vue_module_identifier__$d = "data-v-402be848";
/* functional template */

var __vue_is_functional_template__$d = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$d = normalizeComponent({
  render: __vue_render__$d,
  staticRenderFns: __vue_staticRenderFns__$d
}, __vue_inject_styles__$d, __vue_script__$d, __vue_scope_id__$d, __vue_is_functional_template__$d, __vue_module_identifier__$d, false, undefined, undefined, undefined);//
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
  mounted: function mounted() {
    var _this = this;

    this.$children.forEach(function (item) {
      item.spacing = _this.spacing;
      item.vSpacing = _this.vSpacing;
    });
  }
};/* script */
var __vue_script__$e = script$e;
/* template */

var __vue_render__$e = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: "px-" + _vm.spacing / 2
  }, [_vm._ssrNode("<div" + _vm._ssrClass(null, ["flex -mx-" + this.spacing, {
    'flex-wrap': !_vm.noWrap
  }]) + ">", "</div>", [_vm._t("default")], 2)]);
};

var __vue_staticRenderFns__$e = [];
/* style */

var __vue_inject_styles__$e = undefined;
/* scoped */

var __vue_scope_id__$e = "data-v-32d9715c";
/* module identifier */

var __vue_module_identifier__$e = "data-v-32d9715c";
/* functional template */

var __vue_is_functional_template__$e = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$e = normalizeComponent({
  render: __vue_render__$e,
  staticRenderFns: __vue_staticRenderFns__$e
}, __vue_inject_styles__$e, __vue_script__$e, __vue_scope_id__$e, __vue_is_functional_template__$e, __vue_module_identifier__$e, false, undefined, undefined, undefined);//
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
  data: function data() {
    return {
      spacing: '4',
      vSpacing: '4'
    };
  }
};/* script */
var __vue_script__$f = script$f;
/* template */

var __vue_render__$f = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: ["px-" + this.spacing / 2 + " pb-" + this.vSpacing + " w-" + this.width]
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$f = [];
/* style */

var __vue_inject_styles__$f = undefined;
/* scoped */

var __vue_scope_id__$f = "data-v-ced57d98";
/* module identifier */

var __vue_module_identifier__$f = "data-v-ced57d98";
/* functional template */

var __vue_is_functional_template__$f = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$f = normalizeComponent({
  render: __vue_render__$f,
  staticRenderFns: __vue_staticRenderFns__$f
}, __vue_inject_styles__$f, __vue_script__$f, __vue_scope_id__$f, __vue_is_functional_template__$f, __vue_module_identifier__$f, false, undefined, undefined, undefined);//
//
//
//
//
//
var script$g = {
  name: 'GMenu'
};/* script */
var __vue_script__$g = script$g;
/* template */

var __vue_render__$g = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "g-menu py-2"
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$g = [];
/* style */

var __vue_inject_styles__$g = undefined;
/* scoped */

var __vue_scope_id__$g = "data-v-19c45c8c";
/* module identifier */

var __vue_module_identifier__$g = "data-v-19c45c8c";
/* functional template */

var __vue_is_functional_template__$g = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$g = normalizeComponent({
  render: __vue_render__$g,
  staticRenderFns: __vue_staticRenderFns__$g
}, __vue_inject_styles__$g, __vue_script__$g, __vue_scope_id__$g, __vue_is_functional_template__$g, __vue_module_identifier__$g, false, undefined, undefined, undefined);//
//
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
    tag: function tag() {
      if (this.to) return 'nuxt-link';
      if (this.href) return 'a';
      return 'div';
    },
    attrs: function attrs() {
      var attrs = {};
      if (this.to) attrs.to = this.to;
      if (this.href) attrs.href = this.href;
      return attrs;
    }
  }
};/* script */
var __vue_script__$h = script$h;
/* template */

var __vue_render__$h = function __vue_render__() {
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

var __vue_inject_styles__$h = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-bfcd2edc_0", {
    source: ".g-menu-item[data-v-bfcd2edc]{transition:background .3s ease;@apply text-gray-600 no-underline block;}.g-menu-item[data-v-bfcd2edc]:hover{@apply bg-gray-100 text-gray-800;}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$h = "data-v-bfcd2edc";
/* module identifier */

var __vue_module_identifier__$h = "data-v-bfcd2edc";
/* functional template */

var __vue_is_functional_template__$h = false;
/* style inject shadow dom */

var __vue_component__$h = normalizeComponent({
  render: __vue_render__$h,
  staticRenderFns: __vue_staticRenderFns__$h
}, __vue_inject_styles__$h, __vue_script__$h, __vue_scope_id__$h, __vue_is_functional_template__$h, __vue_module_identifier__$h, false, undefined, createInjectorSSR, undefined);//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  data: function data() {
    return {
      popoverXPosition: 0,
      popoverYPosition: 0,
      showPopover: false,
      isOverContent: false,
      isOverActivator: false,
      timer: null
    };
  },
  mounted: function mounted() {
    var activatorPosition = this.$refs.activator.getBoundingClientRect();

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
    position: function position() {
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
    contentClasses: function contentClasses() {
      return _defineProperty({}, "g-popover-contents-".concat(this.position), true);
    },
    contentStyles: function contentStyles() {
      return _objectSpread2({
        width: "".concat(this.width, "px"),
        height: this.height === 0 ? 'auto' : "".concat(this.height, "px")
      }, this.contentPostiton);
    },
    contentPostiton: function contentPostiton() {
      if (this.top) {
        return {
          left: "-".concat(this.popoverXPosition, "px"),
          top: "-".concat(this.popoverYPosition, "px")
        };
      } else {
        return {
          left: "-".concat(this.popoverXPosition, "px"),
          top: "".concat(this.popoverYPosition, "px")
        };
      }
    }
  },
  methods: {
    closePopover: function closePopover() {
      this.showPopover = false;
    },
    handleMouseover: function handleMouseover() {
      if (this.onHover) {
        var vm = this;
        this.timer = setTimeout(function () {
          vm.showPopover = true;
        }, 200);
      }
    },
    handleMouseout: function handleMouseout() {
      if (this.onHover) {
        var vm = this;
        clearTimeout(this.timer);
        this.timer = setTimeout(function () {
          if (!vm.isOverContent && !vm.isOverActivator) {
            vm.showPopover = false;
          }
        }, 200);
      }
    }
  }
};/* script */
var __vue_script__$i = script$i;
/* template */

var __vue_render__$i = function __vue_render__() {
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
  }, [_vm._ssrNode("<div class=\"activator inline-block\">", "</div>", [_vm._t("activator")], 2), _vm._ssrNode(" "), _c('transition', {
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
      "mouseover": function mouseover($event) {
        _vm.isOverContent = true;
      },
      "mouseout": function mouseout($event) {
        _vm.isOverContent = false;
      }
    }
  }, [_vm._t("default")], 2)])], 2);
};

var __vue_staticRenderFns__$i = [];
/* style */

var __vue_inject_styles__$i = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-e62a523e_0", {
    source: ".g-popover[data-v-e62a523e]{z-index:999}.popover-bottom-enter-active[data-v-e62a523e]{transform-origin:top center;animation:popover-in-data-v-e62a523e .25s;animation-timing-function:ease-in-out}.popover-bottom-leave-active[data-v-e62a523e]{transform-origin:top center;animation:popover-in-data-v-e62a523e .25s reverse;animation-timing-function:ease-in-out}@keyframes popover-in-data-v-e62a523e{0%{opacity:0;transform:skewX(3deg) translateY(3px)}100%{opacity:1;transform:skewX(0) translateY(0)}}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$i = "data-v-e62a523e";
/* module identifier */

var __vue_module_identifier__$i = "data-v-e62a523e";
/* functional template */

var __vue_is_functional_template__$i = false;
/* style inject shadow dom */

var __vue_component__$i = normalizeComponent({
  render: __vue_render__$i,
  staticRenderFns: __vue_staticRenderFns__$i
}, __vue_inject_styles__$i, __vue_script__$i, __vue_scope_id__$i, __vue_is_functional_template__$i, __vue_module_identifier__$i, false, undefined, createInjectorSSR, undefined);//
//
//
//
//
//
//
//
//
//
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
  data: function data() {
    return {
      visible: false
    };
  },
  created: function created() {
    var self = this;

    if (!this.snackbar.persistent) {
      this.gSleep(5000).then(function (res) {
        return self.$emit('closed', self.snackbar);
      });
    }
  },
  mounted: function mounted() {
    this.visible = true;
  },
  computed: {
    color: function color() {
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
    persistent: function persistent() {
      return !!this.snackbar.persistent;
    }
  },
  methods: {
    handleClose: function handleClose() {
      this.$emit('closed', this.snackbar);
    }
  }
};/* script */
var __vue_script__$j = script$j;
/* template */

var __vue_render__$j = function __vue_render__() {
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

var __vue_inject_styles__$j = undefined;
/* scoped */

var __vue_scope_id__$j = "data-v-628ea780";
/* module identifier */

var __vue_module_identifier__$j = "data-v-628ea780";
/* functional template */

var __vue_is_functional_template__$j = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$j = normalizeComponent({
  render: __vue_render__$j,
  staticRenderFns: __vue_staticRenderFns__$j
}, __vue_inject_styles__$j, __vue_script__$j, __vue_scope_id__$j, __vue_is_functional_template__$j, __vue_module_identifier__$j, false, undefined, undefined, undefined);//
//
//
//
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
    closeHandler: function closeHandler(snackbar) {
      this.$emit('closed', snackbar);
    }
  }
};/* script */
var __vue_script__$k = script$k;
/* template */

var __vue_render__$k = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "g-snackbar-list px-2 pt-2 sm:px-0"
  }, [_vm._ssrNode("<div class=\"g-snackbar-list-container\">", "</div>", _vm._l(_vm.snackbars, function (snackbar, index) {
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

var __vue_inject_styles__$k = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-69b4ea48_0", {
    source: ".g-snackbar-list[data-v-69b4ea48]{z-index:99999!important;display:flex;justify-content:center;position:fixed;top:0;left:0;width:400px;max-width:100%}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$k = "data-v-69b4ea48";
/* module identifier */

var __vue_module_identifier__$k = "data-v-69b4ea48";
/* functional template */

var __vue_is_functional_template__$k = false;
/* style inject shadow dom */

var __vue_component__$k = normalizeComponent({
  render: __vue_render__$k,
  staticRenderFns: __vue_staticRenderFns__$k
}, __vue_inject_styles__$k, __vue_script__$k, __vue_scope_id__$k, __vue_is_functional_template__$k, __vue_module_identifier__$k, false, undefined, createInjectorSSR, undefined);//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      validator: function validator(value) {
        return ['sm', 'md', 'lg'].indexOf(value) !== -1;
      }
    }
  },
  data: function data() {
    return {
      inputValue: '',
      textInputValue: '',
      showOptions: false
    };
  },
  watch: {
    value: function value(newVal) {
      this.inputValue = newVal;
      this.textInputValue = this.labelFor(newVal);
      this.validate(newVal);
    },
    showOptions: function showOptions(newVal) {
      if (newVal) {
        this.adjustScrollPosition();
      } else {
        this.clearIfNotOption();
        this.validate(this.textInputValue);
      }
    }
  },
  created: function created() {
    this.inputValue = this.value;
    this.textInputValue = this.labelFor(this.value);
  },
  computed: {
    chevronClasses: function chevronClasses() {
      return {
        'chevron-active': this.showOptions
      };
    },
    inputLabel: function inputLabel() {
      var _this = this;

      if (!this.value) return '';
      if (typeof this.options[0] === 'string' || this.options[0] instanceof String) return this.value;
      var selectedOption = this.options.find(function (option) {
        return option[_this.optionValue] === _this.inputValue;
      });

      if (selectedOption) {
        return selectedOption[this.optionText];
      } else {
        return this.value;
      }
    },
    _options: function _options() {
      var _this2 = this;

      if (this.filterable) {
        if (typeof this.options[0] === 'string' || this.options[0] instanceof String) {
          return this.options.filter(function (text) {
            return text.includes(_this2.value);
          });
        } else {
          var filteredTexts = this.options.map(function (options) {
            return options[_this2.optionText].toLowerCase();
          }).filter(function (text) {
            return text.includes(_this2.textInputValue.toLowerCase());
          });
          return this.options.filter(function (option) {
            return filteredTexts.includes(option[_this2.optionText].toLowerCase());
          });
        }
      } else {
        return this.options;
      }
    }
  },
  methods: {
    optionSelected: function optionSelected(option) {
      this.$emit('input', this.valueFor(option));
      this.showOptions = false;
    },
    textFor: function textFor(option) {
      if (typeof option === 'string' || option instanceof String) return option;
      return option[this.optionText];
    },
    labelFor: function labelFor(value) {
      var _this3 = this;

      if (!this.value) return '';
      if (typeof this.options[0] === 'string' || this.options[0] instanceof String) return value;
      var selectedOption = this.options.find(function (option) {
        return option[_this3.optionValue] === value;
      });

      if (selectedOption) {
        return selectedOption[this.optionText];
      } else {
        return value;
      }
    },
    valueFor: function valueFor(option) {
      if (typeof option === 'string' || option instanceof String) return option;
      return option[this.optionValue];
    },
    closeOptions: function closeOptions() {
      this.showOptions = false;
    },
    focusHandler: function focusHandler() {
      this.showOptions = true;
      this.$emit('focus');
    },
    adjustScrollPosition: function adjustScrollPosition() {
      var _this4 = this;

      this.$nextTick().then(function () {
        var el = _this4.$refs[_this4.name];
        var bounding = el.getBoundingClientRect();

        if (bounding.bottom > (window.innerHeight || document.documentElement.clientHeight)) {
          var currentScrollPos = document.documentElement.scrollTop;
          var overflow = bounding.bottom - Math.min(window.innerHeight, document.documentElement.clientHeight);
          var newPos = currentScrollPos + overflow + 50;
          window.scrollTo(0, newPos);
        }
      });
    },
    clearIfNotOption: function clearIfNotOption() {
      var _this5 = this;

      if (typeof this.options[0] === 'string' || this.options[0] instanceof String) {
        if (!this.options.includes(this.value)) this.value = '';
      } else {
        if (!this.options.map(function (option) {
          return option[_this5.optionValue];
        }).includes(this.value)) {
          this.inputValue = '';
          this.textInputValue = '';
        }
      }
    },
    validate: function validate(val) {
      this.$children.forEach(function (input) {
        if (typeof input.validate === 'function') {
          input.validate(val);
        }
      });
    }
  }
};/* script */
var __vue_script__$l = script$l;
/* template */

var __vue_render__$l = function __vue_render__() {
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
      callback: function callback($$v) {
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
      "click": function click($event) {
        !_vm.disabled ? _vm.showOptions = !_vm.showOptions : null;
      }
    },
    slot: "append"
  }, [_c('g-icon', {
    class: ['chevron text-gray-600', _vm.chevronClasses],
    attrs: {
      "name": "fas fa-chevron-down"
    }
  })], 1)]), _vm._ssrNode(" "), _vm._ssrNode("<div class=\"relative\">", "</div>", [_c('transition', {
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
        "click": function click($event) {
          return _vm.optionSelected(option);
        }
      }
    });
  }), 1) : _vm._e()]), _vm._ssrNode(" " + (_vm.showOptions ? "<div class=\"g-select-spacer w-full absolute\"></div>" : "<!---->"))], 2)], 2);
};

var __vue_staticRenderFns__$l = [];
/* style */

var __vue_inject_styles__$l = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-3da4b9ac_0", {
    source: ".g-select-options[data-v-3da4b9ac]{max-height:250px}.g-select-spacer[data-v-3da4b9ac]{height:300px}.chevron[data-v-3da4b9ac]{transition:transform .2s ease-in-out}.chevron-active[data-v-3da4b9ac]{transform:rotateZ(180deg)}.select-in-up-leave-active[data-v-3da4b9ac]{transition:all .3s ease}.select-in-up-enter[data-v-3da4b9ac],.select-in-up-leave-to[data-v-3da4b9ac]{opacity:0;transform:translateY(-10px)}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$l = "data-v-3da4b9ac";
/* module identifier */

var __vue_module_identifier__$l = "data-v-3da4b9ac";
/* functional template */

var __vue_is_functional_template__$l = false;
/* style inject shadow dom */

var __vue_component__$l = normalizeComponent({
  render: __vue_render__$l,
  staticRenderFns: __vue_staticRenderFns__$l
}, __vue_inject_styles__$l, __vue_script__$l, __vue_scope_id__$l, __vue_is_functional_template__$l, __vue_module_identifier__$l, false, undefined, createInjectorSSR, undefined);//
//
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
    classes: function classes() {
      return [this.sizeClasses];
    },
    sizeClasses: function sizeClasses() {
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
};/* script */
var __vue_script__$m = script$m;
/* template */

var __vue_render__$m = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: ['g-select-option text-gray-900 no-underline block cursor-pointer hover:bg-gray-100', _vm.classes]
  }, [_vm._ssrNode("<div class=\"flex items-center\">", "</div>", [_vm.icon ? _vm._ssrNode("<div class=\"w-8\">", "</div>", [_c('g-icon', {
    staticClass: "text-lg",
    attrs: {
      "name": _vm.icon
    }
  })], 1) : _vm._e(), _vm._ssrNode(" "), _vm._t("default", [_vm._v(_vm._s(_vm.text))])], 2)]);
};

var __vue_staticRenderFns__$m = [];
/* style */

var __vue_inject_styles__$m = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-5dd2240d_0", {
    source: ".g-select-option[data-v-5dd2240d]{transition:background .4s ease}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$m = "data-v-5dd2240d";
/* module identifier */

var __vue_module_identifier__$m = "data-v-5dd2240d";
/* functional template */

var __vue_is_functional_template__$m = false;
/* style inject shadow dom */

var __vue_component__$m = normalizeComponent({
  render: __vue_render__$m,
  staticRenderFns: __vue_staticRenderFns__$m
}, __vue_inject_styles__$m, __vue_script__$m, __vue_scope_id__$m, __vue_is_functional_template__$m, __vue_module_identifier__$m, false, undefined, createInjectorSSR, undefined);//
//
//
//
//
//
//
//
//
//
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
      validator: function validator(value) {
        return ['sm', 'md', 'lg'].indexOf(value) !== -1;
      }
    }
  },
  data: function data() {
    return {
      errors: []
    };
  },
  computed: {
    listeners: function listeners() {
      var _this = this;

      var vm = this;
      return _objectSpread2({}, this.$listeners, {
        change: function change(event) {
          vm.$emit('change', event.target.checked);
          if (_this.validateOn === 'change') vm.validate(event.target.checked);
        }
      });
    },
    hasError: function hasError() {
      return this.errors.length > 0;
    }
  },
  methods: {
    validate: function validate(val) {
      var _this2 = this;

      this.errors = [];
      if (this.rules && this.rules.length > 0) this.rules.forEach(function (rule) {
        var result = rule(val);
        if (typeof result === 'string') _this2.errors.push(result);
      });
    }
  }
};/* script */
var __vue_script__$n = script$n;
/* template */

var __vue_render__$n = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: {
      'mb-6': !_vm.noMargin
    }
  }, [_vm._ssrNode("<label" + _vm._ssrClass(null, "g-switch g-switch-" + _vm.size) + "><input type=\"checkbox\"" + _vm._ssrAttr("name", _vm.name) + _vm._ssrAttr("checked", _vm.checked) + _vm._ssrAttrs(_vm.$attrs) + "> <span" + _vm._ssrClass(null, ["slider slider-" + _vm.color + " slider-" + _vm.size, {
    round: _vm.round
  }]) + "></span></label> <div class=\"g-text-field-error text-red-500 text-sm absolute mt-1\"" + _vm._ssrStyle(null, null, {
    display: _vm.hasError ? '' : 'none'
  }) + ">" + _vm._ssrEscape("\n    " + _vm._s(_vm.errors[0]) + "\n  ") + "</div>")]);
};

var __vue_staticRenderFns__$n = [];
/* style */

var __vue_inject_styles__$n = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-35f8e4f9_0", {
    source: ".g-switch[data-v-35f8e4f9]{position:relative;display:inline-block}.g-switch input[data-v-35f8e4f9]{opacity:0;width:0;height:0}.slider[data-v-35f8e4f9]{@apply bg-gray-300;position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;-webkit-transition:.4s;transition:.4s}.slider[data-v-35f8e4f9]:before{@apply bg-white;position:absolute;content:\"\";-webkit-transition:.4s;transition:.4s}.slider.round[data-v-35f8e4f9]:before{border-radius:50%}input:checked+.slider-blue[data-v-35f8e4f9]{@apply bg-blue-500;}input:focus+.slider-blue[data-v-35f8e4f9]{box-shadow:0 0 1px theme('colors.blue-500')}input:checked+.slider-red[data-v-35f8e4f9]{@apply bg-red-500;}input:focus+.slider-red[data-v-35f8e4f9]{box-shadow:0 0 1px theme('colors.red-500')}input:checked+.slider-green[data-v-35f8e4f9]{@apply bg-green-500;}input:focus+.slider-green[data-v-35f8e4f9]{box-shadow:0 0 1px theme('colors.green-500')}input:checked+.slider-orange[data-v-35f8e4f9]{@apply bg-orange-500;}input:focus+.slider-orange[data-v-35f8e4f9]{box-shadow:0 0 1px theme('colors.orange-500')}input:checked+.slider-gray[data-v-35f8e4f9]{@apply bg-gray-900;}input:focus+.slider-gray[data-v-35f8e4f9]{box-shadow:0 0 1px theme('colors.gray-900')}input:checked+.slider-primary[data-v-35f8e4f9]{@apply bg-primary-500;}input:focus+.slider-primary[data-v-35f8e4f9]{box-shadow:0 0 1px theme('colors.primary-500')}input:checked+.slider-black[data-v-35f8e4f9]{@apply bg-black;}input:focus+.slider-black[data-v-35f8e4f9]{box-shadow:0 0 1px theme('colors.black')}.g-switch-sm[data-v-35f8e4f9]{width:30px;height:20px}.slider-sm[data-v-35f8e4f9]:before{height:12px;width:12px;left:4px;bottom:4px}.slider-sm.round[data-v-35f8e4f9]{border-radius:20px}input:checked+.slider-sm[data-v-35f8e4f9]:before{-webkit-transform:translateX(10px);-ms-transform:translateX(10px);transform:translateX(10px)}.g-switch-md[data-v-35f8e4f9]{width:50px;height:30px}.slider-md[data-v-35f8e4f9]:before{height:22px;width:22px;left:4px;bottom:4px}.slider-md.round[data-v-35f8e4f9]{border-radius:30px}input:checked+.slider-md[data-v-35f8e4f9]:before{-webkit-transform:translateX(20px);-ms-transform:translateX(20px);transform:translateX(20px)}.g-switch-lg[data-v-35f8e4f9]{width:70px;height:40px}.slider-lg[data-v-35f8e4f9]:before{height:32px;width:32px;left:4px;bottom:4px}.slider-lg.round[data-v-35f8e4f9]{border-radius:40px}input:checked+.slider-lg[data-v-35f8e4f9]:before{-webkit-transform:translateX(30px);-ms-transform:translateX(30px);transform:translateX(30px)}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$n = "data-v-35f8e4f9";
/* module identifier */

var __vue_module_identifier__$n = "data-v-35f8e4f9";
/* functional template */

var __vue_is_functional_template__$n = false;
/* style inject shadow dom */

var __vue_component__$n = normalizeComponent({
  render: __vue_render__$n,
  staticRenderFns: __vue_staticRenderFns__$n
}, __vue_inject_styles__$n, __vue_script__$n, __vue_scope_id__$n, __vue_is_functional_template__$n, __vue_module_identifier__$n, false, undefined, createInjectorSSR, undefined);//
var script$o = {
  name: 'GCode',
  components: {
    GBtn: __vue_component__,
    GDot: __vue_component__$8
  },
  props: {
    langs: {
      type: Array,
      default: function _default() {
        return ['ruby', 'python', 'javascript', 'bash', 'html'];
      }
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
  data: function data() {
    return {
      internalLang: '',
      langLabels: {
        ruby: 'Ruby',
        python: 'Python',
        javascript: 'Javascript',
        bash: 'Bash',
        html: 'HTML'
      }
    };
  },
  created: function created() {
    this.internalLang = this.lang;
  },
  computed: {
    selectedCodeSnippet: function selectedCodeSnippet() {
      return this.code[this.internalLang];
    },
    classes: function classes() {
      return {};
    }
  },
  methods: {
    changeLangTo: function changeLangTo(lang) {
      this.internalLang = lang;
    },
    isActive: function isActive(lang) {
      return this.internalLang === lang;
    },
    labelFor: function labelFor(lang) {
      return this.langLabels[lang];
    }
  }
};/* script */
var __vue_script__$o = script$o;
/* template */

var __vue_render__$o = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: ['g-code', _vm.classes, _vm.shadow]
  }, [_vm._ssrNode("<div class=\"header bg-black w-full block rounded-t px-2 py-1\">", "</div>", [_vm._ssrNode("<div class=\"contents flex justify-between\">", "</div>", [_vm._ssrNode("<div class=\"fake-controls\">", "</div>", [_c('g-dot', {
    staticClass: "mr-2",
    attrs: {
      "color": "red"
    }
  }), _vm._ssrNode(" "), _c('g-dot', {
    staticClass: "mr-2",
    attrs: {
      "color": "orange"
    }
  }), _vm._ssrNode(" "), _c('g-dot', {
    attrs: {
      "color": "green"
    }
  })], 2), _vm._ssrNode(" "), _vm._ssrNode("<div class=\"nav text-white\">", "</div>", _vm._l(_vm.langs, function (lang, i) {
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
        "click": function click($event) {
          return _vm.changeLangTo(lang);
        }
      }
    }, [_vm._v("\n          " + _vm._s(_vm.labelFor(lang)) + "\n        ")]);
  }), 1)], 2)]), _vm._ssrNode(" "), _vm._ssrNode("<div class=\"code-container bg-black rounded-b\">", "</div>", [_c('pre', {
    directives: [{
      name: "highlightjs",
      rawName: "v-highlightjs",
      value: _vm.selectedCodeSnippet,
      expression: "selectedCodeSnippet"
    }]
  }, [_vm._ssrNode("<code" + _vm._ssrClass(null, [_vm.internalLang, 'rounded p-4']) + "></code>")])])], 2);
};

var __vue_staticRenderFns__$o = [];
/* style */

var __vue_inject_styles__$o = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-fa7fba26_0", {
    source: ".code-is-active{border:1px solid rgba(255,255,255,.5)}.code-container{width:100%;min-height:100px}code{@apply .text-sm;overflow:hidden;white-space:pre-wrap;background:0 0}.hljs{display:block;overflow-x:auto;color:#abb2bf}.hljs-comment,.hljs-quote{color:#5c6370;font-style:italic}.hljs-doctag,.hljs-formula,.hljs-keyword{color:#c678dd}.hljs-deletion,.hljs-name,.hljs-section,.hljs-selector-tag,.hljs-subst{color:#e06c75}.hljs-literal{color:#56b6c2}.hljs-addition,.hljs-attribute,.hljs-meta-string,.hljs-regexp,.hljs-string{color:#98c379}.hljs-built_in,.hljs-class .hljs-title{color:#e6c07b}.hljs-attr,.hljs-number,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-pseudo,.hljs-template-variable,.hljs-type,.hljs-variable{color:#d19a66}.hljs-bullet,.hljs-link,.hljs-meta,.hljs-selector-id,.hljs-symbol,.hljs-title{color:#61aeee}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}.hljs-link{text-decoration:underline}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$o = undefined;
/* module identifier */

var __vue_module_identifier__$o = "data-v-fa7fba26";
/* functional template */

var __vue_is_functional_template__$o = false;
/* style inject shadow dom */

var __vue_component__$o = normalizeComponent({
  render: __vue_render__$o,
  staticRenderFns: __vue_staticRenderFns__$o
}, __vue_inject_styles__$o, __vue_script__$o, __vue_scope_id__$o, __vue_is_functional_template__$o, __vue_module_identifier__$o, false, undefined, createInjectorSSR, undefined);//
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
    listeners: function listeners() {
      return _objectSpread2({}, this.$listeners);
    },
    textColor: function textColor() {
      if (this.color === 'black') return "text-gray-800 hover:text-".concat(this.color);
      return "text-".concat(this.color, "-500 hover:text-").concat(this.color, "-400 ");
    }
  }
};/* script */
var __vue_script__$p = script$p;
/* template */

var __vue_render__$p = function __vue_render__() {
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

var __vue_inject_styles__$p = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-67a69141_0", {
    source: ".g-link{transition:all .3s ease}",
    map: undefined,
    media: "screen"
  });
};
/* scoped */


var __vue_scope_id__$p = undefined;
/* module identifier */

var __vue_module_identifier__$p = "data-v-67a69141";
/* functional template */

var __vue_is_functional_template__$p = false;
/* style inject shadow dom */

var __vue_component__$p = normalizeComponent({
  render: __vue_render__$p,
  staticRenderFns: __vue_staticRenderFns__$p
}, __vue_inject_styles__$p, __vue_script__$p, __vue_scope_id__$p, __vue_is_functional_template__$p, __vue_module_identifier__$p, false, undefined, createInjectorSSR, undefined);//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      validator: function validator(value) {
        return ['blue', 'red', 'green', 'orange', 'white', 'black'].indexOf(value) !== -1;
      }
    }
  },
  data: function data() {
    return {
      tabs: []
    };
  },
  mounted: function mounted() {
    this.tabs = this.$children.filter(function (tab) {
      return tab.$options._componentTag == 'g-tab';
    });
    this.setDefaultActiveTab();
  },
  computed: {
    activeTab: function activeTab() {
      return this.tabs.find(function (tab) {
        return tab.isActive;
      });
    }
  },
  methods: {
    clicked: function clicked(tab) {
      this.tabs.forEach(function (t) {
        return t.isActive = t === tab;
      });
      this.$emit('changed', this.activeTab);
    },
    setDefaultActiveTab: function setDefaultActiveTab() {
      if (!this.activeTab) this.tabs[0].isActive = true;
    },
    btnTextClasses: function btnTextClasses(tab) {
      var _ref;

      return _ref = {
        'w-full cursor-pointer flex flex-col justify-between h-full hover:no-underline': true
      }, _defineProperty(_ref, "active text-".concat(this.color, "-500"), tab.isActive), _defineProperty(_ref, "active text-gray-600 hover:text-gray-800", !tab.isActive), _defineProperty(_ref, 'text-right', this.right), _ref;
    },
    btnBarClasses: function btnBarClasses(tab) {
      return _defineProperty({
        'w-full h-px': true
      }, "active bg-".concat(this.color, "-500"), tab.isActive);
    },
    componentFor: function componentFor(tab) {
      if (tab.to) return 'nuxt-link';
      return 'div';
    },
    attrsFor: function attrsFor(tab) {
      var attrs = {};
      if (tab.to) attrs.to = tab.to;
      return attrs;
    }
  }
};/* script */
var __vue_script__$q = script$q;
/* template */

var __vue_render__$q = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "g-tabs w-full"
  }, [_vm._ssrNode("<div class=\"tab-btns flex flex-col h-full\">", "</div>", [_vm._ssrNode("<div" + _vm._ssrClass(null, ['flex h-full', {
    'justify-end': _vm.right
  }]) + ">", "</div>", _vm._l(_vm.tabs, function (tab, i) {
    return _c(_vm.componentFor(tab), _vm._b({
      key: i,
      tag: "component",
      class: _vm.btnTextClasses(tab),
      on: {
        "click": function click($event) {
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
  }), 1)]), _vm._ssrNode(" "), _vm._ssrNode("<div class=\"tab-panels\">", "</div>", [_vm._t("default")], 2)], 2);
};

var __vue_staticRenderFns__$q = [];
/* style */

var __vue_inject_styles__$q = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-b78dd494_0", {
    source: ".g-tabs-label[data-v-b78dd494]{transition:color .3s ease}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$q = "data-v-b78dd494";
/* module identifier */

var __vue_module_identifier__$q = "data-v-b78dd494";
/* functional template */

var __vue_is_functional_template__$q = false;
/* style inject shadow dom */

var __vue_component__$q = normalizeComponent({
  render: __vue_render__$q,
  staticRenderFns: __vue_staticRenderFns__$q
}, __vue_inject_styles__$q, __vue_script__$q, __vue_scope_id__$q, __vue_is_functional_template__$q, __vue_module_identifier__$q, false, undefined, createInjectorSSR, undefined);//
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
  data: function data() {
    return {
      isActive: false
    };
  },
  watch: {
    active: function active(newVal) {
      this.isActive = this.active;
    }
  },
  created: function created() {
    this.isActive = this.active;
  }
};/* script */
var __vue_script__$r = script$r;
/* template */

var __vue_render__$r = function __vue_render__() {
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

var __vue_inject_styles__$r = undefined;
/* scoped */

var __vue_scope_id__$r = "data-v-ec0e3f38";
/* module identifier */

var __vue_module_identifier__$r = "data-v-ec0e3f38";
/* functional template */

var __vue_is_functional_template__$r = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$r = normalizeComponent({
  render: __vue_render__$r,
  staticRenderFns: __vue_staticRenderFns__$r
}, __vue_inject_styles__$r, __vue_script__$r, __vue_scope_id__$r, __vue_is_functional_template__$r, __vue_module_identifier__$r, false, undefined, undefined, undefined);//
//
//
//
//
//
//
//
//
//
//
//
//
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
      validator: function validator(value) {
        return ['small', 'medium', 'large'].indexOf(value) !== -1;
      }
    }
  },
  data: function data() {
    return {
      hovered: false,
      errors: []
    };
  },
  computed: {
    listeners: function listeners() {
      var _this = this;

      var vm = this;
      return _objectSpread2({}, this.$listeners, {
        change: function change(event) {
          vm.$emit('change', event.target.checked);
          if (_this.validateOn === 'change') vm.validate(event.target.checked);
        }
      });
    },
    hasError: function hasError() {
      return this.errors.length > 0;
    },
    checkboxClasses: function checkboxClasses() {
      return _defineProperty({}, "g-checkbox-".concat(this.size), true);
    },
    checkmarkClasses: function checkmarkClasses() {
      var _ref2;

      return _ref2 = {
        'bg-gray-300': !this.checked && !this.hovered,
        'bg-gray-400': !this.checked && this.hovered
      }, _defineProperty(_ref2, "bg-".concat(this.color, "-500"), this.checked), _defineProperty(_ref2, "g-checkmark-".concat(this.size), true), _ref2;
    }
  },
  methods: {
    validate: function validate(val) {
      var _this2 = this;

      this.errors = [];
      if (this.rules && this.rules.length > 0) this.rules.forEach(function (rule) {
        var result = rule(val);
        if (typeof result === 'string') _this2.errors.push(result);
      });
    }
  }
};/* script */
var __vue_script__$s = script$s;
/* template */

var __vue_render__$s = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: {
      'mb-6': !_vm.noMargin
    }
  }, [_vm._ssrNode("<label" + _vm._ssrClass(null, ['g-checkbox', _vm.checkboxClasses]) + ">", "</label>", [_vm._t("default", [_vm._v(_vm._s(_vm.label))]), _vm._ssrNode(" <input type=\"checkbox\"" + _vm._ssrAttr("name", _vm.name) + _vm._ssrAttr("checked", _vm.checked) + _vm._ssrAttrs(_vm.$attrs) + "> <span" + _vm._ssrClass(null, ['checkmark', _vm.checkmarkClasses]) + "></span>")], 2), _vm._ssrNode(" <div class=\"g-text-field-error text-red-500 text-sm absolute mt-1\"" + _vm._ssrStyle(null, null, {
    display: _vm.hasError ? '' : 'none'
  }) + ">" + _vm._ssrEscape("\n    " + _vm._s(_vm.errors[0]) + "\n  ") + "</div>")], 2);
};

var __vue_staticRenderFns__$s = [];
/* style */

var __vue_inject_styles__$s = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-76b9f181_0", {
    source: ".g-checkbox[data-v-76b9f181]{display:block;position:relative;padding-left:35px;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.g-checkbox-small[data-v-76b9f181]{@apply text-sm;}.g-checkbox-medium[data-v-76b9f181]{@apply text-base;}.g-checkbox-large[data-v-76b9f181]{@apply text-lg;}.g-checkbox input[data-v-76b9f181]{position:absolute;opacity:0;cursor:pointer;height:0;width:0}.checkmark[data-v-76b9f181]{@apply rounded;position:absolute;top:0;left:0}.g-checkbox-small[data-v-76b9f181]{height:20px}.g-checkmark-small[data-v-76b9f181]{height:20px;width:20px}.g-checkbox-medium[data-v-76b9f181]{height:25px}.g-checkmark-medium[data-v-76b9f181]{height:25px;width:25px}.checkmark[data-v-76b9f181]:after{content:\"\";position:absolute;display:none}.g-checkbox input:checked~.checkmark[data-v-76b9f181]:after{display:block}.g-checkbox-medium .checkmark[data-v-76b9f181]:after{left:7.5px;top:3.5px;width:10px;height:15px;border:solid #fff;border-width:0 5px 5px 0;-webkit-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg)}.g-checkbox-small .checkmark[data-v-76b9f181]:after{left:6.5px;top:3px;width:7px;height:12px;border:solid #fff;border-width:0 3.5px 3.5px 0;-webkit-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg)}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$s = "data-v-76b9f181";
/* module identifier */

var __vue_module_identifier__$s = "data-v-76b9f181";
/* functional template */

var __vue_is_functional_template__$s = false;
/* style inject shadow dom */

var __vue_component__$s = normalizeComponent({
  render: __vue_render__$s,
  staticRenderFns: __vue_staticRenderFns__$s
}, __vue_inject_styles__$s, __vue_script__$s, __vue_scope_id__$s, __vue_is_functional_template__$s, __vue_module_identifier__$s, false, undefined, createInjectorSSR, undefined);//
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
};/* script */
var __vue_script__$t = script$t;
/* template */

var __vue_render__$t = function __vue_render__() {
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
  }, []);
};

var __vue_staticRenderFns__$t = [];
/* style */

var __vue_inject_styles__$t = undefined;
/* scoped */

var __vue_scope_id__$t = "data-v-ee2d7148";
/* module identifier */

var __vue_module_identifier__$t = "data-v-ee2d7148";
/* functional template */

var __vue_is_functional_template__$t = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$t = normalizeComponent({
  render: __vue_render__$t,
  staticRenderFns: __vue_staticRenderFns__$t
}, __vue_inject_styles__$t, __vue_script__$t, __vue_scope_id__$t, __vue_is_functional_template__$t, __vue_module_identifier__$t, false, undefined, undefined, undefined);//
//
//
//
//
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
    sizePx: function sizePx() {
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
    containerStyles: function containerStyles() {
      var top = -this.sizePx / 4 * 2 / 3;
      return {
        width: "".concat(this.sizePx, "px"),
        height: "".concat(this.sizePx, "px"),
        top: "".concat(top, "px")
      };
    },
    squareStyles: function squareStyles() {
      var top = -this.sizePx / 4 * 2 / 3;
      var margin = this.sizePx / 4 / 3;
      return {
        width: "".concat(this.sizePx / 4, "px"),
        height: "".concat(this.sizePx / 4, "px"),
        top: "".concat(top, "px"),
        marginRight: "".concat(margin, "px"),
        marginTop: "".concat(margin, "px")
      };
    }
  }
};/* script */
var __vue_script__$u = script$u;
/* template */

var __vue_render__$u = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "self-building-square-spinner",
    style: _vm.containerStyles
  }, [_vm._ssrNode("<div" + _vm._ssrClass(null, ["square bg-" + _vm.color]) + _vm._ssrStyle(null, _vm.squareStyles, null) + "></div> <div" + _vm._ssrClass(null, ["square bg-" + _vm.color]) + _vm._ssrStyle(null, _vm.squareStyles, null) + "></div> <div" + _vm._ssrClass(null, ["square bg-" + _vm.color]) + _vm._ssrStyle(null, _vm.squareStyles, null) + "></div> <div" + _vm._ssrClass(null, ["square clear bg-" + _vm.color]) + _vm._ssrStyle(null, _vm.squareStyles, null) + "></div> <div" + _vm._ssrClass(null, ["square bg-" + _vm.color]) + _vm._ssrStyle(null, _vm.squareStyles, null) + "></div> <div" + _vm._ssrClass(null, ["square bg-" + _vm.color]) + _vm._ssrStyle(null, _vm.squareStyles, null) + "></div> <div" + _vm._ssrClass(null, ["square clear bg-" + _vm.color]) + _vm._ssrStyle(null, _vm.squareStyles, null) + "></div> <div" + _vm._ssrClass(null, ["square bg-" + _vm.color]) + _vm._ssrStyle(null, _vm.squareStyles, null) + "></div> <div" + _vm._ssrClass(null, ["square bg-" + _vm.color]) + _vm._ssrStyle(null, _vm.squareStyles, null) + "></div>")]);
};

var __vue_staticRenderFns__$u = [];
/* style */

var __vue_inject_styles__$u = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-56d72917_0", {
    source: ".self-building-square-spinner[data-v-56d72917],.self-building-square-spinner *[data-v-56d72917]{box-sizing:border-box}.self-building-square-spinner .square[data-v-56d72917]{float:left;position:relative;opacity:0;animation:self-building-square-spinner-data-v-56d72917 6s infinite}.self-building-square-spinner .square[data-v-56d72917]:nth-child(1){animation-delay:calc(200ms * 6)}.self-building-square-spinner .square[data-v-56d72917]:nth-child(2){animation-delay:calc(200ms * 7)}.self-building-square-spinner .square[data-v-56d72917]:nth-child(3){animation-delay:calc(200ms * 8)}.self-building-square-spinner .square[data-v-56d72917]:nth-child(4){animation-delay:calc(200ms * 3)}.self-building-square-spinner .square[data-v-56d72917]:nth-child(5){animation-delay:calc(200ms * 4)}.self-building-square-spinner .square[data-v-56d72917]:nth-child(6){animation-delay:calc(200ms * 5)}.self-building-square-spinner .square[data-v-56d72917]:nth-child(7){animation-delay:calc(200ms * 0)}.self-building-square-spinner .square[data-v-56d72917]:nth-child(8){animation-delay:calc(200ms * 1)}.self-building-square-spinner .square[data-v-56d72917]:nth-child(9){animation-delay:calc(200ms * 2)}.self-building-square-spinner .clear[data-v-56d72917]{clear:both}@keyframes self-building-square-spinner-data-v-56d72917{0%{opacity:0}5%{opacity:1;top:0}50.9%{opacity:1;top:0}55.9%{opacity:0;top:inherit}}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$u = "data-v-56d72917";
/* module identifier */

var __vue_module_identifier__$u = "data-v-56d72917";
/* functional template */

var __vue_is_functional_template__$u = false;
/* style inject shadow dom */

var __vue_component__$u = normalizeComponent({
  render: __vue_render__$u,
  staticRenderFns: __vue_staticRenderFns__$u
}, __vue_inject_styles__$u, __vue_script__$u, __vue_scope_id__$u, __vue_is_functional_template__$u, __vue_module_identifier__$u, false, undefined, createInjectorSSR, undefined);//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      validator: function validator(value) {
        return ['small', 'medium', 'large'].indexOf(value) !== -1;
      }
    }
  },
  data: function data() {
    return {
      focussed: false,
      errors: []
    };
  },
  computed: {
    listeners: function listeners() {
      var _this = this;

      var vm = this;
      return _objectSpread2({}, this.$listeners, {
        input: function input(event) {
          vm.$emit('input', event.target.value);
          if (_this.validateOn === 'input') vm.validate(event.target.value);
        },
        focus: function focus(event) {
          vm.$emit('focus');
          vm.focussed = true;
        },
        blur: function blur(event) {
          vm.$emit('blur');
          vm.focussed = false;
          if (_this.validateOn === 'blur') vm.validate(event.target.value);
        }
      });
    },
    hasError: function hasError() {
      return this.errors.length > 0;
    },
    inputClasses: function inputClasses() {
      return [this.bgClasses, this.inputBorderClasses, this.textColorClasses, this.textClasses, this.cursorClasses, this.shadowClasses, this.sizeClasses, this.textSize];
    },
    labelClasses: function labelClasses() {
      return [this.textSize];
    },
    bgClasses: function bgClasses() {
      if (this.hasError) return 'bg-red-100';
      if (this.focussed && !this.raised) return 'bg-gray-100';
      if (this.raised) return 'bg-white';
      return 'bg-gray-300';
    },
    inputBorderClasses: function inputBorderClasses() {
      if (this.raised) return 'border border-white';
      if (this.hasError) return 'border border-red-500';
      return 'border border-gray-300';
    },
    shapeClasses: function shapeClasses() {
      if (this.prepend && this.append) return '';
      if (this.prepend) return 'rounded-r';
      if (this.append) return 'rounded-l';
      return 'rounded';
    },
    textColorClasses: function textColorClasses() {
      if (this.hasError) return 'text-red-500';
      return '';
    },
    textClasses: function textClasses() {
      if (this.disabled) return 'text-gray-600';
      if (this.uppercase) return 'uppercase';
      return '';
    },
    cursorClasses: function cursorClasses() {
      if (this.disabled) return 'cursor-not-allowed';
      return '';
    },
    shadowClasses: function shadowClasses() {
      if (this.raised) return 'shadow';
      return '';
    },
    textSize: function textSize() {
      switch (this.size) {
        case 'large':
          return 'text-lg';

        case 'small':
          return 'text-sm';

        default:
          return 'text-base';
      }
    },
    sizeClasses: function sizeClasses() {
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
    validate: function validate(val) {
      var _this2 = this;

      this.errors = [];
      if (this.rules && this.rules.length > 0) this.rules.forEach(function (rule) {
        var result = rule(val);
        if (typeof result === 'string') _this2.errors.push(result);
      });
    }
  }
};/* script */
var __vue_script__$v = script$v;
/* template */

var __vue_render__$v = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: ['g-textarea', {
      'mb-6': !_vm.noMargin
    }]
  }, [_vm._ssrNode("<div class=\"g-textarea-input-group\">", "</div>", [_vm.label ? _vm._ssrNode("<label" + _vm._ssrAttr("for", _vm.name) + _vm._ssrClass(null, _vm.labelClasses) + ">", "</label>", [_vm._ssrNode(_vm._ssrEscape(_vm._s(_vm.label) + "\n      ") + (_vm.required ? "<span>*</span>" : "<!---->"))], 2) : _vm._ssrNode("<label" + _vm._ssrAttr("for", _vm.name) + ">", "</label>", [_vm._t("label")], 2), _vm._ssrNode(" <div class=\"g-textarea-input flex\"><textarea" + _vm._ssrAttr("name", _vm.name) + _vm._ssrAttr("disabled", _vm.disabled) + " size=\"1\"" + _vm._ssrAttr("value", _vm.value) + _vm._ssrAttrs(_vm.$attrs) + _vm._ssrClass(null, ['w-full rounded  leading-none'].concat(_vm.inputClasses)) + "></textarea></div> <div" + _vm._ssrClass(null, ['relative'].concat(_vm.labelClasses)) + "><div class=\"g-text-field-error text-red-500 text-sm absolute\"" + _vm._ssrStyle(null, null, {
    display: _vm.hasError ? '' : 'none'
  }) + ">" + _vm._ssrEscape("\n        " + _vm._s(_vm.errors[0]) + "\n      ") + "</div></div>")], 2)]);
};

var __vue_staticRenderFns__$v = [];
/* style */

var __vue_inject_styles__$v = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-46d9d076_0", {
    source: "textarea[data-v-46d9d076]{transition:all .3s ease;-webkit-appearance:none;-moz-appearance:none;appearance:none;box-shadow:none}textarea[data-v-46d9d076]:focus{outline:0}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$v = "data-v-46d9d076";
/* module identifier */

var __vue_module_identifier__$v = "data-v-46d9d076";
/* functional template */

var __vue_is_functional_template__$v = false;
/* style inject shadow dom */

var __vue_component__$v = normalizeComponent({
  render: __vue_render__$v,
  staticRenderFns: __vue_staticRenderFns__$v
}, __vue_inject_styles__$v, __vue_script__$v, __vue_scope_id__$v, __vue_is_functional_template__$v, __vue_module_identifier__$v, false, undefined, createInjectorSSR, undefined);//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
};/* script */
var __vue_script__$w = script$w;
/* template */

var __vue_render__$w = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: "g-alert bg-white " + _vm.shadow + " rounded border-l-4 border-" + _vm.color + "-500"
  }, [!_vm.persistent ? _vm._ssrNode("<div class=\"relative\">", "</div>", [_vm._ssrNode("<div class=\"absolute right-0 mr-1 mt-1\">", "</div>", [_c('g-btn', {
    attrs: {
      "flat": "",
      "circle": "",
      "size": "sm",
      "color": "gray"
    },
    nativeOn: {
      "click": function click($event) {
        return _vm.$emit('close');
      }
    }
  }, [_c('g-icon', {
    staticClass: "text-sm text-gray-600",
    attrs: {
      "name": "fas fa-times"
    }
  })], 1)], 1)]) : _vm._e(), _vm._ssrNode(" "), _vm._ssrNode("<div class=\"flex items-center\">", "</div>", [_vm.icon ? _vm._ssrNode("<div class=\"px-6 flex items-center\">", "</div>", [_c('g-icon', {
    class: "text-2xl text-" + _vm.color + "-500",
    attrs: {
      "name": _vm.icon
    }
  })], 1) : _vm._e(), _vm._ssrNode(" "), _vm._ssrNode("<div" + _vm._ssrClass(null, ['w-full content py-6 pr-4', {
    'pl-4': !_vm.icon
  }]) + ">", "</div>", [_vm._ssrNode("<h3 class=\"font-medium text-lg mb-0\">", "</h3>", [_vm._t("title", [_vm._v("\n          " + _vm._s(_vm.title) + "\n        ")])], 2), _vm._ssrNode(" "), _vm._ssrNode("<div class=\"text-gray-700\">", "</div>", [_vm._t("default")], 2)], 2)], 2)], 2);
};

var __vue_staticRenderFns__$w = [];
/* style */

var __vue_inject_styles__$w = undefined;
/* scoped */

var __vue_scope_id__$w = "data-v-c5019222";
/* module identifier */

var __vue_module_identifier__$w = "data-v-c5019222";
/* functional template */

var __vue_is_functional_template__$w = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$w = normalizeComponent({
  render: __vue_render__$w,
  staticRenderFns: __vue_staticRenderFns__$w
}, __vue_inject_styles__$w, __vue_script__$w, __vue_scope_id__$w, __vue_is_functional_template__$w, __vue_module_identifier__$w, false, undefined, undefined, undefined);//
//
//
//
//
//
//
//
//
//
//
//
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
      validator: function validator(value) {
        return ['sm', 'md', 'lg'].indexOf(value) !== -1;
      }
    }
  },
  data: function data() {
    return {
      tooltipText: 'Copy',
      copied: false
    };
  },
  computed: {
    iconColor: function iconColor() {
      if (this.color === 'white' && !this.flat) return 'black';
      if (this.flat && this.color === 'black') return 'black';
      if (this.color === 'gray' && (this.flat || this.outline)) return 'gray-600';
      if (this.flat || this.outline) return this.color;
      return 'white';
    },
    iconSize: function iconSize() {
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
    copyToClipboard: function copyToClipboard() {
      var _this = this;

      this.$refs.contents.select();
      document.execCommand('copy');
      this.tooltipText = 'Copied!';
      this.copied = true;
      this.gSleep(2000).then(function () {
        _this.tooltipText = 'Copy';
        _this.copied = false;
      });
    }
  }
};/* script */
var __vue_script__$x = script$x;
/* template */

var __vue_render__$x = function __vue_render__() {
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
      "click": function click($event) {
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
  })], 1)], 1)], 1), _vm._ssrNode(" <textarea name=\"text\"" + _vm._ssrAttr("value", _vm.text) + " class=\"input -ml-2 absolute\"></textarea>")], 2);
};

var __vue_staticRenderFns__$x = [];
/* style */

var __vue_inject_styles__$x = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-68c68150_0", {
    source: ".switch-enter-active[data-v-68c68150],.switch-leave-active[data-v-68c68150]{transition:all .1s}.switch-enter[data-v-68c68150],.switch-leave-to[data-v-68c68150]{opacity:0;transform:scale(0)}.input[data-v-68c68150]{width:0;height:0;resize:none;border:none;outline:0}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$x = "data-v-68c68150";
/* module identifier */

var __vue_module_identifier__$x = "data-v-68c68150";
/* functional template */

var __vue_is_functional_template__$x = false;
/* style inject shadow dom */

var __vue_component__$x = normalizeComponent({
  render: __vue_render__$x,
  staticRenderFns: __vue_staticRenderFns__$x
}, __vue_inject_styles__$x, __vue_script__$x, __vue_scope_id__$x, __vue_is_functional_template__$x, __vue_module_identifier__$x, false, undefined, createInjectorSSR, undefined);//
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
  data: function data() {
    return {
      items: []
    };
  },
  mounted: function mounted() {
    this.items = this.$children.filter(function (child) {
      return child.$options._componentTag == 'g-vert-nav-item';
    });
    this.setItemData();
  },
  watch: {
    bgColor: function bgColor(newVal) {
      this.setItemData();
    }
  },
  methods: {
    setItemData: function setItemData() {
      var _this = this;

      this.items.forEach(function (item) {
        item.bgColor = _this.bgColor;
      });
    }
  }
};/* script */
var __vue_script__$y = script$y;
/* template */

var __vue_render__$y = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "flex flex-col"
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$y = [];
/* style */

var __vue_inject_styles__$y = undefined;
/* scoped */

var __vue_scope_id__$y = "data-v-53e1ea86";
/* module identifier */

var __vue_module_identifier__$y = "data-v-53e1ea86";
/* functional template */

var __vue_is_functional_template__$y = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$y = normalizeComponent({
  render: __vue_render__$y,
  staticRenderFns: __vue_staticRenderFns__$y
}, __vue_inject_styles__$y, __vue_script__$y, __vue_scope_id__$y, __vue_is_functional_template__$y, __vue_module_identifier__$y, false, undefined, undefined, undefined);//
//
//
//
//
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
  data: function data() {
    return {
      bgColor: 'white'
    };
  },
  computed: {
    listeners: function listeners() {
      return _objectSpread2({}, this.$listeners);
    },
    bgColorName: function bgColorName() {
      return this.bgColor.split('-')[0];
    },
    bgVariant: function bgVariant() {
      return Number(this.bgColor.split('-')[1]);
    },
    classes: function classes() {
      return ['nav-item flex justify-between p-3 rounded cursor-pointer font-medium', this.bgClasses, this.textClasses];
    },
    bgClasses: function bgClasses() {
      if (this.active) {
        if (this.bgVariant) return "bg-".concat(this.bgColorName, "-").concat(this.bgVariant + 100);
        return 'bg-gray-100';
      } else {
        return "bg-".concat(this.bgColor);
      }
    },
    textClasses: function textClasses() {
      if (this.active) {
        if (this.bgVariant) return "text-".concat(this.bgColorName, "-").concat(this.bgVariant + 600);
        return 'text-gray-700';
      } else {
        if (this.bgVariant) return "text-".concat(this.bgColorName, "-").concat(this.bgVariant + 400, " hover:text-").concat(this.bgColorName, "-").concat(this.bgVariant + 600);
        return 'text-gray-500 hover:text-gray-700';
      }
    },
    badgeClasses: function badgeClasses() {
      return ['py-px px-3 text-xs flex items-center justify-center rounded-full', this.badgeBgClass, this.textClasses];
    },
    badgeBgClass: function badgeBgClass() {
      if (this.active) {
        return "bg-".concat(this.bgColor);
      } else {
        if (this.bgVariant) return "bg-".concat(this.bgColorName, "-").concat(this.bgVariant + 100);
        return 'bg-gray-100';
      }
    }
  }
};/* script */
var __vue_script__$z = script$z;
/* template */

var __vue_render__$z = function __vue_render__() {
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

var __vue_inject_styles__$z = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-70c32154_0", {
    source: ".nav-item[data-v-70c32154]{transition:all .3s ease}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$z = "data-v-70c32154";
/* module identifier */

var __vue_module_identifier__$z = "data-v-70c32154";
/* functional template */

var __vue_is_functional_template__$z = false;
/* style inject shadow dom */

var __vue_component__$z = normalizeComponent({
  render: __vue_render__$z,
  staticRenderFns: __vue_staticRenderFns__$z
}, __vue_inject_styles__$z, __vue_script__$z, __vue_scope_id__$z, __vue_is_functional_template__$z, __vue_module_identifier__$z, false, undefined, createInjectorSSR, undefined);//
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
    classes: function classes() {
      var _ref;

      return _ref = {}, _defineProperty(_ref, "w-".concat(this.size, " h-").concat(this.size), true), _defineProperty(_ref, "bg-".concat(this.color), true), _ref;
    }
  }
};/* script */
var __vue_script__$A = script$A;
/* template */

var __vue_render__$A = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: ['flex items-center justify-center rounded-full', _vm.classes]
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$A = [];
/* style */

var __vue_inject_styles__$A = undefined;
/* scoped */

var __vue_scope_id__$A = "data-v-1a7a5fcf";
/* module identifier */

var __vue_module_identifier__$A = "data-v-1a7a5fcf";
/* functional template */

var __vue_is_functional_template__$A = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$A = normalizeComponent({
  render: __vue_render__$A,
  staticRenderFns: __vue_staticRenderFns__$A
}, __vue_inject_styles__$A, __vue_script__$A, __vue_scope_id__$A, __vue_is_functional_template__$A, __vue_module_identifier__$A, false, undefined, undefined, undefined);//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      validator: function validator(value) {
        return ['sm', 'md', 'lg'].indexOf(value) !== -1;
      }
    }
  },
  data: function data() {
    return {
      errors: []
    };
  },
  computed: {
    listeners: function listeners() {
      var vm = this;
      return _objectSpread2({}, this.$listeners, {
        input: function input(event) {
          vm.$emit('input', event.target.value);
          vm.validate(event.target.value);
        }
      });
    },
    hasError: function hasError() {
      return this.errors.length > 0;
    },
    selectClasses: function selectClasses() {
      return ['block appearance-none w-full pr-8 rounded leading-none focus:outline-none', this.borderClasses, this.textClasses, this.bgClasses, this.sizeClasses, this.textSize];
    },
    labelClasses: function labelClasses() {
      return [this.textSize];
    },
    borderClasses: function borderClasses() {
      if (this.hasError) return 'border border-red-500';
      if (this.raised) return 'border border-white';
      return "border border-gray-200 focus:border-".concat(this.color);
    },
    textClasses: function textClasses() {
      if (this.disabled) return 'text-gray-600';
      if (this.hasError) return 'text-red-500';
      return 'text-gray-700';
    },
    bgClasses: function bgClasses() {
      if (this.hasError) return 'bg-red-100';
      if (this.raised) return 'bg-white';
      return 'bg-gray-200 focus:bg-gray-100';
    },
    sizeClasses: function sizeClasses() {
      switch (this.size) {
        case 'lg':
          return 'h-16 px-4';

        case 'sm':
          return 'h-8 px-4';

        default:
          return 'h-12 px-4';
      }
    },
    textSize: function textSize() {
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
    optionValue: function optionValue(option) {
      if (typeof option === 'string' || option instanceof String) return option;
      return option.value;
    },
    optionLabel: function optionLabel(option) {
      if (typeof option === 'string' || option instanceof String) return option;
      return option.label;
    },
    validate: function validate(val) {
      var _this = this;

      this.errors = [];
      if (this.rules && this.rules.length > 0) this.rules.forEach(function (rule) {
        var result = rule(val);
        if (typeof result === 'string') _this.errors.push(result);
      });
    }
  }
};/* script */
var __vue_script__$B = script$B;
/* template */

var __vue_render__$B = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: [{
      'mb-6': !_vm.noMargin
    }]
  }, [_vm._ssrNode((_vm.label ? "<label" + _vm._ssrAttr("for", _vm.name) + _vm._ssrClass(null, _vm.labelClasses) + ">" + _vm._ssrEscape("\n    " + _vm._s(_vm.label) + "\n  ") + "</label>" : "<!---->") + " <div class=\"relative\"><select" + _vm._ssrAttr("name", _vm.name) + _vm._ssrAttr("value", _vm.value) + _vm._ssrAttrs(_vm.$attrs) + _vm._ssrClass(null, _vm.selectClasses) + ">" + (_vm.defaultText ? "<option value hidden=\"hidden\">" + _vm._ssrEscape(_vm._s(_vm.defaultText)) + "</option>" : "<!---->") + " " + _vm._ssrList(_vm.options, function (option, i) {
    return "<option" + _vm._ssrAttr("value", _vm.optionValue(option)) + ">" + _vm._ssrEscape("\n        " + _vm._s(_vm.optionLabel(option)) + "\n      ") + "</option>";
  }) + "</select> <div class=\"pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\" class=\"fill-current h-4 w-4\"><path d=\"M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z\"></path></svg></div></div> <div class=\"relative\"><div class=\"g-text-field-error text-red-500 text-sm absolute\"" + _vm._ssrStyle(null, null, {
    display: _vm.hasError ? '' : 'none'
  }) + ">" + _vm._ssrEscape("\n      " + _vm._s(_vm.errors[0]) + "\n    ") + "</div></div>")]);
};

var __vue_staticRenderFns__$B = [];
/* style */

var __vue_inject_styles__$B = undefined;
/* scoped */

var __vue_scope_id__$B = "data-v-f728c220";
/* module identifier */

var __vue_module_identifier__$B = "data-v-f728c220";
/* functional template */

var __vue_is_functional_template__$B = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$B = normalizeComponent({
  render: __vue_render__$B,
  staticRenderFns: __vue_staticRenderFns__$B
}, __vue_inject_styles__$B, __vue_script__$B, __vue_scope_id__$B, __vue_is_functional_template__$B, __vue_module_identifier__$B, false, undefined, undefined, undefined);//
//
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
};/* script */
var __vue_script__$C = script$C;
/* template */

var __vue_render__$C = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "flex"
  }, [_vm._ssrNode("<div" + _vm._ssrClass(null, "min-h-screen w-" + _vm.width + " bg-" + _vm.sidebarColor + " border-r border-gray-200") + ">", "</div>", [_vm._t("sidebar")], 2), _vm._ssrNode(" "), _vm._ssrNode("<div" + _vm._ssrClass(null, "min-h-screen w-full bg-" + _vm.contentColor) + ">", "</div>", [_vm._t("content")], 2)], 2);
};

var __vue_staticRenderFns__$C = [];
/* style */

var __vue_inject_styles__$C = undefined;
/* scoped */

var __vue_scope_id__$C = "data-v-0f2f3018";
/* module identifier */

var __vue_module_identifier__$C = "data-v-0f2f3018";
/* functional template */

var __vue_is_functional_template__$C = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$C = normalizeComponent({
  render: __vue_render__$C,
  staticRenderFns: __vue_staticRenderFns__$C
}, __vue_inject_styles__$C, __vue_script__$C, __vue_scope_id__$C, __vue_is_functional_template__$C, __vue_module_identifier__$C, false, undefined, undefined, undefined);var components=/*#__PURE__*/Object.freeze({__proto__:null,GBtn: __vue_component__,GTextInput: __vue_component__$1,GCard: __vue_component__$2,GCardActions: __vue_component__$3,GCardContent: __vue_component__$4,GCardTitle: __vue_component__$5,GLoadingIcon: __vue_component__$6,GChip: __vue_component__$7,GDot: __vue_component__$8,GCopyAndPaste: __vue_component__$9,GTooltip: __vue_component__$a,GIcon: __vue_component__$b,GDialog: __vue_component__$c,GForm: __vue_component__$d,GGrid: __vue_component__$e,GGridItem: __vue_component__$f,GMenu: __vue_component__$g,GMenuItem: __vue_component__$h,GPopover: __vue_component__$i,GSnackbar: __vue_component__$j,GSnackbarList: __vue_component__$k,GSelect: __vue_component__$l,GSelectOption: __vue_component__$m,GSwitch: __vue_component__$n,GCode: __vue_component__$o,GLink: __vue_component__$p,GTabs: __vue_component__$q,GTab: __vue_component__$r,GCheckbox: __vue_component__$s,GImg: __vue_component__$t,GBlockSpinner: __vue_component__$u,GTextarea: __vue_component__$v,GAlert: __vue_component__$w,GCopyBtn: __vue_component__$x,GVertNav: __vue_component__$y,GVertNavItem: __vue_component__$z,GCircle: __vue_component__$A,GSelectInput: __vue_component__$B,GLayoutSidebar: __vue_component__$C});var forms = {
  methods: {
    handleServerErrors: function handleServerErrors(serverErrors) {
      var _this = this;

      Object.keys(serverErrors).forEach(function (key) {
        _this.$refs[key].errors.push(serverErrors[key][0]);
      });
    }
  }
};var mixins=/*#__PURE__*/Object.freeze({__proto__:null,Forms: forms});var gClickOutside = {
  name: 'g-click-outside',
  directive: {
    bind: function bind(el, binding, vNode) {
      // Provided expression must evaluate to a function.
      if (typeof binding.value !== 'function') {
        var compName = vNode.context.name;
        var warn = "[Vue-g-click-outside:] provided expression '".concat(binding.expression, "' is not a function, but has to be");

        if (compName) {
          warn += "Found in component '".concat(compName, "'");
        }

        console.warn(warn);
      } // Define Handler and cache it on the element


      var bubble = binding.modifiers.bubble;

      var handler = function handler(e) {
        if (bubble || !el.contains(e.target) && el !== e.target) {
          binding.value(e);
        }
      };

      el.__vueGClickOutside__ = handler; // add Event Listeners

      document.addEventListener('click', handler);
    },
    unbind: function unbind(el, binding) {
      // Remove Event Listeners
      document.removeEventListener('click', el.__vueGClickOutside__);
      el.__vueGClickOutside__ = null;
    }
  }
};var directives=/*#__PURE__*/Object.freeze({__proto__:null,GClickOutside: gClickOutside});var install = function installGlue(Vue) {
  if (install.installed) return;
  install.installed = true;
  Object.entries(components).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        componentName = _ref2[0],
        component = _ref2[1];

    Vue.component(componentName, component);
  });
  Object.keys(mixins).forEach(function (mixin) {
    Vue.mixin(mixins[mixin]);
  });
  Object.keys(directives).forEach(function (directive) {
    Vue.directive(directives[directive].name, directives[directive].directive);
  });
}; // Create module definition for Vue.use()


var plugin = {
  install: install
}; // To auto-install on non-es builds, when vue is found
// eslint-disable-next-line no-redeclare

/* global window, global */

{
  var GlobalVue = null;

  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
  }

  if (GlobalVue) {
    GlobalVue.use(plugin);
  }
} // Default export is library as a whole, registered via Vue.use()
exports.GAlert=__vue_component__$w;exports.GBlockSpinner=__vue_component__$u;exports.GBtn=__vue_component__;exports.GCard=__vue_component__$2;exports.GCardActions=__vue_component__$3;exports.GCardContent=__vue_component__$4;exports.GCardTitle=__vue_component__$5;exports.GCheckbox=__vue_component__$s;exports.GChip=__vue_component__$7;exports.GCircle=__vue_component__$A;exports.GCode=__vue_component__$o;exports.GCopyAndPaste=__vue_component__$9;exports.GCopyBtn=__vue_component__$x;exports.GDialog=__vue_component__$c;exports.GDot=__vue_component__$8;exports.GForm=__vue_component__$d;exports.GGrid=__vue_component__$e;exports.GGridItem=__vue_component__$f;exports.GIcon=__vue_component__$b;exports.GImg=__vue_component__$t;exports.GLayoutSidebar=__vue_component__$C;exports.GLink=__vue_component__$p;exports.GLoadingIcon=__vue_component__$6;exports.GMenu=__vue_component__$g;exports.GMenuItem=__vue_component__$h;exports.GPopover=__vue_component__$i;exports.GSelect=__vue_component__$l;exports.GSelectInput=__vue_component__$B;exports.GSelectOption=__vue_component__$m;exports.GSnackbar=__vue_component__$j;exports.GSnackbarList=__vue_component__$k;exports.GSwitch=__vue_component__$n;exports.GTab=__vue_component__$r;exports.GTabs=__vue_component__$q;exports.GTextInput=__vue_component__$1;exports.GTextarea=__vue_component__$v;exports.GTooltip=__vue_component__$a;exports.GVertNav=__vue_component__$y;exports.GVertNavItem=__vue_component__$z;exports.default=plugin;