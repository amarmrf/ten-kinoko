<template>
  <v-card flat>
    <v-card-title class="py-0 px-2">
      Places in {{ selectedCity }}
    </v-card-title>
    <!-- need to adjust time -->
    <v-card-text class="py-0 px-2" style="min-height: 200px">
       <p>The Famous Ones</p>
      <v-expansion-panels>
        <v-expansion-panel v-for="(item, i) in arrayDummy" :key="i">
          <v-expansion-panel-header style="font-weight: bold">
            Item
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row>
              <v-col cols="6" class="pl-sm-6">
                Open hour
                <p style="font-weight: 500; background-color: white !important">
                  {{ item.open }} - {{ item.close }}
                </p>
              </v-col>
              <v-col cols="6" class="pr-sm-6">
                Categories
                <p style="font-weight: 500; background-color: white !important">
                  {{
                    item.categories.reduce((x, y) => {
                      return y + ', ' + x;
                    }, "").slice(0,-2)
                  }}
                </p>
              </v-col>

              <v-col cols="12">
                <v-textarea
                  v-model="text"
                  label="Address"
                  outlined
                  readonly
                ></v-textarea>
              </v-col>
              <v-col cols="8" class="pl-sm-6 pt-0">
                Contact
                <p style="font-weight: 500; background-color: white !important">
                  test@mail.com
                </p>
              </v-col>
              <v-col cols="4" class="pr-sm-6 pt-0">
                Google Maps
                <p style="font-weight: 500; background-color: white !important">
                  Click here
                </p>
              </v-col>

              <v-col cols="12">
                <v-textarea
                  v-model="text"
                  label="Description"
                  outlined
                  readonly
                ></v-textarea>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card-text>

    <v-card-text class="d-flex justify-center align-center mt-4">
      <!-- cant use this if not got context total for length-->
      <v-pagination v-model="page" :length="places.length" :total-visible="0" />
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  computed: {
    selectedTime() {
      return new Date();
    },
    arrayDummy() {
      const returnThis = [];
      for (let i = 0; i < 5; i++) {
        returnThis.push(this.dummy);
      }
      return returnThis;
    },
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
      //temporary
      dummy: {
        address: "Jane street IV",
        lat: -6,
        long: 110,
        name: "Method",
        description: "A good place",
        open: "10:00",
        close: "20:00",
        categories: ["Cafe", "Restaurant", "Workspace"],
        contact: "email@mail.com or telephone",
      },
      shortText: "Test",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    };
  },
  watch: {
    page(val) {
      // traverse array of places
    },
  },
};
</script>


