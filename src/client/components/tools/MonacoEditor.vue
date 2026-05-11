<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { withBase } from '@vuepress/client'

declare global {
  interface Window {
    require?: any
    monaco?: any
  }
}

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  language: {
    type: String,
    default: 'plaintext',
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: '',
  },
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const containerRef = ref<HTMLElement | null>(null)
const fallbackValue = ref(props.modelValue)
const ready = ref(false)
let editor: any = null
let monacoLoaderPromise: Promise<void> | null = null
let subscription: { dispose: () => void } | null = null
let resizeObserver: ResizeObserver | null = null

const loadScript = (src: string): Promise<void> => {
  if (window.require) return Promise.resolve()
  if (monacoLoaderPromise) return monacoLoaderPromise
  monacoLoaderPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`)
    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true })
      existing.addEventListener('error', () => reject(new Error(`Failed to load ${src}`)), { once: true })
      return
    }
    const script = document.createElement('script')
    script.src = src
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error(`Failed to load ${src}`))
    document.head.appendChild(script)
  })
  return monacoLoaderPromise
}

const loadMonaco = async (): Promise<any> => {
  if (window.monaco) return window.monaco
  const vsBase = withBase('/vendor/monaco/vs')
  await loadScript(`${vsBase}/loader.js`)
  return new Promise((resolve, reject) => {
    if (!window.require) {
      reject(new Error('Monaco AMD loader is unavailable'))
      return
    }
    window.require.config({ paths: { vs: vsBase } })
    window.require(['vs/editor/editor.main'], () => resolve(window.monaco), reject)
  })
}

const disposeEditor = (): void => {
  subscription?.dispose()
  subscription = null
  resizeObserver?.disconnect()
  resizeObserver = null
  editor?.dispose()
  editor = null
}

onMounted(async () => {
  if (typeof window === 'undefined') return
  try {
    await nextTick()
    const monaco = await loadMonaco()
    if (!containerRef.value) return
    editor = monaco.editor.create(containerRef.value, {
      value: props.modelValue,
      language: props.language,
      readOnly: props.readonly,
      automaticLayout: true,
      minimap: { enabled: false },
      fontSize: 14,
      lineHeight: 24,
      fontLigatures: true,
      wordWrap: 'on',
      scrollBeyondLastLine: false,
      tabSize: 2,
      padding: { top: 16, bottom: 16 },
      theme: 'vs-dark',
      renderLineHighlight: 'all',
      overviewRulerBorder: false,
      hideCursorInOverviewRuler: true,
      scrollbar: {
        verticalScrollbarSize: 8,
        horizontalScrollbarSize: 8,
      },
    })
    subscription = editor.onDidChangeModelContent(() => {
      const value = editor.getValue()
      fallbackValue.value = value
      emit('update:modelValue', value)
    })
    resizeObserver = new ResizeObserver(() => editor?.layout())
    resizeObserver.observe(containerRef.value)
    ready.value = true
  } catch (error) {
    console.warn('Monaco editor failed to load, fallback to textarea.', error)
    ready.value = false
  }
})

watch(
  () => props.modelValue,
  (value) => {
    fallbackValue.value = value
    if (editor && editor.getValue() !== value) editor.setValue(value)
  }
)

watch(
  () => props.language,
  (language) => {
    const monaco = window?.monaco
    const model = editor?.getModel?.()
    if (monaco && model) monaco.editor.setModelLanguage(model, language || 'plaintext')
  }
)

watch(
  () => props.readonly,
  (readonly) => {
    editor?.updateOptions({ readOnly: readonly })
  }
)

const handleFallbackInput = (event: Event): void => {
  const value = (event.target as HTMLTextAreaElement).value
  fallbackValue.value = value
  emit('update:modelValue', value)
}

onBeforeUnmount(disposeEditor)
</script>

<template>
  <div class="monaco-editor-wrap">
    <div v-show="ready" ref="containerRef" class="monaco-editor-container"></div>
    <textarea
      v-show="!ready"
      class="monaco-fallback"
      :value="fallbackValue"
      :readonly="readonly"
      :placeholder="placeholder"
      spellcheck="false"
      @input="handleFallbackInput"
    ></textarea>
  </div>
</template>
