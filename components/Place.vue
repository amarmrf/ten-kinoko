<template>
  <v-card flat>
    <v-card-title class="py-0 px-2">
      Places in {{ selectedCity }}
    </v-card-title>
    <!-- need to adjust time -->
    <v-card-text class="py-0 px-2" style="min-height: 200px">
       <p>The Famous Ones</p>
      <v-expansion-panels>
        <v-expansion-panel v-for="(item, i) in batch" :key="i">
          <v-expansion-panel-header style="font-weight: bold">
            {{ item.name }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row>
              <v-col cols="12" sm="6" class="pl-sm-6">
                Open hour
                <p style="font-weight: 500; background-color: white !important">
                  {{ item.hours.display || "-" }}
                </p>
              </v-col>
              <v-col cols="12" sm="6" class="pr-sm-6">
                Categories
                <p style="font-weight: 500; background-color: white !important">
                  {{
                    item.categories.map(cat=>cat.name).reduce((x, y) => {
                      return y + ', ' + x;
                    }, "").slice(0,-2)
                  }}
                </p>
              </v-col>

              <v-col cols="12">
                <v-textarea
                  v-model="item.location.formatted_address"
                  label="Address"
                  outlined
                  readonly
                ></v-textarea>
              </v-col>
              <v-col cols="12" sm="7" class="pl-sm-6 pt-0">
                Contact
                <p style="font-weight: 500; background-color: white !important">
                  {{ item.tel || "-" }}
                </p>
              </v-col>
              <v-col cols="12" sm="5" class="mb-sm-0 mb-6 pt-0">
                <v-btn color="white" class="mt-sm-2" @click="openGmaps(item.geocodes.main.latitude, item.geocodes.main.longitude)"> Open map </v-btn>
              </v-col>

            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card-text>

    <v-card-text class="d-flex justify-center align-center mt-4">
      <!-- cant use this if not got context total for length-->
      <v-pagination v-model="page" :length="places.length / 5" :total-visible="0" />
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  computed: {
    selectedTime() {
      return new Date();
    },
    batch() {
      return this.places.slice(5 * (this.page - 1), 5 * (this.page - 1)+5)
    }
  },
  props: {
    places: {
      type: Array,
      required: true,
    },
    selectedCity: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      page: 1,
    };
  },
  methods: {
    openGmaps(lat, lng) {
      window.open(`https://maps.google.com/?q=${lat},${lng}`)
    }
  }
};
</script>


