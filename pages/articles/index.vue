<template>
  <div class="m-8">
    <h1 class="font-bold text-4xl">Blog Posts</h1>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card
          v-for="article of articles"
          :key="article.slug"
          class="xs:w-full md:w-1/2 px-2 xs:mb-6 md:mb-12 article-card"
        >
          <NuxtLink
            :to="{ name: 'articles-slug', params: { slug: article.slug } }"
            class="flex transition-shadow duration-150 ease-in-out shadow-sm hover:shadow-md xxlmax:flex-col"
          >
            <v-img
              v-if="article.img"
              class="h-48 xxlmin:w-1/2 xxlmax:w-full object-cover"
              :src="require(`~/assets/images/articles/${article.img}`)"
              aspect-ratio="2.75"
            />
          </NuxtLink>
          <div
            class="p-6 flex flex-col justify-between xxlmin:w-1/2 xxlmax:w-full"
          >
            <v-card-title primary-title>
              <h3 class="headline mb-0">{{ article.title }}</h3>
            </v-card-title>
            <v-card-text
              v-if="article.description"
              class="font-bold text-gray-600 text-sm"
            >
              {{ article.description }}
              <p>by {{ article.author.name }}</p>
              <p>Published at: {{ article.createdAt }}</p>
            </v-card-text>
            <v-card-actions>
              <v-btn
                :to="{
                  name: 'articles-slug',
                  params: { slug: article.slug },
                }"
              >
                Read
              </v-btn>
            </v-card-actions>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
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

<style class="postcss">
.article-card {
  border-radius: 8px;
}
.article-card a {
  background-color: #fff;
  border-radius: 8px;
}
.article-card img div {
  border-radius: 8px 0 0 8px;
}
</style>
