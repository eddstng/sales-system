<template>
  <v-dialog
    persistent
    @keydown.esc="
      menuComponentDetails.dialogToggles.customizeOrderDialog = false
    "
    v-if="menuComponentDetails.dialogToggles.customizeOrderDialog"
    v-model="menuComponentDetails.dialogToggles.customizeOrderDialog"
    width="86%"
  >
    <v-card>
      <div>
        <h3 class="text-center pt-5">
          CUSTOMIZE ORDER
          <br />
        </h3>
        <br />
        <div class="">
          <v-btn
            v-for="obj in customizationObjs"
            v-bind:key="obj.name_eng"
            x-large
            width="12.8%"
            height="80"
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
        <div class="chn-text mt-1">
          <p>
            {{ customizationInput.chn ? customizationInput.chn : "-" }}
          </p>
        </div>
        <v-row class="justify-center mx-0">
          <v-col cols="12" md="4" class="pb-0">
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
        <v-btn x-large width="50%" v-on:click="onClickCancel()">
          <div>CANCEL<br /></div>
        </v-btn>
        <v-btn
          x-large
          width="50%"
          v-on:click="
            menuComponentDetails.dialogToggles.customizeOrderDialog = false;
            menuComponentDetails.selectedItemDialog = false;
onClickAdd()
            addCustomizationToItem(menuComponentDetails.removeSelectedItem, {
              name_eng: customizationInput.eng.toUpperCase(),
              name_chn: customizationInput.chn,
              price: parseFloat(customizationInput.price),
            });
            customizationInput = { eng: '', chn: '', price: 0 };
            close;
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
  margin-left: 8%;
}
</style>

<script>
import storeMixin from "../../mixins/storeMixin";
import utilsMixin from "../../mixins/utilsMixin";
import searchMixin from "../../mixins/searchMixin";
import { customizationOptions } from "../../data/customizationOptions";
import { store } from "../../store/store";

export default {
  mixins: [storeMixin, searchMixin, utilsMixin],
  props: ["menuComponentDetails"],
  data() {
    return {
      customizationInput: { eng: "", chn: "", price: 0.0 },
      customizationObjs: customizationOptions,
    };
  },

  // ADD A PRICE INPUT FIELD AND THIS FIELD WILL ADD A SUBSTITUTION ITEM WITH THE PRICE USING addItemToSelectedItems()

  methods: {
    onClickAdd() {
      let updatedMenuComponentDetails = { ...this.menuComponentDetails };
      updatedMenuComponentDetails.dialogToggles.selectedItemDialog = false;
      this.$emit("updateMenuComponentDetails", updatedMenuComponentDetails);
    },
    onClickCancel() {
      let updatedMenuComponentDetails = { ...this.menuComponentDetails };
      updatedMenuComponentDetails.dialogToggles.customizeOrderDialog = false;
      this.$emit("updateMenuComponentDetails", updatedMenuComponentDetails);
    },
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
    addCustomizationToItem: function (selectedItem, customizationObj) {
      let currentOrder = this.deepCopyArray(this.$store.state.currentOrder);
      currentOrder.customizations.push(customizationObj);
      let totalCustomizationPrice = 0;
      store.commit("setCurrentOrder", currentOrder);
      this.$store.state.currentOrder.customizations.forEach((customization) => {
        totalCustomizationPrice += customization.price;
      });
      // currentOrder = this.deepCopyArray(this.$store.state.currentOrder); //need to copy the customization array before the math below works
      currentOrder.customizations_price = parseFloat(totalCustomizationPrice);
      store.commit("setCurrentOrder", currentOrder);
      this.storeMixinUpdateStorePriceDetails();
    },
  },
};
</script>
