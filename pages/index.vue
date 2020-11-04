<template>
  <div>
    <div>
      <h2>Introduction</h2>
      <h3>We help you to read your stars so you can write your own story.</h3>
      <br />
      <p>
        In a world of seven billion people, what makes your life any different
        from anyone else's?
        <br />
        What are the characteristics that define you? Your personality, your
        traits, and your experiences all shape who you are and what you will
        become.
      </p>
      <p>
        To an extent, the planets and stars already know all of this. They know
        your past and predict your future.
        <br />
        Your zodiac sign is a reflection of who you are and what is to come.
      </p>
      <p>
        <nuxt-link to="/">Read My Stars</nuxt-link> offers free natal charts and
        interpretations for all signs.
        <br />
        We aim to provide insight into who you are and what makes you tick.
      </p>
      <br />
      We will explain your past, present, and future. We will point you in the
      right direction and help you become the best version of yourself.
      <br />
      <p>
        What are you going to do about it?
        <br />
        The answers are in your stars.
      </p>
      <p>
        <em> This is your life. These are your stars. This is your story. </em>
      </p>
    </div>

    <br />
    <v-divider />
    <br />

    <h2>Calculate Your Astrological Birth Chart</h2>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <form>
          <v-row>
            <DatePicker v-model="BirthdayDate" label="Birthday" />
            <TimePicker v-model="BirthdayTime" label="Birth Time" />
            <v-text-field
              v-model="BirthdayCity"
              :rules="CityRules"
              label="Birthday City"
              prepend-icon="mdi-map-marker"
            ></v-text-field>
            <v-text-field
              v-if="Timezone"
              v-model="Timezone"
              label="Timezone"
              prepend-icon="mdi-map-clock"
            ></v-text-field>
            <a
              v-if="citymap && citydescription"
              class="caption sm"
              :href="citymap"
              >{{ citydescription }}
            </a>
            <v-btn
              id="submit"
              :disabled="
                !(
                  BirthdayCity !== null &&
                  BirthdayDate !== null &&
                  BirthdayTime !== null
                )
              "
              color="primary"
              block
              elevation="2"
              x-large
              :loading="LoadingChart"
              @click="fetch_my_map()"
              >Calculate</v-btn
            >
          </v-row>
        </form>
      </v-col>
    </v-row>
    <StarReader v-if="ResponseAvailable" :my-chart="MyChart" />
    <LearnMore v-if="false" />
  </div>
</template>

<script>
import DatePicker from '~/components/DatePicker.vue'
import TimePicker from '~/components/TimePicker.vue'
import StarReader from '~/pages/StarReaderEn.vue'
import LearnMore from '~/components/LearnMore.vue'

export default {
  layout: 'ParticlesHeaderLayout',
  components: {
    TimePicker,
    DatePicker,
    StarReader,
    LearnMore,
  },
  data: () => ({
    MyChart: { planets: {}, aspects: {} },
    BirthdayDate: null,
    housesystem: 'Placidus',
    BirthdayTime: null,
    BirthdayCity: null,
    LoadingChart: false,
    ResponseAvailable: false,
    Timezone: null,
    lat: null,
    lng: null,
    citymap: null,
    citydescription: null,
    CityRules: [(value) => !!value || 'Obrigatório.'],
  }),
  methods: {
    fetch_my_map() {
      this.LoadingChart = true
      this.$emit('submitclicked')
      const url = new URL('https://flatlib.vercel.app/api/astro')
      console.log(url)
      /* https://flatlib.vercel.app/api/astro?date=1991-05-01&time=08:35&placename=Luiz%20Antonio%20SP */
      const params = {
        date: this.BirthdayDate,
        time: this.BirthdayTime,
        placename: this.BirthdayCity.normalize('NFD').replace(
          /[\u0300-\u036F]/g,
          ''
        ),
        housesystem: this.housesystem,
      }
      console.log(params)
      url.search = new URLSearchParams(params).toString()
      console.log(url)
      fetch(url) // ?datetime=1991-May-01%2008:35AM&fuso=-3:00&latlong%20=%20-23.6713029,-46.5690634
        .then((response) => {
          if (response.ok) {
            return response.json()
          } else {
            alert(
              'Server returned ' + response.status + ' : ' + response.statusText
            )
          }
        })
        .then((json) => {
          this.MyChart = json
          console.log(this.MyChart)
          if ('timezone' in this.MyChart.parameters) {
            this.Timezone = this.MyChart.parameters.timezone
          }
          if ('latlong' in this.MyChart.parameters) {
            this.lat = this.MyChart.parameters.latlong[0]
            this.lng = this.MyChart.parameters.latlong[1]
            this.citymap = this.MyChart.parameters.latlong[2]
            if ('display_name' in this.MyChart.parameters.latlong[3]) {
              this.citydescription = this.MyChart.parameters.latlong[3].display_name
            }
          }
          this.LoadingChart = false
          this.ResponseAvailable = true
          console.log(this.MyChart)
        })
        .then(this.$emit('click', this.MyChart))
    },
  },
}
</script>
