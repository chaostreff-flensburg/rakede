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
