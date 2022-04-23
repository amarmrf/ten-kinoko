<template>
  <v-card flat>
    <v-card-title class="py-0 px-2">
      Weather in {{ selectedCity }}
    </v-card-title>
    <!-- need to adjust time -->
    <v-card-text class="py-0 px-2" style="min-height: 200px">
      <p>{{ selectedTime }}</p>
      <v-row>
        <v-col
          class="d-flex flex-sm-column justify-sm-center align-center"
          cols="12"
          sm="5"
        >
          <v-img
            class="mt-sm-n6"
            max-height="112"
            max-width="160"
            :src="`http://openweathermap.org/img/wn/${
              forecast[page - 1].weather[0].icon
            }@4x.png`"
          />
          
          <p
            class="text-center"
            style="
              font-size: 20px;
              font-weight: bold;
              background-color: white !important;
              margin-bottom: 0;
            "
          >
            {{ forecast[page - 1].weather[0].description }}
          </p>
        </v-col>

        <v-col cols="12" sm="4">
          <v-row>
            <v-col cols="6" sm="12">
              Temperature
              <p
                style="
                  font-size: 20px;
                  font-weight: bold;
                  background-color: white !important;
                "
              >
                {{ parseInt(forecast[page - 1].main.temp - 273) }} &#176;C
              </p>
            </v-col>
            <v-col cols="6" sm="12">
              Feels like
              <p
                style="
                  font-size: 20px;
                  font-weight: bold;
                  background-color: white !important;
                "
              >
                {{ parseInt(forecast[page - 1].main.feels_like - 273) }} &#176;C
              </p>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" sm="3">
          <v-row>
            <v-col cols="6" sm="12">
              Wind
              <p
                style="
                  font-size: 20px;
                  font-weight: bold;
                  background-color: white !important;
                "
              >
                {{ forecast[page - 1].wind.speed }} m/s
              </p>
            </v-col>
            <v-col cols="6" sm="12">
              Humidty
              <p
                style="
                  font-size: 20px;
                  font-weight: bold;
                  background-color: white !important;
                "
              >
                {{ forecast[page - 1].main.humidity }} %
              </p>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-text class="d-flex justify-space-between align-center">
      <v-btn color="white" class="mt-1" @click="page = 1"> Now </v-btn>
      <v-pagination
        v-model="page"
        :length="forecast.length"
        :total-visible="0"
      />
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  computed: {
    selectedTime() {
      return new Date(this.forecast[this.page-1].dt * 1000)
    }
  },
  props: {
    forecast: {
      type: Array, required: true
    },
    selectedCity: {
      type: String, required: true
    },
  },
  data() {
    return {
      page: 1,
    };
  },
  watch: {
    selectedCity(val) {
      this.page = 1
    },
  },
};
</script>


