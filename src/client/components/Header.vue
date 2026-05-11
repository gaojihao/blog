<script setup lang="ts">
import Logo from './Logo.vue'
import Navbar from './Navbar.vue'
import { computed } from 'vue'
import { assetScrollToTop } from '../utils'
import { useScrollTop } from '../hooks/useScrollTop'
import { useLayout } from '../hooks/useLayout'
import { useThemeOptions } from '../hooks/useThemeOptions'

const layout = useLayout()
const themeOptions = useThemeOptions()
const scrollTop = useScrollTop()
const isActiveCls = computed(
  () =>
    ['HomeLayout', 'PostsLayout', 'SearchLayout'].includes(layout.value) &&
    assetScrollToTop(scrollTop.value)
)
const isLogo = computed(() =>
  layout.value === 'HomeLayout' ? !isActiveCls.value : true
)
const isPersonalHeader = computed(
  () => ['HomeLayout', 'ToolsLayout'].includes(layout.value) && themeOptions.value.enableBlog === false
)
</script>
<template>
  <header
    class="theme-header"
    :is-logo="!isActiveCls"
    :class="{ active: isActiveCls, 'personal-header': isPersonalHeader }"
  >
    <Logo v-show="isLogo" />
    <span v-if="!isLogo"></span>
    <Navbar />
  </header>
</template>
