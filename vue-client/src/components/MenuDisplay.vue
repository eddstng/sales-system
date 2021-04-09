<template>
  <v-container>
    <v-card
      outlined
      tile
      v-scroll.self="onScroll"
      class="overflow-y-auto d-block"
      height="77.5vh"
      v-chat-scroll
    >
      <template>
        <v-card
          class="mx-auto pt-2"
          outlined
          v-for="item in $store.state.selectedItems"
          v-bind:key="item"
          height="7em"
          width="100vw"
        >
          <v-list-item three-line>
            <v-list-item-content>
              <div class="menu-display-text">{{ item.name_eng }}</div>
              <div class="menu-display-text">{{ item.name_chn }}</div>
            </v-list-item-content>
            <Button class="menu-display-text">{{ item.price }}</Button>
          </v-list-item>
        </v-card>
      </template>
    </v-card>
    <v-card>
      <v-list-item three-line>
        <v-list-item-content>
          <div class="menu-display-text">Subtotal:</div>
          <div class="menu-display-text">GST:</div>
          <div class="menu-display-text mt-5">Total:</div>
        </v-list-item-content>
        <v-list-item-content>
          <div class="menu-display-text text-right">5</div>
          <div class="menu-display-text text-right">5</div>
          <div class="menu-display-text text-right mt-5 mb-0">123</div>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </v-container>
</template>

<style>
.menu-display-text {
  font-size: 1.5em;
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
    scrollToElement() {
      const el = this.$refs.scrollToMe;

      if (el) {
        // Use el.scrollIntoView() to instantly scroll to the element
        el.scrollIntoView({ behavior: "smooth" });
      }
    },
    addItemToSelectedItems(item) {
      const selectedItems = store.state.selectedItems;
      selectedItems.push(item);
      store.commit("setSelectedItems", selectedItems);
    },
  },
};
</script>
