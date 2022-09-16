<template>
  <v-dialog
    v-if="menuDisplayItemDetails.openCustomizeSelectedItemDialog"
    v-model="menuDisplayItemDetails.selectedItemDialog"
    width="1300px"
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
          v-for="obj in customizationTextObjs"
          v-bind:key="obj"
          x-large
          width="15%"
          height="100"
          class="mb-5 mr-2 ml-3 customization-button"
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
        <!-- <v-row class="justify-center mt-10 mb-10">
          <v-btn
            class="mt-3 mb-3"
            x-large
            width="20%"
            height="80px"
            v-on:click="
              addCustomizationToCustomizationInput({
                name_eng: '&',
                name_chn: '&',
              })
            "
          >
            <p>&</p>
          </v-btn>
        </v-row> -->
        <v-row class="justify-center mt-10">
          <v-col cols="12" md="6">
            <v-text-field
              v-model="customizationInput.eng"
              label="Customization"
              required
              width="10%"
              autofocus
            ></v-text-field>
          </v-col>
          <v-btn
            width="20%"
            height="60px"
            v-on:click="removeLastWordIncustomizationInput()"
          >
            <!-- lets make this a input bar where we can input our custom order for name_eng -->
            <p class="pt-4">⌫</p>
          </v-btn>
        </v-row>
        <v-row class="justify-center mb-10 customization-button-chn">
          <p label="Customization" required width="10%" autofocus>
            {{ customizationInput.chn }}
          </p>
        </v-row>
        <!-- <v-row class="justify-center mt-10 additional-price-row">
          <v-col cols="12" md="4">
            <v-text-field
              class="additional-price-text"
              prefix="$"
              value="0.00"
              label="Additional Price"
              required
              autofocus
            ></v-text-field>
          </v-col>
          <v-btn
            width="26%"
            height="60px"
            v-on:click="removeLastWordIncustomizationInput()"
          >
            <p class="pt-4">CLEAR</p>
          </v-btn>
        </v-row> -->
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
              name_eng: customizationInput.eng.toUpperCase(),
              name_chn: customizationInput.chn,
            });
            customizationInput = { eng: '', chn: '' };
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
import { store } from "../../store/store";
export default {
  mixins: [storeMixin],
  props: ["menuDisplayItemDetails"],
  data() {
    return {
      customizationInput: { eng: "", chn: "" },
      customizationTextObjs: [
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
      // if (lastIndexOfSpace === -1) {
      //   return;
      // }

      this.customizationInput.eng = this.customizationInput.eng.substring(
        0,
        lastIndexOfSpaceEng
      );
      this.customizationInput.chn = this.customizationInput.chn.substring(
        0,
        lastIndexOfSpaceChn
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
