# ToDo:
- [ ] Main Goal: SSR Articles, make most of rakede work w/o JS
- [ ] parse markdown articles only once on change and not on every request
  - hold .md files in seperate content repo
  - parse front-matter meta data with grey-matter
  - syntax highlight on html creation
  - store into nedb
- [ ] create logic for feature categories & pages
  - categories from tags
  - homepage
  - chronological news/blog
- [ ] article editor
  - simplemde markdown editor
  - anonymous pull-req via github api or authenticated merge
- [ ] authentication
  - passwordless auth-flow via mail, telegram, slack, etc
  - nedb for auth-store


## Ideas

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
