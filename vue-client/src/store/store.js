import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    items: [], // all of the items from the items table
    selectedItems: [], // the items that are displayed on the menu display
  },
  mutations: {
    setItems(state, items) {
      state.items = items;
    },
    setSelectedItems(state, selectedItems) {
      state.selectedItems = selectedItems;
    },
  },
  getters: {
    items: (state) => state.items,
    selectedItems: (state) => state.selectedItems,
  },
});
