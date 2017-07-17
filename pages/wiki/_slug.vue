<template>
  <section class="container">
    <div v-html="article.content"></div>
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
