<template>
  <v-dialog
    v-if="menuComponentDetails.dialogToggles.customizeOrderDialog"
    v-model="menuComponentDetails.dialogToggles.customizeOrderDialog"
    width="65%"
  >
    <v-card>
      <div>
        <h3 class="text-center pt-10 pb-3">
          CUSTOMIZE ORDER
          <br />
        </h3>
        <br />
        <div class="">
          <v-btn
            v-for="obj in customizationObjs"
            v-bind:key="obj.name_eng"
            x-large
            width="15%"
            height="77"
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
          <v-col cols="12" md="4">
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
            height="70px"
            class="mt-8"
            v-on:click="removeLastWordIncustomizationInput()"
          >
            <!-- lets make this a input bar where we can input our custom order for name_eng -->
            <p class="pt-4">⌫</p>
          </v-btn>
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
          v-on:click="onClickCancelButton()"
        >
          <div>CANCEL<br /></div>
        </v-btn>
        <v-btn
          x-large
          width="50%"
          v-on:click="
            menuComponentDetails.dialogToggles.customizeOrderDialog = false;
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
  font-size: 25px;
  margin-top: 0px;
}

.chn-text {
  font-size: 20px;
}
.row {
  margin: 0
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
    onClickCancelButton() {
      let updatedMenuComponentDetails = {...this.menuComponentDetails};
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
