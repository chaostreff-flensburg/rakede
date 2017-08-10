<template lang="html">
  <div class="wrapper">
    <!-- @TODO: move card image to top on low width cards -->
    <div class="card-img" v-if="image" v-bind:style="{backgroundImage:'url('+image+')'}"></div>
    <div class="card-content">
      <nuxt-link :to="link">
        <h4 class="card-title">{{title}}</h4>
        <div class="abstract" v-html="abstract"></div>
      </nuxt-link>
      <span id="toolbar" class="right">
        <!-- @TODO: slideout text on hover -->
        <i class="icon-bookmark"></i> <!-- @TODO: save article in store -->
        <i class="icon-link"></i> <!-- @TODO: copy link into clipboard -->
        <nuxt-link :to="link"><i class="icon-chevron-right m0"></i></nuxt-link>
      </span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'article-card',
  props: ['title', 'content', 'image', 'link'],
  computed: {
    abstract() {
      // regex html-tags & remove them
      let ab = this.content.replace(/<\/?[^>]+(>|$)/g, "");
      if(ab.length > 200) {
        return ab.substring(0,199)+"...";
      }
      else return ab;
    }
  }
}
</script>

<style lang="scss" scoped>

.wrapper {
  display: flex;
  justify-content: space-around;

  min-width: 370px;
  height: 220px;

  padding: 0 16px;
  padding-left: 0;

  margin: 0 4px;
  margin-bottom: 12px;

  overflow: hidden;

  border-style: solid;
  border-width: 1px;
  border-radius: 2px;
  border-color: rgba(0,0,0,0.1);

  box-shadow: 0 0 0 rgba(0,0,0,0);
  transition: box-shadow 0.2s ease-in-out;

  &:hover {
    box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.2);
  }

  .card-img {
    height: 100%;
    width: 100px;

    margin-right: auto;

    background-size: cover;
    background-position: center;
  }

  .card-content {
    width: 70%;

    margin-left: 8px;

    .card-title {
      margin-bottom: 0;
    }

    #toolbar {
      margin-right: 16px;
    }
  }
}
</style>
