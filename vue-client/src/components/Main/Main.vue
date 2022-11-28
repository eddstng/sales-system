<template>
  <div>
    <!-- ===================================================== -->
    <!-- Menu Stuff -->
    <!-- ===================================================== -->
    <!-- Toggles on submitOrderDialog -->
    <MenuDisplaySubmitOrderDialog
      v-bind:menuComponentDetails="componentDetails.menuComponentDetails"
      @updateMenuComponentDetails="updateMenuComponentDetails"
    />
    <!-- Toggles on modifyOrderDialog -->
    <MenuDisplayModifyOrderDialog
      v-bind:menuComponentDetails="componentDetails.menuComponentDetails"
      @updateMenuComponentDetails="updateMenuComponentDetails"
    />
    <!-- Toggles on menuComponentDetails.selectedItemDialog  && menuComponentDetails.removeSelectedItem.node !== undefined -->
    <!-- Toggles on menuComponentDetails.selectedItemDialog && menuComponentDetails.openCustomizeSelectedItemDialog -->
    <MenuDisplaySelectedItemDetailsCustomizeDialog
      v-bind:menuComponentDetails="componentDetails.menuComponentDetails"
      @updateMenuComponentDetails="updateMenuComponentDetails"
    />

    <MenuDisplaySelectedItemDetailsDialog
      v-bind:menuComponentDetails="componentDetails.menuComponentDetails"
      @updateMenuComponentDetails="updateMenuComponentDetails"
    />
    <!-- Toggles on menuComponentDetails.customizeOrderDialog -->
    <MenuDisplayCurrentOrderCustomizeOrderDialog
      v-bind:menuComponentDetails="componentDetails.menuComponentDetails"
      @updateMenuComponentDetails="updateMenuComponentDetails"
    />
    <!-- Toggles on menuComponentDetails.addCustomItemDialog -->
    <!-- this one only uses addCustomItemDialog from menuComponentDetails -->
    <MenuButtonsCustomItemDialog
      v-bind:menuComponentDetails="componentDetails.menuComponentDetails"
      @updateMenuComponentDetails="updateMenuComponentDetails"
    />

    <!-- ===================================================== -->
    <!-- History Stuff -->
    <!-- ===================================================== -->

    <HistoryDisplayHistoryOptionsDialog
      v-bind:historyOptionsDetails="componentDetails.historyOptionsDetails"
      @setHistoryOptionsDetails="setHistoryOptionsDetails"
    />
    <HistoryDisplayHistoryOptionsConfirmationDialog
      v-bind:historyOptionsDetails="componentDetails.historyOptionsDetails"
      @setHistoryOptionsDetails="setHistoryOptionsDetails"
    />
    <HistoryDisplayHistoryOptionsReprintDialog
      v-bind:historyOptionsDetails="componentDetails.historyOptionsDetails"
      @setHistoryOptionsDetails="setHistoryOptionsDetails"
    />

    <!-- ===================================================== -->
    <!-- Customer Stuff -->
    <!-- ===================================================== -->

    <CustomerButtonsSearchDialog
      v-bind:customerOptionDetails="componentDetails.customerOptionDetails"
      @setCustomerOptionDetails="setCustomerOptionDetails"
    />

    <HistoryDisplayHistoryOptionsDialog
      v-bind:historyOptionsDetails="componentDetails.customerOptionDetails"
      @setHistoryOptionsDetails="setCustomerOptionDetails"
    />

    <HistoryDisplayHistoryOptionsConfirmationDialog
      v-bind:historyOptionsDetails="componentDetails.customerOptionDetails"
      @setHistoryOptionsDetails="setCustomerOptionDetails"
    />

    <HistoryDisplayHistoryOptionsReprintDialog
      v-bind:historyOptionsDetails="componentDetails.customerOptionDetails"
      @setHistoryOptionsDetails="setCustomerOptionDetails"
    />
    <MenuDisplayCustomerSelectCreateCustomerFormDialog
      v-bind:selectedCustomerDetails="selectedCustomerDetails"
    />
    <v-row no-gutters>
      <v-col lg="1">
        <Sidebar />
      </v-col>
      <v-col lg="4">
        <v-card outlined tile>
          <v-container class="grey lighten-5"> 
            <Display
              v-bind:componentDetails="componentDetails"
              @updateMenuComponentDetails="updateMenuComponentDetails"
            />
            <!-- <MenuDisplay
              v-if="$store.state.component === 'ORDER'"
              v-bind:menuComponentDetails="componentDetails.menuComponentDetails"
              @updateMenuComponentDetails="updateMenuComponentDetails"
            />
            <HistoryDisplay
              v-if="$store.state.component === 'HISTORY'"
              v-bind:historyOptionsDetails="componentDetails.historyOptionsDetails"
            /> -->
            <!-- <CustomerDisplay
              v-if="$store.state.component === 'CUSTOMER'"
              v-bind:customerOptionDetails="componentDetails.customerOptionDetails"
            /> -->
          </v-container>
        </v-card>
      </v-col>
      <v-col lg="7">
        <v-card tile>
          <v-container class="grey lighten-5">
            <MenuButtons
              v-if="$store.state.component === 'ORDER'"
              v-bind:menuComponentDetails="componentDetails.menuComponentDetails"
              @updateMenuComponentDetails="updateMenuComponentDetails"
            />
            <HistoryButtonsHeader v-if="$store.state.component === 'HISTORY'" />
            <HistoryButtons
              class="mt-1"
              v-if="$store.state.component === 'HISTORY'"
            />
            <CustomerButtonsHeader
              v-if="$store.state.component === 'CUSTOMER'"
              v-bind:customerOptionDetails="componentDetails.customerOptionDetails"
              @setHistoryOptionsDetails="setCustomerOptionDetails"
            />
            <CustomerButtons
              class="mt-1"
              v-if="
                $store.state.component === 'CUSTOMER' &&
                $store.state.selectedCustomer.phone === ''
              "
              v-bind:customerOptionDetails="componentDetails.customerOptionDetails"
              @setCustomerOptionDetails="setCustomerOptionDetails"
            />
            <CustomerOrderHistoryButtons
              v-if="
                $store.state.component === 'CUSTOMER' &&
                $store.state.selectedCustomer.phone !== ''
              "
              v-bind:customerOptionDetails="componentDetails.customerOptionDetails"
              @setCustomerOptionDetails="setCustomerOptionDetails"
            />
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import storeMixin from "../../mixins/storeMixin";
import Sidebar from "../Sidebar.vue";
import MenuButtons from "../Menu/MenuButtons.vue";
// import MenuDisplay from "../Menu/MenuDisplay.vue";
import MenuDisplaySubmitOrderDialog from "../Menu/MenuDisplaySubmitOrderDialog";
import MenuDisplayModifyOrderDialog from "../Menu/MenuDisplayModifyOrderDialog";
import MenuDisplaySelectedItemDetailsDialog from "../Menu/MenuDisplaySelectedItemDetailsDialog";
import MenuDisplaySelectedItemDetailsCustomizeDialog from "../Menu/MenuDisplaySelectedItemDetailsCustomizeDialog";
import MenuButtonsCustomItemDialog from "../Menu/MenuButtonsCustomItemDialog";
import MenuDisplayCurrentOrderCustomizeOrderDialog from "../Menu/MenuDisplayCurrentOrderCustomizeOrderDialog";
import MenuDisplayCustomerSelectCreateCustomerFormDialog from "../Menu/MenuDisplayCustomerSelectCreateCustomerFormDialog";

