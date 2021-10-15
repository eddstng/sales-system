<template>
  <v-card outlined tile class="overflow-y-auto" height="92.4vh">
    <div class="p-0" max-height="400">
      <v-btn
        v-for="item in $store.state.items"
        v-bind:key="item.name_eng"
        x-large
        dark
        height="180px"
        width="50%"
        v-on:click="onClickMenuButton(item)"
        ><div>
          <p class="menu-button-text-eng">{{ item.name_eng }}</p>
          <p class="menu-button-text-chn">{{ item.name_chn }}</p>
          <p class="menu-button-text-price">{{ item.price }}</p>
        </div>
      </v-btn>
    </div>
  </v-card>
</template>

<style>
.menu-button-text-eng {
  font-size: 1.2em;
}
.menu-button-text-chn {
  font-size: 1.7em;
}
.menu-button-text-price {
  font-size: 1.7em;
}
</style>

<script>
import { store } from "../store/store";
export default {
  data() {
    return {};
  },
  mounted() {
    this.scrollToElement();
  },
  methods: {
    calculatePriceDetails: function () {
      this.$root.$refs.App.calculatePriceDetails();
    },
    scrollToElement() {
      const el = this.$refs.scrollToMe;
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    },
    onClickMenuButton(item) {
      this.addItemToSelectedItems(item);
      this.calculatePriceDetails();
    },
    addItemToSelectedItems(item) {
      let selectedItems = store.state.selectedItems;
      if (item.id in selectedItems) {
        selectedItems[item.id].quantity++;
      } else {
        selectedItems[item.id] = {};
        selectedItems[item.id].node = item;
        selectedItems[item.id].quantity = 1;
      }
      store.commit("setSelectedItems", selectedItems);
    },
  },
};
</script>
