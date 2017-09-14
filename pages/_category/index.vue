<template>
  <section class="container">
    <h1>{{data.title}}</h1>
    <article v-html="content"></article>
  </section>
</template>

<script>

export default {
  name: 'slug',
  async asyncData(context) {
    let data = await import(`@/content/json/${context.route.params.category}/index}`);
    return data;
  }
}
</script>

<style scoped>
</style>
