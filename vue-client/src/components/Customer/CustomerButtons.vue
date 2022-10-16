<template>
<div>
  <div>
    <v-card outlined tile class="overflow-y-auto" height="90.4vh" v-chat-scroll>
      <div
        v-if="Object.keys($store.state.customers).length === 0"
        class="p-0"
        max-height="400"
      >
        <p class="text-subtitle-2 text-center pt-35p">NO CUSTOMERS FOUND</p>
      </div>
      <div v-else class="p-0" max-height="400">
        <div>
          <v-btn
            class="history-button-text"
            v-for="customer in $store.state.customers"
            v-bind:key="customer.order_id"
            x-large
            dark
            height="80px"
            width="100%"
            v-on:click="onClickCustomerButton(customer)"
          >
            <v-row>
              <v-col>
                {{ customer.phone }}
              </v-col>
              <v-col>
                {{ customer.name }}
              </v-col>
              <v-col class="">
                {{ customer.address }}
              </v-col>
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
  props: ["customerOptionDetails"],
  mixins: [storeMixin],
  data() {
    return {
      displayBackButton: false,
      customerOptionDetailsUpdate: {},
    };
  },
  created() {
    this.$root.$refs.MenuButtons = this;
  },
  methods: {
    updateCustomerOptionDetails() {
      this.$emit("setCustomerOptionDetails", this.customerOptionDetailsUpdate);
    },
    async onClickCustomerButton(customer) {
      // Clear $store.state.selectedCustomer, $store.state.selectedItems, and $store.state.currentOrder.
      //   this.storeMixinClearOrderRelatedDetails();
      // Get specified order details.
      //   const ordersItemsDetailWithOrderIdArray = (
      //     await axios.get(
      //       `http://localhost:3000/get/ordersitemsdetail/id/${order_id}`
      //     )
      //   ).data;
      //   // Add each item to our $store.state.selectedItems.
      //   ordersItemsDetailWithOrderIdArray.forEach((v) => {
      //     this.addHistoryItemToSelectedItems(v);
      //   });
      //   // Update the $store.state.currentOrder.
      //   store.commit("setCurrentOrder", {
      //     id: ordersItemsDetailWithOrderIdArray[0].order_id,
      //     type: ordersItemsDetailWithOrderIdArray[0].order_type,
      //     total: ordersItemsDetailWithOrderIdArray[0].order_total,
      //     customer_id: ordersItemsDetailWithOrderIdArray[0].customer_id,
      //     void: ordersItemsDetailWithOrderIdArray[0].order_void,
      //     paid: ordersItemsDetailWithOrderIdArray[0].order_paid,
      //     timestamp: ordersItemsDetailWithOrderIdArray[0].order_timestamp,
      //     internal: ordersItemsDetailWithOrderIdArray[0].order_internal,
      //     number: ordersItemsDetailWithOrderIdArray[0].order_number,
      //     internal_number:
      //       ordersItemsDetailWithOrderIdArray[0].order_internal_number,
      //   });
      //   // Update the $store.state.selectedCustomer.

      console.log(customer);

      const customerOrderHistory = (
        await axios.get(
          `http://localhost:3000/get/customerorders/customerid/${customer.id}`
        )
      ).data;

      this.customerOptionDetailsUpdate = {
        ...this.customerOptionDetails,
        customerOrderHistory: customerOrderHistory,
      };

      this.updateCustomerOptionDetails();

      console.log(JSON.stringify(customerOrderHistory));

      store.commit("setSelectedCustomer", {
        address: customer.address,
        city: customer.city,
        id: customer.id,
        name: customer.name,
        note: customer.note,
        phone: customer.phone,
        street_name: customer.street_name,
        street_number: customer.street_number,
        unit_number: customer.unit_number,
        buzzer_number: customer.buzzer_number,
      });
      // Provide a total item count to the $store.state.currentOrder details.
      this.storeMixinSumSelectedItemsQuantity();
      // Provide price details to $store.state.priceDetails.
      this.storeMixinUpdateStorePriceDetails();
    },
  },
};
</script>
