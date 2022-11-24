<template>
  <div>
    <v-dialog
      v-if="menuComponentDetails.removeSelectedItem.node !== undefined"
      v-model="menuComponentDetails.selectedItemDialog"
      width="1000px"
    >
      <v-card>
        <div>
          <h3 class="text-center pt-10 pb-5">
            ITEM DETAILS
            <br />
            <br />
            <br />
            {{ menuComponentDetails.removeSelectedItem.node.name_eng }}
            <br />

            {{ menuComponentDetails.removeSelectedItem.node.name_chn }}
            <br />
            <br />
            <div
              class="item-details-customizations"
              v-for="customization in menuComponentDetails.removeSelectedItem
                .customizations"
              v-bind:key="customization.name_eng"
            >
              <v-container>
                <v-row no-gutters>
                  <v-col>
                    <div class="pa-2">
                      {{ customization.name_eng }} /
                      {{ customization.name_chn }}
                      {{
                        customization.price ? `- $${customization.price}` : ""
                      }}
                    </div>
                  </v-col>
                  <div class="pa-1">
                    <v-btn
                      small
                      width="5px"
                      v-on:click="
                        menuComponentDetails.removeSelectedItem.node.category ==
                        'customizations'
                          ? removeCustomizationFromCurrentOrder(customization)
                          : removeCustomizationFromSelectedItem(customization);
                        menuComponentDetails.selectedItemDialog = false;
                      "
                    >
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
        <v-card-actions
          v-if="
            menuComponentDetails.removeSelectedItem.node.category ===
            'customizations'
          "
          class="mr-2"
        >
          <v-spacer></v-spacer>
          <v-btn
            x-large
            width="50%"
            v-on:click="
              closeSelectedItemDialog();
              menuComponentDetails.removeSelectedItem = {};
            "
          >
            <div>CANCEL<br /></div>
          </v-btn>
          <v-btn
            x-large
            width="50%"
            v-on:click="openCustomizeCurrentOrderDialog(true)"
          >
            <div>CUSTOMIZE<br /></div>
          </v-btn>
          <!-- <v-btn
            x-large
            width="32.5%"
            v-on:click="
              closeSelectedItemDialog();
              removeSelectedItemAll(menuComponentDetails.removeSelectedItem);
              menuComponentDetails.removeSelectedItem = {};
              storeMixinSumSelectedItemsQuantity();
            "
          >
            <div>REMOVE ALL<br /></div>
          </v-btn> -->
        </v-card-actions>
        <v-card-actions v-else>
          <v-spacer></v-spacer>
          <v-btn
            x-large
            width="15%"
            v-on:click="
              closeSelectedItemDialog();
              menuComponentDetails.removeSelectedItem = {};
            "
          >
            <div>CANCEL<br /></div>
          </v-btn>
          <v-btn
            v-if="
              menuComponentDetails.removeSelectedItem.node.category !==
              'customizations'
            "
            x-large
            width="15%"
            v-on:click="openCustomizeSelectedItemDialog(true)"
          >
            <div>CUSTOMIZE<br /></div>
          </v-btn>
          <v-btn
            v-if="
              menuComponentDetails.removeSelectedItem.node.category ===
              'customizations'
            "
            x-large
            width="15%"
            v-on:click="openCustomizeCurrentOrderDialog(true)"
          >
            <div>CUSTOMIZE<br /></div>
          </v-btn>
          <v-btn
            x-large
            width="15%"
            v-on:click="
              closeSelectedItemDialog();
              removeSelectedItemAll(menuComponentDetails.removeSelectedItem);
              menuComponentDetails.removeSelectedItem = {};
              storeMixinSumSelectedItemsQuantity();
            "
          >
            <div>REMOVE ALL<br /></div>
          </v-btn>
          <v-btn
            x-large
            width="15%"
            v-on:click="
              closeSelectedItemDialog();
              removeSelectedItemOne(menuComponentDetails.removeSelectedItem);
              menuComponentDetails.removeSelectedItem = {};
              storeMixinSumSelectedItemsQuantity();
            "
          >
            <div>REMOVE 1<br /></div>
          </v-btn>
          <v-btn
            x-large
            width="19.6%"
            v-on:click="
              closeSelectedItemDialog();
              addSelectedItemOne(menuComponentDetails.removeSelectedItem);
              menuComponentDetails.removeSelectedItem = {};
              storeMixinSumSelectedItemsQuantity();
            "
          >
            <div>ADD 1<br /></div>
          </v-btn>
          <v-btn
            x-large
            width="15%"
            v-on:click="
              closeSelectedItemDialog();
              storeMixinSumSelectedItemsQuantity();
              toggleUpdateQuantityDialogTrue();
            "
          >
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
            <v-text-field
              reverse
              v-model="updateQuantityDialogItem.quantity"
              label="Quantity"
              required
              autofocus
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-alert
          v-if="isNaN(updateQuantityDialogItem.quantity)"
          class="mx-auto mb-10"
          width="300px"
          dense
          type="error"
          outlined
        >
          Error: Quantity needs to be a number.
        </v-alert>
        <div class="ml-20 pb-16">
          <v-row>
            <v-btn
              class="mt-1 ml-1 mb-1 mr-1"
              x-large
              v-for="intValue in updateQuantityDialogNumberPadRow1"
              v-bind:key="intValue"
              v-on:click="handleKeypad(intValue)"
            >
              <div>{{ intValue }}<br /></div>
            </v-btn>
          </v-row>
          <v-row>
            <v-btn
              class="mt-1 ml-1 mb-1 mr-1"
              x-large
              v-for="intValue in updateQuantityDialogNumberPadRow2"
              v-bind:key="intValue"
              v-on:click="handleKeypad(intValue)"
            >
              <div>{{ intValue }}<br /></div>
            </v-btn>
          </v-row>
          <v-row>
            <v-btn
              class="mt-1 ml-1 mb-1 mr-1"
              x-large
              v-for="intValue in updateQuantityDialogNumberPadRow3"
              v-bind:key="intValue"
              v-on:click="handleKeypad(intValue)"
            >
              <div>{{ intValue }}<br /></div>
            </v-btn>
          </v-row>
          <v-row>
            <v-btn
              class="mt-1 ml-1 mb-1 mr-1"
              x-large
              v-for="intValue in updateQuantityDialogNumberPadRow4"
              v-bind:key="intValue"
              v-on:click="handleKeypad(intValue)"
            >
              <div>{{ intValue }}<br /></div>
            </v-btn>
          </v-row>
          <v-row>
            <v-btn
              class="mt-1 ml-05 mb-1 mr-1"
              x-large
              v-for="intValue in updateQuantityDialogNumberPadRow5"
              v-bind:key="intValue"
              v-on:click="handleKeypad(intValue)"
            >
              <div>{{ intValue }}<br /></div>
            </v-btn>
          </v-row>
        </div>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            x-large
            width="50%"
            v-on:click="
              updateQuantityDialog = false;
              menuComponentDetails.selectedItemDialog = false;
            "
          >
            <div>NO<br /></div>
          </v-btn>
          <v-btn
            x-large
            width="50%"
            v-on:click="
              updateSelectedItemAmount(updateQuantityDialogItem);
              updateQuantityDialog = false;
              menuComponentDetails.selectedItemDialog = false;
            "
          >
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
import utilsMixin from "../../mixins/utilsMixin";
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
  mixins: [storeMixin, utilsMixin],
  props: ["menuComponentDetails"],

  methods: {
    toggleUpdateQuantityDialogTrue() {
      this.updateQuantityDialogItem = Object.assign(
        {},
        this.menuComponentDetails.removeSelectedItem
      );
      this.updateQuantityDialog = true;
    },
    closeSelectedItemDialog() {
      this.$emit("closeSelectedItemDialog");
    },
    openCustomizeSelectedItemDialog() {
      console.log("here");
      this.$emit("openCustomizeSelectedItemDialog");
    },
    openCustomizeCurrentOrderDialog() {
      console.log("12312");
      this.$emit("openCustomizeCurrentOrderDialog");
    },
    handleKeypad(buttonValue) {
      if (buttonValue === "🠔") {
        this.handleKeypadBackspace(buttonValue);
      }
      if (buttonValue === "CLR") {
        this.updateQuantityDialogItem.quantity = 0;
      }
      if (buttonValue === 0.5) {
        this.handleKeypadNumber(".5");
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
        this.menuComponentDetails.removeSelectedItem
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
        return;
      }
      if (typeof selectedItem.quantity === "string") {
        selectedItem.quantity = parseFloat(selectedItem.quantity);
      }

      selectedItems[selectedItem.node.id].quantity = selectedItem.quantity;
      store.commit("setSelectedItems", selectedItems);
      this.storeMixinUpdateStorePriceDetails();
    },
    removeCustomizationFromCurrentOrder(customization) {
      console.log("heycall");
      // const newCurrentOrder = this.deepCopyObj(this.$store.state.currentOrder);
      const newCurrentOrder = this.$store.state.currentOrder;
      newCurrentOrder.customizations = newCurrentOrder.customizations.filter(
        function (cus) {
          return cus.name_eng !== customization.name_eng;
        }
      );
      console.log(newCurrentOrder.customizations);
      console.log(customization);
      console.log(customization);
      console.log(customization);
      console.log(customization);

      store.commit("setCurrentOrder", Object.assign({}, newCurrentOrder));

      this.menuComponentDetails.removeSelectedItem.customizations =
        newCurrentOrder.customizations;

      store.commit("setCurrentOrder", newCurrentOrder);

      let totalCustomizationPrice = 0;
      this.menuComponentDetails.removeSelectedItem.customizations.forEach(
        (customization) => {
          totalCustomizationPrice += customization.price;
        }
      );
      // currentOrder = this.deepCopyArray(this.$store.state.currentOrder); //need to copy the customization array before the math below works
      newCurrentOrder.customizations_price = parseFloat(
        totalCustomizationPrice
      );

      // WHAT HAPPENS TO THE DIALOG AFTER YOU REMOVE ALL CUSTOMIZATIONS FOR ORDER? THERE IS A CUSTOMIZE BUTTON IN THE DIALOG AFTER REMOVAL. WOULD THAT BE CONFUSING?

      this.storeMixinUpdateStorePriceDetails();
    },
    removeCustomizationFromSelectedItem(customization) {
      console.log(this.menuComponentDetails.removeSelectedItem);
      const selectedItems = Object.assign({}, this.$store.state.selectedItems);
      const customIdOrId =
        this.menuComponentDetails.removeSelectedItem.node.custom_id ??
        this.menuComponentDetails.removeSelectedItem.node.id;
      selectedItems[customIdOrId].customizations = selectedItems[
        customIdOrId
      ].customizations.filter(function (obj) {
        return obj.name_eng !== customization.name_eng;
      });

      let customPrice = undefined;

      if (selectedItems[customIdOrId].customizations.length !== 0) {
        customPrice = parseFloat(selectedItems[customIdOrId].node.price);
        selectedItems[customIdOrId].customizations.forEach((customization) => {
          customPrice += customization.price;
        });
      }
      selectedItems[customIdOrId].node.custom_price = customPrice;
      store.commit("setSelectedItems", selectedItems);
      this.storeMixinUpdateStorePriceDetails();
    },
  },
};
</script>