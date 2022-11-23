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
      v-bind:menuComponentDetails="menuComponentDetails"
      @openCustomizeSelectedItemDialog="openCustomizeSelectedItemDialog"
      @openCustomizeCurrentOrderDialog="openCustomizeCurrentOrderDialog"
    />
    <MenuDisplaySelectedItemDetailsCustomizeDialog
      v-bind:menuComponentDetails="menuComponentDetails"
      @closeCustomizeSelectedItemDialog="closeCustomizeSelectedItemDialog"
      @closeSelectedItemDialog="closeSelectedItemDialog"
    />

    <MenuDisplayCurrentOrderCustomizeOrderDialog
      v-bind:menuComponentDetails="menuComponentDetails"
      @closeCustomizeSelectedItemDialog="closeCustomizeSelectedItemDialog"
      @closeSelectedItemDialog="closeSelectedItemDialog"
    />

    <MenuButtonsCustomItemDialog
      v-bind:menuComponentDetails="menuComponentDetails"
    />

    <v-dialog
      persistent
      @keydown.esc="menuComponentDetails.customOptionsDialog = false"
      v-model="menuComponentDetails.customOptionsDialog"
      width="45%"
    >
      <v-card class="pt-5 pl-2 pr-2">
        <div>
          <div>
            <h3 class="text-center pt-10 pb-5">CUSTOM OPTIONS</h3>

            <br />
          </div>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn
              x-large
              width="33%"
              v-on:click="
                phone = '';
                menuComponentDetails.customOptionsDialog = false;
              "
            >
              <div>CANCEL<br /></div>
            </v-btn>
            <v-btn
              x-large
              width="33%"
              v-on:click="
                menuComponentDetails.customizeOrderDialog = true;
                menuComponentDetails.customOptionsDialog = false;
              "
            >
              <div>CUSTOMIZE ORDER<br /></div>
            </v-btn>
            <v-btn
              x-large
              width="33%"
              v-on:click="
                menuComponentDetails.addCustomItemDialog = true;
                menuComponentDetails.customOptionsDialog = false;
              "
            >
              <div>CUSTOM ITEM<br /></div>
            </v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-dialog>

    <v-row no-gutters>
      <v-col lg="1">
        <Sidebar />
      </v-col>
      <v-col lg="4">
        <v-card outlined tile>
          <v-container class="grey lighten-5">
            <MenuDisplay
              v-bind:menuComponentDetails="menuComponentDetails"
              @openSubmitOrderDialog="openSubmitOrderDialog"
              @openModifyOrderDialog="openModifyOrderDialog"
              @openSelectedItemDialog="openSelectedItemDialog"
            />
          </v-container>
        </v-card>
      </v-col>
      <v-col lg="7">
        <v-card tile>
          <v-container class="grey lighten-5">
            <MenuButtons v-bind:menuComponentDetails="menuComponentDetails" />
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
import MenuButtonsCustomItemDialog from "./MenuButtonsCustomItemDialog";
import MenuDisplayCurrentOrderCustomizeOrderDialog from "./MenuDisplayCurrentOrderCustomizeOrderDialog";

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
        openCustomizeSelectedItemDialog: false,
        selectedItemDialog: false,
        addCustomItemDialog: false,
        customizeOrderDialog: false,
        customOptionsDialog: false,
        removeSelectedItem: {},
      },
      submitOrderDialog: false,
      modifyOrderDialog: false,
      suggestedStreetName: [],
    };
  },
  methods: {
    openCustomizeSelectedItemDialog: function () {
      this.menuComponentDetails.openCustomizeSelectedItemDialog = false;
      this.menuComponentDetails.openCustomizeSelectedItemDialog = true;
    },
    openCustomizeCurrentOrderDialog: function () {
      console.log("12312312312312312");
      this.menuComponentDetails.customizeOrderDialog = false;
      this.menuComponentDetails.customizeOrderDialog = true;
    },
    closeCustomizeSelectedItemDialog: function () {
      this.menuComponentDetails.openCustomizeSelectedItemDialog = false;
    },
    openSelectedItemDialog: function (item) {
      console.log(item);
      this.menuComponentDetails.selectedItemDialog = true;
      this.menuComponentDetails.openCustomizeSelectedItemDialog = false;
      this.menuComponentDetails.removeSelectedItem = item;
    },
    closeSelectedItemDialog: function () {
      this.menuComponentDetails.selectedItemDialog = false;
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
      // this following line may not be necessary
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
