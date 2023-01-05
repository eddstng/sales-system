<template>
  <div>
    <div>
      <v-card
        outlined
        tile
        class="overflow-y-auto mt-1"
        height="82vh"
        dark
        v-chat-scroll
      >
        <div
          v-if="
            $store.state.componentDetails.customerOptionDetails
              .customerOrderHistory.length === 0
          "
          class="p-0"
          max-height="400"
        >
          <p class="text-subtitle-2 text-center pt-35p">
            NO CUSTOMER ORDERS FOUND
          </p>
        </div>
        <div v-else class="p-0" max-height="400">
          <div>
            <v-btn
              class="history-button-text"
              v-for="order in $store.state.componentDetails
                .customerOptionDetails.customerOrderHistory"
              v-bind:key="order.order_id"
              x-large
              height="80px"
              width="100%"
              v-on:click="onClickHistoryButton(order.id)"
            >
              <v-row>
                <v-col>
                  {{ new Date(order.timestamp).toLocaleDateString() }}
                  {{ getFormattedTimeStamp(new Date(order.timestamp)) }}
                </v-col>
                <!-- <v-col> {{ order.order_id }} </v-col> -->
                <v-col>
                  {{
                    order.number ? order.number : `I - ` + order.internal_number
                  }}
                </v-col>
                <v-col> {{ orderTypeString[order.type] }} </v-col>
                <v-col v-if="order.void === true"> VOID </v-col>
                <v-col v-else-if="order.paid === true"> PAID </v-col>
                <v-col v-else> </v-col>
                <v-col> {{ Number(order.total).toFixed(2) }} </v-col>
              </v-row>
            </v-btn>
          </div>
        </div>
      </v-card>
    </div>
  </div>
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
import storeMixin from "../../mixins/storeMixin";
import { store } from "../../store/store";
import axios from "axios";

export default {
  mixins: [storeMixin],
  data() {
    return {
      orderTypeString: ["DINE IN", "PICK UP", "DELIVERY"],
      displayBackButton: false,
      customerOptionDetailsUpdate: {},
    };
  },
  created() {
    this.$root.$refs.MenuButtons = this;
  },
  methods: {
    addHistoryItemToSelectedItems(ordersItemsDetailWithOrderId) {
      const displayId = ordersItemsDetailWithOrderId.item_id.toString();
      let selectedItems = store.state.selectedItems;

      // Create a key value pair for the custom item.
      // The key will be used to distinguish between different items on the display. Custom items and items with customizations will have a customized unique key. Otherwise, the key will be the id of the item. This is also necessary for quantity updates.
      selectedItems[displayId] = {};
      selectedItems[displayId].node = {
        id: ordersItemsDetailWithOrderId.item_id,
        menu_id: ordersItemsDetailWithOrderId.item_menu_id,
        custom_id: displayId,
        // custom_name: ordersItemsDetailWithOrderId.item_custom_name,
        name_eng: ordersItemsDetailWithOrderId.item_name_eng,
        name_chn: ordersItemsDetailWithOrderId.item_name_chn,
        category: ordersItemsDetailWithOrderId.item_category,
        price: ordersItemsDetailWithOrderId.item_price,
        custom_price: ordersItemsDetailWithOrderId.item_custom_price,
      };
      selectedItems[displayId].customizations =
        ordersItemsDetailWithOrderId.orders_items_customizations;
      selectedItems[displayId].quantity = parseFloat(
        ordersItemsDetailWithOrderId.orders_items_quantity);
      selectedItems[displayId].timestamp = new Date(
        ordersItemsDetailWithOrderId.orders_items_timestamp
      ).getTime(); // TO DO: Do we need this? I don't think so.
      // Update the $store.state.selectedItems.
      store.commit("setSelectedItems", selectedItems);
    },
    async onClickHistoryButton(order_id) {
      // Clear $store.state.selectedCustomer, $store.state.selectedItems, and $store.state.currentOrder.
      this.storeMixinClearStorePriceDetails();
      this.storeMixinClearSelectedItems();

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
      store.commit("setCurrentOrder", {
        id: ordersItemsDetailWithOrderIdArray[0].order_id,
        type: ordersItemsDetailWithOrderIdArray[0].order_type,
        total: ordersItemsDetailWithOrderIdArray[0].order_total,
        customer_id: ordersItemsDetailWithOrderIdArray[0].customer_id,
        void: ordersItemsDetailWithOrderIdArray[0].order_void,
        paid: ordersItemsDetailWithOrderIdArray[0].order_paid,
        timestamp: ordersItemsDetailWithOrderIdArray[0].order_timestamp,
        internal: ordersItemsDetailWithOrderIdArray[0].order_internal,
        number: ordersItemsDetailWithOrderIdArray[0].order_number,
        internal_number:
          ordersItemsDetailWithOrderIdArray[0].order_internal_number,
        customizations:
          ordersItemsDetailWithOrderIdArray[0].order_customizations,
        customizations_price:
          ordersItemsDetailWithOrderIdArray[0].order_customizations_price,
      });

      // Provide a total item count to the $store.state.currentOrder details.
      this.storeMixinSumSelectedItemsQuantity();
      // Provide price details to $store.state.priceDetails.
      this.storeMixinUpdateStorePriceDetails();
    },
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
    updateCustomerOptionDetails() {
      this.$emit("setCustomerOptionDetails", this.customerOptionDetailsUpdate);
    },
  },
};
</script>
