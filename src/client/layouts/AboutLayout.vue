<script setup lang="ts">
import Footer from '../components/Footer.vue'
import BackToTop from '../components/BackToTop.vue'
import ParticlesBg from '../components/ParticlesBg.vue'
import { useBloger, useLanguage } from '../hooks'
import { computed } from 'vue'

const { blogger } = useBloger()
const language = useLanguage()

const contactHref = 'mailto:lizhi1026@1026.com'

const copy = computed(() => {
  const zh = language.value === 'zh'
  return {
    name: zh ? blogger || '栗子期' : 'Li Ziqi',
    intro: zh
      ? '你好，我是栗子期，一名关注产品体验与工程质量的全栈开发工程师，也在持续探索 AI 在研发提效、业务自动化和智能应用中的落地方式。我喜欢用 TypeScript 构建清晰可靠的前端系统，用 Kotlin、Swift 打磨跨端与移动体验，也会借助 Go 设计高效稳定的服务端能力。这个网站将作为我的个人名片，记录技术思考、项目实践和关于 AI 应用的长期探索。'
      : 'Hi, I am Li Ziqi, a full-stack engineer focused on product experience and engineering quality. I am also exploring how AI can improve software development, business automation, and intelligent applications. I use TypeScript to build reliable frontend systems, Kotlin and Swift for cross-platform and mobile experiences, and Go for efficient backend services. This site is my personal profile for technical notes, project practice, and long-term exploration of AI applications.',
    email: 'lizhi1026@1026.com',
    github: 'https://github.com/gaojihao',
    aboutTitle: zh ? '关于我' : 'About',
    aiTitle: zh ? 'AI 实践' : 'AI Practice',
    stackTitle: zh ? '技术栈' : 'Tech Stack',
    focusTitle: zh ? '关注方向' : 'Focus',
    roadmapTitle: zh ? '持续成长' : 'Roadmap',
    connect: zh ? '如果你也在关注全栈开发、AI 应用或优秀产品体验，欢迎交流。' : 'If you care about full-stack development, AI applications, or product experience, feel free to connect.',
    aiLabel: 'AI-NATIVE WORKFLOW',
    aiHeading: zh ? '把 AI 当作工程系统的一部分，而不是只停留在工具层。' : 'Treat AI as part of the engineering system, not just another tool.',
    aiDesc: zh
      ? '我关注如何让大模型参与真实产品流程：从意图理解、任务拆解、工具调用，到结果校验、数据回流和持续优化，让 AI 能稳定服务于研发与业务场景。'
      : 'I focus on bringing large models into real product workflows: intent understanding, task decomposition, tool calling, result validation, data feedback, and continuous improvement.',
  }
})

const stats = computed(() =>
  language.value === 'zh'
    ? [
        { value: 'Full Stack', label: '端到端工程能力' },
        { value: 'AI Native', label: '智能应用探索' },
        { value: '4+', label: '核心技术栈' },
      ]
    : [
        { value: 'Full Stack', label: 'End-to-end engineering' },
        { value: 'AI Native', label: 'Intelligent product exploration' },
        { value: '4+', label: 'Core technology stacks' },
      ]
)

const techStacks = computed(() =>
  language.value === 'zh'
    ? [
        { name: 'TypeScript', desc: '构建类型安全、可维护的现代 Web 应用与工程化体系。' },
        { name: 'Kotlin', desc: '关注服务端开发、Android 生态与高质量业务建模。' },
        { name: 'Swift', desc: '打磨 Apple 生态下更自然、流畅的产品体验。' },
        { name: 'Golang', desc: '用于高性能服务、自动化工具和稳定可靠的后端能力建设。' },
      ]
    : [
        { name: 'TypeScript', desc: 'Building type-safe and maintainable modern web applications.' },
        { name: 'Kotlin', desc: 'Server-side development, Android ecosystem, and expressive domain modeling.' },
        { name: 'Swift', desc: 'Crafting natural and polished experiences for the Apple ecosystem.' },
        { name: 'Golang', desc: 'High-performance services, automation tools, and reliable backend systems.' },
      ]
)

const focuses = computed(() =>
  language.value === 'zh'
    ? [
        { title: '全栈产品开发', desc: '从需求理解、架构设计到前后端实现，关注交付效率与长期可维护性。' },
        { title: 'AI 应用落地', desc: '探索大模型、智能 Agent、研发提效和业务自动化在真实场景中的价值。' },
        { title: '跨端体验构建', desc: '结合 Web、移动端与服务端能力，为不同平台提供一致且精致的用户体验。' },
        { title: '工程质量提升', desc: '重视类型系统、代码结构、工具链、自动化流程和性能优化。' },
      ]
    : [
        { title: 'Full-stack Product Development', desc: 'From requirements and architecture to frontend and backend implementation.' },
        { title: 'AI Application Delivery', desc: 'Exploring LLMs, agents, developer productivity, and business automation in real scenarios.' },
        { title: 'Cross-platform Experience', desc: 'Connecting web, mobile, and backend capabilities for consistent user experiences.' },
        { title: 'Engineering Quality', desc: 'Type systems, code structure, toolchains, automation, and performance optimization.' },
      ]
)

