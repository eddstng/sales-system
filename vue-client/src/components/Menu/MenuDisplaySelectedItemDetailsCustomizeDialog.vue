<template>
  <v-dialog
    v-if="menuDisplayItemDetails.openCustomizeSelectedItemDialog"
    v-model="menuDisplayItemDetails.selectedItemDialog"
    width="1000px"
  >
    <v-card>
      <div>
        <h3 class="text-center pt-10 pb-5">
          CUSTOMIZE ITEM
          <br />
          <br />
          {{ menuDisplayItemDetails.removeSelectedItem.node.name_eng }}
          <br />
          {{ menuDisplayItemDetails.removeSelectedItem.node.name_chn }}
        </h3>
        <br />
        <v-btn
          v-for="text in customizationTexts"
          v-bind:key="text"
          x-large
          width="15%"
          height="80"
          class="mb-5 mr-2 ml-2"
          v-on:click="
            phone = '';
            addCustomizationToCustomizationInput(text);
          "
        >
          <div>{{ text }}<br /></div>
        </v-btn>
        <v-row class="justify-center mt-10 mb-10">
          <v-btn
            class="mt-3 mb-3"
            x-large
            width="20%"
            height="80px"
            v-on:click="addCustomizationToCustomizationInput('+')"
          >
            <!-- lets make this a input bar where we can input our custom order for name_eng -->
            <p>+</p>
          </v-btn>
        </v-row>
        <v-row class="justify-center mt-10 mb-10">
          <v-col cols="12" md="6">
            <v-text-field
              v-model="customizationInput"
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
            v-on:click="removeLastWordIncustomizationInput()"
          >
            <!-- lets make this a input bar where we can input our custom order for name_eng -->
            <p>⌫</p>
          </v-btn>
        </v-row>
      </div>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          x-large
          width="50%"
          v-on:click="closeCustomizeSelectedItemDialog(false)"
        >
          <div>CANCEL<br /></div>
        </v-btn>
        <v-btn
          x-large
          width="50%"
          v-on:click="
            openCustomizeSelectedItemDialog = false;
            menuDisplayItemDetails.selectedItemDialog = false;
            addCustomizationToItem(menuDisplayItemDetails.removeSelectedItem, {
              name_eng: customizationInput.toUpperCase(),
              name_chn: ``,
            });
            customizationInput = '';
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
  props: ["menuDisplayItemDetails"],
  data() {
    return {
      customizationInput: "",
      customizationTexts: [
        "NO",
        "LESS",
        "ADD",
        "EXTRA",
        "ON SIDE",
        "CHANGE TO",
        "MSG",
        "SALT",
        "OIL",
        "SESAME",
        "SPICY",
        "ONIONS",
        "SAUCE",
        "OYSTER SAUCE",
        "SOY SAUCE",
        "BLACK BEAN SAUCE",
        "SWEET SOUR SAUCE",
        "LEMON SAUCE",
        "MEAT",
        "PORK",
        "BEEF",
        "CHKN",
        "SEAFOOD",
        "EGG",
      ],
      customizations: [
        {
          name_eng: "MSG",
          name_chn: "",
        },
        {
          name_eng: "SESAME",
          name_chn: "",
        },
        {
          name_eng: "SALT",
          name_chn: "",
        },
        {
          name_eng: "OIL",
          name_chn: "",
        },
        {
          name_eng: "SPICY",
          name_chn: "",
        },
        {
          name_eng: "ONIONS",
          name_chn: "",
        },
      ],
    };
  },
  methods: {
    addCustomizationToCustomizationInput(text) {
      if (this.customizationInput.slice(-1) !== " ") {
        this.customizationInput += " ";
      }
      this.customizationInput += `${text} `;
    },
    removeLastWordIncustomizationInput() {
      if (this.customizationInput.slice(-1) === " ") {
        this.customizationInput = this.customizationInput.slice(0, -1);
      }
      const lastIndexOfSpace = this.customizationInput.lastIndexOf(" ");
      if (lastIndexOfSpace === -1) {
        return;
      }

      this.customizationInput = this.customizationInput.substring(
        0,
        lastIndexOfSpace
      );
    },
    //repeated
    closeCustomizeSelectedItemDialog() {
      this.$emit("closeCustomizeSelectedItemDialog");
    },
    closeSelectedItemDialog() {
      this.$emit("closeSelectedItemDialog");
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
  },
};
</script>
