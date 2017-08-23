<template>
  <section class="container">
    <h2>Wiki</h2>

    <div id="featured-wiki">
      <!-- @TODO: fix layout on md display -->
      <div class="card-wrapper" v-for="article in featured">
        <ArticleCard :title="article.title"
                     :content="article.html"
                     :image="article.img"
                     :link="'/wiki/' + article.slug"
        ></ArticleCard>
      </div>
    </div>

  </section>
</template>

<script>
import axios from '~/plugins/axios'

import ArticleCard from '~/components/article-card.vue';

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
        console.error(e)
      })
  }
}
</script>

<style lang="scss" scoped>
#featured-wiki {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .card-wrapper {
    flex-basis: 50%;
  }
}

</style>
