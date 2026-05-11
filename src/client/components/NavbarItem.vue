<script setup lang="ts">
import type { PropType } from 'vue'
import { computed, onBeforeUnmount, onMounted, ref, toRefs } from 'vue'
import type { MenuItem } from '../../node'
import { useRoute, useRouter } from 'vue-router'
import { useLanguage } from '../hooks'

const router = useRouter()
const route = useRoute()
const language = useLanguage()
const props = defineProps({
  item: {
    type: Object as PropType<MenuItem>,
    required: true,
  },
  icon: {
    type: String,
    default: '',
  },
})

const { item } = toRefs(props)
const displayText = computed(() => item.value.i18n?.[language.value] || item.value.text)

const currentHash = ref('')

const updateHash = (): void => {
  currentHash.value = typeof window === 'undefined' ? '' : window.location.hash
}

const normalizePath = (link: string): string => {
  const [path] = link.split('#')
  return path || '/'
}

const isExternal = computed(() => /^(https?:|mailto:|tel:)/.test(item.value.link || ''))

const isActive = computed(() => {
  const link = item.value.link || ''
  if (isExternal.value) return false
  if (link === '/') return route.path === '/' && !currentHash.value
  const [path, hash] = link.split('#')
  const normalizedPath = path || '/'
  if (hash) {
    return route.path === normalizedPath && currentHash.value === `#${hash}`
  }
  return route.path === normalizePath(link)
})

onMounted(() => {
  updateHash()
  window.addEventListener('hashchange', updateHash)
})

onBeforeUnmount(() => {
  window.removeEventListener('hashchange', updateHash)
})


const handleClick = (item): void => {
  if (item.md5) {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem('md5', item.md5)
    }
    router.push({ path: item.link, query: { md5: item.md5 } })
  }
}
</script>
<template>
  <a
    v-if="isExternal"
    :href="item.link"
    class="navbar-item"
    :target="item.link.startsWith('http') ? '_blank' : undefined"
    :rel="item.link.startsWith('http') ? 'noopener noreferrer' : undefined"
  >
    <i v-if="props.icon" :class="props.icon" class="iconfont"></i>
    <span class="text">
      {{ displayText }}
    </span>
  </a>
  <RouterLink
    v-else
    :to="item.link"
    class="navbar-item"
    :class="{ active: isActive }"
    @click="handleClick(item)"
  >
    <i v-if="props.icon" :class="props.icon" class="iconfont"></i>
    <span class="text">
      {{ displayText }}
    </span>
  </RouterLink>
</template>