import HistoryButtons from "../History/HistoryButtons";
// import HistoryDisplay from "../History/HistoryDisplay";
import HistoryButtonsHeader from "../History/HistoryButtonsHeader";

import HistoryDisplayHistoryOptionsDialog from "../History/HistoryDisplayHistoryOptionsDialog";
import HistoryDisplayHistoryOptionsConfirmationDialog from "../History/HistoryDisplayHistoryOptionsConfirmationDialog";
import HistoryDisplayHistoryOptionsReprintDialog from "../History/HistoryDisplayHistoryOptionsReprintDialog";

import CustomerOrderHistoryButtons from "../Customer/CustomerOrderHistoryButtons";
import CustomerButtons from "../Customer/CustomerButtons";
import CustomerButtonsHeader from "../Customer/CustomerButtonsHeader";
// import CustomerDisplay from "../Customer/CustomerDisplay";
import CustomerButtonsSearchDialog from "../Customer/CustomerButtonsSearchDialog";

import Display from "./Display";

export default {
  mixins: [storeMixin],
  name: "App",
  components: {
    Sidebar,
    Display,
    MenuButtons,
    // MenuDisplay,
    MenuDisplaySubmitOrderDialog,
    MenuDisplayModifyOrderDialog,
    MenuDisplaySelectedItemDetailsDialog,
    MenuDisplaySelectedItemDetailsCustomizeDialog,
    MenuButtonsCustomItemDialog,
    MenuDisplayCurrentOrderCustomizeOrderDialog,
    MenuDisplayCustomerSelectCreateCustomerFormDialog,
    HistoryButtons,
    // HistoryDisplay,
    HistoryDisplayHistoryOptionsDialog,
    HistoryDisplayHistoryOptionsConfirmationDialog,
    HistoryDisplayHistoryOptionsReprintDialog,
    HistoryButtonsHeader,
    CustomerButtons,
    CustomerOrderHistoryButtons,
    // CustomerDisplay,
    CustomerButtonsSearchDialog,
    CustomerButtonsHeader,
  },
  data() {
    return {
      selectedCustomerDetails: {
        suggestedCustomers:[],
        selectedCustomer: {
          phone: "",
          buzzer_number: "",
          unit_number: "",
          street_number: "",
          street_name: "",
          address: "",
          city: "",
          name: "",
          note: "",
          id: "",
        },
      },
      componentDetails: {
        menuComponentDetails: {
          dialogToggles: {
            addCustomitemDialog: false,
            customizeOrderDialog: false,
            openCustomizeSelectedItemDialog: false,
          },
          selectedItemDialog: false,
          addCustomItemDialog: false,
          customOptionsDialog: false,
          removeSelectedItem: {},
        },
        historyOptionsDetails: {
          confirmingAction: "",
          openHistoryOptionsConfirmationDialog: false,
          openHistoryOptionsReprintDialog: false,
          openHistoryOptionsDialog: false,
        },
        customerOptionDetails: {
          confirmingAction: "",
          customerOrderHistory: [],
          openHistoryOptionsConfirmationDialog: false,
          openHistoryOptionsReprintDialog: false,
          openHistoryOptionsDialog: false,
          openCustomerOptionSearchDialog: false,
        },

      },
      submitOrderDialog: false,
      modifyOrderDialog: false,
      suggestedStreetName: [],
    };
  },
  methods: {
    updateMenuComponentDetails(updatedMenuComponentDetails) {
      this.componentDetails.menuComponentDetails = updatedMenuComponentDetails;
    },
    setHistoryOptionsDetails: function (historyOptionsDetails) {
      this.componentDetails.historyOptionsDetails = historyOptionsDetails;
    },
    setCustomerOptionDetails: function (customerOptionDetails) {
      this.componentDetails.customerOptionDetails = customerOptionDetails;
    },
  },
};
</script>
