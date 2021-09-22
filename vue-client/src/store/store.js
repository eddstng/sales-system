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
    },
    notification: 0,
    component: "HISTORY",
    orderHistory: []
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
