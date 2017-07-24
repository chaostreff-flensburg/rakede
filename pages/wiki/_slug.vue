<template>
  <section class="container">
    <h1>{{article.title}}</h1>
    <div v-html="article.html"></div>
  </section>
</template>

<script>
import axios from '~plugins/axios'

export default {
  name: 'slug',
  asyncData(context) {
    return axios.get('/api/wiki/' + context.params.slug)
    .then((res) => {
      return { article: res.data }
    })
    .catch((e) => {
      context.error({ statusCode: 404, message: 'Article not found' })
    })
  }
}
</script>

<style scoped>
</style>
