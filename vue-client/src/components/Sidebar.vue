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
import storeMixin from '../mixins/storeMixin'
import { store } from "../store/store";
import axios from "axios";
export default {
  mixins: [storeMixin],
  methods: {
    async setComponentToHistory() {
      const orderHistoryArray = (
        await axios.get("http://localhost:3000/get/ordershistory/all")
      ).data;
      // Here we turn the array into an object with the order id as the key and the order object as the value.
      // The reason for this is so we can update the HistoryButtons with the order status.
      const orderHistoryObj = orderHistoryArray.reduce((obj, order) => {
        obj[order.order_id] = order;
        return obj;
      }, {});
      store.commit("setOrderHistory", orderHistoryObj);
      store.commit("setComponent", "HISTORY");
      this.storeMixinClearOrderRelatedDetails();
    },
    async setComponentToOrder() {
      store.commit("setComponent", "ORDER");
      this.storeMixinClearOrderRelatedDetails();
    },
  },
};
</script>
