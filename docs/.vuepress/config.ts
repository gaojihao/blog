import { defineUserConfig } from 'vuepress'
import KnznTheme from '../../src/node'

export default defineUserConfig({
  // 站点配置
  lang: 'zh-CN',
  title: '栗志',
  description: '栗志的个人主页：全栈开发工程师与 AI 从业者，关注全栈工程、AI 应用和优秀产品体验。',
  // debug: true,
  // bundler: webpackBundler(),
  theme: KnznTheme({
    // 英文站点标题
    siteTitleEn: 'Li Zhi',
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
    blogger: '栗志',
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
      { text: '关于我', link: '/#/about', i18n: { zh: '关于我', en: 'About' } },
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
