<template>
  <div>
    <Background />
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <v-row>
          <DatePicker v-model="BirthdayDate" />
          <TimePicker v-model="BirthdayTime" />
          <v-text-field
            v-model="BirthdayCity"
            label="Cidade de Nascimento"
            prepend-icon="mdi-map-marker"
          ></v-text-field>
          <v-text-field
            v-if="Timezone"
            v-model="Timezone"
            label="Fuso Horário (UTC)"
            prepend-icon="mdi-map-clock"
          ></v-text-field>
          <p v-if="citydescription">{{ citydescription }}</p>
          <p v-if="citymap">{{ citymap }}</p>
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
            @click="fetch_my_map()"
            >Calcule</v-btn
          >
        </v-row>
        <div></div>
      </v-col>
    </v-row>
    <StarReader v-if="ResponseAvailable" :my-chart="MyChart" />
  </div>
</template>

<script>
import Background from '~/components/Background.vue'
import DatePicker from '~/components/DatePicker.vue'
import TimePicker from '~/components/TimePicker.vue'
import StarReader from '~/components/StarReader.vue'

export default {
  components: {
    Background,
    TimePicker,
    DatePicker,
    StarReader,
  },
  data: () => ({
    MyChart: { planets: {}, aspects: {} },
    BirthdayDate: null,
    BirthdayTime: null,
    BirthdayCity: null,
    ResponseAvailable: false,
    Timezone: null,
    lat: null,
    lng: null,
    citymap: null,
    citydescription: null,
  }),
  methods: {
    fetch_my_map() {
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
        /* latlong: this.BirthdayCity.lat.concat(',', this.BirthdayCity.lng), */
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
        .then((json) => (this.MyChart = json))
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
          /* for (const planet in this.planets) {
            // planet = this.planets[p].id;
            // console.log(planet)
            if (planet in this.MyChart.planets) {
              this.planets[planet].sign = this.MyChart.planets[planet].sign
              const HouseString = this.MyChart.planets[planet].house
              // if(HouseString.length>0){
              this.planets[planet].house = HouseString.substring(
                5,
                HouseString.length
              )
              //  }
            }
          } */
        })
        .then(this.$emit('click', this.MyChart))
        .then((this.ResponseAvailable = true))
        .then(console.log(this.MyChart))
    },
  },
}
</script>
