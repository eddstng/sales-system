<template>
  <div class="p-0" max-height="400">
    <!-- <div v-if="Object.keys($store.state.selectedCustomer).length === 0">
      <v-row align="center" justify="space-around">
        <v-btn
          class="menu-button-text mt-8"
          min-height="100%"
          width="25%"
          style="height: 10vh"
          v-on:click="
            selectDineInFormDialogue = true;
            setStoreOrderType(0);
          "
        >
          <div>UPDATE</div>
        </v-btn>
        <v-btn
          class="menu-button-text mt-8"
          x-large
          min-height="100%"
          width="25%"
          v-on:click="
            selectCustomerFormDialogue = true;
            setStoreOrderType(1);
          "
          style="height: 10vh"
        >
          <div>REORDER</div>
        </v-btn>
        <v-btn
          class="menu-button-text mt-8"
          x-large
          min-height="100%"
          width="25%"
          v-on:click="
            selectCustomerFormDialogue = true;
            updateOrderWithVoidTrue();
          "
          style="height: 10vh"
        >
          <div>VOID</div>
        </v-btn>
      </v-row>
    </div> -->
    <v-btn
      class="menu-button-text mt-5"
      x-large
      width="97%"
      min-height="100%"
      v-on:click="selectCustomerFormDialogue = true"
      style="height: 10vh"
    >
      <div>
        <!-- {{ this.orderTypeString[$store.state.currentOrder.type] }} <br /> -->
        {{ $store.state.selectedCustomer.phone }} <br />
        {{ $store.state.selectedCustomer.address }} <br />
        {{ $store.state.selectedCustomer.name }} <br />
        {{ $store.state.selectedCustomer.note }}
      </div>
    </v-btn>
  </div>
</template>

<style scoped>
</style>

<script>
import axios from "axios";
import { store } from "../store/store";

export default {
  methods: {
    setStoreOrderType: function (orderTypeNum) {
      store.commit("setCurrentOrder", { type: orderTypeNum });
      console.log(this.$store.state.currentOrder);
    },
    updateOrderWithVoidTrue: async function () {
      try {
        const res = await axios.post(
          "http://localhost:3000/put/orders/update/id/:id",
          {
            total: 10.0,
            customer_id: 3,
            type: 2,
          }
        );
        this.setSelectedCustomer(res.data);
        this.createCustomerFormDialogue = false;
        return;
      } catch (err) {
        this.createCustomerError = err.response.data;
      }
    },
    updateOrder: async function () {
      if (this.validCreateCustomerForm()) {
        try {
          const selectedCustomerWithNullEmptyValues =
            this.selectedCustomerValueEmptyStringToNull(this.selectedCustomer);
          const res = await axios.post(
            "http://localhost:3000/post/customers/create",
            {
              ...selectedCustomerWithNullEmptyValues,
              street_number: parseInt(this.selectedCustomer.street_number),
            }
          );
          this.setSelectedCustomer(res.data);
          this.createCustomerFormDialogue = false;
          return;
        } catch (err) {
          this.createCustomerError = err.response.data;
        }
      }
    },
  },
};
</script>