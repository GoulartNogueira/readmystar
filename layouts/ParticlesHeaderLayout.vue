<template>
  <v-app>
    <v-main>
      <ParticleBackground />
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import ParticleBackground from '~/components/ParticlesBackground.vue'
export default {
  components: {
    ParticleBackground,
  },
}
</script>
