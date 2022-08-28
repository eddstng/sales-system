import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    items: [],
    customers: [],
    tables: [],
    selectedCustomer: {phone: ''},
    selectedItems: {},
    priceDetails: {
      subtotal: 0,
      gst: 0,
      total: 0,
      discount: 0,
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
    // menuDisplayType = "ORDER" | "MODIFY"
    menuDisplayType: "ORDER",
    notification: 0,
    component: "ORDER",
    orderHistory: [],
    orderHistoryPriceTotal: 0,
    selectedItemsOrderedByEntry: {},
    errorToDisplay: ''
  },
  mutations: {
    setErrorToDisplay(state, error) {
      state.errorToDisplay = error;
    },
    setMenuDisplayType(state, type) {
      state.menuDisplayType = type;
    },
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
        selectedItemsTimestampCustomIdArray.push([key, selectedItem.timestamp, selectedItem])
      }
      
      const sortedArray = selectedItemsTimestampCustomIdArray.sort(function(a, b) {
        return a[1] - b[1];
      });

      sortedArray.forEach(([key, selectedItemTimestamp]) => {
        let selectedItemsOrderedByEntry = state.selectedItemsOrderedByEntry;
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
    // setNotification
    // - 0 = no notification
    // - 1 = Order successfully added.
    // - 2 = Order failed please check the status and try again.
    // - 3 = No connection to the server.
    // - 4 = Trying to submit order. Please wait. 
    // - 5 = $store.state.errorToDisplay
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
