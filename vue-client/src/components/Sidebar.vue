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
                    v-on:click="changeComponent('ORDER')"
                    >ORDER</v-btn
                  >
                  <v-btn
                    class="my-2"
                    x-large
                    color="success"
                    dark
                    height="160px"
                    width="100%"
                    v-on:click="changeComponent('HISTORY')"
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
    <v-dialog v-model="changeComponentDetails.warning" width="900">
      <v-card>
        <h2 class="text-center pt-16 pb-12">Data will be lost. Continue?</h2>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            x-large
            width="50%"
            v-on:click="changeComponentDetails.warning = false"
          >
            <div>NO<br /></div>
          </v-btn>
          <v-btn x-large width="50%" v-on:click="setComponent()">
            <div>YES<br /></div>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import storeMixin from "../mixins/storeMixin";
import { store } from "../store/store";
import axios from "axios";
export default {
  mixins: [storeMixin],
  data() {
    return {
      changeComponentDetails: {
        warning: false,
        component: "",
      },
    };
  },
  methods: {
    setOrderWarning() {
      console.log(this.$store.state.component);
      if (
        (JSON.stringify(this.$store.state.selectedItems) !== "{}" ||
          JSON.stringify(this.$store.state.selectedCustomer) !== "{}" ||
          JSON.stringify(this.$store.state.currentOrder) !==
            '{"id":null,"type":null,"total":0,"customer_id":null,"void":null,"paid":null}') &&
        this.$store.state.component !== "HISTORY"
      ) {
        return true;
      }
      return false;
    },
    async changeComponent(componentStr) {
      this.changeComponentDetails.component = componentStr;
      if (this.setOrderWarning()) {
        this.changeComponentDetails.warning = true;
      } else {
        this.setComponent();
      }
    },
    async setComponent() {
      switch (this.changeComponentDetails.component) {
        case "HISTORY":
          this.setComponentToHistory();
          break;
        case "ORDER":
          this.setComponentToOrder();
          break;
      }
      this.changeComponentDetails.warning = false;
    },
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
