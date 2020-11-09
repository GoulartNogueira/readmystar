<template>
  <div class="m-8">
    <h1 class="font-bold text-4xl">Blog Posts</h1>
    <PostList :articles="articles" />
  </div>
</template>

<script>
import PostList from '~/components/PostList.vue'
export default {
  components: {
    PostList,
  },
  async asyncData({ $content, params }) {
    const articles = await $content('articles', params.slug)
      .sortBy('createdAt', 'asc')
      .fetch()
    return {
      articles,
    }
  },
}
</script>
