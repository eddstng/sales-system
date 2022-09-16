<template>
  <v-dialog v-model="menuComponentDetails.addCustomItemDialog" width="500">
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
            menuComponentDetails.addCustomItemDialog = false;
            customItem.name = '';
          "
        >
          <div>CANCEL<br /></div>
        </v-btn>
        <v-btn
          x-large
          width="50%"
          v-on:click="
            addItemToSelectedItems({
              id: customItemId,
              custom_id: customItemId + customItem.name,
              name_eng: customItem.name,
              custom_name: customItem.name,
              name_chn: 'Custom Item',
              price: parseFloat(customItem.price),
            });
            (customItem = {
              name: '',
              price: 0.0,
              id: '',
            }),
              (menuComponentDetails.addCustomItemDialog = false);
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
import { store } from "../../store/store";

export default {
  mixins: [storeMixin],
  props: ["menuComponentDetails"],
  data() {
    return {
      customItemId: parseInt(process.env.VUE_APP_CUSTOM_ITEM_ID),
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
    };
  },

  methods: {
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
