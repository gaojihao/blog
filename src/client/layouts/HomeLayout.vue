<script setup lang="ts">
import { withBase } from '@vuepress/client'
import Footer from '../components/Footer.vue'
import BackToTop from '../components/BackToTop.vue'
import ParticlesBg from '../components/ParticlesBg.vue'
import { useBloger, useLanguage } from '../hooks'
import { computed } from 'vue'

const { avatarSrc, blogger } = useBloger()
const language = useLanguage()

const contactHref = 'mailto:lizhi1026@1026.com'

const copy = computed(() => {
  const zh = language.value === 'zh'
  return {
    name: zh ? blogger || '栗子期' : 'Li Ziqi',
    role: zh ? '全栈开发工程师 / AI 从业者' : 'Full Stack Engineer / AI Practitioner',
    headline: zh
      ? '用工程化思维连接产品、代码与 AI，打造可靠、优雅且可持续演进的数字体验。'
      : 'Connecting product, code, and AI with engineering thinking to build reliable and elegant digital experiences.',
    github: 'https://github.com/gaojihao',
    hello: zh ? '你好，我是' : 'Hello, I am',
    learnMore: zh ? '了解更多' : 'Learn more',
    tools: zh ? '工具箱' : 'Tools',
  }
})
</script>

<template>
  <div class="personal-home">
    <ParticlesBg />

    <section class="personal-hero simple-hero" aria-label="个人主页">
      <div class="hero-glow hero-glow-one"></div>
      <div class="hero-glow hero-glow-two"></div>

      <div class="simple-hero-inner">
        <div class="simple-avatar">
          <img :src="withBase(avatarSrc || '')" alt="栗子期头像" />
        </div>
        <p class="eyebrow">{{ copy.hello }}</p>
        <h1>{{ copy.name }}</h1>
        <p class="hero-role">{{ copy.role }}</p>
        <p class="hero-headline">{{ copy.headline }}</p>

        <div class="simple-tags">
          <span>TypeScript</span>
          <span>Kotlin</span>
          <span>Swift</span>
          <span>Golang</span>
          <span>AI</span>
        </div>

        <div class="hero-actions simple-actions">
          <a class="primary-action" href="/about/">{{ copy.learnMore }}</a>
          <a class="secondary-action" :href="contactHref">{{ language === 'zh' ? '联系我' : 'Contact' }}</a>
          <a class="secondary-action" href="/tools/">{{ copy.tools }}</a>
          <a
            class="secondary-action"
            :href="copy.github"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>

    <Footer class="personal-footer" />
    <BackToTop />
  </div>
</template>
