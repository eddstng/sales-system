<template>
  <v-dialog
    v-if="menuComponentDetails.dialogToggles.openCustomizeSelectedItemDialog"
    v-model="menuComponentDetails.dialogToggles.selectedItemDialog"
    width="90%"
  >
    <v-card>
      <div>
        <h3 class="text-center pt-5 pb-3">
          CUSTOMIZE ITEM
          <br />
          {{ menuComponentDetails.removeSelectedItem.node.name_eng }}
          {{
            `${
              menuComponentDetails.removeSelectedItem.node.name_chn
                ? ` - ` + menuComponentDetails.removeSelectedItem.node.name_chn
                : ""
            }`
          }}
        </h3>
        <br />
        <div class="">
          <v-btn
            v-for="obj in customizationObjs"
            v-bind:key="obj.name_eng"
            x-large
            width="13.1%"
            height="87"
            class="mb-4 mr-2 ml-3 customization-button"
            v-on:click="
              phone = '';
              addCustomizationToCustomizationInput(obj);
            "
          >
            <div>
              <br />
              <p class="mb-1">{{ obj.name_eng }}</p>
              <p class="customization-button-chn">{{ obj.name_chn }}</p>
            </div>
          </v-btn>
        </div>
        <v-row class="justify-center mt-5">
          <v-col class="pb-0 pt-0" cols="12" md="4">
            <div class="chn-text">
              <p>
                {{ customizationInput.chn ? customizationInput.chn : "-" }}
              </p>
            </div>
            <v-row class="justify-center customization-button-chn"> </v-row>
            <v-text-field
              v-model="customizationInput.eng"
              label="Customization"
              required
              width="10%"
              autofocus
            ></v-text-field>
          </v-col>
          <v-btn
            width="10%"
            height="60px"
            class="mt-5"
            v-on:click="removeLastWordIncustomizationInput()"
          >
            <!-- lets make this a input bar where we can input our custom order for name_eng -->
            <p class="pt-4">⌫</p>
          </v-btn>
        </v-row>
        <v-row class="justify-center">
          <v-col cols="12" md="4">
            <v-text-field
              class="pt-0 mt-4"
              prefix="$"
              v-model="customizationInput.price"
              label="Price"
              width="10%"
              @focus="onPriceFocus"
            ></v-text-field>
          </v-col>
          <v-btn width="10%" height="60px" v-on:click="clearPriceInput()">
            <p class="pt-4">CLEAR</p>
          </v-btn>
        </v-row>
      </div>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn x-large width="50%" v-on:click="onClickCancel(false)">
          <div>CANCEL<br /></div>
        </v-btn>
        <v-btn
          x-large
          width="50%"
          v-on:click="
            onClickAdd(menuComponentDetails.removeSelectedItem, {
              name_eng: customizationInput.eng.toUpperCase(),
              name_chn: customizationInput.chn,
              price: parseFloat(customizationInput.price),
            })
          "
        >
          <div>ADD<br /></div>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.additional-price-text {
  font-size: 25px;
}
.additional-price-row {
  margin-left: 24%;
}
.customization-button-chn {
  font-size: 25px;
  margin-top: 0px;
}

.chn-text {
  font-size: 20px;
}
</style>

