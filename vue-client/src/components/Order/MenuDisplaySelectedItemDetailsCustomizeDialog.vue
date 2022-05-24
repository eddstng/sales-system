<template>
  <v-dialog
    v-if="removeMenuDisplayItemDetails.openCustomizeItemDialogue"
    v-model="removeMenuDisplayItemDetails.selectedItemDialog"
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
            toggleSelectedItemDialogCustomizeItemDialog(false);
            toggleSelectedItemDialogOff();
            addCustomizationToItem(
              removeMenuDisplayItemDetails.removeSelectedItem,
              {
                name_eng: `NO ${customization.name_eng}`,
                name_chn: `${customization.name_chn}`,
              }
            );
          "
        >
          <p>
            NO {{ customization.name_eng }}
            <!-- <br /> -->
            <!-- {{ customization.name_chn }} -->
          </p>
        </v-btn>
        <v-row class="justify-center mt-10 mb-10">
          <v-col cols="12" md="6">
            <v-text-field
              v-model="customCustomizationInput"
              label="Customization"
              required
              width="10%"
              autofocus
            ></v-text-field>
          </v-col>
          <v-btn
            class="mt-3 mb-3"
            x-large
            width="20%"
            height="80px"
            v-on:click="
              openCustomizeItemDialogue = false;
              removeMenuDisplayItemDetails.selectedItemDialog = false;
              addCustomizationToItem(
                removeMenuDisplayItemDetails.removeSelectedItem,
                {
                  name_eng: customCustomizationInput.toUpperCase(),
                  name_chn: ``,
                }
              );
              customCustomizationInput = '';
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
          v-on:click="toggleSelectedItemDialogCustomizeItemDialog(false)"
        >
          <div>CANCEL<br /></div>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import storeMixin from '../../mixins/storeMixin';
import { store } from '../../store/store';
export default {
  mixins: [storeMixin],
  props: ['removeMenuDisplayItemDetails'],
  data() {
    return {
      customCustomizationInput: '',
      customizations: [
        {
          name_eng: 'MSG',
          name_chn: '',
        },
        {
          name_eng: 'SESAME',
          name_chn: '',
        },
        {
          name_eng: 'SALT',
          name_chn: '',
        },
        {
          name_eng: 'OIL',
          name_chn: '',
        },
        {
          name_eng: 'SPICY',
          name_chn: '',
        },
        {
          name_eng: 'ONIONS',
          name_chn: '',
        },
      ],
    };
  },
  methods: {
    //repeated
    toggleSelectedItemDialogCustomizeItemDialog(bool) {
      this.$emit('setSelectedItemDialogCustomizeItemDialogToBool', bool);
    },
    toggleSelectedItemDialogOff() {
      this.$emit('setSelectedItemDialogToBool', false);
    },
    addCustomizationToItem: function(selectedItem, customizationObj) {
      const selectedItemIdToUseString =
        selectedItem.node.custom_id ?? selectedItem.node.id.toString();

      const selectedItems = Object.assign({}, this.$store.state.selectedItems);

      if (
        selectedItemIdToUseString in selectedItems &&
        selectedItems[selectedItemIdToUseString].customizations !== undefined
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
        selectedItems[
          `${customizedItemKeyName}${customizedItemKeyNumber}`
        ] = JSON.parse(JSON.stringify(selectedItemWithCustomizations));

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

      store.commit('setSelectedItems', selectedItems);
    },
    removeSelectedItemOneByVueStoreKey: function(vueStoreKeyToDelete) {
      const selectedItems = Object.assign({}, this.$store.state.selectedItems);
      if (selectedItems[vueStoreKeyToDelete].quantity === 1) {
        delete selectedItems[vueStoreKeyToDelete];
      } else {
        selectedItems[vueStoreKeyToDelete].quantity - 1;
      }
      store.commit('setSelectedItems', selectedItems);
      this.storeMixinUpdateStorePriceDetails();
    },
    addSelectedItemOne: function(selectedItem) {
      const selectedItems = Object.assign({}, this.$store.state.selectedItems);
      selectedItems[selectedItem.node.id].quantity++;
      store.commit('setSelectedItems', selectedItems);
      this.storeMixinUpdateStorePriceDetails();
    },
  },
};
</script>
