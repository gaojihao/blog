<script setup lang="ts">
import { useSiteLocaleData } from '@vuepress/client'
import { computed } from 'vue'
import { useLanguage, useThemeOptions } from '../hooks'
const siteLocale = useSiteLocaleData()
const themeOptions = useThemeOptions()
const language = useLanguage()

let currentYear = new Date().getFullYear().toString()
currentYear =
  currentYear === themeOptions.value.siteStartDate ? 'Present' : currentYear

const displayTitle = computed(() =>
  language.value === 'zh' ? siteLocale.value.title : themeOptions.value.siteTitleEn || 'Li Ziqi'
)
</script>
<template>
  <footer class="theme-footer">
    <div class="copyright">
      <a class="beian" :href="themeOptions.beianUrl">
        {{ themeOptions.beian }}
      </a>
      <span class="delimiter">|</span>
      <span class="info"
        >Copyright © {{ themeOptions.siteStartDate }}-{{ currentYear }}
        {{ displayTitle }}</span
      >
    </div>
  </footer>
</template>
