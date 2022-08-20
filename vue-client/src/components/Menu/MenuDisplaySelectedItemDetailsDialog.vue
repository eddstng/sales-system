<template>
  <div>
    <v-dialog v-if="menuDisplayItemDetails.removeSelectedItem.node !== undefined"
      v-model="menuDisplayItemDetails.selectedItemDialog" width="1000px">
      <v-card>
        <div>
          <h3 class="text-center pt-10 pb-5">
            ITEM DETAILS
            <br />
            <br />
            <br />
            {{ menuDisplayItemDetails.removeSelectedItem.node.name_eng }}
            <br />

            {{ menuDisplayItemDetails.removeSelectedItem.node.name_chn }}
            <br />
            <br />
            <div class="item-details-customizations" v-for="customization in menuDisplayItemDetails.removeSelectedItem
            .customizations" v-bind:key="customization.name_eng">
              <v-container>
                <v-row no-gutters>
                  <v-col>
                    <div class="pa-2">
                      {{ customization.name_eng }}
                      {{ customization.name_chn }}
                    </div>
                  </v-col>
                  <div class="pa-1">
                    <v-btn small width="5px" v-on:click="
                      removeCustomizationFromSelectedItem(customization)
                    ">
                      <div>X<br /></div>
                    </v-btn>
                  </div>
                </v-row>
              </v-container>
            </div>
          </h3>

          <br />
        </div>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn x-large width="15%" v-on:click="
  closeSelectedItemDialog();
menuDisplayItemDetails.removeSelectedItem = {};
          ">
            <div>CANCEL<br /></div>
          </v-btn>
          <v-btn x-large width="15%" v-on:click="openCustomizeSelectedItemDialog(true)">
            <div>CUSTOMIZE<br /></div>
          </v-btn>
          <v-btn x-large width="15%" v-on:click="
  closeSelectedItemDialog();
removeSelectedItemAll(menuDisplayItemDetails.removeSelectedItem);
menuDisplayItemDetails.removeSelectedItem = {};
storeMixinSumSelectedItemsQuantity();
          ">
            <div>REMOVE ALL<br /></div>
          </v-btn>
          <v-btn x-large width="15%" v-on:click="
  closeSelectedItemDialog();
removeSelectedItemOne(menuDisplayItemDetails.removeSelectedItem);
menuDisplayItemDetails.removeSelectedItem = {};
storeMixinSumSelectedItemsQuantity();
          ">
            <div>REMOVE 1<br /></div>
          </v-btn>
          <v-btn x-large width="19.6%" v-on:click="
  closeSelectedItemDialog();
addSelectedItemOne(menuDisplayItemDetails.removeSelectedItem);
menuDisplayItemDetails.removeSelectedItem = {};
storeMixinSumSelectedItemsQuantity();
          ">
            <div>ADD 1<br /></div>
          </v-btn>
          <v-btn x-large width="15%" v-on:click="
  closeSelectedItemDialog();
storeMixinSumSelectedItemsQuantity();
toggleUpdateQuantityDialogTrue('ADD');
          ">
            <div>UPDATE QTY<br /></div>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="updateQuantityDialog" width="1000px">
      <v-card class="pt-10">
        <h2 class="text-center pt-8 pb-16">UPDATE ITEM QUANTITY</h2>
        <v-row class="justify-center mb-3">
          <v-col cols="12" md="1">
            <v-text-field reverse v-model="updateQuantityDialogItem.quantity" label="Quantity" required autofocus>
            </v-text-field>
          </v-col>
        </v-row>
        <div class="ml-20 pb-16">
          <v-row>
            <v-btn class="mt-1 ml-1 mb-1 mr-1" x-large v-for="intValue in updateQuantityDialogNumberPadRow1"
              v-bind:key="intValue" v-on:click="handleKeypad(intValue)">
              <div>{{ intValue }}<br /></div>
            </v-btn>
          </v-row>
          <v-row>
            <v-btn class="mt-1 ml-1 mb-1 mr-1" x-large v-for="intValue in updateQuantityDialogNumberPadRow2"
              v-bind:key="intValue" v-on:click="handleKeypad(intValue)">
              <div>{{ intValue }}<br /></div>
            </v-btn>
          </v-row>
          <v-row>
            <v-btn class="mt-1 ml-1 mb-1 mr-1" x-large v-for="intValue in updateQuantityDialogNumberPadRow3"
              v-bind:key="intValue" v-on:click="handleKeypad(intValue)">
              <div>{{ intValue }}<br /></div>
            </v-btn>
          </v-row>
          <v-row>
            <v-btn class="mt-1 ml-1 mb-1 mr-1" x-large v-for="intValue in updateQuantityDialogNumberPadRow4"
              v-bind:key="intValue" v-on:click="handleKeypad(intValue)">
              <div>{{ intValue }}<br /></div>
            </v-btn>
          </v-row>
          <v-row>
            <v-btn class="mt-1 ml-05 mb-1 mr-1" x-large v-for="intValue in updateQuantityDialogNumberPadRow5"
              v-bind:key="intValue" v-on:click="handleKeypad(intValue)">
              <div>{{ intValue }}<br /></div>
            </v-btn>
          </v-row>
        </div>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn x-large width="50%" v-on:click="
  updateQuantityDialog = false;
menuDisplayItemDetails.selectedItemDialog = false;
          ">
            <div>NO<br /></div>
          </v-btn>
          <v-btn x-large width="50%" v-on:click="
  updateSelectedItemAmount(updateQuantityDialogItem);
