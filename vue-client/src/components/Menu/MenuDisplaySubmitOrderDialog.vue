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
            <v-col v-if="$store.state.currentOrder.internal === true">
              Internal Order:
              TRUE</v-col
            >
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
        store.commit("setNotification", 4);
        await this.submitOrderFunction({
          customer_id: this.$store.state.selectedCustomer.id,
          orderDetails: this.$store.state.currentOrder,
          items: this.$store.state.selectedItems,
          priceDetails: this.$store.state.priceDetails
        })
        this.storeMixinClearOrderRelatedDetails();
        this.closeSubmitOrderDialog();
        store.commit("setNotification", 1);
      } catch (err) {
        this.closeSubmitOrderDialog();
        store.commit('setErrorToDisplay', err.response.data)
        store.commit("setNotification", 5);
      }
    },

    submitOrderFunction: async function ({ customer_id, orderDetails, items, priceDetails }) {
      await axios.post("http://localhost:3000/post/submitorder", {
        customer_id: customer_id,
        orderDetails: orderDetails,
        items: items,
        priceDetails: priceDetails,
      });
    },
  },
};
</script>
