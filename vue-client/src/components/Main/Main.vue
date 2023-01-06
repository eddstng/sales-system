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

    <MenuDisplayPrintModifiedOrderDialog
      v-bind:menuComponentDetails="componentDetails.menuComponentDetails"
      @updateMenuComponentDetails="updateMenuComponentDetails"
    />

    <!-- Toggles on menuComponentDetails.selectedItemDialog  && menuComponentDetails.removeSelectedItem.node !== undefined -->
    <!-- Toggles on menuComponentDetails.selectedItemDialog && menuComponentDetails.openCustomizeSelectedItemDialog -->
    <MenuDisplaySelectedItemDetailsCustomizeDialog
      v-bind:menuComponentDetails="componentDetails.menuComponentDetails"
      @updateMenuComponentDetails="updateMenuComponentDetails"
    />

    <MenuRequiredCustomizationDialog
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

    <CustomerButtonsSearchDialog />

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
          </v-container>
        </v-card>
      </v-col>
      <v-col lg="7">
        <v-card tile>
          <v-container class="grey lighten-5">
            <MenuButtonsHeader
              v-if="$store.state.component === 'ORDER'"
              v-bind:menuComponentDetails="
                componentDetails.menuComponentDetails
              "
              @updateMenuComponentDetails="updateMenuComponentDetails"
            />
            <HistoryButtonsHeader v-if="$store.state.component === 'HISTORY'" />
            <CustomerButtonsHeader
              v-if="$store.state.component === 'CUSTOMER'"
              @setHistoryOptionsDetails="setHistoryOptionsDetails"
            />
            <Buttons
              v-bind:componentDetails="componentDetails"
              @updateMenuComponentDetails="updateMenuComponentDetails"
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
import Buttons from "../Main/Buttons.vue";
import MenuDisplaySubmitOrderDialog from "../Menu/MenuDisplaySubmitOrderDialog";
import MenuDisplayModifyOrderDialog from "../Menu/MenuDisplayModifyOrderDialog";
import MenuDisplayPrintModifiedOrderDialog from "../Menu/MenuDisplayPrintModifiedOrderDialog";
import MenuDisplaySelectedItemDetailsDialog from "../Menu/MenuDisplaySelectedItemDetailsDialog";
import MenuDisplaySelectedItemDetailsCustomizeDialog from "../Menu/MenuDisplaySelectedItemDetailsCustomizeDialog";
import MenuButtonsCustomItemDialog from "../Menu/MenuButtonsCustomItemDialog";
import MenuDisplayCurrentOrderCustomizeOrderDialog from "../Menu/MenuDisplayCurrentOrderCustomizeOrderDialog";
import MenuDisplayCustomerSelectCreateCustomerFormDialog from "../Menu/MenuDisplayCustomerSelectCreateCustomerFormDialog";
import MenuButtonsHeader from "../Menu/MenuButtonsHeader";
import MenuRequiredCustomizationDialog from "../Menu/MenuRequiredCustomizationDialog";

import HistoryButtonsHeader from "../History/HistoryButtonsHeader";
import HistoryDisplayHistoryOptionsDialog from "../History/HistoryDisplayHistoryOptionsDialog";
import HistoryDisplayHistoryOptionsConfirmationDialog from "../History/HistoryDisplayHistoryOptionsConfirmationDialog";
import HistoryDisplayHistoryOptionsReprintDialog from "../History/HistoryDisplayHistoryOptionsReprintDialog";

import CustomerButtonsHeader from "../Customer/CustomerButtonsHeader";
import CustomerButtonsSearchDialog from "../Customer/CustomerButtonsSearchDialog";

import Display from "./Display";

export default {
  mixins: [storeMixin],
  name: "App",
  components: {
    Sidebar,
    Display,
    Buttons,
    MenuButtonsHeader,
    MenuDisplaySubmitOrderDialog,
    MenuDisplayModifyOrderDialog,
    MenuDisplayPrintModifiedOrderDialog,
    MenuDisplaySelectedItemDetailsDialog,
    MenuDisplaySelectedItemDetailsCustomizeDialog,
    MenuButtonsCustomItemDialog,
    MenuDisplayCurrentOrderCustomizeOrderDialog,
    MenuDisplayCustomerSelectCreateCustomerFormDialog,
    MenuRequiredCustomizationDialog,
    HistoryDisplayHistoryOptionsDialog,
    HistoryDisplayHistoryOptionsConfirmationDialog,
    HistoryDisplayHistoryOptionsReprintDialog,
    HistoryButtonsHeader,
    CustomerButtonsSearchDialog,
    CustomerButtonsHeader,
  },
  data() {
    return {
      selectedCustomerDetails: {
        suggestedCustomers: [],
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
            customizeChowMeinTypeDialog: false,
            requiredCustomizationDialog: false,
            printModifiedOrderDialog: false,
          },
          requiredCustomizationDetails: {
            reducedItemsObj: null,
            itemThatRequiresCustomization: null,
            itemsThatShareTheSameMenuId: null,
          },
          displayedButtonsConfig: {
            displayCategoryButtons: true,
            fullCategoryMenuObj: {},
          },
          selectedItemDialog: false,
          addCustomItemDialog: false,
          customOptionsDialog: false,
          removeSelectedItem: {},
          selectedCategory: null,
          displayMenuButtons: false,
        },
        historyOptionsDetails: {
          confirmingAction: "",
          openHistoryOptionsConfirmationDialog: false,
          openHistoryOptionsReprintDialog: false,
          openHistoryOptionsDialog: false,
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
  },
};
</script>