const aiCapabilities = computed(() =>
  language.value === 'zh'
    ? [
        { label: 'Agent Workflow', value: '规划 · 调用工具 · 验证' },
        { label: 'AI Engineering', value: '提示词 · 上下文 · 自动化' },
        { label: 'Product Thinking', value: '场景识别 · 体验闭环' },
      ]
    : [
        { label: 'Agent Workflow', value: 'Plan · Tool use · Validate' },
        { label: 'AI Engineering', value: 'Prompting · Context · Automation' },
        { label: 'Product Thinking', value: 'Scenarios · Experience loop' },
      ]
)

const timeline = computed(() =>
  language.value === 'zh'
    ? [
        { year: 'Now', text: '聚焦全栈工程能力与 AI Native 应用实践。' },
        { year: 'Build', text: '持续构建个人项目、效率工具和可复用的技术方案。' },
        { year: 'Share', text: '通过个人网站沉淀技术思考、项目复盘和成长记录。' },
      ]
    : [
        { year: 'Now', text: 'Focusing on full-stack engineering and AI-native application practice.' },
        { year: 'Build', text: 'Building personal projects, productivity tools, and reusable technical solutions.' },
        { year: 'Share', text: 'Using this website to document technical thinking, project retrospectives, and growth.' },
      ]
)
</script>

<template>
  <div class="personal-home">
    <ParticlesBg />

    <main class="personal-main about-detail-page">
      <section id="about" class="section-grid about-section">
        <div class="section-title">
          <span>01 / ABOUT</span>
          <h2>{{ copy.aboutTitle }}</h2>
        </div>
        <div class="glass-panel about-panel">
          <p>{{ copy.intro }}</p>
          <div class="stats-grid">
            <div v-for="item in stats" :key="item.label" class="stat-card">
              <strong>{{ item.value }}</strong>
              <span>{{ item.label }}</span>
            </div>
          </div>
        </div>
      </section>

      <section id="ai" class="section-grid ai-section">
        <div class="section-title">
          <span>02 / AI LAB</span>
          <h2>{{ copy.aiTitle }}</h2>
        </div>
        <div class="ai-lab">
          <div class="ai-lab-main">
            <p class="ai-label">{{ copy.aiLabel }}</p>
            <h3>{{ copy.aiHeading }}</h3>
            <p>{{ copy.aiDesc }}</p>
          </div>
          <div class="ai-capability-grid">
            <div
              v-for="item in aiCapabilities"
              :key="item.label"
              class="ai-capability"
            >
              <span>{{ item.label }}</span>
              <strong>{{ item.value }}</strong>
            </div>
          </div>
        </div>
      </section>

      <section id="stack" class="section-grid">
        <div class="section-title">
          <span>03 / STACK</span>
          <h2>{{ copy.stackTitle }}</h2>
        </div>
        <div class="stack-grid">
          <article v-for="item in techStacks" :key="item.name" class="stack-card">
            <div class="stack-icon">{{ item.name.slice(0, 2) }}</div>
            <h3>{{ item.name }}</h3>
            <p>{{ item.desc }}</p>
          </article>
        </div>
      </section>

      <section id="focus" class="section-grid">
        <div class="section-title">
          <span>04 / FOCUS</span>
          <h2>{{ copy.focusTitle }}</h2>
        </div>
        <div class="focus-grid">
          <article v-for="item in focuses" :key="item.title" class="focus-card">
            <h3>{{ item.title }}</h3>
            <p>{{ item.desc }}</p>
          </article>
        </div>
      </section>

      <section id="timeline" class="section-grid timeline-section">
        <div class="section-title">
          <span>05 / ROADMAP</span>
          <h2>{{ copy.roadmapTitle }}</h2>
        </div>
        <div class="glass-panel timeline-panel">
          <div v-for="item in timeline" :key="item.year" class="timeline-item">
            <span>{{ item.year }}</span>
            <p>{{ item.text }}</p>
          </div>
        </div>
      </section>

      <section id="contact" class="contact-section">
        <div class="contact-card">
          <p class="eyebrow">LET'S CONNECT</p>
          <h2>{{ copy.connect }}</h2>
          <div class="contact-links">
            <a :href="contactHref">{{ copy.email }}</a>
            <a :href="copy.github" target="_blank" rel="noopener noreferrer">
              github.com/gaojihao
            </a>
          </div>
        </div>
      </section>
    </main>

    <Footer class="personal-footer" />
    <BackToTop />
  </div>
</template>
