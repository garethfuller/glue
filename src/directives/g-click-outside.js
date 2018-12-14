const GClickOutside = {
  name: 'g-click-outside',
  directive: {
    bind: function(el, binding, vNode) {
      // Provided expression must evaluate to a function.
      if (typeof binding.value !== 'function') {
        const compName = vNode.context.name
        let warn = `[Vue-g-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`
        if (compName) { warn += `Found in component '${compName}'` }

        console.warn(warn)
      }
      // Define Handler and cache it on the element
      const bubble = binding.modifiers.bubble
      const handler = (e) => {
        if (bubble || (!el.contains(e.target) && el !== e.target)) {
          binding.value(e)
        }
      }
      el.__vueGClickOutside__ = handler

      // add Event Listeners
      document.addEventListener('click', handler)
    },

    unbind: function(el, binding) {
      // Remove Event Listeners
      document.removeEventListener('click', el.__vueGClickOutside__)
      el.__vueGClickOutside__ = null

    }
  }
}

export default GClickOutside;
