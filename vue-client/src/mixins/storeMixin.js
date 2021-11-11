import { store } from "../store/store";
export default {
  methods: {
    storeMixinClearStorePriceDetails() {
      store.commit("setPriceDetails", {
        subtotal: 0,
        gst: 0,
        total: 0,
      });
    },
    storeMixinCalculatePriceDetails(priceDetails, itemPrice, itemQuantity){
      let priceDetailsReturn = Object.assign({}, priceDetails);
      priceDetailsReturn.subtotal = this.storeMixinCalculatePriceDetailsSubtotal(priceDetailsReturn.subtotal, itemPrice, itemQuantity)
      priceDetailsReturn.gst = this.storeMixinCalculatePriceDetailsGst(priceDetailsReturn.subtotal);
      priceDetailsReturn.total = priceDetailsReturn.subtotal + priceDetailsReturn.gst;
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
      this.storeMixinClearStorePriceDetails();
      let priceDetails = Object.assign({}, this.$store.state.priceDetails);
      const selectedItems = Object.assign({}, this.$store.state.selectedItems);
      Object.keys(selectedItems).forEach((key) => {
        const itemPrice = parseFloat(selectedItems[key].node.price);
        const itemQuantity = selectedItems[key].quantity;
        priceDetails = this.storeMixinCalculatePriceDetails(priceDetails, itemPrice, itemQuantity);
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
      });
      this.storeMixinClearStorePriceDetails();
    },
  }
};