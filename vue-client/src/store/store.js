import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    // all of the items from the items table
    // Items[]
    items: [], 
    customers: [],
    tables: [],
    selectedCustomer: {},
    // the items that are displayed on the menu display
    // Record<string, Record<string, unknown>
    selectedItems: {}, 
    //the price details that are displayed on the menu display
    priceDetails: {
      subtotal: 0,
      gst: 0,
      total: 0,
    },
    currentOrder: {
      id: null,
      type: null,
      total: 0,
      customer_id: null,
      void: null,
      paid: null,
    },
    notification: 0,
    component: "HISTORY",
    orderHistory: [],
    selectedItemsOrderedByEntry: {}
  },
  mutations: {
    setOrderHistory(state, orderHistory) {
      state.orderHistory = orderHistory;
    },
    setComponent(state, component) {
      state.component = component;
    },
    setItems(state, items) {
      state.items = items;
    },
    setCustomers(state, customers) {
      state.customers = customers;
    },
    setTables(state, tables) {
      state.tables = tables;
    },
    setSelectedItems(state, selectedItems) {
      state.selectedItems = selectedItems;
      // This conversion is necessary because:
      // 1. We need to insert the items with the id/custom_id as the key. If we used timestamp as we do in the display, it will create a new entry instead of increasing the quantity.
      // 2. We need to display the items with the timestamp as the key. This allows the menu display to display it in the order of entry.
      const selectedItemsTimestampCustomIdArray = [];
      for (const [key, value] of Object.entries(state.selectedItems)) {
        selectedItemsTimestampCustomIdArray.push([value.timestamp, key])
      }
      const sortedArray = selectedItemsTimestampCustomIdArray.sort(function(a, b) {
        return a[0] - b[0];
      });
      sortedArray.forEach(([timestamp, id]) => {
        state.selectedItemsOrderedByEntry[timestamp] = state.selectedItems[id]
      })
    },
    setSelectedCustomer(state, selectedCustomer) {
      state.selectedCustomer = selectedCustomer;
    },
    setPriceDetails(state, priceDetails) {
      state.priceDetails = priceDetails;
    },
    setCurrentOrder(state, order) {
      state.currentOrder = order;
    },
    setNotification(state, notificationCode) {
      state.notification = notificationCode;
    },
  },
  getters: {
    items: (state) => state.items,
    selectedItems: (state) => state.selectedItems,
    selectedCustomer: (state) => state.selectedCustomer,
    priceDetails: (state) => state.priceDetails,
  },
});
