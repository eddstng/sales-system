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
             <div v-if="customItem.name.length > 0">
            <v-btn
              v-for="item in suggestedItems"
              :key="item.id"
              x-large
              dark
              width="100%"
              v-on:click="
                addItemToSelectedItems(item);
                menuComponentDetails.addCustomItemDialog = false;
                customItem.name = '';
              "
              >{{ item.id }} - {{ item.name_eng }}</v-btn
            >
            <br/>
            <br/>
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
      suggestedItems: [],
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
  watch: {
    "customItem.name": function () {
      this.suggestItemsFromCustomItemNameInput();
    },
    deep: true,
  },
  methods: {
    suggestItemsFromCustomItemNameInput: function () {
      const customNameSplit = this.customItem.name.split(" ");
      console.log(customNameSplit);
      this.suggestedItems = [];
      if (this.customItem.name.length < 3) {
        this.suggestedItems = [];
      } else {
        this.$store.state.items.forEach((v) => {
          console.log(
            customNameSplit.every((namePart) => v.name_eng.includes(namePart))
          );
          if (
            customNameSplit.every((namePart) =>
              v.name_eng.toUpperCase().includes(namePart.toUpperCase())
            )
            // v.name_eng.toUpperCase().includes(
            //   this.customItem.name.toUpperCase()
            // )
          ) {
            this.suggestedItems.push(v);
          }
        });
      }
      return;
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
