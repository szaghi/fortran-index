import { withMermaid } from 'vitepress-plugin-mermaid'

// One flat sidebar for the whole site: every page is two clicks away at most.
const sidebar = [
  {
    text: 'Start',
    items: [
      { text: 'About', link: '/about' },
    ],
  },
  {
    text: 'Tutorial',
    items: [
      { text: '1. Find a package', link: '/tutorial/01-find' },
      { text: '2. Use it in a project', link: '/tutorial/02-use' },
      { text: '3. Install it for your compiler', link: '/tutorial/03-install' },
      { text: '4. Publish your own package', link: '/tutorial/04-publish' },
    ],
  },
  {
    text: 'Cookbook',
    items: [
      { text: 'All recipes', link: '/cookbook' },
    ],
  },
  {
    text: 'Catalogue',
    items: [
      { text: 'Packages', link: '/packages/' },
      { text: 'Modules', link: '/packages/modules' },
    ],
  },
  {
    text: 'Reference',
    items: [
      { text: 'The index format', link: '/reference/index-format' },
      { text: 'Maintaining', link: '/reference/maintaining' },
      { text: 'Contributing', link: '/reference/contributing' },
    ],
  },
]

export default withMermaid({
  title: 'fortran-index',
  description: 'A package index for FoBiS.py: Fortran projects built with FoBiS or fpm, listed by source URL',
  base: '/fortran-index/',
  lastUpdated: true,
  cleanUrls: true,
  markdown: {
    languageAlias: {
      'fortran': 'fortran-free-form',
      'f90': 'fortran-free-form',
    },
  },
  themeConfig: {
    nav: [
      { text: 'Tutorial', link: '/tutorial/01-find', activeMatch: '^/tutorial/' },
      { text: 'Cookbook', link: '/cookbook' },
      { text: 'Packages', link: '/packages/', activeMatch: '^/packages/$' },
      { text: 'Modules', link: '/packages/modules' },
      { text: 'Reference', link: '/reference/index-format', activeMatch: '^/reference/' },
      { text: 'FoBiS.py', link: 'https://szaghi.github.io/FoBiS/cookbook/packages' },
    ],
    sidebar,
    outline: { level: [2, 2] },
    docFooter: { prev: 'Previous', next: 'Next' },
    socialLinks: [{ icon: 'github', link: 'https://github.com/szaghi/fortran-index' }],
    editLink: {
      pattern: 'https://github.com/szaghi/fortran-index/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },
    search: {
      provider: 'local',
    },
    footer: {
      message: 'The index is released under CC0-1.0. Each package keeps its own licence.',
    },
  },
  mermaid: {},
  vite: {
    // es2022: no syntax lowering of mermaid 11.16+ output (Vite's default es2020 target fails the build)
    build: {
      target: 'es2022',
    },
  },
})
