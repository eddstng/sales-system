import { store } from "../store/store";
import axios from "axios";

export default {
  methods: {
    storeMixinClearStorePriceDetails() {
      store.commit("setPriceDetails", {
        subtotal: 0,
        gst: 0,
        total: 0,
        discount: 0,
      });
    },
    storeMixinCalculatePriceDetails(priceDetails, itemPrice, itemQuantity, specialItemNegatingDiscount) {
      let priceDetailsReturn = Object.assign({}, priceDetails);
      priceDetailsReturn.subtotal = this.storeMixinCalculatePriceDetailsSubtotal(priceDetailsReturn.subtotal, itemPrice, itemQuantity)
      if (priceDetailsReturn.subtotal >= 35 && specialItemNegatingDiscount !== true && this.$store.state.currentOrder.type === 1) {
        const tenPercentDiscount = priceDetailsReturn.subtotal * 0.10;
        priceDetailsReturn.discount = Math.abs(tenPercentDiscount);
      } else {
        priceDetailsReturn.discount = 0;
      }
      const discountedSubtotal = priceDetailsReturn.subtotal - priceDetailsReturn.discount;
      priceDetailsReturn.gst = this.storeMixinCalculatePriceDetailsGst(discountedSubtotal);
      priceDetailsReturn.total = (discountedSubtotal) + priceDetailsReturn.gst;
      return priceDetailsReturn
    },
    storeMixinCalculatePriceDetailsSubtotal(currentSubtotal, itemPrice, itemQuantity) {
      return (itemPrice * itemQuantity) + currentSubtotal;
    },
    storeMixinCalculatePriceDetailsGst(currentSubtotal) {
      return parseFloat(
        (currentSubtotal * 0.05).toFixed(2)
      );
    },
    storeMixinSetStoreSelectedItems(selectedItems) {
      store.commit("setSelectedItems", {});
      store.commit("setSelectedItems", selectedItems);
    },
    storeMixinUpdateStorePriceDetails() {
      let specialItemNegatingDiscount = false;
      this.storeMixinClearStorePriceDetails();
      let priceDetails = Object.assign({}, this.$store.state.priceDetails); 
      const selectedItems = Object.assign({}, this.$store.state.selectedItems);
      Object.keys(selectedItems).forEach((key) => {
        const itemPrice = selectedItems[key].node.price; 
        const itemQuantity = selectedItems[key].quantity;
        if (selectedItems[key].node.name_eng.includes("Dinner Special") || selectedItems[key].node.name_eng.includes("(SP)")) {
          specialItemNegatingDiscount = true;
        }
        priceDetails = this.storeMixinCalculatePriceDetails(priceDetails, itemPrice, itemQuantity, specialItemNegatingDiscount);
      });
      store.commit("setPriceDetails", priceDetails);
    },
    storeMixinClearOrderRelatedDetails() {
      // store.commit("setSelectedItems", {});
      this.storeMixinClearSelectedItems();
      this.storeMixinClearSelectedCustomer();
      // store.commit("setSelectedCustomer", {phone: ''});
      store.commit("setCurrentOrder", {
        id: null,
        type: null,
        total: 0,
        customer_id: null,
        void: null,
        paid: null,
        itemQuantity: 0,
        internal: false
      });
      this.storeMixinClearStorePriceDetails();
    },

    storeMixinClearCurrentOrder() {
      store.commit("setCurrentOrder", {
        id: null,
        type: null,
        total: 0,
        customer_id: null,
        void: null,
        paid: null,
        itemQuantity: 0,
        internal: false
      });
    },

    storeMixinClearSelectedItems() {
      store.commit("setSelectedItems", {});
    },

    storeMixinClearSelectedCustomer() {
      store.commit("setSelectedCustomer", {phone: ''});
    },
    
    storeMixinSumSelectedItemsQuantity() {
      let selectedItemsQuantitySum = 0;
      for (const value of Object.entries(this.$store.state.selectedItems)) {
        selectedItemsQuantitySum = selectedItemsQuantitySum + value[1].quantity;
      }
      let currentOrder = JSON.parse(JSON.stringify(this.$store.state.currentOrder))
      currentOrder.itemQuantity = selectedItemsQuantitySum;
      store.commit("setCurrentOrder", currentOrder);
    },
    async storeMixinUpdateOrderHistoryArray() {
      const orderHistoryArray = (
        await axios.get("http://localhost:3000/get/ordershistory/all")
      ).data;
      let orderHistoryPriceTotal = 0;
      // Here we turn the array into an object with the order id as the key and the order object as the value.
      // The reason for this is so we can update the HistoryButtons with the order status.
      const orderHistoryObj = orderHistoryArray.reduce((obj, order) => {
        orderHistoryPriceTotal += order.order_total;
        obj[order.order_id] = order;
        return obj;
      }, {});
      store.commit("setOrderHistory", orderHistoryObj);
      store.commit("setOrderHistoryPriceTotal", orderHistoryPriceTotal.toFixed(2) );
    },
    async storeMixinUpdateStoreCustomerArray() {
      const allCustomers = (await axios.get("http://localhost:3000/get/customers/all")).data

      const allCustomersObject = allCustomers.reduce((obj, customer) => {
        obj[customer.phone] = customer;
        return obj;
      }, {});

      store.commit(
        "setCustomers",
        allCustomersObject
      );
      const tables = [];

      for (const [customerId, customerData] of Object.entries(store.state.customers)) {
        if (customerData.name && customerData.name.includes('Table #')) {
          console.log(customerId)
          tables.push(customerData)
        }
      }

      store.commit("setTables", tables)
      return
    },
  }
};