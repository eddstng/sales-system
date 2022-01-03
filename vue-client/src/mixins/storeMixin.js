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
        priceDetailsReturn.discount = -Math.abs(tenPercentDiscount);
      } else {
        priceDetailsReturn.discount = 0;
      }
      const discountedSubtotal = priceDetailsReturn.subtotal + priceDetailsReturn.discount;
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
    storeMixinUpdateStorePriceDetails() {
      let specialItemNegatingDiscount = false;
      this.storeMixinClearStorePriceDetails();
      let priceDetails = Object.assign({}, this.$store.state.priceDetails);
      const selectedItems = Object.assign({}, this.$store.state.selectedItems);
      Object.keys(selectedItems).forEach((key) => {
        const itemPrice = parseFloat(selectedItems[key].node.price);
        const itemQuantity = selectedItems[key].quantity;
        if (selectedItems[key].node.name_eng.includes("Combo") || selectedItems[key].node.name_eng.includes("Dinner Special")) {
          specialItemNegatingDiscount = true;
        }
        priceDetails = this.storeMixinCalculatePriceDetails(priceDetails, itemPrice, itemQuantity, specialItemNegatingDiscount);
      });
      store.commit("setPriceDetails", priceDetails);
    },
    storeMixinClearOrderRelatedDetails() {
      store.commit("setSelectedItems", {});
      store.commit("setSelectedCustomer", {});
      store.commit("setCurrentOrder", {
        id: null,
        type: null,
        total: 0,
        customer_id: null,
        void: null,
        paid: null
      });
      this.storeMixinClearStorePriceDetails();
    },
    async storeMixinUpdateStoreCustomerArray() {
      console.log('here123')
      console.log((await axios.get("http://localhost:3000/get/customers/all")).data
      )
      console.log('here000')

      store.commit(
        "setCustomers",
        (await axios.get("http://localhost:3000/get/customers/all")).data
      );
      console.log(store.state.customers);
      const tables = [];
      store.state.customers.forEach(customer => {
        if (customer.name && customer.name.includes('Table #')) {
          tables.push(customer)
        }
      })
      store.commit("setTables", tables)
      return
    },
  }
};