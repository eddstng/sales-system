<template>
  <v-dialog
    v-model="menuComponentDetails.dialogToggles.modifyOrderDialog"
    width="900"
  >
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
              {{ $store.state.currentOrder.itemQuantity }}</v-col
            >
            <v-col v-if="$store.state.currentOrder.internal === true">
              Internal Order: TRUE</v-col
            >
            <br />
          </div>
        </v-row>
        <div
          v-for="value in $store.state.selectedItemsOrderedByEntry"
          v-bind:key="value.id"
        >
          <v-row
            v-if="value.node !== undefined"
            class="submitOrderDialogText mt-5 mb-5"
          >
            <v-col> x{{ value.quantity }} </v-col>
            <v-col :cols="5">
              {{ value.node.name_eng }}
            </v-col>
            <v-col :cols="3">
              {{ value.node.name_chn }}
            </v-col>
            <v-col :cols="2" class="text-center">
              ${{
                Number(
                  value.node.custom_price
                    ? value.node.custom_price
                    : value.node.price
                ).toFixed(2)
              }}
            </v-col>
          </v-row>
          <v-list-item-content
            v-for="customization in value.customizations"
            v-bind:key="customization.id"
          >
            <div class="submitOrderDialogText pl-25 mb-5">
              ➡ {{ customization.name_eng }}
              {{
                customization.name_chn === ""
                  ? ""
                  : "/" + customization.name_chn
              }}
              {{ customization.price !== 0 ? `- $${customization.price}` : "" }}
            </div>
          </v-list-item-content>
        </div>
        <br />
        <v-row class="submitOrderDialogText mb-5">
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
        <v-btn x-large width="50%" v-on:click="onClickCancel()">
          <div>CANCEL<br /></div>
        </v-btn>
        <v-btn x-large width="50%" v-on:click="onClickCancel(), modifyOrder()">
          <div>MODIFY<br /></div>
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
  props: ["menuComponentDetails"],
  methods: {
    onClickCancel() {
      let updatedMenuComponentDetails = { ...this.menuComponentDetails };
      updatedMenuComponentDetails.dialogToggles.modifyOrderDialog = false;
      this.$emit("updateMenuComponentDetails", updatedMenuComponentDetails);
    },
    togglePrintModifiedOrderDialog() {
      let updatedMenuComponentDetails = { ...this.menuComponentDetails };
      updatedMenuComponentDetails.dialogToggles.printModifiedOrderDialog = true;
      this.$emit("updateMenuComponentDetails", updatedMenuComponentDetails);
    },
    modifyOrder: async function () {
      try {
        store.commit("setNotification", 4);
        await this.modifyOrdersFunction({
          orderDetails: this.$store.state.currentOrder,
          items: this.$store.state.selectedItems,
          priceDetails: this.$store.state.priceDetails,
          customer_id: this.$store.state.selectedCustomer.id,
          type: this.$store.state.currentOrder.type,
        });
        this.togglePrintModifiedOrderDialog();
        store.commit("setMenuDisplayType", "ORDER");
        store.commit("setNotification", 1);
      } catch (err) {
        store.commit("setMenuDisplayType", "ORDER");
        store.commit("setErrorToDisplay", err.response.data);
        store.commit("setNotification", 5);
      }
    },
    modifyOrdersFunction: async function ({
      orderDetails,
      customer_id,
      type,
      items,
      priceDetails,
    }) {
      await axios.post("http://localhost:3000/post/modifyorder", {
        orderDetails: orderDetails,
        customer_id: customer_id,
        type: type,
        items: items,
        priceDetails: priceDetails,
      });
    },
  },
};
</script>
