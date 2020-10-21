<template>
  <div>
    <h1>Calculate Your Astrological Birth Chart</h1>
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
