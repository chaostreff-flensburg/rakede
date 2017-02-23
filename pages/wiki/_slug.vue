<template>
  <section class="container">
    <h1 class="title">
      Wiki
    </h1>
    <hr>
    <div v-html="article.content"></div>
  </section>
</template>

<script>
import axios from '~plugins/axios'
import hljs from 'highlight.js'

export default {
  name: 'slug',
  data ({ params, error }) {
    return axios.get('/api/wiki/' + params.slug)
    .then((res) => {
      return { article: res.data }
    })
    .catch((e) => {
      error({ statusCode: 404, message: 'Article not found' })
    })
  },
  mounted() {
    hljs.initHighlightingOnLoad();
  }
}
</script>

<style scoped>
.title
{
  margin-top: 30px;
}
.info
{
  font-weight: 300;
  color: #9aabb1;
  margin: 0;
  margin-top: 10px;
}
.button
{
  margin-top: 30px;
}
</style>
