<template>
  <div>
    <div>
      <v-card outlined tile class="overflow-y-auto" height="83.5vh" v-chat-scroll>
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
  mixins: [storeMixin],
  data() {
    return {
      displayBackButton: false,
    };
  },
  created() {
    this.$root.$refs.MenuButtons = this;
  },
  methods: {
    async onClickCustomerButton(customer) {
      const customerOrderHistory = (
        await axios.get(
          `http://localhost:3000/get/customerorders/customerid/${customer.id}`
        )
      ).data;

      store.commit("setCustomerOptionDetails", {
        ...this.$store.state.componentDetails.customerOptionDetails,
        customerOrderHistory: customerOrderHistory,
      });

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
