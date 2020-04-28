# Glue Vue
![npm (scoped)](https://img.shields.io/npm/v/@garethfuller/glue)

Glue Vue is a minimal [Vue](https://vuejs.org/) component library that uses [Tailwindcss](https://tailwindcss.com/) classes for customisation.

## Dependencies
### Required
[Tailwindcss](https://tailwindcss.com/) - Glue Vue expects that your project has Tailwind installed. The components then use the Tailwind classes provided by your Tailwind configuration.

For example, using the `g-btn` component:
```html
<g-btn color="red">Hello World</g-btn>
```
This will use your Tailwind colour class for `bg-red-500` as the background colour for the button, and variant classes for hover/active states.

### Optional
There are two optional dependencies, [Fontawesome](https://fontawesome.com/) and [highlight.js](https://highlightjs.org/), which are used in specific components. For more information on these dependencies and how to install them in your project please proceed to [Optional Dependencies](#optional-dependencies).

## Installation
1. Install npm package
```bash
npm install gluevue
# or with yarn
yarn add gluevue
```

2. Add a plugin to your Vue project

  Create a file like `glue.js` in your plugins folder and add the following to it's contents:
  ```javascript
  // plugins/glue.js
  import Vue from 'vue'
  import Glue from 'gluevue'

  Vue.use(Glue)
  ```

3. Import this plugin in your app's build step.

## Development
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```
