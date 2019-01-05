<template lang="html">
  <div :class="['g-code', classes, shadow]">
    <div class="header w-full block rounded-t px-2 py-1">
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
            color="black"
            size="small"
            :class="['ml-2', { active: isActive(lang) }]"
            @click.native="changeLangTo(lang)">
            {{ labelFor(lang) }}
          </g-btn>
        </div>
      </div>
    </div>
    <div class="code-container rounded-b">
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
    langs: { type: Array, default: () => ['ruby', 'javascript', 'bash', 'html'] },
    lang: { type: String, default: 'bash' },
    code: { type: Object, required: true },
    shadow: { type: String, default: 'shadow-lg' }
  },

  data: () => ({
    internalLang: '',
    langLabels: {
      ruby: 'Ruby',
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
.header {
  background: config('colors.black');
}
.active {
  background: rgba(white, .3) !important;
}
.code-container {
  width: 100%;
  background: config('colors.black');
  min-height: 100px;
}
code {
  @apply .text-sm ;
  overflow: hidden;
  white-space: pre-wrap;
  background: transparent;
}
</style>
