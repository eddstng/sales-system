<template>
  <div>
    <MenuButtons
      v-if="$store.state.component === 'ORDER'"
      v-bind:menuComponentDetails="componentDetails.menuComponentDetails"
    />
    <HistoryButtons class="mt-1" v-if="$store.state.component === 'HISTORY'" />
    <CustomerButtons
      class="mt-1"
      v-if="
        $store.state.component === 'CUSTOMER' &&
        $store.state.selectedCustomer.phone === ''
      "
      v-bind:customerOptionDetails="componentDetails.customerOptionDetails"
    />
    <CustomerOrderHistoryButtons
      v-if="
        $store.state.component === 'CUSTOMER' &&
        $store.state.selectedCustomer.phone !== ''
      "
      v-bind:customerOptionDetails="componentDetails.customerOptionDetails"
    />
  </div>
</template>

<style>
.menu-button-text-eng {
  font-size: 0.9em;
}

.menu-button-text-chn {
  font-size: 1.2em;
}

.menu-button-text-price {
  font-size: 1.7em;
}
</style>

<script>
import storeMixin from "../../mixins/storeMixin";
import { store } from "../../store/store";
import { menuCategories } from "../../data/menuCategories";
import MenuButtons from "../Menu/MenuButtons.vue";
import HistoryButtons from "../History/HistoryButtons.vue";
import CustomerOrderHistoryButtons from "../Customer/CustomerOrderHistoryButtons";
import CustomerButtons from "../Customer/CustomerButtons";
export default {
  mixins: [storeMixin],
  props: ["componentDetails"],
  components: {
    MenuButtons,
    HistoryButtons,
        CustomerButtons,
    CustomerOrderHistoryButtons,
  },
  computed: {
    soupItems: function () {
      const soupItems = this.$store.state.categorizedItems[1];
      const soupItemsOneSize = [];
      soupItems.forEach((item) => {
        if (item.name_eng.includes("(S)")) {
          const itemCopy = Object.assign({}, item);
          itemCopy.name_eng = itemCopy.name_eng.substring(
            0,
            itemCopy.name_eng.length - 4
          );
          itemCopy.name_chn = itemCopy.name_chn.substring(
            0,
            itemCopy.name_chn.length - 4
          );
          soupItemsOneSize.push(itemCopy);
        }
      });
      return soupItemsOneSize;
    },
    soupItemsObj: function () {
      return this.$store.state.categorizedItems[1].reduce(
        (accumulator, value) => ({ ...accumulator, [value.id]: value }),
        {}
      );
    },
    chowMeinItems: function () {
      const chowMeinItems = this.$store.state.categorizedItems[12];
      const chowMeinItemsOneSize = [];
      chowMeinItems.forEach((item) => {
        if (item.name_eng.includes("(CRISPY)")) {
          const itemCopy = Object.assign({}, item);
          itemCopy.name_eng = itemCopy.name_eng.substring(
            0,
            itemCopy.name_eng.length - 8
          );
          // itemCopy.name_chn = itemCopy.name_chn.substring(
          //   0,
          //   itemCopy.name_chn.length - 3
          // );
          chowMeinItemsOneSize.push(itemCopy);
        }
        if (
          !item.name_eng.includes("(CRISPY)") &&
          !item.name_eng.includes("(DRY)") &&
          !item.name_eng.includes("(SOFT)")
        ) {
          chowMeinItemsOneSize.push(item);
        }
      });
      return chowMeinItemsOneSize;
    },
    chowMeinItemsObj: function () {
      const chowMeinItemsObj = this.$store.state.categorizedItems[12].reduce(
        (accumulator, value) => ({ ...accumulator, [value.id]: value }),
        {}
      );
      return chowMeinItemsObj;
    },
  },
  data() {
    return {
      customizeSoupSizeDialog: false,
      customItem: {
        id: "",
        name: "",
        price: 0.0,
      },
      customItemSuggestions: [
        "Beef",
        "Rice",
        "Chicken",
        "Chow Mein (Crispy)",
        "BBQ Pork",
        "Chow Mein (Soft)",
        "Broccoli",
        "Black Bean Sauce",
      ],
      categories: menuCategories,
    };
  },

  methods: {
    onClickBack() {
      this.componentDetails.menuComponentDetails.displayedButtonsConfig.displayCategoryButtons = true;
      this.componentDetails.menuComponentDetails.displayMenuButtons = false;
      this.componentDetails.menuComponentDetails.selectedCategory = null;
    },
    onClickCustomizeOrder() {
      let updatedMenuComponentDetails = { ...this.componentDetails.menuComponentDetails };
      updatedMenuComponentDetails.dialogToggles.customizeOrderDialog = true;
      this.$emit("updateMenuComponentDetails", updatedMenuComponentDetails);
    },
    onClickCustomItemButton() {
      let updatedMenuComponentDetails = { ...this.componentDetails.menuComponentDetails };
      updatedMenuComponentDetails.dialogToggles.addCustomItemDialog = true;
      this.$emit("updateMenuComponentDetails", updatedMenuComponentDetails);
    },
    onClickMenuButton(item) {
      this.checkIfSelectedItemRequiresCustomization(item);
      // this.componentDetails.menuComponentDetails.displayedButtonsConfig.displayCategoryButtons = true;
    },

    updateSlicedCategoryMenuObj(startIndex, endIndex) {
      this.componentDetails.menuComponentDetails.displayedButtonsConfig.startIndex = startIndex;
      this.componentDetails.menuComponentDetails.displayedButtonsConfig.endIndex = endIndex;
      if (this.selectedCategory === 12) {
        this.componentDetails.menuComponentDetails.displayedButtonsConfig.fullCategoryMenuObj =
          this.chowMeinItems;
        return;
      }
      if (this.selectedCategory === 1) {
        this.componentDetails.menuComponentDetails.displayedButtonsConfig.fullCategoryMenuObj =
          this.soupItems;
        return;
      }
      this.componentDetails.menuComponentDetails.displayedButtonsConfig.fullCategoryMenuObj =
        this.$store.state.categorizedItems[this.selectedCategory];
    },
    checkIfSelectedItemRequiresCustomization(item) {
      if (
        item.category === 12 &&
        item.name_eng.includes(" CM")
        // (item.name_eng.includes("(CRISPY)") || item.name_eng.includes("(SOFT)")) - doesn't work due to modification in chowMeinItems
      ) {
        let updatedMenuComponentDetails = { ...this.componentDetails.menuComponentDetails };

        updatedMenuComponentDetails.requiredCustomizationDetails.reducedItemsObj =
          this.chowMeinItemsObj;
        updatedMenuComponentDetails.requiredCustomizationDetails.itemThatRequiresCustomization =
          item;
        updatedMenuComponentDetails.dialogToggles.requiredCustomizationDialog = true;
        updatedMenuComponentDetails.requiredCustomizationDetails.itemsThatShareTheSameMenuId =
          this.$store.state.categorizedItems[item.category].filter((obj) => {
            return (
              obj.menu_id ===
              this.componentDetails.menuComponentDetails.requiredCustomizationDetails
                .itemThatRequiresCustomization.menu_id
            );
          });

        this.$emit("updateMenuComponentDetails", updatedMenuComponentDetails);
        // this.componentDetails.menuComponentDetails.dialogToggles.customizeChowMeinTypeDialog = true;
        // add the hard or soft as customization.
        // we will throw up a dialog asking soft or hard
      } else if (item.category === 1) {
        let updatedMenuComponentDetails = { ...this.componentDetails.menuComponentDetails };

        updatedMenuComponentDetails.requiredCustomizationDetails.reducedItemsObj =
          this.soupItemsObj;
        updatedMenuComponentDetails.requiredCustomizationDetails.itemThatRequiresCustomization =
          item;
        updatedMenuComponentDetails.dialogToggles.requiredCustomizationDialog = true;
        updatedMenuComponentDetails.requiredCustomizationDetails.itemsThatShareTheSameMenuId =
          this.$store.state.categorizedItems[item.category].filter((obj) => {
            return (
              obj.menu_id ===
              this.componentDetails.menuComponentDetails.requiredCustomizationDetails
                .itemThatRequiresCustomization.menu_id
            );
          });

        this.$emit("updateMenuComponentDetails", updatedMenuComponentDetails);
        // this.customizeSoupSizeDialog = true;
        // add the hard or soft as customization.
        // we will throw up a dialog asking soft or hard
      } else {
        this.componentDetails.menuComponentDetails.displayedButtonsConfig.displayCategoryButtons = true;
        this.addItemToSelectedItems(item);
      }
      // if chowmein we need extra dialog
      // if soup we want extra dialog
      // soup is 7 - 17
      //cm is 124-148
    },

    cancelCustomizeSelectedItem() {
      this.removeSelectedItemAll(
        this.componentDetails.menuComponentDetails.requiredCustomizationDetails
          .itemThatRequiresCustomization
      );
      this.componentDetails.menuComponentDetails.requiredCustomizationDetails.itemThatRequiresCustomization =
        null;
    },

    removeSelectedItemAll: function (selectedItem) {
      const selectedItems = Object.assign({}, this.$store.state.selectedItems);
      delete selectedItems[selectedItem.custom_id ?? selectedItem.id];
      this.storeMixinSetStoreSelectedItems(selectedItems);
      this.storeMixinUpdateStorePriceDetails();
    },

    customizeSelectedItem(customizationObj) {
      this.addCustomizationToItem(
        this.$store.state.selectedItems[
          this.componentDetails.menuComponentDetails.requiredCustomizationDetails
            .itemThatRequiresCustomization.id
        ],
        customizationObj
      );
      this.componentDetails.menuComponentDetails.requiredCustomizationDetails.itemThatRequiresCustomization =
        null;
      this.componentDetails.menuComponentDetails.dialogToggles.customizeChowMeinTypeDialog = false;
    },

    addCustomizationToItem: function (selectedItem, customizationObj) {
      const selectedItemIdToUseString =
        selectedItem.node.custom_id ?? selectedItem.node.id.toString();

      const selectedItems = Object.assign({}, this.$store.state.selectedItems);

      if (
        selectedItemIdToUseString in selectedItems &&
        selectedItems[selectedItemIdToUseString].customizations !== undefined &&
        selectedItems[selectedItemIdToUseString].customizations !== null
      ) {
        selectedItems[selectedItemIdToUseString].customizations.push(
          customizationObj
        );
      } else {
        const selectedItemWithCustomizations = {
          ...selectedItem,
          customizations: [customizationObj],
        };
        let customizedItemKeyName = `${selectedItem.node.id.toString()}C-`;
        let customizedItemKeyNumber = 0;

        while (
          selectedItems[
            `${customizedItemKeyName}${customizedItemKeyNumber}`
          ] !== undefined
        ) {
          customizedItemKeyNumber++;
        }
        selectedItems[`${customizedItemKeyName}${customizedItemKeyNumber}`] =
          JSON.parse(JSON.stringify(selectedItemWithCustomizations));

        selectedItems[
          `${customizedItemKeyName}${customizedItemKeyNumber}`
        ].node.custom_id = `${customizedItemKeyName}${customizedItemKeyNumber}`;
        selectedItems[
          `${customizedItemKeyName}${customizedItemKeyNumber}`
        ].node.custom_name = `${
          selectedItems[`${customizedItemKeyName}${customizedItemKeyNumber}`]
            .node.name_eng
        } [C-${customizedItemKeyNumber}]`;

        delete selectedItems[selectedItemIdToUseString];
      }
      store.commit("setSelectedItems", selectedItems);
    },
    addItemToSelectedItems(item) {
      let idWeCareAbout = item.custom_id ?? item.id;
      let selectedItems = store.state.selectedItems;
      if (idWeCareAbout in selectedItems) {
        selectedItems[idWeCareAbout].quantity++;
      } else {
        selectedItems[idWeCareAbout] = {};
        selectedItems[idWeCareAbout].node = item;
        selectedItems[idWeCareAbout].quantity = 1;
        selectedItems[idWeCareAbout].timestamp = Date.now();
      }
      store.commit("setSelectedItems", selectedItems);
      this.storeMixinSumSelectedItemsQuantity();
      this.storeMixinUpdateStorePriceDetails();
    },
  },
};
</script>
