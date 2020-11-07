<template>
  <v-app>
    <v-main>
      <ParticleBackground />
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <main-footer />
  </v-app>
</template>

<script>
import MainFooter from '@/layouts/MainFooter'
import ParticleBackground from '~/components/ParticlesBackground.vue'
export default {
  components: {
    MainFooter,
    ParticleBackground,
  },
}
</script>
