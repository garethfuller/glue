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
            size="sm"
            :class="['ml-2', { 'code-is-active': isActive(lang) }]"
            @click.native="changeLangTo(lang)">
            {{ labelFor(lang) }}
          </g-btn>
        </div>
      </div>
    </div>
    <div class="code-container bg-black rounded-b">
      <pre v-highlightjs="selectedCodeSnippet"><code :class="[internalLang, 'rounded p-4']"></code></pre>
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
    this.internalLang = this.lang
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

<style lang="css">
.code-is-active {
  border: 1px solid rgba(255,255,255, .5);
}
.code-container {
  width: 100%;
  min-height: 100px;
}
code {
  @apply .text-sm;
  overflow: hidden;
  white-space: pre-wrap;
  background: transparent;
}

.hljs {
    display: block;
    overflow-x: auto;
    color: #abb2bf;
}

.hljs-comment,
.hljs-quote {
    color: #5c6370;
    font-style: italic
}

.hljs-doctag,
.hljs-keyword,
.hljs-formula {
    color: #c678dd
}

.hljs-section,
.hljs-name,
.hljs-selector-tag,
.hljs-deletion,
.hljs-subst {
    color: #e06c75
}

.hljs-literal {
    color: #56b6c2
}

.hljs-string,
.hljs-regexp,
.hljs-addition,
.hljs-attribute,
.hljs-meta-string {
    color: #98c379
}

.hljs-built_in,
.hljs-class .hljs-title {
    color: #e6c07b
}

.hljs-attr,
.hljs-variable,
.hljs-template-variable,
.hljs-type,
.hljs-selector-class,
.hljs-selector-attr,
.hljs-selector-pseudo,
.hljs-number {
    color: #d19a66
}

.hljs-symbol,
.hljs-bullet,
.hljs-link,
.hljs-meta,
.hljs-selector-id,
.hljs-title {
    color: #61aeee
}

.hljs-emphasis {
    font-style: italic
}

.hljs-strong {
    font-weight: bold
}

.hljs-link {
    text-decoration: underline
}
</style>
