<template>
  <v-app>
    <!-- <main-navbar> -->
    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      fixed
      expand-on-hover
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- src="https://picsum.photos/1354/128?random.webp" -->
    <v-app-bar
      fixed
      color="skygradient"
      dark
      shrink-on-scroll
      prominent
      :src="
        require(`~/assets/images/articles/ryan-hutton-Jztmx9yqjBw-unsplash.jpg?size=1300&format=webp`)
      "
      :lazy-src="
        require(`~/assets/images/articles/ryan-hutton-Jztmx9yqjBw-unsplash.jpg?size=60&format=webp`)
      "
      fade-img-on-scroll
      scroll-threshold="500"
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <!-- <v-spacer />
      <v-btn to="/articles"> <v-icon>mdi-book</v-icon> Articles </v-btn>
      <v-btn to="/about"> <v-icon>mdi-chart-bubble</v-icon> About </v-btn> -->
      <!-- <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn> -->
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <main-footer />
    <!-- <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light> mdi-repeat </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer> -->
    <!-- </main-navbar> -->
  </v-app>
</template>

<script>
import MainFooter from '@/layouts/MainFooter'
/* import MainNavbar from '@/layouts/MainNavbar' */
export default {
  components: {
    MainFooter,
    /* MainNavbar, */
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-book',
          title: 'Articles',
          to: '/articles',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'About',
          to: '/about',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Read My Star',
    }
  },
}
</script>

<style>
body {
  margin: 0;
}
</style>
