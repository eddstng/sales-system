<template>
  <v-dialog
    persistent
    @keydown.esc="
      menuComponentDetails.dialogToggles.requiredCustomizationDialog = false;
      menuComponentDetails.displayedButtonsConfig.displayCategoryButtons = true;
      menuComponentDetails.displayMenuButtons = false;
    "
    v-if="
      menuComponentDetails.requiredCustomizationDetails
        .itemsThatShareTheSameMenuId !== null
    "
    v-model="menuComponentDetails.dialogToggles.requiredCustomizationDialog"
    width="70%"
  >
    <v-card>
      <div>
        <h3 class="text-center pt-10 pb-5">
          TYPE SELECTION
          <br />
          <br />
          <br />
          {{
            menuComponentDetails.requiredCustomizationDetails
              .itemThatRequiresCustomization.name_eng
          }}
          <br />

          {{
            menuComponentDetails.requiredCustomizationDetails
              .itemThatRequiresCustomization.name_chn
          }}

          <br />
          <br />
        </h3>
        <br />
      </div>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          x-large
          :style="`width: ${widthOfButtons};`"
          v-on:click="resetRequiredCustomizationDetails()"
        >
          <div>CANCEL<br /></div>
        </v-btn>

        <!-- how to pass in data to here to render? -->
        <v-btn
          x-large
          v-for="item in menuComponentDetails.requiredCustomizationDetails
            .itemsThatShareTheSameMenuId"
          v-bind:key="item.id"
          :style="`width: ${widthOfButtons};`"
          v-on:click="addItemToSelectedItems(item)"
        >
          {{ getChowMeinType(item.name_eng) }}
          <!-- <div style="font-size: 20px"> -->
          <br />
          {{ item.name_chn }}
          <!-- </div> -->
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style>
.pl-25 {
  padding-left: 8em;
}
</style>

<script>
import { store } from "../../store/store";
import storeMixin from "../../mixins/storeMixin";

export default {
  props: ["menuComponentDetails"],
  mixins: [storeMixin],
  computed: {
    widthOfButtons: function () {
      const x =
        100 /
        (this.menuComponentDetails.requiredCustomizationDetails
          .itemsThatShareTheSameMenuId.length +
          1);

      return x.toFixed(0) - 0.2 + "%";
    },
  },
  methods: {
    getChowMeinType(nameEng) {
      if (nameEng.includes("(C)")) {
        return "CRISPY";
      }
      if (nameEng.includes("(D)")) {
        return "DRY";
      }
      if (nameEng.includes("(S)")) {
        return "SOFT";
      }
      return nameEng
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
      this.resetRequiredCustomizationDetails();
    },
    resetRequiredCustomizationDetails() {
      let updatedMenuComponentDetails = { ...this.menuComponentDetails };
      updatedMenuComponentDetails.resetRequiredCustomizationDetails = {
        reducedItemsObj: null,
        itemThatRequiresCustomization: null,
        itemsThatShareTheSameMenuId: null,
      };
      updatedMenuComponentDetails.displayedButtonsConfig.displayCategoryButtons = true;
      updatedMenuComponentDetails.displayMenuButtons = false;
      updatedMenuComponentDetails.dialogToggles.requiredCustomizationDialog = false;
      this.$emit("updateMenuComponentDetails", updatedMenuComponentDetails);
    },
  },
};
</script>
