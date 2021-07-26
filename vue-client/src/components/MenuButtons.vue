<template>
  <v-card outlined tile class="overflow-y-auto" height="95vh">
    <v-container class="grey lighten-5 fill-height">
      <v-container>
        <div class="p-0" max-height="400">
          <v-btn
            class="menu-button-text"
            v-for="item in $store.state.items"
            v-bind:key="item.name_eng"
            x-large
            dark
            height="180px"
            width="50%"
            v-on:click="onClickMenuButton(item)"
            >{{ item.name_eng }}<br />{{ item.name_chn }}<br />{{
              item.price
            }}</v-btn
          >
        </div>
      </v-container>
    </v-container>
  </v-card>
</template>

<style>
.menu-button-text {
  font-size: 1.2em;
  overflow: hidden;
}
</style>
overflow: hidden;

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
    calculatePriceDetails() {
      let priceDetails = store.state.priceDetails;
      priceDetails.subtotal = 0;
      priceDetails.gst = 0;
      priceDetails.total = 0;
      const selectedItems = store.state.selectedItems;
      Object.keys(selectedItems).forEach((key) => {
        console.log(key, selectedItems[key]);
        priceDetails.subtotal = (parseFloat(selectedItems[key].node.price) * selectedItems[key].quantity) + priceDetails.subtotal;
        priceDetails.gst = parseFloat(
          (priceDetails.subtotal * 0.05).toFixed(2)
        );
        priceDetails.total = priceDetails.subtotal + priceDetails.gst;
      });
      store.commit("priceDetails", priceDetails);
    },
  },
};
</script>
