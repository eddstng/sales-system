<template>
  <v-card outlined tile class="overflow-y-auto" height="92.4vh">
    <div class="p-0" max-height="400">
      <v-btn
        class="history-button-text"
        v-for="order in $store.state.orderHistory"
        v-bind:key="order.order_id"
        x-large
        dark
        height="100px"
        width="100%"
        v-on:click="onClickHistoryButton(order.order_id)"
      >
        <v-row>
          <v-col> {{ order.order_id }} </v-col>
          <v-col> {{ order.customer_phone }} </v-col>
          <v-col> {{ order.order_total }} </v-col>
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
.history-button-text {
  font-size: 1.2em;
  overflow: hidden;
}
</style>

<script>
import axios from "axios";
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
    reloadComponent: function (componentStr) {
      this.$root.$refs.App.reloadComponent(componentStr);
    },
    scrollToElement() {
      const el = this.$refs.scrollToMe;
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    },
    addHistoryItemsToSelectedItems(ordersItemsDetailWithOrderId) {
      let selectedItems = store.state.selectedItems;
      if (ordersItemsDetailWithOrderId.item_id in selectedItems) {
        selectedItems[ordersItemsDetailWithOrderId.item_id].quantity++;
      } else {
        selectedItems[ordersItemsDetailWithOrderId.item_id] = {};
        selectedItems[ordersItemsDetailWithOrderId.item_id].node = {
          category: ordersItemsDetailWithOrderId.item_category,
          id: ordersItemsDetailWithOrderId.item_id,
          menu_id: ordersItemsDetailWithOrderId.item_menu_id,
          name_chn: ordersItemsDetailWithOrderId.item_name_chn,
          name_eng: ordersItemsDetailWithOrderId.item_name_eng,
          price: ordersItemsDetailWithOrderId.item_price,
        };
        selectedItems[ordersItemsDetailWithOrderId.item_id].quantity =
          ordersItemsDetailWithOrderId.orders_items_quantity;
      }
      store.commit("setSelectedItems", selectedItems);
    },
    async onClickHistoryButton(order_id) {
      const ordersItemsDetailWithOrderIdArray = (
        await axios.get(
          `http://localhost:3000/get/ordersitemsdetail/id/${order_id}`
        )
      ).data;
      ordersItemsDetailWithOrderIdArray.forEach((v) => {
        this.addHistoryItemsToSelectedItems(v);
      });
      this.reloadComponent("HISTORY")
    },
  },
};
</script>
