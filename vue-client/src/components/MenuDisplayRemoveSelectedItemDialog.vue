<template>
  <v-dialog
    v-if="removeMenuDisplayItemDetails.removeSelectedItem.node !== undefined"
    v-model="removeMenuDisplayItemDetails.removeSelectedItemDialog"
    width="1000px"
  >
    <v-card>
      <div>
        <h3 class="text-center pt-10 pb-5">
          REMOVE ITEM
          <br />
          <br />
          {{ removeMenuDisplayItemDetails.removeSelectedItem.node.name_eng }}
          <br />
          {{ removeMenuDisplayItemDetails.removeSelectedItem.node.name_chn }}
        </h3>

        <br />
      </div>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          x-large
          width="19.6%"
          v-on:click="
            toggleRemoveSelectedItemDialogOff();
            removeMenuDisplayItemDetails.removeSelectedItem = {};
          "
        >
          <div>CANCEL<br /></div>
        </v-btn>
        <v-btn
          x-large
          width="19.6%"
          v-on:click="toggleRemoveSelectedItemDialogCustomizeItemDialog(true)"
        >
          <div>CUSTOMIZE<br /></div>
        </v-btn>
        <v-btn
          x-large
          width="19.6%"
          v-on:click="
            toggleRemoveSelectedItemDialogOff();
            removeSelectedItemAll(
              removeMenuDisplayItemDetails.removeSelectedItem
            );
            removeMenuDisplayItemDetails.removeSelectedItem = {};
          "
        >
          <div>REMOVE ALL<br /></div>
        </v-btn>
        <v-btn
          x-large
          width="19.6%"
          v-on:click="
            toggleRemoveSelectedItemDialogOff();
            removeSelectedItemOne(
              removeMenuDisplayItemDetails.removeSelectedItem
            );
            removeMenuDisplayItemDetails.removeSelectedItem = {};
          "
        >
          <div>REMOVE 1<br /></div>
        </v-btn>
        <v-btn
          x-large
          width="19.6%"
          v-on:click="
            toggleRemoveSelectedItemDialogOff();
            addSelectedItemOne(removeMenuDisplayItemDetails.removeSelectedItem);
            removeMenuDisplayItemDetails.removeSelectedItem = {};
          "
        >
          <div>ADD 1<br /></div>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
import storeMixin from "../mixins/storeMixin";
import { store } from "../store/store";
export default {
  mixins: [storeMixin],
  props: ["removeMenuDisplayItemDetails"],
  methods: {
    toggleRemoveSelectedItemDialogOff() {
      this.$emit("setRemoveSelectedItemDialogToBool", false);
    },
    toggleRemoveSelectedItemDialogCustomizeItemDialog(bool) {
      this.$emit("setRemoveSelectedItemDialogCustomizeItemDialogToBool", bool);
    },
    removeSelectedItemOne: function (selectedItem) {
      const selectedItems = Object.assign({}, this.$store.state.selectedItems);
      if (
        selectedItems[selectedItem.custom_id ?? selectedItem.node.id]
          .quantity === 1
      ) {
        delete selectedItems[selectedItem.custom_id ?? selectedItem.node.id];
      } else {
        selectedItems[selectedItem.custom_id ?? selectedItem.node.id]
          .quantity--;
      }
      store.commit("setSelectedItems", selectedItems);
      this.storeMixinUpdateStorePriceDetails();
    },
    removeSelectedItemAll: function (selectedItem) {
      const selectedItems = Object.assign({}, this.$store.state.selectedItems);
      delete selectedItems[selectedItem.node.id];
      store.commit("setSelectedItems", selectedItems);
      this.storeMixinUpdateStorePriceDetails();
    },
    addSelectedItemOne: function (selectedItem) {
      const selectedItems = Object.assign({}, this.$store.state.selectedItems);
      selectedItems[selectedItem.custom_id ?? selectedItem.node.id].quantity++;
      store.commit("setSelectedItems", selectedItems);
      this.storeMixinUpdateStorePriceDetails();
    },
  },
};
</script>