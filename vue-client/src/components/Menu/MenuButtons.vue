<template>
  <div>
    <v-dialog v-model="addCustomItemDialog" width="500">
      <v-card>
        <div>
          <br />
          <v-col>
            <v-form ref="form" lazy-validation>
              <v-text-field
                v-model="customItem.name"
                label="Custom Item Name"
                required
                autocomplete="off"
                autofocus
              ></v-text-field>
              <v-text-field
                label="Price"
                v-model="customItem.price"
                required
                prefix="$"
              ></v-text-field>
            </v-form>
            <p>Quick Suggestions</p>
            <v-divider></v-divider>
            <v-btn
              v-for="suggestion in customItemSuggestions"
              v-bind:key="suggestion"
              x-large
              width="50%"
              v-on:click="
                phone = '';
                customItem.name += `${suggestion} `;
              "
            >
              <div>{{ suggestion }}<br /></div>
            </v-btn>
          </v-col>
          <br />
        </div>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            x-large
            width="50%"
            v-on:click="
              phone = '';
              addCustomItemDialog = false;
              customItem.name = '';
            "
          >
            <div>CANCEL<br /></div>
          </v-btn>
          <!-- TO DO: We want to make the id an environment variable instead. -->
          <v-btn
            x-large
            width="50%"
            v-on:click="
              onClickMenuButton({
                id: 214, // TODO: TERRIBLE! Bugs!
                custom_id: 214 + customItem.name,
                name_eng: customItem.name,
                custom_name: customItem.name,
                name_chn: 'Custom Item',
                price: parseFloat(customItem.price),
                custom_price: parseFloat(customItem.price),
              });
              (customItem = {
                name: '',
                price: 0.0,
                id: '',
              }),
                (addCustomItemDialog = false);
            "
          >
            <div>ADD<br /></div>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card outlined tile class="overflow-y-auto" height="92.4vh">
      <div class="p-0" v-if="displayMenuButtons" max-height="400">
        <!-- Lets handle soup sizes here. -->
        <div v-if="selectedCategory === 12">
          <v-btn
            x-large
            dark
            height="250px"
            width="19.6%"
            class="mt-1 mr-1"
            v-on:click="
              displayCategoriesButtons = true;
              displayMenuButtons = false;
              selectedCategory = null;
            "
            ><div>
              <p class="menu-button-text-eng">BACK</p>
            </div>
          </v-btn>
          <v-btn
            x-large
            dark
            height="250px"
            width="19.6%"
            class="mt-1 mr-1"
            v-on:click="addCustomItemDialog = true"
            ><div>
              <p class="menu-button-text-eng">CUSTOM</p>
            </div>
          </v-btn>
          <v-btn
            v-for="item in chowMeinItems"
            v-bind:key="item.name_eng"
            x-large
            dark
            height="250px"
            width="19.6%"
            class="mt-1 mr-1"
            v-on:click="
              onClickMenuButton(item);
              displayCategoriesButtons = true;
              displayMenuButtons = false;
            "
            ><div>
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
              <!-- <p class="menu-button-text-price">
                {{ item.price.toFixed(2) }}
              </p> -->
            </div>
          </v-btn>
          <v-btn
            x-large
            dark
            height="250px"
            width="19.6%"
            class="mt-1 mr-1"
            v-on:click="addCustomItemDialog = true"
            ><div>
              <p class="menu-button-text-eng">CUSTOM</p>
            </div>
          </v-btn>
          <v-btn
            x-large
            dark
            height="250px"
            width="19.6%"
            class="mt-1 mr-1"
            v-on:click="
              displayCategoriesButtons = true;
              displayMenuButtons = false;
              selectedCategory = null;
            "
            ><div>
              <p class="menu-button-text-eng">BACK</p>
            </div>
          </v-btn>
        </div>
        <div v-if="selectedCategory === 1">
          <v-btn
            x-large
            dark
            height="250px"
            width="19.6%"
            class="mt-1 mr-1"
            v-on:click="
              displayCategoriesButtons = true;
              displayMenuButtons = false;
              selectedCategory = null;
            "
            ><div>
              <p class="menu-button-text-eng">BACK</p>
            </div>
          </v-btn>
          <v-btn
            x-large
            dark
            height="250px"
            width="19.6%"
            class="mt-1 mr-1"
            v-on:click="addCustomItemDialog = true"
            ><div>
              <p class="menu-button-text-eng">CUSTOM</p>
            </div>
          </v-btn>
          <v-btn
            v-for="item in soupItems"
            v-bind:key="item.name_eng"
            x-large
            dark
            height="250px"
            width="19.6%"
            class="mt-1 mr-1"
            v-on:click="
              onClickMenuButton(item);
              displayCategoriesButtons = true;
              displayMenuButtons = false;
            "
            ><div>
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
              <!-- <p class="menu-button-text-price">
                {{ item.price.toFixed(2) }}
              </p> -->
            </div>
          </v-btn>
          <v-btn
            x-large
            dark
            height="250px"
            width="19.6%"
            class="mt-1 mr-1"
            v-on:click="addCustomItemDialog = true"
            ><div>
              <p class="menu-button-text-eng">CUSTOM</p>
            </div>
          </v-btn>
          <v-btn
            x-large
            dark
            height="250px"
            width="19.6%"
            class="mt-1 mr-1"
            v-on:click="
              displayCategoriesButtons = true;
              displayMenuButtons = false;
              selectedCategory = null;
            "
            ><div>
              <p class="menu-button-text-eng">BACK</p>
            </div>
          </v-btn>
        </div>
        <div v-if="selectedCategory !== 1 && selectedCategory !== 12">
          <v-btn
            x-large
            dark
            height="250px"
            width="19.6%"
            class="mt-1 mr-1"
            v-on:click="
              displayCategoriesButtons = true;
              displayMenuButtons = false;
              selectedCategory = null;
            "
            ><div>
              <p class="menu-button-text-eng">BACK</p>
            </div>
          </v-btn>
          <v-btn
            x-large
            dark
            height="250px"
            width="19.6%"
            class="mt-1 mr-1"
            v-on:click="addCustomItemDialog = true"
            ><div>
              <p class="menu-button-text-eng">CUSTOM</p>
            </div>
          </v-btn>
          <v-btn
            v-for="item in $store.state.items[selectedCategory]"
            v-bind:key="item.name_eng"
            x-large
            dark
            height="250px"
            width="19.6%"
            class="mt-1 mr-1"
            v-on:click="
              onClickMenuButton(item);
              displayCategoriesButtons = true;
              displayMenuButtons = false;
            "
            ><div>
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
              <p class="menu-button-text-price">{{ item.price.toFixed(2) }}</p>
            </div>
          </v-btn>
          <v-btn
            x-large
            dark
            height="250px"
            width="19.6%"
            class="mt-1 mr-1"
            v-on:click="addCustomItemDialog = true"
            ><div>
              <p class="menu-button-text-eng">CUSTOM</p>
            </div>
          </v-btn>
          <v-btn
            x-large
            dark
            height="250px"
            width="19.6%"
            class="mt-1 mr-1"
            v-on:click="
              displayCategoriesButtons = true;
              displayMenuButtons = false;
              selectedCategory = null;
            "
            ><div>
              <p class="menu-button-text-eng">BACK</p>
            </div>
          </v-btn>
        </div>
      </div>
      <div class="p-0" v-if="displayCategoriesButtons" max-height="400">
        <v-btn
          v-for="item in categories"
          v-bind:key="item.id"
          x-large
          dark
          height="200px"
          width="24.5%"
          class="mt-1 mr-1"
          v-on:click="
            selectedCategory = item.id;
            displayCategoriesButtons = false;
            displayMenuButtons = true;
          "
          ><div>
            <p class="menu-button-text-eng">{{ item.name_eng }}</p>
            <!-- <p class="menu-button-text-eng" >{{ item.name_chn }}</p> -->
            <p class="menu-button-text-eng">{{ item.num_range }}</p>
          </div>
        </v-btn>
      </div>
    </v-card>

    <v-dialog
      v-if="itemThatRequiresCustomization !== null"
      v-model="customizeChowMeinTypeDialog"
      width="1000px"
    >
      <v-card>
        <div>
          <h3 class="text-center pt-10 pb-5">
            CHOW MEIN TYPE SELECTION
            <br />
            <br />
            <br />
            {{ itemThatRequiresCustomization.name_eng }}
            <br />

            {{ itemThatRequiresCustomization.name_chn }}

            <br />
            <br />
          </h3>

          <br />
        </div>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn x-large width="33%" v-on:click="cancelCustomizeSelectedItem()">
            <div>CANCEL<br /></div>
          </v-btn>
          <v-btn
            x-large
            width="33%"
            v-on:click="
              addItemToSelectedItems(
                chowMeinItemsObj[itemThatRequiresCustomization.id]
              );
              customizeChowMeinTypeDialog = false;
            "
          >
            <div>CRISPY (湿)<br /></div>
          </v-btn>
          <v-btn
            x-large
            width="33%"
            v-on:click="
              addItemToSelectedItems(
                chowMeinItemsObj[itemThatRequiresCustomization.id + 1]
              );
              customizeChowMeinTypeDialog = false;
            "
          >
            <div>SOFT (干)<br /></div>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-if="itemThatRequiresCustomization !== null"
      v-model="customizeSoupSizeDialog"
      width="1000px"
    >
      <v-card>
        <div>
          <h3 class="text-center pt-10 pb-5">
            SOUP SIZE SELECTION
            <br />
            <br />
            <br />
            {{ itemThatRequiresCustomization.name_eng }}
            <br />

            {{ itemThatRequiresCustomization.name_chn }}

            <br />
            <br />
          </h3>

          <br />
        </div>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn x-large width="33%" v-on:click="cancelCustomizeSelectedItem()">
            <div>CANCEL<br /></div>
          </v-btn>
          <v-btn
            x-large
            width="33%"
            v-on:click="
              addItemToSelectedItems(
                soupItemsObj[itemThatRequiresCustomization.id]
              );
              customizeSoupSizeDialog = false;
            "
          >
            <div>SMALL (小)<br /></div>
          </v-btn>
          <v-btn
            x-large
            width="33%"
            v-on:click="
              addItemToSelectedItems(
                soupItemsObj[itemThatRequiresCustomization.id + 1]
              );
              customizeSoupSizeDialog = false;
            "
          >
            <div>LARGE (大)<br /></div>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style>
