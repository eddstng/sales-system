<template>
  <v-dialog
    v-model="menuComponentDetails.dialogToggles.addCustomItemDialog"
    width="500"
  >
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
            >
            </v-text-field>
            <div v-if="customItem.name.length > 0">
              <v-btn
                v-for="item in suggestedItems"
                :key="item.id"
                x-large
                dark
                width="100%"
                v-on:click="
                  addItemToSelectedItems(item);
                  menuComponentDetails.dialogToggles.addCustomItemDialog = false;
                  customItem.name = '';
                "
                >{{ item.menu_id }} - {{ item.name_eng }} - ${{
                  parseFloat(item.price).toFixed(2)
                }}</v-btn
              >
              <br />
              <br />
            </div>
            <v-text-field
              label="Price"
              v-model="customItem.price"
              required
              prefix="$"
            ></v-text-field>
          </v-form>
          <div v-if="suggestedItems.length === 0">
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
          </div>
        </v-col>
        <br />
      </div>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn x-large width="50%" v-on:click="onClickCancelButton()">
          <div>CANCEL<br /></div>
        </v-btn>
        <v-btn
          x-large
          width="50%"
          v-on:click="
            addItemToSelectedItems({
              name_eng: customItem.name,
              name_chn: 'Custom Item',
              menu_id: 0,
              category: 16,
              price: parseFloat(customItem.price),
            });
            (customItem = {
              name: '',
              price: 0.0,
              id: '',
            }),
              (menuComponentDetails.dialogToggles.addCustomItemDialog = false);
          "
        >
          <div>ADD<br /></div>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import storeMixin from "../../mixins/storeMixin";
import searchMixin from "../../mixins/searchMixin";
import { store } from "../../store/store";
import axios from "axios";

export default {
  mixins: [storeMixin, searchMixin],
  props: ["menuComponentDetails"],
  data() {
    return {
      suggestedItems: [],
      customItem: {
        id: "",
        name: "",
        price: 0.0,
        menu_id: 0,
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
    };
  },
  watch: {
    "customItem.name": function () {
      this.menuComponentDetails.dialogToggles.addCustomItemDialog;
      this.suggestedItems = this.getItemsFromString(this.customItem.name);
    },
    deep: true,
  },
  methods: {
    onClickCancelButton() {
      this.phone = "";
      let updatedMenuComponentDetails = {...this.menuComponentDetails};
      updatedMenuComponentDetails.dialogToggles.addCustomItemDialog = false;
      this.$emit("updateMenuComponentDetails", updatedMenuComponentDetails);
      this.customItem.name = "";
    },

    async createCustomItem() {
      const newCustomItem = await axios.post(
        "http://localhost:3000/post/items/create",
        {
          name_eng: this.customItem.name,
          menu_id: 0,
          category: 16,
          price: parseFloat(this.customItem.price),
        }
      );
      store.commit("setItems", [
        ...this.$store.state.items,
        newCustomItem.data,
      ]);
      return newCustomItem.data;
    },
    async getOrCreateItem(item) {
      if (item.id) {
        return item;
      }
      const matchedItemInSuggestedItems = this.suggestedItems.find(
        (e) =>
          e.name_eng.toUpperCase() === item.name_eng.toUpperCase() &&
          e.price === item.price
      );

      if (matchedItemInSuggestedItems !== undefined) {
        return matchedItemInSuggestedItems;
      }

      return await this.createCustomItem();
    },
    async addItemToSelectedItems(item) {
      let selectedItem = await this.getOrCreateItem(item);
      let selectedItems = store.state.selectedItems;
      if (selectedItem.id in selectedItems) {
        selectedItems[selectedItem.id].quantity++;
      } else {
        selectedItems[selectedItem.id] = {};
        selectedItems[selectedItem.id].node = { ...selectedItem };
        selectedItems[selectedItem.id].quantity = 1;
        selectedItems[selectedItem.id].timestamp = Date.now();
      }
      store.commit("setSelectedItems", selectedItems);
      this.storeMixinSumSelectedItemsQuantity();
      this.storeMixinUpdateStorePriceDetails();
    },
  },
};
</script>
