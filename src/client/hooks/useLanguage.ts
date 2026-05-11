import { computed, inject, onMounted, provide, ref } from 'vue'
import type { InjectionKey, Ref } from 'vue'

export type SiteLanguage = 'zh' | 'en'
export type LanguageRef = Ref<SiteLanguage>

export const languageSymbol: InjectionKey<LanguageRef> = Symbol('language')

const STORAGE_KEY = 'lizhi-site-language'

const detectLanguage = (): SiteLanguage => {
  if (typeof navigator === 'undefined') return 'zh'
  return /^zh/i.test(navigator.language || '') ? 'zh' : 'en'
}

export const useLanguage = (): LanguageRef => {
  const language = inject(languageSymbol)
  if (!language) {
    throw new Error('useLanguage() is called without provider.')
  }
  return language
}

export const setupLanguage = (): void => {
  const language = ref<SiteLanguage>('zh')

  onMounted(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as SiteLanguage | null
    language.value = stored === 'zh' || stored === 'en' ? stored : detectLanguage()
    document.documentElement.lang = language.value === 'zh' ? 'zh-CN' : 'en'
  })

  provide(languageSymbol, language)
}

export const useLanguageToggle = (): {
  language: LanguageRef
  label: ReturnType<typeof computed<string>>
  toggleLanguage: () => void
} => {
  const language = useLanguage()
  const label = computed(() => (language.value === 'zh' ? '中' : 'EN'))
  const toggleLanguage = (): void => {
    language.value = language.value === 'zh' ? 'en' : 'zh'
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, language.value)
      document.documentElement.lang = language.value === 'zh' ? 'zh-CN' : 'en'
    }
  }
  return { language, label, toggleLanguage }
}
