<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="text-center mt-16" style="font-size: 60px">
      🏙️ ☀️ 🌤️ ⛅️ 🌥️ ☁️ 🗾
      </div>
      <v-card class="d-flex flex-column align-center">
        <v-card-title class="headline"> Where are you going? </v-card-title>
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
          <!-- here is weather card -->
          <Weather
            v-if="selectedCity && display === 'weather'"
            :forecast="forecast"
            :selected-city="selectedCity"
          />

          <Place
            v-else-if="selectedCity && display === 'place'"
            :places="places"
            :selected-city="selectedCity"
          />

          <!-- change to place card and default -->
          <p class="ml-1" v-else>
            Happy traveling!
          </p>

          <hr v-if="!isLoading && selectedCity" class="my-3" />
          <v-btn color="primary" v-if="!isLoading && selectedCity && display === 'weather'" @click="toggleDisplay">
            See where to go
          </v-btn>
          <v-btn color="primary" v-else-if="!isLoading && selectedCity && display === 'place'" @click="toggleDisplay">
            See weather
          </v-btn>
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
  watch: {
    async select(val) {
      try {
        this.isLoading = true;
      
        this.display = "weather"
        
        this.selectedCity = this.items[val].city;
        
        const queryPlace = `?near=${this.items[val].city},JP&limit=50&query=tourist&fields=description,tel,email,hours,name,categories,location,geocodes`
        const placesData = await this.$services.place.getPlaces(
          queryPlace
        )

        this.places = placesData.data.results
        
        const queryWeather = `&q=${this.selectedCity}`;
        const { data } = await this.$services.weather.getWeather(queryWeather);

        this.forecast = data.list;
        
        this.isLoading = false;
      } catch (err) {
        console.error(err);
      }
    },
  },
  methods: {
    toggleDisplay() {
      if (this.display !== "weather") {
        this.display = "weather"
      } else {
        this.display = "place"
      }
    }
  },
  data() {
    return {
      isLoading: false,
      display: '',
      select: null,
      items: [
        { index: "0", city: "Tokyo", toshi: "東京" },
        { index: "1", city: "Osaka", toshi: "大阪" },
        { index: "2", city: "Yokohama", toshi: "横浜" },
        { index: "3", city: "Kyoto", toshi: "京都" },
        { index: "4", city: "Sapporo", toshi: "札幌" },
        { index: "5", city: "Nagoya", toshi: "名古屋" },
      ],
      selectedLat: 0,
      selectedLong: 0,
      places: [],
      forecast: [],
      selectedCity: "",
    };
  },
};
</script>
