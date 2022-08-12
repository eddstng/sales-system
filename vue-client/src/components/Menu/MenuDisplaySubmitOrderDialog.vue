<template>
  <v-dialog v-model="submitOrderDialog" width="900">
    <v-card>
      <div>
        <br />
        <v-row class="submitOrderDialogText mt-10">
          <div>
            <v-col :cols="15">
              {{
                  $store.state.selectedCustomer.phone.replace(
                    /(\d{3})(\d{3})(\d{3})/,
                    "$1-$2-$3"
                  )
              }}
              <br />
              {{ $store.state.selectedCustomer.address }} <br />
              {{ $store.state.selectedCustomer.name }}
            </v-col>
            <v-col v-if="$store.state.selectedCustomer.note">
              * {{ $store.state.selectedCustomer.note }} <br />
            </v-col>
            <v-col>
              Number of Items:
              {{ $store.state.currentOrder.itemQuantity }}
            </v-col>
            <br />
          </div>
        </v-row>
        <div v-for="value in $store.state.selectedItemsOrderedByEntry" v-bind:key="value.id">
          <v-row v-if="value.node !== undefined" class="submitOrderDialogText mt-5 mb-5">
            <v-col> x{{ value.quantity }} </v-col>
            <v-col :cols="5">
              {{ value.node.name_eng }}
            </v-col>
            <v-col :cols="3">
              {{ value.node.name_chn }}
            </v-col>
            <v-col :cols="2" class="text-center">
              ${{ value.node.price.toFixed(2) }}
            </v-col>
          </v-row>
          <v-list-item-content v-for="customization in value.customizations" v-bind:key="customization.id">
            <div class="submitOrderDialogText pl-25 mb-5">
              ➡ {{ customization.name_eng }}
              {{
                  customization.name_chn === ""
                    ? ""
                    : "/" + customization.name_chn
              }}
            </div>
          </v-list-item-content>
        </div>
        <br />
        <v-row class="submitOrderDialogText mt-5 mb-5">
          <v-col :cols="3">
            Subtotal: {{ $store.state.priceDetails.subtotal.toFixed(2) }}
          </v-col>
          <v-col :cols="3" class="text-end">
            Discount: -{{ $store.state.priceDetails.discount.toFixed(2) }}
          </v-col>
          <v-col :cols="3" class="text-end">
            GST: {{ $store.state.priceDetails.gst.toFixed(2) }}
          </v-col>
          <v-col :cols="3" class="text-end">
            Total: ${{ $store.state.priceDetails.total.toFixed(2) }}
          </v-col>
        </v-row>
        <br />
      </div>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn x-large width="50%" v-on:click="closeSubmitOrderDialog()">
          <div>CANCEL<br /></div>
        </v-btn>
        <v-btn x-large width="50%" v-on:click="closeSubmitOrderDialog(), submitOrder()">
          <div>SUBMIT<br /></div>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style>
.pl-25 {
  padding-left: 8em;
}
</style>

<script>
import storeMixin from "../../mixins/storeMixin";
import { store } from "../../store/store";
import axios from "axios";

export default {
  mixins: [storeMixin],
  props: ["submitOrderDialog"],
  methods: {
    closeSubmitOrderDialog() {
      this.$emit("closeSubmitOrderDialog");
    },
    submitOrder: async function () {
      try {
        const newOrder = await this.createOrder();
        this.insertSelectedItemsIntoOrdersAndOrdersItems(newOrder.data.id);
        this.updateOrderWithPriceDetails(newOrder);
        this.storeMixinClearOrderRelatedDetails();
        this.printOrder(newOrder.data.id);
        this.closeSubmitOrderDialog();
        store.commit("setNotification", 1);
      } catch (err) {
        this.closeSubmitOrderDialog();
        store.commit("setNotification", 2);
        console.log(err);
      }
    },
    createOrder: async function () {
      const res = await axios.post("http://localhost:3000/post/orders/create", {
        total: 0,
        customer_id: this.$store.state.selectedCustomer.id,
        type: this.$store.state.currentOrder.type,
      });
      if (isNaN(res.data.id)) {
        throw new Error("Failed to submit order. No order id retrieved.");
      }
      return res;
    },
    insertSelectedItemsIntoOrdersAndOrdersItems: async function (orderIdNum) {
      const ordersItemsCreateManyInputData = [];
      const arrayOfSubmitOrderItems = []; // this is just for temp console log
      for (const value of Object.entries(this.$store.state.selectedItems)) {
        const item = value[1];
        arrayOfSubmitOrderItems.push({
          menu_id: item.node.menu_id,
          item_name: item.node.name_eng,
        });
        ordersItemsCreateManyInputData.push({
          // custom_id: item.node.custom_id,
          order_id: orderIdNum,
          item_id: item.node.id,
          quantity: item.quantity,
          customizations: item.customizations ? item.customizations : undefined,
          timestamp: new Date(item.timestamp).toISOString(),
          custom_price: item.node.price,
          custom_name: item.node.custom_name,
        });
      }
      // here we are logging the orders incase there are failures which make us lose our orders. Need a better way to handle this later.
      const res = await axios.post(
        "http://localhost:3000/post/ordersitems/create/bulk",
        ordersItemsCreateManyInputData
      );
      if (res.status !== 200) {
        throw new Error(
          `Failed to submit order during insertSelectedItemsIntoOrdersAndOrdersItems. ${res}`
        );
      }
    },
    printOrder: async function (order_id) {
      const res = await axios.post("http://localhost:3000/post/print", {
        order_id,
        printKitchen: true,
        printClient: true,
      });
      if (isNaN(res.status !== 200)) {
        throw new Error(
          `Failed to submit order. Received status code of ${res.status}.`
        );
      }
      return res;
    },
    recalculatePriceDetailsAndReturnIt() {
      this.storeMixinUpdateStorePriceDetails();
      return this.$store.state.priceDetails
    },
    ensurePriceDetailsAreCorrect: function (priceDetails) {
      for (const value of Object.entries(priceDetails)) {
        if (value == null || isNaN(value)) {
          console.log('======================================');
          console.log('ALERT: AN INVALID VALUE HAS BEEN DETECTED IN PRICE DETAILS.');
          console.log(priceDetails);
          console.log('======================================');
          return this.recalculatePriceDetailsAndReturnIt()
        }
        return priceDetails;
      }
    },
    updateOrderWithPriceDetails: async function (orderDetails) {
      const priceDetails = this.ensurePriceDetailsAreCorrect(this.$store.state.priceDetails);
      const res = await axios.put(
        `http://localhost:3000/put/orders/update/id/${orderDetails.data.id}`,
        {
          ...this.orderDetails,
          ...priceDetails,
        }
      );
      if (isNaN(res.status !== 200)) {
        throw new Error(
          `Failed to submit order. Received status code of ${res.status}.`
        );
      }
      return res;
    },
  },
};
</script>
