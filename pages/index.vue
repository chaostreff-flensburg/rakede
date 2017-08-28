<template>
  <section class="container">
    <h2>Wiki</h2>

    <div id="featured-wiki">
      <!-- @TODO: fix layout on md display -->
      <ArticleCard v-for="article in featuredArticles"
                   :title="article.data.title"
                   :content="article.content"
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
  async asyncData(context) {
    let wikiFeature = await import('@/content/wiki/featured.json');
    let articles = await Promise.all(wikiFeature.featured.map(async (slug) => {
      let article = await import(`@/content/json/wiki/${slug}.json`);
      article.slug = slug;
      return article;
    }));
    return { featuredArticles: articles }
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
