<template>
  <div id="app" class="p-8">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" integrity="sha384-gfdkjb5BdAXd+lj+gudLWI+BXq4IuLW5IT+brZEZsLFm++aCMlF1V92rMkPaX4PP" crossorigin="anonymous">

    <g-snackbar-list :snackbars="[
      {title: 'error', type: 'error', description: 'description', persistent: true, icon: 'fas fa-exclamation-triangle'},
      {title: 'API Key updated!', type: 'success', icon: 'fas fa-check-circle'}
    ]"/>

    <h1 class="my-8">Links</h1>
    <g-link to="/here" color="blue">Here</g-link><br>
    <g-link href="/here" color="red">Here</g-link>

    <h1 class="my-8">Btns</h1>

    <g-btn icon="fas fa-plus" size="small" class="mr-4" @click.native="showDialog = true">
      Filter
    </g-btn>
    <g-dialog :show="showDialog" @close="showDialog = false" close-btn full-page navbar border-color="green">
      some content
    </g-dialog>

    <g-btn icon="fas fa-plus" class="mr-4" color="red" outline>
      Filter
    </g-btn>

    <g-btn icon="fas fa-plus" size="large">
      Filter
    </g-btn>

    <g-btn icon circle>
      <g-icon name="fas fa-plus" />
    </g-btn>

    <nav class="bg-green w-full h-16 border-b border-white-dark mt-10">
      <div class="container mx-auto h-full flex justify-between items-center">
        <span>logo</span>
        <div>
          <g-popover left on-hover>
            <g-btn slot="activator" flat color="white">
              <g-icon name="fas fa-user-circle" class="pr-2"></g-icon>
              Hello world
            </g-btn>
            <g-menu>
              <g-menu-item>Business</g-menu-item>
              <g-menu-item>Logout</g-menu-item>
            </g-menu>
          </g-popover>
        </div>
      </div>
    </nav>



    <g-btn color="black">Hello World!</g-btn>
    <div class="bg-black p-8">
      <g-btn flat color="black">Hello World!</g-btn>
    </div>

    <h1 class="my-8">Inputs</h1>

    <div class="flex items-end">
      <div class="w-1/4">
        <g-text-field
          v-model="textInput"
          placeholder="Your name"
          label="Name"
          name="name"
          horizontal
          required
          size="small"
          validations="required"
          disabled
        />
      </div>

      <g-btn size="small" color="grey" outline>Save</g-btn>
    </div>

    <g-grid>
      <g-grid-item width="1/5">
        <g-text-field
          v-model="textInput"
          placeholder="Your name"
          label="Name"
          name="name"
          horizontal
          required
          size="large"
          validations="required"
          disabled
        />
        <g-select
          v-model="token"
          :items="selectOptions"
          name="token"
          item-text="label"
          item-value="value"
          validations="required"
          class="mt-4"
          required
          size="large"
          label="Token"
          filterable
        />
      </g-grid-item>
      <g-grid-item width="1/4">
        <g-checkbox
          name="terms_acceptance"
          validations="required"
          v-model="checkbox"
          :attrs="{ 'data-vv-as': 'terms acceptance' }"></g-checkbox>
        {{ checkbox }}
      </g-grid-item>
      <g-grid-item width="1/4">
        <g-tooltip text="delete">
          <g-chip color="grey">Employee</g-chip>
        </g-tooltip>

      </g-grid-item>
    </g-grid>

    <div class="flex w-1/4 flex-col">

      <!-- <g-text-field
        v-model="textInput"
        placeholder="Your name"
        label="Name"
        name="name"
        horizontal
        required
        validations="required"
      />

      <g-select
        v-model="token"
        :items="selectOptions"
        item-text="label"
        item-value="value"
        class="mt-4"
        required
        label="Token"
      />

      <g-select v-model="fiat" :items="['USD', 'EUR', 'GBP']" class="mt-4" label="Fiat"/> -->

      <g-switch v-model="switchVal" color="red" round class="mt-4"/>
      <g-switch v-model="switchVal" color="red" size="small" round class="mt-4"/>
      <g-switch v-model="switchVal" color="red" size="large" round class="mt-4"/>

      <g-code :code="codeSnippet" :langs="['html']" lang="html" />

    </div>

    <!-- <div class="mt-12 bg-white-dark p-8 w-full">
      <g-tabs @changed="changedTabHandler" color="orange">
        <g-tab name="Design" icon="fas fa-palette" no-panel>
          Design settings
        </g-tab>
        <g-tab name="Units" icon="fas fa-calculator" no-panel>
          Units settings
        </g-tab>
        <g-tab name="Token" icon="fas fa-coins" no-panel>
          Token settings
        </g-tab>
        <g-tab name="Fiat" icon="fas fa-dollar-sign" no-panel>
          Fiat settings
        </g-tab>
      </g-tabs>
    </div> -->

    <nav class="bg-white w-full h-16 border-b border-white-darker">
      <div class="container mx-auto h-full flex justify-between items-end">
        <g-tabs @changed="changedTabHandler" color="green">
          <g-tab name="Dashboard" icon="fas fa-th-large" no-panel to="/panel">
            Dashboard
          </g-tab>
          <g-tab name="Payees" icon="fas fa-users" no-panel>
            Payees
          </g-tab>
          <g-tab name="History" icon="fas fa-history" no-panel>
            History
          </g-tab>
          <g-tab name="Settings" icon="fas fa-cog" no-panel>
            Settings
          </g-tab>
        </g-tabs>
      </div>
    </nav>

    <div>
      <h1 class="my-8">Grid</h1>

      <g-grid spacing="2">
        <g-grid-item width="1/3">
          <div class="border h-64"></div>
        </g-grid-item>
        <g-grid-item width="1/3">
          <div class="border h-64"></div>
        </g-grid-item>
        <g-grid-item width="1/3">
          <div class="border h-64"></div>
        </g-grid-item>
      </g-grid>
    </div>

    <g-select
      v-model="token"
      :items="selectOptions"
      name="token"
      item-text="label"
      item-value="value"
      validations="required"
      class="mt-4"
      required
      size="large"
      label="Token"
    />

  </div>
</template>

<script>

export default {
  name: 'app',

  data() {
    return {
      textInput: '',
      token: '',
      switchVal: true,
      showDialog: false,
      selectOptions: [
        { value: 'none', label: 'None' },
        { value: 'sm', label: 'Small' },
        { value: 'md', label: 'Medium' },
        { value: 'lg', label: 'Large' }
      ],
      fiat: 'USD',
      checkbox: false
    };
  },

  computed: {
    codeSnippet() {
      return {
        html: this.htmlSnippet,
      };
    },

    htmlSnippet() {
      return `<script src="https://cdn.jsdelivr.net/gh/coinponent/coinponent@1.0.2/dist/coinponent.js"><\/script>
<coin-ponent api-key="YOUR_API_KEY" allow-refresh></coin-ponent>
      `;
    },
  },

  methods: {
    changedTabHandler(newTab) {
    }
  }
};
</script>

<style>
#app{
  @apply font-sans;
}
</style>
