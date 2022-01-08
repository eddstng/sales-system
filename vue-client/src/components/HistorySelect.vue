<template>
  <div class="p-0" max-height="400">
    <v-btn
      class="menu-button-text mt-5"
      x-large
      width="97%"
      min-height="100%"
      v-on:click="selectCustomerFormDialogue = true"
      style="height: 10vh"
    >
      <div>
        {{ this.orderTypeString[$store.state.currentOrder.type] }} <br />
        {{ $store.state.selectedCustomer.phone }} <br />
        {{ $store.state.selectedCustomer.address }} <br />
        {{ $store.state.selectedCustomer.name }} <br />
        {{ $store.state.selectedCustomer.note }}
      </div>
    </v-btn>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      orderTypeString: ["DINE IN", "PICK UP", "DELIVERY"],
    };
  },
  methods: {
    updateOrderWithVoidTrue: async function () {
      // WIP
      try {
        const res = await axios.put(
          "http://localhost:3000/put/orders/update/id/:id",
          {
            total: 10.0,
            customer_id: 3,
            type: 2,
          }
        );
        this.customerSelectMixinSetSelectedCustomer(res.data);
        this.createCustomerFormDialogue = false;
        return;
      } catch (err) {
        this.createCustomerError = err.response.data;
      }
    },
    updateOrder: async function () {
      // WIP
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
          this.customerSelectMixinSetSelectedCustomer(res.data);
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