<template>
  <div>
    <MenuDisplaySubmitOrderDialog
      v-bind:submitOrderDialog="submitOrderDialog"
      @closeSubmitOrderDialog="closeSubmitOrderDialog"
    />
    <MenuDisplayModifyOrderDialog
      v-bind:modifyOrderDialog="modifyOrderDialog"
      @closeModifyOrderDialog="closeModifyOrderDialog"
    />
    <MenuDisplaySelectedItemDetailsDialog
      v-bind:menuDisplayItemDetails="menuDisplayItemDetails"
      @openCustomizeSelectedItemDialog="openCustomizeSelectedItemDialog"
    />
    <MenuDisplaySelectedItemDetailsCustomizeDialog
      v-bind:menuDisplayItemDetails="menuDisplayItemDetails"
      @closeCustomizeSelectedItemDialog="closeCustomizeSelectedItemDialog"
      @closeSelectedItemDialog="closeSelectedItemDialog"
    />
    <v-row no-gutters>
      <v-col lg="1">
        <Sidebar />
      </v-col>
      <v-col lg="4">
        <v-card outlined tile>
          <v-container class="grey lighten-5">
            <MenuDisplay
              v-bind:menuDisplayItemDetails="menuDisplayItemDetails"
              @openSubmitOrderDialog="openSubmitOrderDialog"
              @openModifyOrderDialog="openModifyOrderDialog"
              @openSelectedItemDialog="openSelectedItemDialog"
            />
          </v-container>
        </v-card>
      </v-col>
      <v-col lg="7" height="100vh">
        <v-card class="fill-height" tile>
          <v-container class="grey lighten-5">
            <MenuButtons />
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import storeMixin from "../../mixins/storeMixin";
import Sidebar from "../Sidebar.vue";
import { store } from "../../store/store";
import MenuButtons from "../Menu/MenuButtons.vue";
import MenuDisplay from "../Menu/MenuDisplay.vue";
import MenuDisplaySubmitOrderDialog from "./MenuDisplaySubmitOrderDialog";
import MenuDisplayModifyOrderDialog from "./MenuDisplayModifyOrderDialog";
import MenuDisplaySelectedItemDetailsDialog from "./MenuDisplaySelectedItemDetailsDialog";
import MenuDisplaySelectedItemDetailsCustomizeDialog from "./MenuDisplaySelectedItemDetailsCustomizeDialog";

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
  },
  data() {
    return {
      menuDisplayItemDetails: {
        openCustomizeSelectedItemDialog: false,
        selectedItemDialog: false,
        removeSelectedItem: {},
      },
      submitOrderDialog: false,
      modifyOrderDialog: false,
      suggestedStreetName: [],
    };
  },
  methods: {
    openCustomizeSelectedItemDialog: function () {
      this.menuDisplayItemDetails.openCustomizeSelectedItemDialog = true;
    },
    closeCustomizeSelectedItemDialog: function () {
      this.menuDisplayItemDetails.openCustomizeSelectedItemDialog = false;
    },
    openSelectedItemDialog: function (item) {
      this.menuDisplayItemDetails.selectedItemDialog = true;
      this.menuDisplayItemDetails.openCustomizeSelectedItemDialog = false;
      this.menuDisplayItemDetails.removeSelectedItem = item;
    },
    closeSelectedItemDialog: function () {
      this.menuDisplayItemDetails.selectedItemDialog = false;
    },
    openSubmitOrderDialog: function () {
      this.submitOrderDialog = false;
      if (
        this.$store.state.selectedCustomer.phone !== undefined &&
        Object.keys(store.state.selectedItems).length !== 0
      ) {
        this.submitOrderDialog = true;
      }
    },
    openModifyOrderDialog: function () {
      this.modifyOrderDialog = false;
      if (
        this.$store.state.selectedCustomer.phone !== undefined &&
        Object.keys(store.state.selectedItems).length !== 0
      ) {
        this.modifyOrderDialog = true;
      }
    },
    closeSubmitOrderDialog: function () {
      this.submitOrderDialog = false;
    },
    closeModifyOrderDialog: function () {
      this.modifyOrderDialog = false;
    },
  },
};
</script>
