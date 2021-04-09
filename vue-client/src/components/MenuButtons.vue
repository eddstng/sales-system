<template>
  <v-card
    outlined
    tile
    v-scroll.self="onScroll"
    class="overflow-y-auto"
    height="95vh"
  >
    <v-container class="grey lighten-5 fill-height">
      <v-container>
        <div v-scroll.self="onScroll" class="p-0" max-height="400">
          <v-btn
            class="menu-button-text"
            v-for="item in $store.state.items"
            v-bind:key="item"
            x-large
            dark
            height="180px"
            width="50%"
            v-on:click="addItemToSelectedItems(item)"
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
    addItemToSelectedItems(item) {
      const selectedItems = store.state.selectedItems;
      selectedItems.push(item);
      store.commit("setSelectedItems", selectedItems);
    },
  },
};
</script>
