<template>
  <div>
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

    <v-row no-gutters>
      <v-col lg="1">
        <Sidebar />
      </v-col>
      <v-col lg="4">
        <v-card outlined tile>
          <v-container class="grey lighten-5">
            <MenuDisplay
              v-bind:menuComponentDetails="menuComponentDetails"
              @updateMenuComponentDetails="updateMenuComponentDetails"
            />
          </v-container>
        </v-card>
      </v-col>
      <v-col lg="7">
        <v-card tile>
          <v-container class="grey lighten-5">
            <MenuButtons
              v-bind:menuComponentDetails="menuComponentDetails"
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
import MenuButtons from "../Menu/MenuButtons.vue";
import MenuDisplay from "../Menu/MenuDisplay.vue";
import MenuDisplaySubmitOrderDialog from "../Menu/MenuDisplaySubmitOrderDialog";
import MenuDisplayModifyOrderDialog from "../Menu/MenuDisplayModifyOrderDialog";
import MenuDisplaySelectedItemDetailsDialog from "../Menu/MenuDisplaySelectedItemDetailsDialog";
import MenuDisplaySelectedItemDetailsCustomizeDialog from "../Menu/MenuDisplaySelectedItemDetailsCustomizeDialog";
import MenuButtonsCustomItemDialog from "../Menu/MenuButtonsCustomItemDialog";
import MenuDisplayCurrentOrderCustomizeOrderDialog from "../Menu/MenuDisplayCurrentOrderCustomizeOrderDialog";

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
      submitOrderDialog: false,
      modifyOrderDialog: false,
      suggestedStreetName: [],
    };
  },
  methods: {
    updateMenuComponentDetails(updatedMenuComponentDetails) {
      this.menuComponentDetails = updatedMenuComponentDetails;
    },
  },
};
</script>
