<template>
  <v-dialog
    persistent
    @keydown.esc="onClickCancel()"
    v-model="
      $store.state.componentDetails.customerOptionDetails.dialogs
        .openCustomerOptionSearchDialog
    "
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
            v-on:click="onClickCustomerButton(customer)"
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
        <v-btn x-large width="100%" v-on:click="onClickCancel()">
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
  data() {
    return {
      phoneInput: "",
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
    onClickCancel() {
      this.phoneError = null;
      this.phone = "";
      let customerOptionDetailsUpdate = {
        ...this.$store.state.componentDetails.customerOptionDetails,
      };
      customerOptionDetailsUpdate.dialogs.openCustomerOptionSearchDialog = false;
      this.storeMixUpdateCustomerOptionDetails(customerOptionDetailsUpdate);
    },
    async onClickCustomerButton(customer) {
      this.selectedCustomerDetails.phoneInput = "";
      this.selectedCustomerDetails.selectedCustomer = JSON.parse(
        JSON.stringify(customer)
      );
      const customerOrderHistory = (
        await axios.get(
          `http://localhost:3000/get/customerorders/customerid/${customer.id}`
        )
      ).data;

      let customerOptionDetailsUpdate = {
        ...this.$store.state.componentDetails.customerOptionDetails,
        customerOrderHistory: customerOrderHistory,
      };
      customerOptionDetailsUpdate.dialogs.openCustomerOptionSearchDialog = false;
      this.storeMixUpdateCustomerOptionDetails(customerOptionDetailsUpdate);
      this.setSelectedCustomerIfCustomerExists(customer);
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
          if (v.phone.includes(this.selectedCustomerDetails.phoneInput)) {
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
        this.$store.state.customers[this.selectedCustomerDetails.phoneInput] !==
        undefined
      ) {
        this.selectedCustomerDetails.selectedCustomer = JSON.parse(
          JSON.stringify(
            this.$store.state.customers[this.selectedCustomerDetails.phoneInput]
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