.menu-button-text-eng {
  font-size: 0.9em;
}
.menu-button-text-chn {
  font-size: 1.7em;
}
.menu-button-text-price {
  font-size: 1.7em;
}
</style>

<script>
import storeMixin from "../../mixins/storeMixin";
import { store } from "../../store/store";
export default {
  mixins: [storeMixin],
  computed: {
    soupItems: function () {
      const soupItems = this.$store.state.items[1];
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
      return this.$store.state.items[1].reduce(
        (accumulator, value) => ({ ...accumulator, [value.id]: value }),
        {}
      );
    },
    chowMeinItems: function () {
      const chowMeinItems = this.$store.state.items[12];
      const chowMeinItemsOneSize = [];
      chowMeinItems.forEach((item) => {
        if (item.name_eng.includes("(CRISPY)")) {
          const itemCopy = Object.assign({}, item);
          itemCopy.name_eng = itemCopy.name_eng.substring(
            0,
            itemCopy.name_eng.length - 8
          );
          itemCopy.name_chn = itemCopy.name_chn.substring(
            0,
            itemCopy.name_chn.length - 3
          );
          chowMeinItemsOneSize.push(itemCopy);
        }
        if (
          !item.name_eng.includes("(CRISPY)") &&
          !item.name_eng.includes("(SOFT)")
        ) {
          chowMeinItemsOneSize.push(item);
        }
      });
      return chowMeinItemsOneSize;
    },
    chowMeinItemsObj: function () {
      return this.$store.state.items[12].reduce(
        (accumulator, value) => ({ ...accumulator, [value.id]: value }),
        {}
      );
    },
  },
  data() {
    return {
      customizeChowMeinTypeDialog: false,
      customizeSoupSizeDialog: false,
      itemThatRequiresCustomization: null,
      selectedCategory: null,
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
      addCustomItemDialog: false,
      categories: [
        {
          name_eng: "Appetizers",
          name_chn: "Appetizers",
          num_range: "1-6",
          id: 0,
        },
        {
          name_eng: "Soup",
          name_chn: "Soup",
          num_range: "7-17",
          id: 1,
        },
        {
          name_eng: "Egg Foo Yung",
          name_chn: "Egg Foo Yung",
          num_range: "18-22",
          id: 2,
        },
        {
          name_eng: "Vegetables",
          name_chn: "Vegetables",
          num_range: "23-27",
          id: 3,
        },
        {
          name_eng: "Seafood",
          name_chn: "Seafood",
          num_range: "28-40",
          id: 4,
        },
        {
          name_eng: "Oyster/Scallops",
          name_chn: "Oyster/Scallops",
          num_range: "41-49",
          id: 5,
        },
        {
          name_eng: "Hot Pot",
          name_chn: "Hot Pot",
          num_range: "50-59",
          id: 6,
        },
        {
          name_eng: "Pork",
          name_chn: "Pork",
          num_range: "60-70",
          id: 7,
        },
        {
          name_eng: "Beef",
          name_chn: "Beef",
          num_range: "71-83",
          id: 8,
        },
        {
          name_eng: "Chicken",
          name_chn: "Chicken",
          num_range: "84-97",
          id: 9,
        },
        {
          name_eng: "Over Rice",
          name_chn: "Over Rice",
          num_range: "98-115",
          id: 10,
        },
        {
          name_eng: "Fried Rice",
          name_chn: "Fried Rice",
          num_range: "116-123",
          id: 11,
        },
        {
          name_eng: "Chow Mein",
          name_chn: "Chow Mein",
          num_range: "124-148",
          id: 12,
        },
        {
          name_eng: "Noodle Soup",
          name_chn: "Noodle Soup",
          num_range: "149-156",
          id: 13,
        },
        {
          name_eng: "Congee",
          name_chn: "Congee",
          num_range: "157-164",
          id: 14,
        },
        {
          name_eng: "Specials/Drinks",
          name_chn: "Specials/Drinks",
          id: 15,
        },
        {
          name_eng: "MINI SPECIAL",
          name_chn: "MINI SPECIAL",
          num_range: "1-6",
          id: 17,
        },
        {
          name_eng: "LUNCH SPECIAL",
          name_chn: "LUNCH SPECIAL",
          num_range: "7-17",
          id: 18,
        },
      ],
      displayCategoriesButtons: true,
      displayMenuButtons: false,
    };
  },

  methods: {
    onClickMenuButton(item) {
      this.checkIfSelectedItemRequiresCustomization(item);
    },

    checkIfSelectedItemRequiresCustomization(item) {
      if (
        item.category === 12 &&
        item.name_eng.includes(" CM")
        // (item.name_eng.includes("(CRISPY)") || item.name_eng.includes("(SOFT)")) - doesn't work due to modification in chowMeinItems
      ) {
        this.itemThatRequiresCustomization = item;
        this.customizeChowMeinTypeDialog = true;
        // add the hard or soft as customization.
        // we will throw up a dialog asking soft or hard
      } else if (item.category === 1) {
        this.itemThatRequiresCustomization = item;
        this.customizeSoupSizeDialog = true;
        console.log(this.soupItemsObj);
        // add the hard or soft as customization.
        // we will throw up a dialog asking soft or hard
      } else {
        this.addItemToSelectedItems(item);
      }
      // if chowmein we need extra dialog
      // if soup we want extra dialog
      // soup is 7 - 17
      //cm is 124-148
    },

    cancelCustomizeSelectedItem() {
      this.removeSelectedItemAll(this.itemThatRequiresCustomization);
      this.itemThatRequiresCustomization = null;
    },

    removeSelectedItemAll: function (selectedItem) {
      const selectedItems = Object.assign({}, this.$store.state.selectedItems);
      delete selectedItems[selectedItem.custom_id ?? selectedItem.id];
      this.storeMixinSetStoreSelectedItems(selectedItems);
      this.storeMixinUpdateStorePriceDetails();
    },

    customizeSelectedItem(customizationObj) {
      this.addCustomizationToItem(
        this.$store.state.selectedItems[this.itemThatRequiresCustomization.id],
        customizationObj
      );
      this.itemThatRequiresCustomization = null;
      this.customizeChowMeinTypeDialog = false;
    },

    addCustomizationToItem: function (selectedItem, customizationObj) {
      console.log(selectedItem);
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
