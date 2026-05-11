<script setup lang="ts">
import { useDarkMode, useLanguage, useThemeOptions } from '../hooks'
import { useSiteData, withBase } from '@vuepress/client'
import { computed } from 'vue'

const siteData = useSiteData()
const themeOptions = useThemeOptions()
const isDarkMode = useDarkMode()
const language = useLanguage()

const logoUrl = computed(() => {
  const { logo, darkLogo } = themeOptions.value
  return (isDarkMode.value ? darkLogo : logo) || logo
})

const displayTitle = computed(() =>
  language.value === 'zh' ? siteData.value.title : themeOptions.value.siteTitleEn || 'Li Zhi'
)
</script>
<template>
  <RouterLink to="/" class="logo-link">
    <img v-if="logoUrl" :src="withBase(logoUrl)" alt="" class="logo" />
    <strong v-if="siteData.title" class="title">{{ displayTitle }}</strong>
  </RouterLink>
</template>
