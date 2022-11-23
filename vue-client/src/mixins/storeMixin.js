import { store } from "../store/store";
import axios from "axios";


export default {
  emptyCurrentOrder: {
    id: null,
    type: null,
    total: 0,
    customer_id: null,
    void: null,
    paid: null,
    itemQuantity: 0,
    internal: false,
    customizations: []
  },
  methods: {
    storeMixinClearCurrentOrder() {
      store.commit("setCurrentOrder", {
        id: null,
        type: null,
        total: 0,
        customer_id: null,
        void: null,
        paid: null,
        itemQuantity: 0,
        internal: false,
        customizations: [],
        customizations_price: 0,
      })
    },
    storeMixinClearStorePriceDetails() {
      store.commit("setPriceDetails", {
        subtotal: 0,
        gst: 0,
        total: 0,
        discount: 0,
      });
    },
    storeMixinSetStoreSelectedItems(selectedItems) {
      store.commit("setSelectedItems", {});
      store.commit("setSelectedItems", selectedItems);
    },
    storeMixinUpdateStorePriceDetails() {
      const selectedItems = this.$store.state.selectedItems;
      let itemPriceSum = 0
      let itemPriceSumExcludingSpecials = 0

      Object.keys(selectedItems).forEach((key) => {
        const itemQuantity = selectedItems[key].quantity;
        const itemPrice = (selectedItems[key].node.custom_price !== undefined ? selectedItems[key].node.custom_price : selectedItems[key].node.price) * itemQuantity;

        if (selectedItems[key].node.special !== true) {
          itemPriceSum += itemPrice
          itemPriceSumExcludingSpecials += itemPrice
        } else {
          itemPriceSum += itemPrice
        }

      });
      store.commit("setPriceDetails", this.storeMixinCalculatePriceDetails(itemPriceSum, itemPriceSumExcludingSpecials));
    },
    storeMixinCalculatePriceDetails(itemPriceSum, itemPriceSumExcludingSpecials) {
      let discountAmount = 0
      if (itemPriceSumExcludingSpecials > 35 && this.$store.state.currentOrder.type === 1) {
        discountAmount = itemPriceSumExcludingSpecials * 0.10;
      }
      const gstAmount = parseFloat(((itemPriceSum - discountAmount) * 0.05).toFixed(2));
      let priceDetails = {
        subtotal: itemPriceSum + (this.$store.state.currentOrder.customizations_price ?? 0),
        discount: discountAmount,
        gst: gstAmount,
        total: (itemPriceSum - discountAmount) + gstAmount
      }
      return priceDetails
    },
    storeMixinClearOrderRelatedDetails() {
      this.storeMixinClearSelectedItems();
      this.storeMixinClearSelectedCustomer();
      this.storeMixinClearCurrentOrder()
      this.storeMixinClearStorePriceDetails();
    },

    storeMixinClearSelectedItems() {
      store.commit("setSelectedItems", {});
    },

    storeMixinClearSelectedCustomer() {
      store.commit("setSelectedCustomer", { phone: '' });
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
      store.commit("setOrderHistoryPriceTotal", Number(orderHistoryPriceTotal).toFixed(2));
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