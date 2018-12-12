<template lang="html">
  <div class="g-code">
    <div class="header w-full block rounded-t shadow-lg px-2 py-1">
      <div class="contents flex justify-between">
        <div class="fake-controls">
          <g-dot color="red" class="mr-2" />
          <g-dot color="orange" class="mr-2" />
          <g-dot color="green" class="" />
        </div>
        <div class="nav text-white">
          <g-btn
            v-for="lang in langs"
            :key="lang"
            flat
            color="white"
            size="small"
            :class="['ml-2', { active: isActive(lang) }]"
            @click.native="changeLangTo(lang)">
            {{ labelFor(lang) }}
          </g-btn>
        </div>
      </div>
    </div>
    <div class="code-container rounded-b">
      <pre v-highlightjs="selectedCodeSnippet">
        <code :class="lang" class="rounded-b p-4 pb-6"></code>
      </pre>
    </div>
  </div>
</template>

<script>
import GBtn from './GBtn.vue'
import GDot from './GDot.vue'

export default {
  name: 'Gcode',

  components: {
    GBtn,
    GDot
  },

  props: {
    langs: { type: Array, default: () => ['ruby', 'javascript', 'bash'] },
    code: { type: Object, required: true },
  },

  data: () => ({
    lang: 'bash',
    langLabels: {
      ruby: 'Ruby',
      javascript: 'Javascript',
      bash: 'Bash',
    },
  }),

  computed: {
    selectedCodeSnippet() {
      return this.code[this.lang];
    },
  },

  methods: {
    changeLangTo(lang) {
      this.lang = lang;
    },

    isActive(lang) {
      return this.lang === lang;
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
