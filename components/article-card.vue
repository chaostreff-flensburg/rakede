<template lang="html">
  <div class="wrapper col-12">
    <h4 class="card-title">{{title}}</h4>
    <p class="abstract" v-html="abstract"></p>
  </div>
</template>

<script>

export default {
  name: 'article-card',
  props: ['title', 'content', 'image', 'link'],
  computed: {
    abstract() {
      if(this.content.length > 140) {
        return this.content.substring(0,139)+"...";
      }
      else return this.content;
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 0 16px;

  border-style: solid;
  border-width: 1px;
  border-radius: 2px;
  border-color: rgba(0, 0, 0, 0.1);

  box-shadow: 0 0 0 rgba(0,0,0,0);
  transition: box-shadow 0.2s ease-in-out;

  &:hover {
    box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.2);
  }

  .card-title {
    margin-bottom: 0;
  }
}
</style>
