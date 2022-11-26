<template>
  <div>
    <!-- ===================================================== -->
    <!-- Menu Stuff -->
    <!-- ===================================================== -->
    <!-- Toggles on submitOrderDialog -->
    <MenuDisplaySubmitOrderDialog
      v-bind:menuComponentDetails="menuComponentDetails"
      @updateMenuComponentDetails="updateMenuComponentDetails"
    />
    <!-- Toggles on modifyOrderDialog -->
    <MenuDisplayModifyOrderDialog
      v-bind:menuComponentDetails="menuComponentDetails"
      @updateMenuComponentDetails="updateMenuComponentDetails"
    />
    <!-- Toggles on menuComponentDetails.selectedItemDialog  && menuComponentDetails.removeSelectedItem.node !== undefined -->
    <!-- Toggles on menuComponentDetails.selectedItemDialog && menuComponentDetails.openCustomizeSelectedItemDialog -->
    <MenuDisplaySelectedItemDetailsCustomizeDialog
      v-bind:menuComponentDetails="menuComponentDetails"
      @updateMenuComponentDetails="updateMenuComponentDetails"
    />

    <MenuDisplaySelectedItemDetailsDialog
      v-bind:menuComponentDetails="menuComponentDetails"
      @updateMenuComponentDetails="updateMenuComponentDetails"
    />
    <!-- Toggles on menuComponentDetails.customizeOrderDialog -->
    <MenuDisplayCurrentOrderCustomizeOrderDialog
      v-bind:menuComponentDetails="menuComponentDetails"
      @updateMenuComponentDetails="updateMenuComponentDetails"
    />
    <!-- Toggles on menuComponentDetails.addCustomItemDialog -->
    <!-- this one only uses addCustomItemDialog from menuComponentDetails -->
    <MenuButtonsCustomItemDialog
      v-bind:menuComponentDetails="menuComponentDetails"
      @updateMenuComponentDetails="updateMenuComponentDetails"
    />

    <!-- ===================================================== -->
    <!-- History Stuff -->
    <!-- ===================================================== -->

    <HistoryDisplayHistoryOptionsDialog
      v-bind:historyOptionsDetails="historyOptionsDetails"
      @setHistoryOptionsDetails="setHistoryOptionsDetails"
    />
    <HistoryDisplayHistoryOptionsConfirmationDialog
      v-bind:historyOptionsDetails="historyOptionsDetails"
      @setHistoryOptionsDetails="setHistoryOptionsDetails"
    />
    <HistoryDisplayHistoryOptionsReprintDialog
      v-bind:historyOptionsDetails="historyOptionsDetails"
      @setHistoryOptionsDetails="setHistoryOptionsDetails"
    />

    <v-row no-gutters>
      <v-col lg="1">
        <Sidebar />
      </v-col>
      <v-col lg="4">
        <v-card outlined tile>
          <v-container class="grey lighten-5">
            <MenuDisplay
              v-if="$store.state.component === 'ORDER'"
              v-bind:menuComponentDetails="menuComponentDetails"
              @updateMenuComponentDetails="updateMenuComponentDetails"
            />
            <HistoryDisplay
              v-if="$store.state.component === 'HISTORY'"
              v-bind:historyOptionsDetails="historyOptionsDetails"
            />
          </v-container>
        </v-card>
      </v-col>
      <v-col lg="7">
        <v-card tile>
          <v-container class="grey lighten-5">
            <MenuButtons
              v-if="$store.state.component === 'ORDER'"
              v-bind:menuComponentDetails="menuComponentDetails"
              @updateMenuComponentDetails="updateMenuComponentDetails"
            />
            <HistoryButtonsHeader v-if="$store.state.component === 'HISTORY'" />
            <HistoryButtons
              class="mt-1"
              v-if="$store.state.component === 'HISTORY'"
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
import MenuDisplay from "../Menu/MenuDisplay.vue";
import MenuDisplaySubmitOrderDialog from "../Menu/MenuDisplaySubmitOrderDialog";
import MenuDisplayModifyOrderDialog from "../Menu/MenuDisplayModifyOrderDialog";
import MenuDisplaySelectedItemDetailsDialog from "../Menu/MenuDisplaySelectedItemDetailsDialog";
import MenuDisplaySelectedItemDetailsCustomizeDialog from "../Menu/MenuDisplaySelectedItemDetailsCustomizeDialog";
import MenuButtonsCustomItemDialog from "../Menu/MenuButtonsCustomItemDialog";
import MenuDisplayCurrentOrderCustomizeOrderDialog from "../Menu/MenuDisplayCurrentOrderCustomizeOrderDialog";

import HistoryButtons from "../History/HistoryButtons";
import HistoryDisplay from "../History/HistoryDisplay";
import HistoryButtonsHeader from "../History/HistoryButtonsHeader";

import HistoryDisplayHistoryOptionsDialog from "../History/HistoryDisplayHistoryOptionsDialog";
import HistoryDisplayHistoryOptionsConfirmationDialog from "../History/HistoryDisplayHistoryOptionsConfirmationDialog";
import HistoryDisplayHistoryOptionsReprintDialog from "../History/HistoryDisplayHistoryOptionsReprintDialog";
export default {
  mixins: [storeMixin],
  name: "App",
  components: {
    Sidebar,
    MenuButtons,
    MenuDisplay,
    MenuDisplaySubmitOrderDialog,
    MenuDisplayModifyOrderDialog,
    MenuDisplaySelectedItemDetailsDialog,
    MenuDisplaySelectedItemDetailsCustomizeDialog,
    MenuButtonsCustomItemDialog,
    MenuDisplayCurrentOrderCustomizeOrderDialog,
    HistoryButtons,
    HistoryDisplay,
    HistoryDisplayHistoryOptionsDialog,
    HistoryDisplayHistoryOptionsConfirmationDialog,
    HistoryDisplayHistoryOptionsReprintDialog,
    HistoryButtonsHeader,
  },
  data() {
    return {
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
      submitOrderDialog: false,
      modifyOrderDialog: false,
      suggestedStreetName: [],
    };
  },
  methods: {
    updateMenuComponentDetails(updatedMenuComponentDetails) {
      this.menuComponentDetails = updatedMenuComponentDetails;
    },
    setHistoryOptionsDetails: function (historyOptionsDetails) {
      this.historyOptionsDetails = historyOptionsDetails;
    },
  },
};
</script>
