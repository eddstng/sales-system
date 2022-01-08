<template>
  <v-card outlined tile class="overflow-y-auto" height="92.4vh" 
      v-chat-scroll
  >
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
          <v-col>
            {{ new Date(order.order_timestamp).toLocaleDateString() }}
            {{ getFormattedTimeStamp(new Date(order.order_timestamp)) }}
          </v-col>
          <v-col> {{ order.order_id }} </v-col>
          <v-col> {{ orderTypeString[order.order_type] }} </v-col>
          <v-col v-if="order.order_void === true"> VOID </v-col>
          <v-col v-else-if="order.order_paid === true"> PAID </v-col>
          <v-col v-else> </v-col>
          <v-col> {{ order.customer_phone }} </v-col>
          <v-col> {{ order.order_total.toFixed(2) }} </v-col>
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
import storeMixin from "../mixins/storeMixin";
import axios from "axios";
import { store } from "../store/store";
export default {
  mixins: [storeMixin],
  data() {
    return {orderTypeString: ["DINE IN", "PICK UP", "DELIVERY"],};
  },
  created() {
    this.$root.$refs.MenuButtons = this;
  },
  methods: {
    getFormattedTimeStamp: function (orderTimestamp) {
      var hours = orderTimestamp.getHours();
      var minutes = orderTimestamp.getMinutes();
      var ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? "0" + minutes : minutes;
      var strTime = hours + ":" + minutes + " " + ampm;
      return strTime;
    },
    addHistoryItemToSelectedItems(ordersItemsDetailWithOrderId) {
      //does this cause an issue if we don't clear the state.selctedItems?
      const itemIdOfInterest =
        ordersItemsDetailWithOrderId.item_id === 198
          ? `${ordersItemsDetailWithOrderId.item_id}${ordersItemsDetailWithOrderId.item_name_eng}`
          : ordersItemsDetailWithOrderId.item_id;
      let selectedItems = store.state.selectedItems;
      if (itemIdOfInterest in selectedItems) {
        selectedItems[itemIdOfInterest].quantity++;
      } else {
        selectedItems[itemIdOfInterest] = {};
        selectedItems[itemIdOfInterest].node = {
          category: ordersItemsDetailWithOrderId.item_category,
          id: itemIdOfInterest,
          menu_id: ordersItemsDetailWithOrderId.item_menu_id,
          name_chn: ordersItemsDetailWithOrderId.item_name_chn,
          name_eng: ordersItemsDetailWithOrderId.item_name_eng,
          price: ordersItemsDetailWithOrderId.item_price,
        };
        selectedItems[itemIdOfInterest].customizations =
          ordersItemsDetailWithOrderId.orders_items_customizations;
        selectedItems[itemIdOfInterest].quantity =
          ordersItemsDetailWithOrderId.orders_items_quantity;
        selectedItems[itemIdOfInterest].timestamp =
          new Date(ordersItemsDetailWithOrderId.orders_items_timestamp).getTime();
      }
      store.commit("setSelectedItems", selectedItems);
    },
    async onClickHistoryButton(order_id) {
      this.storeMixinClearOrderRelatedDetails();
      const ordersItemsDetailWithOrderIdArray = (
        await axios.get(
          `http://localhost:3000/get/ordersitemsdetail/id/${order_id}`
        )
      ).data;
      ordersItemsDetailWithOrderIdArray.forEach((v) => {
        this.addHistoryItemToSelectedItems(v);
      });
      store.commit("setCurrentOrder", {
        id: ordersItemsDetailWithOrderIdArray[0].order_id,
        type: ordersItemsDetailWithOrderIdArray[0].order_type,
        total: ordersItemsDetailWithOrderIdArray[0].order_total,
        customer_id: ordersItemsDetailWithOrderIdArray[0].customer_id,
        void: ordersItemsDetailWithOrderIdArray[0].order_void,
        paid: ordersItemsDetailWithOrderIdArray[0].order_paid,
      });
      store.commit("setSelectedCustomer", {
        address: ordersItemsDetailWithOrderIdArray[0].customer_address,
        city: ordersItemsDetailWithOrderIdArray[0].customer_city,
        id: ordersItemsDetailWithOrderIdArray[0].customer_id,
        name: ordersItemsDetailWithOrderIdArray[0].customer_name,
        note: ordersItemsDetailWithOrderIdArray[0].customer_note,
        phone: ordersItemsDetailWithOrderIdArray[0].customer_phone,
        street_name: ordersItemsDetailWithOrderIdArray[0].customer_street_name,
        street_number:
          ordersItemsDetailWithOrderIdArray[0].customer_street_number,
        unit_number: ordersItemsDetailWithOrderIdArray[0].customer_unit_number,
      });
      this.storeMixinSumSelectedItemsQuantity();
      this.storeMixinUpdateStorePriceDetails();
    },
  },
};
</script>
