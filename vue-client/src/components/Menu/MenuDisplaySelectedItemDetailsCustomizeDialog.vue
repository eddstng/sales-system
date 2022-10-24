<template>
  <v-dialog
    v-if="menuComponentDetails.openCustomizeSelectedItemDialog"
    v-model="menuComponentDetails.selectedItemDialog"
    width="1300px"
    height="100%"
  >
    <v-card>
      <div>
        <h3 class="text-center pt-10 pb-3">
          CUSTOMIZE ITEM
          <br />
          <br />
          {{ menuComponentDetails.removeSelectedItem.node.name_eng }}
          <br />
          {{ menuComponentDetails.removeSelectedItem.node.name_chn }}
        </h3>
        <br />
        <v-btn
          v-for="obj in customizationObjs"
          v-bind:key="obj.name_eng"
          x-large
          width="15%"
          height="100"
          class="mb-4 mr-2 ml-3 customization-button"
          v-on:click="
            phone = '';
            addCustomizationToCustomizationInput(obj);
          "
        >
          <div>
            <br />
            <p class="pt-10">{{ obj.name_eng }}</p>
            <p class="pb-10 customization-button-chn">{{ obj.name_chn }}</p>
          </div>
        </v-btn>
        <v-row class="justify-center mt-10">
          <v-col cols="12" md="4">
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
            v-on:click="removeLastWordIncustomizationInput()"
          >
            <!-- lets make this a input bar where we can input our custom order for name_eng -->
            <p class="pt-4">⌫</p>
          </v-btn>
        </v-row>
        <v-row class="justify-center customization-button-chn">
          <p>
            {{ customizationInput.chn }}
          </p>
        </v-row>
        <v-row class="justify-center">
          <v-col cols="12" md="4">
            <v-text-field
              prefix="$"
              v-model="customizationInput.price"
              label="Price"
              width="10%"
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
            menuComponentDetails.selectedItemDialog = false;
            addCustomizationToItem(menuComponentDetails.removeSelectedItem, {
              name_eng: customizationInput.eng.toUpperCase(),
              name_chn: customizationInput.chn,
              price: parseFloat(customizationInput.price),
            });
            customizationInput = { eng: '', chn: '', price: 0 };
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
  font-size: 30px;
  margin-top: 0px;
}
</style>

<script>
import storeMixin from "../../mixins/storeMixin";
import searchMixin from "../../mixins/searchMixin";
import { store } from "../../store/store";
export default {
  mixins: [storeMixin, searchMixin],
  props: ["menuComponentDetails"],
  data() {
    return {
      customizationInput: { eng: "", chn: "", price: 0.0 },
      customizationObjs: [
        { name_eng: "NO", name_chn: "走" },
        { name_eng: "LESS", name_chn: "小" },
        { name_eng: "ADD", name_chn: "加" },
        { name_eng: "EXTRA", name_chn: "多" },
        { name_eng: "ON SIDE", name_chn: "分" },
        { name_eng: "CHANGE TO", name_chn: "轉" },
        { name_eng: "MSG", name_chn: "味精" },
        { name_eng: "SALT", name_chn: "鹽" },
        { name_eng: "OIL", name_chn: "油" },
        { name_eng: "SESAME", name_chn: "芝麻" },
        { name_eng: "SPICY", name_chn: "辣" },
        { name_eng: "ONIONS", name_chn: "雙葱" },
        { name_eng: "SAUCE", name_chn: "汁" },
        { name_eng: "OYSTER SAUCE", name_chn: "蠔油" },
        { name_eng: "SOY SAUCE", name_chn: "醬油" },
        { name_eng: "BB SAUCE", name_chn: "豉汁" },
        { name_eng: "SS SAUCE", name_chn: "咕嚕汁" },
        { name_eng: "LEMON SAUCE", name_chn: "檸檬汁" },
        { name_eng: "MEAT", name_chn: "肉" },
        { name_eng: "PORK", name_chn: "豬肉" },
        { name_eng: "BEEF", name_chn: "牛肉" },
        { name_eng: "CHKN", name_chn: "雞肉" },
        { name_eng: "SEAFOOD", name_chn: "海鮮" },
        { name_eng: "EGG", name_chn: "蛋" },
        { name_eng: "BEANSPROUTS", name_chn: "芽菜" },
        { name_eng: "PINEAPPLE", name_chn: "菠蘿" },
        { name_eng: "CORN", name_chn: "粟米" },
        { name_eng: "MUSHROOMS", name_chn: "菇" },
        { name_eng: "SHELLESS PRAWN", name_chn: "轉虾球" },
        { name_eng: "BONELESS PORK", name_chn: "轉肉" },
      ],
    };
  },

  // ADD A PRICE INPUT FIELD AND THIS FIELD WILL ADD A SUBSTITUTION ITEM WITH THE PRICE USING addItemToSelectedItems()

  methods: {
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
    closeCustomizeSelectedItemDialog() {
      this.$emit("closeCustomizeSelectedItemDialog");
    },
    closeSelectedItemDialog() {
      this.$emit("closeSelectedItemDialog");
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
