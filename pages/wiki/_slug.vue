<template>
  <section class="container">
    <h1>{{data.title}}</h1>
    <div v-html="content"></div>
  </section>
</template>

<script>

export default {
  name: 'slug',
  async asyncData(context) {
    let data = await import(`@/content/json/wiki/${context.route.params.slug}`);
    return data;
  }
}
</script>

<style scoped>
</style>
