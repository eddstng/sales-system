import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    items: [],
    customers: [],
    tables: [],
    selectedCustomer: {},
    selectedItems: {},
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
      itemQuantity: 0,
    },
    notification: 0,
    component: "HISTORY",
    orderHistory: [],
    orderHistoryPriceTotal: 0,
    selectedItemsOrderedByEntry: {}
  },
  mutations: {
    setOrderHistory(state, orderHistory) {
      state.orderHistory = orderHistory;
    },
    setOrderHistoryPriceTotal(state, orderHistoryPriceTotal) {
      state.orderHistoryPriceTotal = orderHistoryPriceTotal;
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
      state.selectedItemsOrderedByEntry = {};
      state.selectedItems = selectedItems;
      if (Object.keys(selectedItems).length === 0) {
        state.selectedItemsOrderedByEntry = {}
        return
      }

      // This conversion is necessary because:
      // 1. We need to insert the items with the id/custom_id as the key. If we used timestamp as we do in the display, it will create a new entry instead of increasing the quantity.
      // 2. We need to display the items with the timestamp as the key. This allows the menu display to display it in the order of entry.
      const selectedItemsTimestampCustomIdArray = [];
      for (const [key, selectedItem] of Object.entries(state.selectedItems)) {
        console.log(key);
        selectedItemsTimestampCustomIdArray.push([key, selectedItem.timestamp, selectedItem])
      }
      
      const sortedArray = selectedItemsTimestampCustomIdArray.sort(function(a, b) {
        return a[1] - b[1];
      });

      sortedArray.forEach(([key, selectedItemTimestamp, selectedItem]) => {
        let selectedItemsOrderedByEntry = state.selectedItemsOrderedByEntry;
        console.log(JSON.stringify(selectedItem))
        selectedItemsOrderedByEntry[selectedItemTimestamp] = state.selectedItems[key];
        state.selectedItemsOrderedByEntry = selectedItemsOrderedByEntry;

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
