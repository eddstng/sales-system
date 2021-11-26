<template>
  <v-dialog
    v-if="removeMenuDisplayItemDetails.openCustomizeItemDialogue"
    v-model="removeMenuDisplayItemDetails.removeSelectedItemDialog"
    width="1000px"
  >
    <v-card>
      <div>
        <h3 class="text-center pt-10 pb-5">
          CUSTOMIZE ITEM
          <br />
          <br />
          {{ removeMenuDisplayItemDetails.removeSelectedItem.node.name_eng }}
          <br />
          {{ removeMenuDisplayItemDetails.removeSelectedItem.node.name_chn }}
        </h3>
        <br />
        <v-btn
          v-for="customization in customizations"
          v-bind:key="customization.name_eng"
          class="mt-1 mr-1"
          x-large
          width="16.26%"
          height="80px"
          v-on:click="
            openCustomizeItemDialogue = false;
            toggleRemoveSelectedItemDialogCustomizeItemDialog(false);
            toggleRemoveSelectedItemDialogOff();
            addCustomizationToItem(
              removeMenuDisplayItemDetails.removeSelectedItem,
              {
                name_eng: `NO ${customization.name_eng}`,
                name_chn: `NO ${customization.name_chn}`,
              }
            );
          "
        >
          <p>
            NO {{ customization.name_eng }}<br />NO
            {{ customization.name_chn }}
          </p>
        </v-btn>
        <v-btn
          v-for="customization in customizations"
          v-bind:key="customization.name_eng"
          class="mt-1 mr-1"
          x-large
          width="16.26%"
          height="80px"
          v-on:click="
            openCustomizeItemDialogue = false;
            toggleRemoveSelectedItemDialogCustomizeItemDialog(false);
            toggleRemoveSelectedItemDialogOff();
            addCustomizationToItem(
              removeMenuDisplayItemDetails.removeSelectedItem,
              {
                name_eng: `LESS ${customization.name_eng}`,
                name_chn: `LESS ${customization.name_chn}`,
              }
            );
          "
        >
          <p>
            LESS {{ customization.name_eng }}<br />LESS
            {{ customization.name_chn }}
          </p>
        </v-btn>
        <v-row class="justify-center mt-10 mb-10">
          <v-col cols="12" md="6">
            <v-text-field
              v-model="email"
              :error-messages="errors"
              label="Custom"
              required
              width="10%"
            ></v-text-field>
          </v-col>
          <v-btn
            class="mt-3 mb-3"
            x-large
            width="20%"
            height="80px"
            v-on:click="
              openCustomizeItemDialogue = false;
              removeMenuDisplayItemDetails.removeSelectedItemDialog = false;
              addCustomizationToItem(
                removeMenuDisplayItemDetails.removeSelectedItem,
                {
                  name_eng: `CUSTOM: `,
                  name_chn: `CUSTOM: `,
                }
              );
            "
          >
            <!-- lets make this a input bar where we can input our custom order for name_eng -->
            <p>CUSTOM</p>
          </v-btn>
        </v-row>
      </div>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          x-large
          width="100%"
          v-on:click="toggleRemoveSelectedItemDialogCustomizeItemDialog(false)"
        >
          <div>CANCEL<br /></div>
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
  data() {
    return {
      customizations: [
        {
          name_eng: "MSG",
          name_chn: "123456",
        },
        {
          name_eng: "SESAME",
          name_chn: "123456",
        },
        {
          name_eng: "SALT",
          name_chn: "123456",
        },
        {
          name_eng: "OIL",
          name_chn: "123456",
        },
        {
          name_eng: "SPICY",
          name_chn: "123456",
        },
        {
          name_eng: "ONIONS",
          name_chn: "123456",
        },
      ],
    };
  },
  methods: {
    //repeated
    toggleRemoveSelectedItemDialogCustomizeItemDialog(bool) {
      this.$emit("setRemoveSelectedItemDialogCustomizeItemDialogToBool", bool);
    },
    toggleRemoveSelectedItemDialogOff() {
      this.$emit("setRemoveSelectedItemDialogToBool", false);
    },
    addCustomizationToItem: function (selectedItem, customizationObj) {
      console.log(JSON.stringify(selectedItem));

      const vueStoreKeyToDelete =
        selectedItem.custom_id ?? selectedItem.node.id;
      const selectedItems = Object.assign({}, this.$store.state.selectedItems);
      if (
        selectedItems[selectedItem.custom_id ?? selectedItem.node.id.toString()]
          .customizations === undefined
      ) {
        selectedItems[
          selectedItem.custom_id ?? selectedItem.node.id.toString()
        ].customizations = [customizationObj];
      } else {
        selectedItems[
          selectedItem.custom_id ?? selectedItem.node.id.toString()
        ].customizations.push(customizationObj); // update to check if it is array
      }

      if (!selectedItem.customizations.length !== 0) {
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
          {};
        selectedItems[`${customizedItemKeyName}${customizedItemKeyNumber}`] =
          selectedItem;
        selectedItems[
          `${customizedItemKeyName}${customizedItemKeyNumber}`
        ].custom_id = `${customizedItemKeyName}${customizedItemKeyNumber}`;
        selectedItems[
          `${customizedItemKeyName}${customizedItemKeyNumber}`
        ].quantity = 1;

        store.commit("setSelectedItems", selectedItems);
        console.log(JSON.stringify(selectedItem));
        this.removeSelectedItemOneByVueStoreKey(vueStoreKeyToDelete);
      }
    },
    removeSelectedItemOneByVueStoreKey: function (vueStoreKeyToDelete) {
      const selectedItems = Object.assign({}, this.$store.state.selectedItems);
      if (selectedItems[vueStoreKeyToDelete].quantity === 1) {
        delete selectedItems[vueStoreKeyToDelete];
      } else {
        selectedItems[vueStoreKeyToDelete].quantity - 1;
      }
      store.commit("setSelectedItems", selectedItems);
      this.storeMixinUpdateStorePriceDetails();
    },
    addSelectedItemOne: function (selectedItem) {
      const selectedItems = Object.assign({}, this.$store.state.selectedItems);
      selectedItems[selectedItem.node.id].quantity++;
      store.commit("setSelectedItems", selectedItems);
      this.storeMixinUpdateStorePriceDetails();
    },
  },
};
</script>