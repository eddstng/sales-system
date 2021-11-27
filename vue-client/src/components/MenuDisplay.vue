<template>
  <v-container>
    <MenuDisplaySubmitOrderDialog
      v-bind:submitOrderDialog="submitOrderDialog"
      @setSubmitOrderDialogToBool="setSubmitOrderDialogToBool"
    />
    <MenuDisplayRemoveSelectedItemDialog
      v-bind:removeMenuDisplayItemDetails="removeMenuDisplayItemDetails"
      @setRemoveSelectedItemDialogCustomizeItemDialogToBool="
        setRemoveSelectedItemDialogCustomizeItemDialogToBool
      "
    />
    <MenuDisplayCustomizeSelectedItemDialog
      v-bind:removeMenuDisplayItemDetails="removeMenuDisplayItemDetails"
      @setRemoveSelectedItemDialogCustomizeItemDialogToBool="
        setRemoveSelectedItemDialogCustomizeItemDialogToBool
      "
      @setRemoveSelectedItemDialogToBool="setRemoveSelectedItemDialogToBool"
    />
    <v-card outlined tile height="16vh">
      <CustomerSelect />
    </v-card>
    <v-card
      outlined
      tile
      class="overflow-y-auto d-block"
      height="62.5vh"
      v-chat-scroll
    >
      <template>
        <v-card
          class="mx-auto pt-2"
          outlined
          v-for="item in $store.state.selectedItemsOrderedByEntry"
          v-bind:key="item.id"
          width="100vw"
          v-on:click="
            removeMenuDisplayItemDetails.removeSelectedItemDialog = true;
            removeMenuDisplayItemDetails.removeSelectedItem = item;
          "
        >
          <v-list-item three-line v-if="item.node !== undefined">
            <v-list-item-content>
              <div class="menu-display-item-text">{{ item.node.name_eng }}</div>
              <div class="menu-display-item-text">{{ item.node.name_chn }}</div>
            </v-list-item-content>
            <v-list-item-content>
              <div class="menu-display-item-text text-right">
                x {{ item.quantity }}
              </div>
              <div class="menu-display-item-text text-right">
                {{ (item.node.price * item.quantity).toFixed(2) }}
              </div>
              <br />
            </v-list-item-content>
          </v-list-item>
          <v-list-item-content
            v-for="customization in item.customizations"
            v-bind:key="customization.id"
          >
            <div class="menu-display-item-text pl-5">
              - {{ customization.name_eng }}  {{ customization.name_chn }}
            </div>
          </v-list-item-content>
        </v-card>
      </template>
    </v-card>
    <v-card
      v-on:click="
        phone = '';
        submitOrderDialogConditional();
      "
    >
      <v-list-item three-line>
        <v-list-item-content>
          <div class="menu-display-item-text">Subtotal:</div>
          <div class="menu-display-item-text">GST:</div>
          <div class="menu-display-item-text mt-5">Total:</div>
        </v-list-item-content>
        <v-list-item-content>
          <div class="menu-display-item-text text-right">
            {{ $store.state.priceDetails.subtotal.toFixed(2) }}
          </div>
          <div class="menu-display-item-text text-right">
            {{ $store.state.priceDetails.gst.toFixed(2) }}
          </div>
          <div class="menu-display-item-text text-right mt-5 mb-0">
            ${{ $store.state.priceDetails.total.toFixed(2) }}
          </div>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </v-container>
</template>

<style>
.menu-display-item-text {
  font-size: 1.2em;
}

.submitOrderDialogText {
  margin-left: 15%;
  width: 600px;
}
</style>

<script>
import storeMixin from "../mixins/storeMixin";
import { store } from "../store/store";
import CustomerSelect from "./CustomerSelect";
import MenuDisplaySubmitOrderDialog from "./MenuDisplaySubmitOrderDialog";
import MenuDisplayRemoveSelectedItemDialog from "./MenuDisplayRemoveSelectedItemDialog";
import MenuDisplayCustomizeSelectedItemDialog from "./MenuDisplayCustomizeSelectedItemDialog";

export default {
  mixins: [storeMixin],
  data() {
    return {
      removeMenuDisplayItemDetails: {
        openCustomizeItemDialogue: false,
        removeSelectedItemDialog: false,
        removeSelectedItem: {},
      },
      submitOrderDialog: false,
      suggestedStreetName: [],
    };
  },
  methods: {
    setSubmitOrderDialogToBool: function (bool) {
      this.submitOrderDialog = bool;
    },
    setRemoveSelectedItemDialogToBool: function (bool) {
      this.removeMenuDisplayItemDetails.removeSelectedItemDialog = bool;
    },
    setRemoveSelectedItemDialogCustomizeItemDialogToBool: function (bool) {
      this.removeMenuDisplayItemDetails.openCustomizeItemDialogue = bool;
    },
    submitOrderDialogConditional: function () {
      if (
        this.$store.state.selectedCustomer.phone !== undefined &&
        Object.keys(store.state.selectedItems).length !== 0
      ) {
        this.submitOrderDialog = true;
      }
    },
  },
  components: {
    CustomerSelect,
    MenuDisplaySubmitOrderDialog,
    // TODO: This component needs to be renamed. It is no longer the remove dialog but it is a edit item dialog.
    MenuDisplayRemoveSelectedItemDialog,
    MenuDisplayCustomizeSelectedItemDialog,
  },
};
</script>