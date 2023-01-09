<template>
  <div>
    <v-card outlined tile class="overflow-y-auto" height="80.5vh">
      <div v-if="menuComponentDetails.displayMenuButtons" max-height="400">
        <div>
          <v-btn
            v-for="item in menuComponentDetails.displayedButtonsConfig
              .fullCategoryMenuObj"
            v-bind:key="item.name_eng"
            x-large
            dark
            height="170px"
            width="24.5%"
            class="mt-1 mr-1"
            v-on:click="onClickMenuButton(item)"
          >
            <div class="mt-5 mb-1">
              <p class="menu-button-text-eng">#{{ item.menu_id }}</p>
              <p class="mb-0 menu-button-text-eng">
                {{ item.name_eng.match(/.{1,20}(\s|$)/g)[0] }}
              </p>
              <p class="mb-0 menu-button-text-eng">
                {{
                  item.name_eng.toString().length > 20
                    ? item.name_eng.match(/.{1,20}(\s|$)/g)[1]
                    : "⠀"
                }}
              </p>
              <p class="menu-button-text-chn">{{ item.name_chn }}</p>
              <p class="menu-button-text-price">
                {{ Number(item.price).toFixed(2) }}
              </p>
            </div>
          </v-btn>
        </div>
      </div>
      <div
        class="p-0"
        v-if="
          menuComponentDetails.displayedButtonsConfig.displayCategoryButtons
        "
        max-height="400"
      >
        <v-btn
          v-for="item in categories"
          v-bind:key="item.id"
          x-large
          dark
          height="128px"
          width="24.5%"
          class="mt-1 mr-1"
          v-on:click="
            selectedCategory = item.id;
            menuComponentDetails.displayedButtonsConfig.displayCategoryButtons = false;
            menuComponentDetails.displayMenuButtons = true;
            updateSlicedCategoryMenuObj(0, 1000);
          "
        >
          <div>
            <p class="menu-button-text-eng">{{ item.name_eng }}</p>
            <p class="menu-button-text-eng">{{ item.num_range }}</p>
          </div>
        </v-btn>
      </div>
    </v-card>
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
export default {
  mixins: [storeMixin],
  props: ["menuComponentDetails"],
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
      this.menuComponentDetails.displayedButtonsConfig.displayCategoryButtons = true;
      this.menuComponentDetails.displayMenuButtons = false;
      this.menuComponentDetails.selectedCategory = null;
    },
    onClickCustomizeOrder() {
      let updatedMenuComponentDetails = { ...this.menuComponentDetails };
      updatedMenuComponentDetails.dialogToggles.customizeOrderDialog = true;
      this.$emit("updateMenuComponentDetails", updatedMenuComponentDetails);
    },
    onClickCustomItemButton() {
      let updatedMenuComponentDetails = { ...this.menuComponentDetails };
      updatedMenuComponentDetails.dialogToggles.addCustomItemDialog = true;
      this.$emit("updateMenuComponentDetails", updatedMenuComponentDetails);
    },
    onClickMenuButton(item) {
      this.checkIfSelectedItemRequiresCustomization(item);
      // this.menuComponentDetails.displayedButtonsConfig.displayCategoryButtons = true;
    },

    updateSlicedCategoryMenuObj(startIndex, endIndex) {
      this.menuComponentDetails.displayedButtonsConfig.startIndex = startIndex;
      this.menuComponentDetails.displayedButtonsConfig.endIndex = endIndex;
      if (this.selectedCategory === 12) {
        this.menuComponentDetails.displayedButtonsConfig.fullCategoryMenuObj =
          this.chowMeinItems;
        return;
      }
      if (this.selectedCategory === 1) {
        this.menuComponentDetails.displayedButtonsConfig.fullCategoryMenuObj =
          this.soupItems;
        return;
      }
      this.menuComponentDetails.displayedButtonsConfig.fullCategoryMenuObj =
        this.$store.state.categorizedItems[this.selectedCategory];
    },
    checkIfSelectedItemRequiresCustomization(item) {
      if (item.category === 12 && item.name_eng.includes(" CM")) {
        let updatedMenuComponentDetails = { ...this.menuComponentDetails };
        updatedMenuComponentDetails.requiredCustomizationDetails.reducedItemsObj =
          this.chowMeinItemsObj;
        updatedMenuComponentDetails.requiredCustomizationDetails.itemThatRequiresCustomization =
          item;
        updatedMenuComponentDetails.dialogToggles.requiredCustomizationDialog = true;
        updatedMenuComponentDetails.requiredCustomizationDetails.itemsThatShareTheSameMenuId =
          this.$store.state.categorizedItems[item.category].filter((obj) => {
            return (
              obj.menu_id ===
              this.menuComponentDetails.requiredCustomizationDetails
                .itemThatRequiresCustomization.menu_id
            );
          });
        this.$emit("updateMenuComponentDetails", updatedMenuComponentDetails);
      } else if (item.category === 1) {
        let updatedMenuComponentDetails = { ...this.menuComponentDetails };

        updatedMenuComponentDetails.requiredCustomizationDetails.reducedItemsObj =
          this.soupItemsObj;
        updatedMenuComponentDetails.requiredCustomizationDetails.itemThatRequiresCustomization =
          item;
        updatedMenuComponentDetails.dialogToggles.requiredCustomizationDialog = true;
        updatedMenuComponentDetails.requiredCustomizationDetails.itemsThatShareTheSameMenuId =
          this.$store.state.categorizedItems[item.category].filter((obj) => {
            return (
              obj.menu_id ===
              this.menuComponentDetails.requiredCustomizationDetails
                .itemThatRequiresCustomization.menu_id
            );
          });
        this.$emit("updateMenuComponentDetails", updatedMenuComponentDetails);
      } else {
        this.menuComponentDetails.displayedButtonsConfig.displayCategoryButtons = true;
        this.addItemToSelectedItems(item);
        this.menuComponentDetails.displayMenuButtons = false;
      }
    },

    cancelCustomizeSelectedItem() {
      this.removeSelectedItemAll(
        this.menuComponentDetails.requiredCustomizationDetails
          .itemThatRequiresCustomization
      );
      this.menuComponentDetails.requiredCustomizationDetails.itemThatRequiresCustomization =
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
          this.menuComponentDetails.requiredCustomizationDetails
            .itemThatRequiresCustomization.id
        ],
        customizationObj
      );
      this.menuComponentDetails.requiredCustomizationDetails.itemThatRequiresCustomization =
        null;
      this.menuComponentDetails.dialogToggles.customizeChowMeinTypeDialog = false;
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
