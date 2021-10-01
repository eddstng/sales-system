<template>
  <v-card class="fill-height" outlined tile>
    <v-container class="grey lighten-5 fill-height">
      <template>
        <v-container>
          <v-row>
            <v-col>
              <div>
                <div>
                  <v-btn
                    class="my-2"
                    x-large
                    color="success"
                    dark
                    height="160px"
                    width="100%"
                    >HOME</v-btn
                  >
                  <v-btn
                    class="my-2"
                    x-large
                    color="success"
                    dark
                    height="160px"
                    width="100%"
                    v-on:click="this.setComponentToOrder"
                    >ORDER</v-btn
                  >
                  <v-btn
                    class="my-2"
                    x-large
                    color="success"
                    dark
                    height="160px"
                    width="100%"
                    v-on:click="this.setComponentToHistory"
                    >HISTORY</v-btn
                  >
                  <v-btn
                    class="my-2"
                    x-large
                    color="orange"
                    dark
                    height="160px"
                    width="100%"
                    >OPTIONS</v-btn
                  >
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </template>
    </v-container>
  </v-card>
</template>

<script>
import { store } from "../store/store";
import axios from "axios";
export default {
  methods: {
    clearOrderRelatedStore: function () {
      this.$root.$refs.App.clearOrderRelatedStore();
    },
    async setComponentToHistory() {
      store.commit(
        "setOrderHistory",
        (await axios.get("http://localhost:3000/get/ordershistory/all")).data
      );
      store.commit("setComponent", "HISTORY");
      this.clearOrderRelatedStore();
    },
    async setComponentToOrder() {
      store.commit("setComponent", "ORDER");
      this.clearOrderRelatedStore();
    },
  },
};
</script>
