<template>
  <section class="container">
    <div class="row">
      <div class="col-12">
        <h2>Wiki</h2>
      </div>

      <div v-for="article in featured" class="col-6">
        <ArticleCard :title="article.title"
                     :content="article.html"
        ></ArticleCard>
      </div>

    </div>
  </section>
</template>

<script>
import axios from '~plugins/axios'

import ArticleCard from '~components/article-card.vue';

export default {
  components: {
    ArticleCard
  },
  head () {
    return {
      title: 'rakede'
    }
  },
  asyncData(context) {
    return axios.get('/api/wiki/featured')
    .then((res) => {
      return { featured: res.data }
    })
    .catch((e) => {
      context.error({ statusCode: 404, message: 'Featured articles not found' })
    })
  }
}
</script>

<style scoped>

</style>
