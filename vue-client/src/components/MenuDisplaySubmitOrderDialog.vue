<template>
  <v-dialog v-model="submitOrderDialog" width="900">
    <v-card>
      <div>
        <br />
        <v-row class="submitOrderDialogText mt-10">
          <div>
            <v-col :cols="15">
              {{ $store.state.selectedCustomer.phone }} <br />
              {{ $store.state.selectedCustomer.address }} <br />
              {{ $store.state.selectedCustomer.name }}
            </v-col>
            <v-col v-if="$store.state.selectedCustomer.note">
              * {{ $store.state.selectedCustomer.note }} <br />
            </v-col>
          </div>
        </v-row>
        <div v-for="value in $store.state.selectedItems" v-bind:key="value.id">
          <v-row
            v-if="value.node !== undefined"
            class="submitOrderDialogText mt-5 mb-5"
          >
            <v-col :cols="5">
              {{ value.node.name_eng }}
            </v-col>
            <v-col :cols="3">
              {{ value.node.name_chn }}
            </v-col>
            <v-col :cols="2" class="text-center">
              {{ value.node.price }}
            </v-col>
            <v-col class="text-end"> x{{ value.quantity }} </v-col>
          </v-row>
        </div>

        <v-row class="submitOrderDialogText mt-5 mb-5">
          <v-col :cols="4">
            Subtotal: {{ $store.state.priceDetails.subtotal.toFixed(2) }}
          </v-col>
          <v-col :cols="4" class="text-end">
            GST: {{ $store.state.priceDetails.gst.toFixed(2) }}
          </v-col>
          <v-col :cols="4" class="text-end">
            Total: ${{ $store.state.priceDetails.total.toFixed(2) }}
          </v-col>
        </v-row>

        <br />
      </div>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn x-large width="50%" v-on:click="toggleSubmitOrderDialogOff()">
          <div>CANCEL<br /></div>
        </v-btn>
        <v-btn
          x-large
          width="50%"
          submitOrderDialog="submitOrderDialog"
          v-on:click="toggleSubmitOrderDialogOff(), submitOrder()"
        >
          <div>SUBMIT<br /></div>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import storeMixin from "../mixins/storeMixin";
import { store } from "../store/store";
import axios from "axios";
export default {
  mixins: [storeMixin],
  props: ["submitOrderDialog"],
  methods: {
    toggleSubmitOrderDialogOff() {
      this.$emit("setSubmitOrderDialogToBool", false);
    },
    submitOrder: async function () {
      try {
        const newOrder = await this.createOrder();
        this.insertSelectedItemsIntoOrdersAndOrdersItems(newOrder.data.id);
        this.updateOrderWithTotalPrice(newOrder);
        this.storeMixinClearOrderRelatedDetails();
        this.toggleSubmitOrderDialogOff();
        store.commit("setNotification", 1);
      } catch (err) {
        this.toggleSubmitOrderDialogOff();
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
      for (const [key, value] of Object.entries(
        this.$store.state.selectedItems
      )) {
        ordersItemsCreateManyInputData.push({
          order_id: orderIdNum,
          item_id: parseInt(key),
          quantity: value.quantity,
          customizations: value.customizations,
          //TODO: Make the 198 (custom item id) environmental variables.
          custom_price: key === "198" ? value.node.price : null,
          custom_name: key === "198" ? value.node.name_eng : null,
        });
      }
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
    updateOrderWithTotalPrice: async function (orderDetails) {
      const res = await axios.put(
        `http://localhost:3000/put/orders/update/id/${orderDetails.data.id}`,
        {
          ...this.orderDetails,
          total: this.$store.state.priceDetails.total,
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