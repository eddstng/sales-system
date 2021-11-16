<template>
  <div class="p-0" max-height="400">
    <div v-if="Object.keys($store.state.selectedCustomer).length === 0">
      <v-row align="center" justify="space-around">
        <v-btn
          class="menu-button-text mt-8"
          min-height="100%"
          width="25%"
          ff
          style="height: 10vh"
          v-on:click="
            selectedCustomerDetails.selectDineInFormDialogue = true;
            setStoreOrderType(0);
          "
        >
          <div>DINE IN</div>
        </v-btn>
        <v-btn
          class="menu-button-text mt-8"
          x-large
          min-height="100%"
          width="25%"
          v-on:click="
            selectedCustomerDetails.customerPhoneInputDialog = true;
            setStoreOrderType(1);
          "
          style="height: 10vh"
        >
          <div>TAKE OUT</div>
        </v-btn>
        <v-btn
          class="menu-button-text mt-8"
          x-large
          min-height="100%"
          width="25%"
          v-on:click="
            selectedCustomerDetails.customerPhoneInputDialog = true;
            setStoreOrderType(2);
          "
          style="height: 10vh"
        >
          <div>DELIVERY</div>
        </v-btn>
      </v-row>
    </div>
    <v-btn
      v-else
      class="menu-button-text mt-5"
      x-large
      width="97%"
      min-height="100%"
      v-on:click="openClearSelectedCustomerConfirmationDialogue = true"
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
    <CustomerSelectCustomerPhoneInputDialog
      v-bind:selectedCustomerDetails="selectedCustomerDetails"
      @setCreateCustomerFormDialogToBool="setCreateCustomerFormDialogToBool"
    />
    <CustomerSelectCustomerDineInTablesDialog
      v-bind:selectedCustomerDetails="selectedCustomerDetails"
     />

    <CustomerSelectCreateCustomerFormDialog
      v-bind:selectedCustomerDetails="selectedCustomerDetails"
    />

    <v-dialog
      v-model="openClearSelectedCustomerConfirmationDialogue"
      width="900"
    >
      <v-card>
        <h2 class="text-center pt-16 pb-12">CLEAR CUSTOMER?</h2>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            x-large
            width="50%"
            v-on:click="openClearSelectedCustomerConfirmationDialogue = false"
          >
            <div>NO<br /></div>
          </v-btn>
          <v-btn
            x-large
            width="50%"
            v-on:click="
              openClearSelectedCustomerConfirmationDialogue = false;
              clearSelectedCustomer();
            "
          >
            <div>YES<br /></div>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { store } from "../store/store";
import CustomerSelectCustomerPhoneInputDialog from "./CustomerSelectCustomerPhoneInputDialog";
import CustomerSelectCreateCustomerFormDialog from "./CustomerSelectCreateCustomerFormDialog";
import CustomerSelectCustomerDineInTablesDialog from "./CustomerSelectCustomerDineInTablesDialog";

import customerSelectMixin from "../mixins/customerSelectMixin";
export default {
  mixins: [customerSelectMixin],
  data() {
    return {
      openClearSelectedCustomerConfirmationDialogue: false,
      createCustomerError: null,
      selectedCustomerDetails: {
        selectedCustomer: {
          phone: "",
          unit_number: "",
          street_number: "",
          street_name: "",
          address: "",
          city: "",
          name: "",
          note: "",
        },
        suggestedCustomers: [],
        selectDineInFormDialogue: false,
        customerPhoneInputDialog: false,
        createCustomerFormDialog: false,
      },
      selectedCustomer: {
        phone: "",
        unit_number: "",
        street_number: "",
        street_name: "",
        address: "",
        city: "",
        name: "",
        note: "",
      },
      suggestedStreetName: [],
      orderType: null,
      orderTypeString: ["DINE IN", "PICK UP", "DELIVERY"],
    };
  },
  components: {
    CustomerSelectCustomerPhoneInputDialog,
    CustomerSelectCreateCustomerFormDialog,
    CustomerSelectCustomerDineInTablesDialog
  },
  watch: {
    "selectedCustomerDetails.selectedCustomer.phone": function () {
      this.suggestCustomerFromPhoneInput();
    },
    deep: true,
  },
  methods: {
    setCreateCustomerFormDialogToBool: function (bool) {
      this.selectedCustomerDetails.createCustomerFormDialog = bool;
    },
    setStoreOrderType: function (orderTypeNum) {
      store.commit("setCurrentOrder", { type: orderTypeNum });
    },
    clearSelectedCustomer: function () {
      store.commit("setSelectedCustomer", {});
    },
    suggestCustomerFromPhoneInput: function () {
      this.selectedCustomerDetails.suggestedCustomers = [];
      if (this.$store.state.customers.length <= 0) {
        console.log("error in suggestCustomerFromPhoneInput");
      }
      const customerArr = this.$store.state.customers;
      if (this.selectedCustomerDetails.selectedCustomer.phone.length < 3) {
        this.selectedCustomerDetails.suggestedCustomers = [];
      } else {
        customerArr.forEach((v) => {
          if (
            v.phone.includes(
              this.selectedCustomerDetails.selectedCustomer.phone
            )
          ) {
            this.selectedCustomerDetails.suggestedCustomers.push(v);
          }
        });
      }
      return;
    },
  },
};
</script>