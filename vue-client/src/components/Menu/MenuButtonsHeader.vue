
<template>
  <div>
    <div>
      <v-btn
        class="history-button-text mr-1"
        width="32.8%"
        height="75px"
        dark
        v-on:click="onClickBack()"
      >
        BACK
      </v-btn>
      <v-btn
        v-on:click="onClickCustomItemButton()"
        class="history-button-text mr-1"
        width="32.8%"
        height="75px"
        dark
      >
        CUSTOM ITEMS
      </v-btn>
      <v-btn
        v-on:click="onClickCustomizeOrder()"
        class="history-button-text"
        width="32.8%"
        height="75px"
        dark
      >
        CUSTOMIZE ORDER
      </v-btn>
    </div>
  </div>
</template>

<style>
.menu-button-text-eng {
  font-size: 0.9em;
}

.menu-button-text-chn {
  font-size: 1.2em;
}

.menu-button-text-price {
  font-size: 1.7em;
}
</style>

<script>
import storeMixin from "../../mixins/storeMixin";

export default {
  mixins: [storeMixin],
  props: ["menuComponentDetails"],
  methods: {
    onClickBack() {
      this.menuComponentDetails.displayedButtonsConfig.displayCategoryButtons = true;
      this.menuComponentDetails.displayMenuButtons = false;
      this.menuComponentDetails.selectedCategory = null;
    },
    onClickCustomizeOrder() {
      let updatedMenuComponentDetails = { ...this.menuComponentDetails };
      updatedMenuComponentDetails.dialogToggles.customizeOrderDialog = true;
      this.$emit("updateMenuComponentDetails", updatedMenuComponentDetails);
    },
    onClickCustomItemButton() {
      let updatedMenuComponentDetails = { ...this.menuComponentDetails };
      updatedMenuComponentDetails.dialogToggles.addCustomItemDialog = true;
      this.$emit("updateMenuComponentDetails", updatedMenuComponentDetails);
    },
    onClickMenuButton(item) {
      this.checkIfSelectedItemRequiresCustomization(item);
    },
  },
};
</script>
