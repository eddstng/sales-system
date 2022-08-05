<template>
  <v-card outlined tile class="overflow-y-auto" height="90.4vh" v-chat-scroll>
    <div v-if="Object.keys($store.state.orderHistory).length === 0" class="p-0" max-height="400">
      <p class="text-subtitle-2 text-center pt-20p">
        NO ORDERS FOUND
      </p>
    </div>
    <div v-else class="p-0" max-height="400">
      <v-btn class="history-button-text" v-for="order in $store.state.orderHistory" v-bind:key="order.order_id" x-large
        dark height="100px" width="100%" v-on:click="onClickHistoryButton(order.order_id)">
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
          <v-col>
            {{
                order.customer_phone.replace(/(\d{3})(\d{3})(\d{3})/, '$1-$2-$3')
            }}
          </v-col>
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

.pt-35p {
  padding-top: 35%;
}
</style>

<script>
import storeMixin from '../../mixins/storeMixin';
import axios from 'axios';
import { store } from '../../store/store';
export default {
  mixins: [storeMixin],
  data() {
    return { orderTypeString: ['DINE IN', 'PICK UP', 'DELIVERY'] };
  },
  created() {
    this.$root.$refs.MenuButtons = this;
  },
  methods: {
    getFormattedTimeStamp: function (orderTimestamp) {
      var hours = orderTimestamp.getHours();
      var minutes = orderTimestamp.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0' + minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;
      return strTime;
    },
    // The parameter ordersItemsDetailWithOrderId is an object.
    addHistoryItemToSelectedItems(ordersItemsDetailWithOrderId) {
      // If the item has a custom name, we provide it with a custom ID. This is necessary to handle the quantity. Custom items and items with customizations will have a custom name. 
      const displayId = ordersItemsDetailWithOrderId.item_custom_name ? `${ordersItemsDetailWithOrderId.item_id}${ordersItemsDetailWithOrderId.item_custom_name}` : ordersItemsDetailWithOrderId.item_id;
      let selectedItems = store.state.selectedItems;

      // Create a key value pair for the custom item. 
      // The key will be used to distinguish between different items on the display. Custom items and items with customizations will have a customized unique key. Otherwise, the key will be the id of the item. This is also necessary for quantity updates. 
      selectedItems[displayId] = {};
      selectedItems[displayId].node = {
        id: ordersItemsDetailWithOrderId.item_id,
        menu_id: ordersItemsDetailWithOrderId.item_menu_id,
        custom_id: displayId,
        custom_name: ordersItemsDetailWithOrderId.item_custom_name,
        name_eng: ordersItemsDetailWithOrderId.item_name_eng,
        name_chn: ordersItemsDetailWithOrderId.item_name_chn,
        category: ordersItemsDetailWithOrderId.item_category,
        price: ordersItemsDetailWithOrderId.item_price,
      };
      selectedItems[displayId].customizations =
        ordersItemsDetailWithOrderId.orders_items_customizations;
      selectedItems[displayId].quantity =
        ordersItemsDetailWithOrderId.orders_items_quantity;
      selectedItems[displayId].timestamp = new Date(
        ordersItemsDetailWithOrderId.orders_items_timestamp
      ).getTime(); // TO DO: Do we need this? I don't think so.
      // Update the $store.state.selectedItems.
      store.commit('setSelectedItems', selectedItems);
    },
    async onClickHistoryButton(order_id) {
      // Clear $store.state.selectedCustomer, $store.state.selectedItems, and $store.state.currentOrder.
      this.storeMixinClearOrderRelatedDetails();
      // Get specified order details.
      const ordersItemsDetailWithOrderIdArray = (
        await axios.get(
          `http://localhost:3000/get/ordersitemsdetail/id/${order_id}`
        )
      ).data;
      // Add each item to our $store.state.selectedItems. 
      ordersItemsDetailWithOrderIdArray.forEach((v) => {
        this.addHistoryItemToSelectedItems(v);
      });
      // Update the $store.state.currentOrder. 
      store.commit('setCurrentOrder', {
        id: ordersItemsDetailWithOrderIdArray[0].order_id,
        type: ordersItemsDetailWithOrderIdArray[0].order_type,
        total: ordersItemsDetailWithOrderIdArray[0].order_total,
        customer_id: ordersItemsDetailWithOrderIdArray[0].customer_id,
        void: ordersItemsDetailWithOrderIdArray[0].order_void,
        paid: ordersItemsDetailWithOrderIdArray[0].order_paid,
      });
      // Update the $store.state.selectedCustomer.
      store.commit('setSelectedCustomer', {
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
      // Provide a total item count to the $store.state.currentOrder details. 
      this.storeMixinSumSelectedItemsQuantity();
      // Provide price details to $store.state.priceDetails.
      this.storeMixinUpdateStorePriceDetails();
    },
  },
};
</script>
