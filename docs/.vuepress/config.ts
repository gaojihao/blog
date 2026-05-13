import { defineUserConfig } from 'vuepress'
import KnznTheme from '../../src/node'

const SITE_URL = 'https://lizhi1026.top'
const SITE_TITLE = '栗子期'
const SITE_DESC =
  '栗子期的个人主页：全栈开发工程师与 AI 从业者，关注全栈工程、AI 应用、Claude Code 源码解析、表达力训练与儿童行为干预等内容。'
const SITE_OG_IMAGE = `${SITE_URL}/images/avatar.jpg`

export default defineUserConfig({
  // 站点配置
  lang: 'zh-CN',
  title: SITE_TITLE,
  description: SITE_DESC,
  head: [
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,viewport-fit=cover' }],
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    ['meta', { name: 'author', content: '栗子期' }],
    ['meta', { name: 'keywords', content: '栗子期,Li Ziqi,全栈开发,AI 应用,Claude Code,表达力训练,自闭症干预,ASD,前端,Node.js,VuePress' }],
    ['meta', { name: 'robots', content: 'index,follow' }],
    ['meta', { name: 'format-detection', content: 'telephone=no' }],
    ['link', { rel: 'canonical', href: SITE_URL + '/' }],
    // Open Graph
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: SITE_TITLE }],
    ['meta', { property: 'og:title', content: SITE_TITLE }],
    ['meta', { property: 'og:description', content: SITE_DESC }],
    ['meta', { property: 'og:url', content: SITE_URL + '/' }],
    ['meta', { property: 'og:image', content: SITE_OG_IMAGE }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
    // Twitter
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: SITE_TITLE }],
    ['meta', { name: 'twitter:description', content: SITE_DESC }],
    ['meta', { name: 'twitter:image', content: SITE_OG_IMAGE }],
    // JSON-LD: WebSite + Person
    [
      'script',
      { type: 'application/ld+json' },
      JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebSite',
            url: SITE_URL + '/',
            name: SITE_TITLE,
            description: SITE_DESC,
            inLanguage: 'zh-CN',
          },
          {
            '@type': 'Person',
            name: '栗子期',
            alternateName: 'Li Ziqi',
            url: SITE_URL + '/',
            image: SITE_OG_IMAGE,
            sameAs: ['https://github.com/gaojihao'],
            jobTitle: '全栈开发工程师 / AI 从业者',
            email: 'mailto:lizhi1026@1026.com',
          },
        ],
      }),
    ],
  ],
  // debug: true,
  // bundler: webpackBundler(),
  theme: KnznTheme({
    // 英文站点标题
    siteTitleEn: 'Li Ziqi',
    // logo
    logo: '/images/logo-light.svg',
    darkLogo: '/images/logo-dark.svg',
    // 背景图片
    backgroundImage: '/images/bg.svg',
    darkBackgroundImage: '/images/bg-dark.jpg',
    // 文章简介图片
    // postImage: 'https://v2.vuepress.vuejs.org/images/hero.png',
    darkPostImage: '/images/post-dark.svg',
    // 背景canvas 动画配置
    // particlesOptions,

    /**
     * 博主信息相关
     */
    // 博主名称
    blogger: '栗子期',
    // 铭言
    slogan: '用工程化思维连接产品、代码与 AI。',
    // 头像
    avatar: '/images/avatar.jpg',
    darkAvatar: '/images/avatar-dark.jpg',
    // 其它媒体
    medias: [
      { link: 'mailto:lizhi1026@1026.com', icon: 'email' },
      { link: 'https://github.com/gaojihao', icon: 'github' },
    ],

    /**
     * 数据显示相关
     */
    // 列表页显示的文章个数
    perPage: 10,
    // 主页显示分类的个数
    maxCategories: 6,
    // 主页显示的标签个数
    maxTags: 10,

    // 个人主页模式：隐藏博客和搜索入口，仅保留首页锚点导航
    enableBlog: false,
    enableSearch: false,
    // 导航
    navbar: [
      { text: '首页', link: '/', i18n: { zh: '首页', en: 'Home' } },
      { text: '关于我', link: '/about/', i18n: { zh: '关于我', en: 'About' } },
      { text: '工具箱', link: '/tools/', i18n: { zh: '工具箱', en: 'Tools' } },
      { text: '联系我', link: 'mailto:lizhi1026@1026.com', i18n: { zh: '联系我', en: 'Contact' } },
    ],

    /**
     *  页脚相关配置
     */
    // 网址起始时间
    siteStartDate: '2018',
  }),
})