<script>
import storeMixin from "../../mixins/storeMixin";
import searchMixin from "../../mixins/searchMixin";
import { customizationOptions } from "../../data/customizationOptions";
import { store } from "../../store/store";
export default {
  mixins: [storeMixin, searchMixin],
  props: ["menuComponentDetails"],
  data() {
    return {
      customizationInput: { eng: "", chn: "", price: 0.0 },
      customizationObjs: customizationOptions,
    };
  },

  // ADD A PRICE INPUT FIELD AND THIS FIELD WILL ADD A SUBSTITUTION ITEM WITH THE PRICE USING addItemToSelectedItems()

  methods: {
    onPriceFocus() {this.customizationInput.price = ''},
    addCustomizationToCustomizationInput(customizationObj) {
      if (this.customizationInput.eng.slice(-1) !== " ") {
        this.customizationInput.eng += " ";
      }
      this.customizationInput.eng += `${customizationObj.name_eng} `;

      if (this.customizationInput.chn.slice(-1) !== " ") {
        this.customizationInput.chn += " ";
      }
      this.customizationInput.chn += `${customizationObj.name_chn} `;
    },
    // TO DO: update this to delete the full inputed text, not by spaces.
    removeLastWordIncustomizationInput() {
      if (this.customizationInput.eng.slice(-1) === " ") {
        this.customizationInput.eng = this.customizationInput.eng.slice(0, -1);
      }
      if (this.customizationInput.chn.slice(-1) === " ") {
        this.customizationInput.chn = this.customizationInput.chn.slice(0, -1);
      }
      const lastIndexOfSpaceEng = this.customizationInput.eng.lastIndexOf(" ");
      const lastIndexOfSpaceChn = this.customizationInput.chn.lastIndexOf(" ");

      this.customizationInput.eng = this.customizationInput.eng.substring(
        0,
        lastIndexOfSpaceEng
      );
      this.customizationInput.chn = this.customizationInput.chn.substring(
        0,
        lastIndexOfSpaceChn
      );
    },

    clearPriceInput() {
      this.customizationInput.price = 0;
    },
    //repeated
    onClickCancel() {
      let updatedMenuComponentDetails = { ...this.menuComponentDetails };
      updatedMenuComponentDetails.dialogToggles.openCustomizeSelectedItemDialog = false;
      this.$emit("updateMenuComponentDetails", updatedMenuComponentDetails);
    },
    onClickAdd(selectedItem, customizationObj) {
      this.addCustomizationToItem(selectedItem, customizationObj);
      this.customizationInput = { eng: "", chn: "", price: 0 };
      let updatedMenuComponentDetails = { ...this.menuComponentDetails };
      updatedMenuComponentDetails.dialogToggles.selectedItemDialog = false;
      updatedMenuComponentDetails.dialogToggles.openCustomizeSelectedItemDialog = false;
      this.$emit("updateMenuComponentDetails", updatedMenuComponentDetails);
    },

    addCustomizationToItem: function (selectedItem, customizationObj) {
      const selectedItems = Object.assign({}, this.$store.state.selectedItems);
      let customizedItemKeyName = `${selectedItem.node.id.toString()}C-`;
      let customizedItemKeyNumber = 0;
      if (selectedItem.node.custom_id) {
        const selectedItemIdToUseString = selectedItem.node.custom_id;
        if (
          selectedItems[selectedItemIdToUseString].customizations !==
            undefined &&
          selectedItems[selectedItemIdToUseString].customizations !== null
        ) {
          selectedItems[selectedItemIdToUseString].customizations.push(
            customizationObj
          );
        } else {
          selectedItems[selectedItemIdToUseString].customizations = [
            customizationObj,
          ];
        }
      } else {
        while (
          selectedItems[
            `${customizedItemKeyName}${customizedItemKeyNumber}`
          ] !== undefined
        ) {
          customizedItemKeyNumber++;
        }

        selectedItems[`${customizedItemKeyName}${customizedItemKeyNumber}`] = {
          ...selectedItem,
          customizations: [customizationObj],
        };
        selectedItems[
          `${customizedItemKeyName}${customizedItemKeyNumber}`
        ].node.custom_id = `${customizedItemKeyName}${customizedItemKeyNumber}`;
        selectedItems[
          `${customizedItemKeyName}${customizedItemKeyNumber}`
        ].node.custom_name = `${
          selectedItems[`${customizedItemKeyName}${customizedItemKeyNumber}`]
            .node.name_eng
        } [C-${customizedItemKeyNumber}]`;

        delete selectedItems[selectedItem.node.id];
      }

      if (this.customizationInput.price !== 0) {
        const customPriceSum =
          selectedItem.node.custom_price === undefined ||
          selectedItem.node.custom_price === null
            ? parseFloat(selectedItem.node.price) +
              parseFloat(this.customizationInput.price)
            : parseFloat(selectedItem.node.custom_price) +
              parseFloat(this.customizationInput.price);

        const idToUse = selectedItem.node.custom_id
          ? selectedItem.node.custom_id
          : `${customizedItemKeyName}${customizedItemKeyNumber}`;

        selectedItems[idToUse].node.custom_price = customPriceSum;
      }
      store.commit("setSelectedItems", selectedItems);
      this.storeMixinUpdateStorePriceDetails();
    },
  },
};
</script>
