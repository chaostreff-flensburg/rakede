# ToDo:
- [ ] Main Goal: SSR Articles, make most of rakede work w/o JS
- [ ] parse markdown articles only once on change and not on every request
  - hold .md or .vue files in seperate content repo
  - parse front-matter meta data with grey-matter
  - syntax highlight on html creation
  - generate .vue files from markdown or load them directly
  - build nuxt bundle
- [ ] create logic for feature categories & pages
  - categories from tags
  - homepage
  - chronological news/blog
- [ ] article editor
  - simplemde markdown editor
  - anonymous pull-req via github api or authenticated merge
- [ ] authentication
  - passwordless auth-flow via mail, telegram, slack, etc
  - nedb mainly for auth-store


## Ideas

- Plugin interface
  - .vue files are rendered on server, so we can use custom html tags in our articles
  - load components through front-matter object in .md file, or import directly in .vue
- dynamic layouts with nuxt 0.10
- article specific highlight color
- pwa


## Links

- https://github.com/jonschlinkert/gray-matter
- https://github.com/NextStepWebs/simplemde-markdown-editor
- https://passwordless.net
- https://github.com/zevero/passwordless-nedbstore
- https://github.com/louischatriot/nedb
- https://github.com/QingWei-Li/vue-markdown-loader
- https://dribbble.com/shots/1745690-Content-Design-Encyclopedia-Written-by-Users/attachments/282759
