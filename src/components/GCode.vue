<template lang="html">
  <div :class="['g-code', classes, shadow]">
    <div class="header bg-black w-full block rounded-t px-2 py-1">
      <div class="contents flex justify-between">
        <div class="fake-controls">
          <g-dot color="red" class="mr-2" />
          <g-dot color="orange" class="mr-2" />
          <g-dot color="green" class="" />
        </div>
        <div class="nav text-white">
          <g-btn
            v-for="(lang, i) in langs"
            :key="i"
            flat
            color="white"
            size="small"
            :class="['ml-2', { 'is-active': isActive(lang) }]"
            @click.native="changeLangTo(lang)">
            {{ labelFor(lang) }}
          </g-btn>
        </div>
      </div>
    </div>
    <div class="code-container bg-black rounded-b">
      <pre v-highlightjs="selectedCodeSnippet"><code :class="internalLang" class="rounded-b p-4"></code></pre>
    </div>
  </div>
</template>

<script>
import GBtn from './GBtn.vue';
import GDot from './GDot.vue';

export default {
  name: 'GCode',

  components: {
    GBtn,
    GDot,
  },

  props: {
    langs: { type: Array, default: () => ['ruby', 'python', 'javascript', 'bash', 'html'] },
    lang: { type: String, default: 'bash' },
    code: { type: Object, required: true },
    shadow: { type: String, default: 'shadow-lg' }
  },

  data: () => ({
    internalLang: '',
    langLabels: {
      ruby: 'Ruby',
      python: 'Python',
      javascript: 'Javascript',
      bash: 'Bash',
      html: 'HTML',
    },
  }),

  created() {
    this.internalLang = this.lang;
  },

  computed: {
    selectedCodeSnippet() {
      return this.code[this.internalLang];
    },

    classes() {
      return {}
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
    },
  },
};
</script>

<style lang="css" scoped>
.is-active {
  border: 1px solid rgba(255,255,255, .5);
}
.code-container {
  width: 100%;
  min-height: 100px;
}
code {
  @apply .text-sm ;
  overflow: hidden;
  white-space: pre-wrap;
  background: transparent;
}
</style>
