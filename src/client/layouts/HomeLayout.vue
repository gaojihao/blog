<script setup lang="ts">
import { withBase } from '@vuepress/client'
import Footer from '../components/Footer.vue'
import BackToTop from '../components/BackToTop.vue'
import ParticlesBg from '../components/ParticlesBg.vue'
import { useBloger } from '../hooks'

const { avatarSrc, blogger } = useBloger()

const profile = {
  role: '全栈开发工程师 / AI 从业者',
  headline: '用工程化思维连接产品、代码与 AI，打造可靠、优雅且可持续演进的数字体验。',
  intro:
    '你好，我是栗志，一名关注产品体验与工程质量的全栈开发工程师，也在持续探索 AI 在研发提效、业务自动化和智能应用中的落地方式。我喜欢用 TypeScript 构建清晰可靠的前端系统，用 Kotlin、Swift 打磨跨端与移动体验，也会借助 Go 设计高效稳定的服务端能力。这个网站将作为我的个人名片，记录技术思考、项目实践和关于 AI 应用的长期探索。',
  email: 'lizhi1026@1026.com',
  github: 'https://github.com/gaojihao',
}

const stats = [
  { value: 'Full Stack', label: '端到端工程能力' },
  { value: 'AI Native', label: '智能应用探索' },
  { value: '4+', label: '核心技术栈' },
]

const techStacks = [
  {
    name: 'TypeScript',
    desc: '构建类型安全、可维护的现代 Web 应用与工程化体系。',
  },
  {
    name: 'Kotlin',
    desc: '关注服务端开发、Android 生态与高质量业务建模。',
  },
  {
    name: 'Swift',
    desc: '打磨 Apple 生态下更自然、流畅的产品体验。',
  },
  {
    name: 'Golang',
    desc: '用于高性能服务、自动化工具和稳定可靠的后端能力建设。',
  },
]

const focuses = [
  {
    title: '全栈产品开发',
    desc: '从需求理解、架构设计到前后端实现，关注交付效率与长期可维护性。',
  },
  {
    title: 'AI 应用落地',
    desc: '探索大模型、智能 Agent、研发提效和业务自动化在真实场景中的价值。',
  },
  {
    title: '跨端体验构建',
    desc: '结合 Web、移动端与服务端能力，为不同平台提供一致且精致的用户体验。',
  },
  {
    title: '工程质量提升',
    desc: '重视类型系统、代码结构、工具链、自动化流程和性能优化。',
  },
]

const aiCapabilities = [
  {
    label: 'Agent Workflow',
    value: '规划 · 调用工具 · 验证',
  },
  {
    label: 'AI Engineering',
    value: '提示词 · 上下文 · 自动化',
  },
  {
    label: 'Product Thinking',
    value: '场景识别 · 体验闭环',
  },
]

const terminalLines = [
  { type: 'muted', text: '$ agent run --goal "ship reliable AI product"' },
  { type: 'info', text: '▸ analyzing product context...' },
  { type: 'info', text: '▸ composing full-stack architecture...' },
  { type: 'success', text: '✓ TypeScript UI + Go service + AI workflow ready' },
]

const timeline = [
  { year: 'Now', text: '聚焦全栈工程能力与 AI Native 应用实践。' },
  { year: 'Build', text: '持续构建个人项目、效率工具和可复用的技术方案。' },
  { year: 'Share', text: '通过个人网站沉淀技术思考、项目复盘和成长记录。' },
]
</script>

<template>
  <div class="personal-home">
    <ParticlesBg />

    <section class="personal-hero" aria-label="个人介绍首屏">
      <div class="hero-glow hero-glow-one"></div>
      <div class="hero-glow hero-glow-two"></div>

      <div class="hero-inner">
        <div class="hero-copy">
          <p class="eyebrow">Hello, I am</p>
          <h1>{{ blogger || '栗志' }}</h1>
          <p class="hero-role">{{ profile.role }}</p>
          <p class="hero-headline">{{ profile.headline }}</p>

          <div class="hero-actions">
            <a class="primary-action" :href="`mailto:${profile.email}`">
              联系我
            </a>
            <a
              class="secondary-action"
              :href="profile.github"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>

        <div class="hero-visual">
          <div class="hero-card" aria-label="个人资料卡片">
            <div class="avatar-ring">
              <img :src="withBase(avatarSrc || '')" alt="栗志头像" />
            </div>
            <div class="card-meta">
              <span class="card-status"></span>
              <span>Available for ideas & collaboration</span>
            </div>
            <strong>Full Stack Engineer</strong>
            <p>TypeScript · Kotlin · Swift · Golang · AI</p>
          </div>

          <div class="agent-terminal" aria-label="AI Agent 终端卡片">
            <div class="terminal-header">
              <div class="terminal-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span>ai-agent.session</span>
            </div>
            <div class="terminal-body">
              <p
                v-for="line in terminalLines"
                :key="line.text"
                :class="`terminal-line ${line.type}`"
              >
                {{ line.text }}
              </p>
              <div class="terminal-footer">
                <span>latency 128ms</span>
                <span>quality gate passed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <main class="personal-main">
      <section id="about" class="section-grid about-section">
        <div class="section-title">
          <span>01 / ABOUT</span>
          <h2>关于我</h2>
        </div>
        <div class="glass-panel about-panel">
          <p>{{ profile.intro }}</p>
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
          <h2>AI 实践</h2>
        </div>
        <div class="ai-lab">
          <div class="ai-lab-main">
            <p class="ai-label">AI-NATIVE WORKFLOW</p>
            <h3>把 AI 当作工程系统的一部分，而不是只停留在工具层。</h3>
            <p>
              我关注如何让大模型参与真实产品流程：从意图理解、任务拆解、工具调用，
              到结果校验、数据回流和持续优化，让 AI 能稳定服务于研发与业务场景。
            </p>
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
          <h2>技术栈</h2>
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
          <h2>关注方向</h2>
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
          <h2>持续成长</h2>
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
          <h2>如果你也在关注全栈开发、AI 应用或优秀产品体验，欢迎交流。</h2>
          <div class="contact-links">
            <a :href="`mailto:${profile.email}`">{{ profile.email }}</a>
            <a :href="profile.github" target="_blank" rel="noopener noreferrer">
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
