<template>
  <div>
    <CustomerButtonsSearchDialog
      v-bind:customerOptionDetails="customerOptionDetails"
      @setCustomerOptionDetails="setCustomerOptionDetails"
    />

    <HistoryDisplayHistoryOptionsDialog
      v-bind:historyOptionsDetails="customerOptionDetails"
      @setHistoryOptionsDetails="setCustomerOptionDetails"
    />

    <HistoryDisplayHistoryOptionsConfirmationDialog
      v-bind:historyOptionsDetails="customerOptionDetails"
      @setHistoryOptionsDetails="setCustomerOptionDetails"
    />

    <HistoryDisplayHistoryOptionsReprintDialog
      v-bind:historyOptionsDetails="customerOptionDetails"
      @setHistoryOptionsDetails="setCustomerOptionDetails"
    />

    <v-row no-gutters>
      <v-col lg="1">
        <Sidebar />
      </v-col>
      <v-col lg="4">
        <v-card outlined tile>
          <v-container class="grey lighten-5">
            <CustomerDisplay
              v-bind:customerOptionDetails="customerOptionDetails"
            />
          </v-container>
        </v-card>
      </v-col>
      <v-col lg="7" height="19vh">
        <v-card class="fill-height" tile>
          <v-container class="grey lighten-5">
            <CustomerButtonsHeader
              v-bind:customerOptionDetails="customerOptionDetails"
              @setHistoryOptionsDetails="setCustomerOptionDetails"
            />
            <CustomerButtons
              class="mt-1"
              v-if="$store.state.selectedCustomer.phone === ''"
              v-bind:customerOptionDetails="customerOptionDetails"
              @setCustomerOptionDetails="setCustomerOptionDetails"
            />
            <CustomerOrderHistoryButtons
              v-if="$store.state.selectedCustomer.phone !== ''"
              v-bind:customerOptionDetails="customerOptionDetails"
              @setCustomerOptionDetails="setCustomerOptionDetails"
            />

            <!-- show order history like history page but for customer only -->
            <!-- <CustomerButtons
            v-if="$store.state.selectedCustomer.phone === ''"
              v-bind:customerOptionDetails="customerOptionDetails"
              @setCustomerOptionDetails="setCustomerOptionDetails"
            /> -->
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import storeMixin from "../../mixins/storeMixin";
import Sidebar from "../Sidebar";
import CustomerOrderHistoryButtons from "../Customer/CustomerOrderHistoryButtons";
import CustomerButtons from "../Customer/CustomerButtons";
import CustomerButtonsHeader from "../Customer/CustomerButtonsHeader";
import CustomerDisplay from "../Customer/CustomerDisplay";
import HistoryDisplayHistoryOptionsDialog from "../History/HistoryDisplayHistoryOptionsDialog";
import HistoryDisplayHistoryOptionsConfirmationDialog from "../History/HistoryDisplayHistoryOptionsConfirmationDialog";
import HistoryDisplayHistoryOptionsReprintDialog from "../History/HistoryDisplayHistoryOptionsReprintDialog";

import CustomerButtonsSearchDialog from "../Customer/CustomerButtonsSearchDialog";

export default {
  mixins: [storeMixin],
  components: {
    Sidebar,
    CustomerButtons,
    CustomerOrderHistoryButtons,
    CustomerDisplay,
    CustomerButtonsSearchDialog,
    CustomerButtonsHeader,
    HistoryDisplayHistoryOptionsDialog,
    HistoryDisplayHistoryOptionsReprintDialog,
    HistoryDisplayHistoryOptionsConfirmationDialog,
  },
  data() {
    return {
      customerOptionDetails: {
        confirmingAction: "",
        customerOrderHistory: [],
        openHistoryOptionsConfirmationDialog: false,
        openCustomerOptionSearchDialog: false,
        openHistoryOptionsReprintDialog: false,
        openHistoryOptionsDialog: false,
      },
    };
  },
  methods: {
    setCustomerOptionDetails: function (customerOptionDetails) {
      this.customerOptionDetails = customerOptionDetails;
    },
  },
};
</script>

<style>
.menu-notification {
  position: relative;
  margin-bottom: 0;
}
.sidebar-buttons {
  height: 100px;
}
</style>