updateQuantityDialog = false;
menuDisplayItemDetails.selectedItemDialog = false;
          ">
            <div>YES<br /></div>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<style>
.ml-20 {
  margin-left: 36%;
}

.ml-05 {
  margin-left: 15.5%;
}

.item-details-customizations {
  margin-left: 30%;
  margin-right: 25%;
}
</style>


<script>
import storeMixin from "../../mixins/storeMixin";
import { store } from "../../store/store";
export default {
  data() {
    return {
      updateQuantityDialog: false,
      updateQuantityDialogNumberPadRow1: [1, 2, 3],
      updateQuantityDialogNumberPadRow2: [4, 5, 6],
      updateQuantityDialogNumberPadRow3: [7, 8, 9],
      updateQuantityDialogNumberPadRow4: ["CLR", 0, "🠔"],
      updateQuantityDialogNumberPadRow5: [0.5],
      updateQuantityDialogItem: {},
    };
  },
  mixins: [storeMixin],
  props: ["menuDisplayItemDetails"],
  methods: {
    toggleUpdateQuantityDialogTrue() {
      this.updateQuantityDialogItem = Object.assign(
        {},
        this.menuDisplayItemDetails.removeSelectedItem
      );
      this.updateQuantityDialog = true;
    },
    closeSelectedItemDialog() {
      this.$emit("closeSelectedItemDialog");
    },
    openCustomizeSelectedItemDialog() {
      this.$emit("openCustomizeSelectedItemDialog");
    },
    handleKeypad(buttonValue) {
      if (buttonValue === "🠔") {
        this.handleKeypadBackspace(buttonValue);
      }
      if (buttonValue === "CLR") {
        this.updateQuantityDialogItem.quantity = 0;
      }
      if (buttonValue === 0.5) {
        this.handleKeypadNumber('.5');
      }
      if (!isNaN(buttonValue)) {
        this.handleKeypadNumber(buttonValue);
      }
    },
    handleKeypadBackspace() {
      let quantityAsStringValue =
        this.updateQuantityDialogItem.quantity.toString();
      quantityAsStringValue = quantityAsStringValue.slice(0, -1);
      if (quantityAsStringValue === "") {
        quantityAsStringValue = 0;
      }
      const quantityAsIntValue = parseInt(quantityAsStringValue);
      this.updateQuantityDialogItem.quantity = quantityAsIntValue;
    },
    handleKeypadNumber(buttonValue) {
      let quantityAsStringValue =
        this.updateQuantityDialogItem.quantity.toString();
      quantityAsStringValue = quantityAsStringValue + buttonValue;
      const quantityAsIntValue = parseFloat(quantityAsStringValue);
      this.updateQuantityDialogItem = Object.assign(
        {},
        this.menuDisplayItemDetails.removeSelectedItem
      );
      this.updateQuantityDialogItem.quantity = quantityAsIntValue;
    },
    removeSelectedItemOne: function (selectedItem) {
      const selectedItems = Object.assign({}, this.$store.state.selectedItems);
      if (
        selectedItems[selectedItem.node.custom_id ?? selectedItem.node.id]
          .quantity === 1
      ) {
        delete selectedItems[
          selectedItem.node.custom_id ?? selectedItem.node.id
        ];
      } else {
        selectedItems[selectedItem.node.custom_id ?? selectedItem.node.id]
          .quantity--;
      }
      this.storeMixinSetStoreSelectedItems(selectedItems);
      this.storeMixinUpdateStorePriceDetails();
    },
    removeSelectedItemAll: function (selectedItem) {
      const selectedItems = Object.assign({}, this.$store.state.selectedItems);
      delete selectedItems[selectedItem.node.custom_id ?? selectedItem.node.id];
      this.storeMixinSetStoreSelectedItems(selectedItems);
      this.storeMixinUpdateStorePriceDetails();
    },
    addSelectedItemOne: function (selectedItem) {
      const selectedItems = Object.assign({}, this.$store.state.selectedItems);
      selectedItems[selectedItem.node.custom_id ?? selectedItem.node.id]
        .quantity++;
      this.storeMixinSetStoreSelectedItems(selectedItems);
      this.storeMixinUpdateStorePriceDetails();
    },
    updateSelectedItemAmount: function (selectedItem) {
      const selectedItems = Object.assign({}, this.$store.state.selectedItems);

      if (selectedItem.quantity === 0) {
        delete selectedItems[selectedItem.node.id];
        store.commit("setSelectedItems", selectedItems);
        this.storeMixinUpdateStorePriceDetails();
      } else {
        selectedItems[selectedItem.node.id].quantity = selectedItem.quantity;
        store.commit("setSelectedItems", selectedItems);
        this.storeMixinUpdateStorePriceDetails();
      }
    },
    removeCustomizationFromSelectedItem(customization) {
      const selectedItems = Object.assign({}, this.$store.state.selectedItems);
      const customIdOrId =
        this.menuDisplayItemDetails.removeSelectedItem.node.custom_id ??
        this.menuDisplayItemDetails.removeSelectedItem.node.id;
      selectedItems[customIdOrId].customizations = selectedItems[
        customIdOrId
      ].customizations.filter(function (obj) {
        return obj.name_eng !== customization.name_eng;
      });
      store.commit("setSelectedItems", selectedItems);
    },
  },
};
</script>