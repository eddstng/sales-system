<template>
  <v-dialog
    v-model="customerOptionDetails.openCustomerOptionSearchDialog"
    width="500"
  >
    <v-card>
      <div>
        <br />
        <v-col>
          <v-form ref="form" lazy-validation>
            <v-text-field
              v-model="selectedCustomerDetails.phoneInput"
              :counter="16"
              label="Phone Number"
              @keydown.enter.prevent="
                toggleCreateCustomerFormDialogOn();
                setSelectedCustomerIfCustomerExists();
              "
              required
              autocomplete="off"
              autofocus
            ></v-text-field>
            <v-alert
              v-if="this.phoneError"
              class="ml-2 mr-2"
              dense
              type="error"
              outlined
            >
              Error: {{ this.phoneError }}
            </v-alert>
          </v-form>
        </v-col>
        <div v-if="this.selectedCustomerDetails.suggestedCustomers.length > 0">
          <v-btn
            v-for="customer in this.selectedCustomerDetails.suggestedCustomers"
            :key="customer.id"
            x-large
            dark
            width="100%"
            v-on:click="
              customerOptionDetails.openCustomerOptionSearchDialog = false;
              selectedCustomerDetails.phoneInput = '';
              selectedCustomerDetails.selectedCustomer = JSON.parse(
                JSON.stringify(customer)
              );
              setSelectedCustomerIfCustomerExists(customer);
              onClickCustomerButton(customer);
            "
          >
            <v-row>
              <v-col sm="5">
                {{
                  customer.phone.replace(/(\d{3})(\d{3})(\d{3})/, "$1-$2-$3")
                }}</v-col
              >
              <v-col sm="2" v-if="customer.name !== null"> -</v-col>
              <v-col sm="5" v-if="customer.name !== null">
                {{ customer.name !== null ? "" : "" }}
                {{ customer.name }}</v-col
              >
            </v-row>
          </v-btn>
        </div>
        <br />
      </div>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          x-large
          width="100%"
          v-on:click="
            phoneError = null;
            phone = '';
            customerOptionDetails.openCustomerOptionSearchDialog = false;
          "
        >
          <div>CANCEL<br /></div>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { store } from "../../store/store";
import axios from "axios";
import storeMixin from "../../mixins/storeMixin";

import customerSelectMixin from "../../mixins/customerSelectMixin";
export default {
  mixins: [customerSelectMixin, storeMixin],
  props: ["customerOptionDetails"],
  data() {
    return {
      phoneInput: '',
      phoneError: null,
      selectedCustomerDetails: {
        suggestedCustomers: [],
        selectedCustomer: {
          phone: "",
        },
      },
    };
  },
  watch: {
    "selectedCustomerDetails.phoneInput": function () {
      this.suggestCustomerFromPhoneInput();
      this.selectedCustomerDetails.phoneInput =
        this.selectedCustomerDetails.phoneInput.replace(
          /(\d{3})(\d{3})(\d{3})/,
          "$1-$2-$3"
        );
    },
    deep: true,
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
    suggestCustomerFromPhoneInput: function () {
      this.selectedCustomerDetails.suggestedCustomers = [];
      var customerArr = JSON.parse(
        JSON.stringify(Object.values(this.$store.state.customers))
      );
      if (this.selectedCustomerDetails.phoneInput.length < 3) {
        this.selectedCustomerDetails.suggestedCustomers = [];
      } else {
        customerArr.forEach((v) => {
          if (
            v.phone.includes(
              this.selectedCustomerDetails.phoneInput
            )
          ) {
            this.selectedCustomerDetails.suggestedCustomers.push(v);
          }
        });
      }
      return;
    },
    toggleCreateCustomerFormDialogOn() {
      if (this.selectedCustomerDetails.phoneInput.length < 12) {
        this.phoneError =
          "Invalid phone number. Phone number needs to be at least 10 numbers long.";
      } else {
        this.selectedCustomerDetails.customerPhoneInputDialog = false;
        this.$emit("setCreateCustomerFormDialogToBool", true);
      }
    },
    setSelectedCustomerIfCustomerExists() {
      if (
        this.$store.state.customers[
          this.selectedCustomerDetails.phoneInput
        ] !== undefined
      ) {
        this.selectedCustomerDetails.selectedCustomer = JSON.parse(
          JSON.stringify(
            this.$store.state.customers[
              this.selectedCustomerDetails.phoneInput
            ]
          )
        );
        this.customerSelectMixinSetSelectedCustomer(
          JSON.parse(
            JSON.stringify(
              this.$store.state.customers[
                this.selectedCustomerDetails.phoneInput
              ]
            )
          )
        );
      }
    },
  },
};
</script>
