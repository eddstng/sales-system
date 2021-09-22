<template>
  <v-card
    outlined
    tile
    class="overflow-y-auto"
    height="92.4vh"
  >
    <div
      class="p-0"
      max-height="400"
    >
      <v-btn
        class="menu-button-text"
        v-for="order in $store.state.orderHistory"
        v-bind:key="order.order_id"
        x-large
        dark
        height="100px"
        width="100%"
        v-on:click="onClickMenuButton(item)"
      >
        <v-row>
          <v-col> {{order.order_id}} </v-col>
          <v-col> {{order.customer_phone}} </v-col>
          <v-col> {{order.order_total}} </v-col>
          <!-- <v-col> {{order.customer_id}} </v-col> -->
          <!-- <v-col> {{order.customer_name}} </v-col> -->
          <!-- <v-col> {{order.order_timestamp}} </v-col> -->
          <!-- <v-col> {{order.order_type}} </v-col> -->
          <!-- <v-col>{{item.timestamp}} </v-col> -->
          <!-- <v-col>{{item.id}}</v-col> -->
          <!-- <v-col> {{item.customer_id}} </v-col> -->
          <!-- <v-col> ${{item.total}} </v-col> -->
        </v-row>
      </v-btn>
    </div>
  </v-card>
</template>

<style>
.menu-button-text {
  font-size: 1.2em;
  overflow: hidden;
}
</style>

<script>
import { store } from "../store/store";
export default {
  data() {
    return {};
  },
  mounted() {
    this.scrollToElement();
  },
  created() {
    this.$root.$refs.MenuButtons = this;
  },
  methods: {
    scrollToElement() {
      const el = this.$refs.scrollToMe;
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    },
    onClickMenuButton(item) {
      this.addItemToSelectedItems(item);
      this.calculatePriceDetails();
    },
    addItemToSelectedItems(item) {
      let selectedItems = store.state.selectedItems;
      if (item.id in selectedItems) {
        selectedItems[item.id].quantity++;
      } else {
        selectedItems[item.id] = {};
        selectedItems[item.id].node = item;
        selectedItems[item.id].quantity = 1;
      }
      store.commit("setSelectedItems", selectedItems);
    },
    calculatePriceDetails() {
      let priceDetails = store.state.priceDetails;
      priceDetails.subtotal = 0;
      priceDetails.gst = 0;
      priceDetails.total = 0;
      const selectedItems = store.state.selectedItems;
      Object.keys(selectedItems).forEach((key) => {
        priceDetails.subtotal =
          parseFloat(selectedItems[key].node.price) *
            selectedItems[key].quantity +
          priceDetails.subtotal;
        priceDetails.gst = parseFloat(
          (priceDetails.subtotal * 0.05).toFixed(2)
        );
        priceDetails.total = priceDetails.subtotal + priceDetails.gst;
      });
      store.commit("priceDetails", priceDetails);
    },
  },
};
</script>
