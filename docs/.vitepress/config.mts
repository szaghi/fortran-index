import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid({
  title: 'fortran-index',
  description: 'A package index for FoBiS.py: Fortran projects built with FoBiS or fpm, listed by source URL',
  base: '/fortran-index/',
  lastUpdated: true,
  markdown: {
    languageAlias: {
      'fortran': 'fortran-free-form',
      'f90': 'fortran-free-form',
    },
  },
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Guide',
        items: [
          { text: 'About', link: '/guide/' },
          { text: 'Using the index', link: '/guide/usage' },
          { text: 'Adding a package', link: '/guide/adding' },
          { text: 'The index format', link: '/guide/format' },
          { text: 'Maintaining', link: '/guide/maintaining' },
          { text: 'Contributing', link: '/guide/contributing' },
        ],
      },
      { text: 'Packages', link: '/packages/' },
      { text: 'Modules', link: '/packages/modules' },
      { text: 'FoBiS.py', link: 'https://szaghi.github.io/FoBiS/cookbook/packages' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'About', link: '/guide/' },
          ],
        },
        {
          text: 'Getting Started',
          items: [
            { text: 'Using the index', link: '/guide/usage' },
            { text: 'Adding a package', link: '/guide/adding' },
          ],
        },
        {
          text: 'Reference',
          items: [
            { text: 'The index format', link: '/guide/format' },
            { text: 'Maintaining', link: '/guide/maintaining' },
          ],
        },
        {
          text: 'Project',
          items: [
            { text: 'Contributing', link: '/guide/contributing' },
          ],
        },
      ],
      '/packages/': [
        {
          text: 'Catalogue',
          items: [
            { text: 'Packages', link: '/packages/' },
            { text: 'Modules', link: '/packages/modules' },
          ],
        },
      ],
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/szaghi/fortran-index' }],
    editLink: {
      pattern: 'https://github.com/szaghi/fortran-index/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },
    search: {
      provider: 'local',
    },
    footer: {
      message: 'The index is released under CC0-1.0.',
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
