<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="text-center">
        <logo />
      </div>
      <v-card class="d-flex flex-column justify-center align-center">
        <v-card-title class="headline">
          Where are you going?
        </v-card-title>
        <v-card-text>
          <v-select
            v-model="select"
            :items="items"
            item-text="city"
            item-value="index"
            label="Select your destination"
            hide-details
            single-line
            outlined
          ></v-select>
        </v-card-text>
        <v-progress-circular
          v-if="isLoading"
          indeterminate
          class="my-8"
          color="primary"
        ></v-progress-circular> 

        <v-card-text v-else class="py-1">
          <v-card v-if="this.selectedCity" flat>
            <v-card-title class="py-0 px-2">
              Weather in {{ this.selectedCity }}
            </v-card-title>
            <!-- need to adjust time -->
            <v-card-text class="py-0 px-2" style="min-height:200px;">
              <p>at {{ selectedTime }}</p> 
              <v-row>
                <v-col class="d-flex flex-sm-column justify-sm-center align-center" cols="12" sm="5">
                  <v-img 
                    class="mt-sm-n6"
                    max-height="112"
                    max-width="160"
                    :src="`http://openweathermap.org/img/wn/${forecast[page-1].weather[0].icon}@4x.png`" 
                  />
                  <!-- <p>{{ forecast[page-1].weather[0].main }}</p>  -->
                  <!-- <p>{{ forecast[page-1].weather[0].icon }}</p>   -->
                  <p class="text-center" style="font-size: 20px; font-weight: bold; background-color: white !important; margin-bottom: 0">
                    {{ forecast[page-1].weather[0].description }}
                  </p> 
                </v-col>

                <v-col cols="12" sm="4">
                  <v-row>
                    <v-col cols="6" sm="12">
                      Temperature
                      <p style="font-size: 20px; font-weight: bold; background-color: white !important;">
                        {{ forecast[page-1].main.temp }}
                      </p>
                    </v-col>
                    <v-col cols="6" sm="12">
                      Feels like
                      <p style="font-size: 20px; font-weight: bold; background-color: white !important;">
                        {{ forecast[page-1].main.feels_like }}
                      </p>
                    </v-col>
                  </v-row>
                </v-col>


                <v-col cols="12" sm="3">
                  <v-row>
                    <v-col cols="6" sm="12">
                      Wind
                      <p style="font-size: 20px; font-weight: bold; background-color: white !important;">
                        {{ forecast[page-1].wind.speed }}
                      </p>
                    </v-col>
                    <v-col cols="6" sm="12">
                      Humidty
                      <p style="font-size: 20px; font-weight: bold; background-color: white !important;">
                        {{ forecast[page-1].main.humidity }}
                      </p>
                    </v-col>
                  </v-row>
                </v-col>

              </v-row>
            </v-card-text>

            <v-card-text class="d-flex justify-space-between align-center">
              <v-btn color="white" class="mt-1" @click="page = 1">
                Now
              </v-btn>
              <v-pagination
                v-model="page"
                :length="forecast.length"
                :total-visible="0"
              />
            </v-card-text>
          </v-card>

          <p v-else>
            Vuetify is a progressive Material Design component framework for
            Vue.js. It was designed to empower developers to create amazing
            applications.
          </p>

          <hr class="my-3" />
          <a
            href="https://nuxtjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nuxt Documentation
          </a>
          <br />
          <a
            href="https://github.com/nuxt/nuxt.js"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nuxt GitHub
          </a> 
        </v-card-text>
        <v-card-actions>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>

export default {
  computed: {
    selectedTime() {
      return new Date(this.forecast[this.page-1].dt)
    }
  },
  watch: {
    async select(val) {
      try {
        this.page = 1
        this.isLoading = true
        this.selectedCity = this.items[val].city
        /*
        const queryPlace = `?near=${this.items[val].city},JP&limit=5`
        const fetchThis = await this.$services.place.getPlaces(
          queryPlace
        )

        this.selectedLat = fetchThis.data.context.geo_bounds.circle.center.latitude
        this.selectedLong = fetchThis.data.context.geo_bounds.circle.center.longitude
        this.places = fetchThis.data.results
        console.log(this.places)

        const queryWeather = `&lat=${this.selectedLat}&lon=${this.selectedLong}`
        */
        const queryWeather = `&q=${this.selectedCity}`
        const { data } = await this.$services.weather.getWeather(queryWeather)
        
        this.forecast = data.list
        console.log(data)
        
        this.isLoading = false

      } catch (err) {
        console.error(err)
      }
    }
  },
  data() {
    return {
      isLoading: false,
      select: null,
      items: [
        { index: "0", city: 'Tokyo', toshi: '東京' },
        { index: "1", city: 'Osaka', toshi: '大阪' },
        { index: "2", city: 'Yokohama', toshi: '横浜' },
        { index: "3", city: 'Kyoto', toshi: '京都' },
        { index: "4", city: 'Sapporo', toshi: '札幌' },
        { index: "5", city: 'Nagoya', toshi: '名古屋' },
      ],
      selectedLat: 0,
      selectedLong: 0,
      places: [],
      page: 1,
      forecast: [],
      selectedCity: '',

      cityFound: false,
      visible: false,
      stormy: false,
      cloudy: false,
      clearSky: false,
      clearNight: false,
      snowy: false,

      isDay: true,
      citySearch: "",
      weather: {
        cityName: "Tokyo",
        country: "JP",
        temperature: 12,
        description: "Clouds everywhere",
        lowTemp: "19",
        highTemp: "30",
        feelsLike: "20",
        humidity: "55",
      },
    };
  },
}
</script>
