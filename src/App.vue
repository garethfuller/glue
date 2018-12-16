<template>
  <div id="app" class="p-8">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" integrity="sha384-gfdkjb5BdAXd+lj+gudLWI+BXq4IuLW5IT+brZEZsLFm++aCMlF1V92rMkPaX4PP" crossorigin="anonymous">
    <h1 class="my-8">Btns</h1>
    <g-btn>Hello World!</g-btn>

    <h1 class="my-8">Inputs</h1>
    <div class="flex w-1/4 flex-col">
      <g-text-field v-model="textInput" placeholder="Your name" />

      <g-select v-model="token" :items="items" class="mt-4" required label="Token" />

      <g-switch v-model="switchVal" color="red" round class="mt-4"/>
      <g-switch v-model="switchVal" color="red" size="small" round class="mt-4"/>
      <g-switch v-model="switchVal" color="red" size="large" round class="mt-4"/>
    </div>

  </div>
</template>

<script>

export default {
  name: 'app',

  data() {
    return {
      textInput: '',
      token: 'BTC',
      items: ['BTC', 'ETH', 'BCH'],
      switchVal: false
    };
  },
};
</script>

<style>
#app{
  @apply font-sans;
}
</style>
