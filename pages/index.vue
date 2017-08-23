<template>
  <section class="container">
    <h2>Wiki</h2>

    <div id="featured-wiki">
      <!-- @TODO: fix layout on md display -->
      <ArticleCard v-for="article in featured"
                   :title="article.title"
                   :content="article.html"
                   :image="article.img"
                   :link="'/wiki/' + article.slug"
                   :key="article.slug"
      ></ArticleCard>
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
  align-items: stretch;

  div {
    flex-basis: 45%;
    flex-grow: 1;
  }
}

</style>
