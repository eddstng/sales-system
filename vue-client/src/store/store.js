import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    // all of the items from the items table
    // Items[]
    items: [], 
    // the items that are displayed on the menu display
    // Record<string, Record<string, unknown>
    selectedItems: {}, 
    //the price details that are displayed on the menu display
    priceDetails: {
      subtotal: 0,
      gst: 0,
      total: 0,
    }
  },
  mutations: {
    setItems(state, items) {
      state.items = items;
    },
    setSelectedItems(state, selectedItems) {
      state.selectedItems = selectedItems;
    },
    setPriceDetails(state, priceDetails) {
      state.priceDetails = priceDetails;
    },
  },
  getters: {
    items: (state) => state.items,
    selectedItems: (state) => state.selectedItems,
    priceDetails: (state) => state.priceDetails,
  },
});
