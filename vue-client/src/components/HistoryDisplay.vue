<template>
  <v-container>
    <v-card outlined tile height="16vh">
      <HistorySelect />
    </v-card>
    <v-card
      outlined
      tile
      class="overflow-y-auto d-block"
      height="62.5vh"
      v-chat-scroll
    >
    <!-- TODO: Update the v-for to use store.state.selectedItemsOrderedByEntry -->
      <template>
        <v-card
          class="mx-auto pt-2"
          outlined
          v-for="item in $store.state.selectedItems"
          v-bind:key="item.id"
          width="100vw"
        >
          <v-list-item three-line>
            <v-list-item-content>
              <div class="history-display-item-text">
                {{ item.node.name_eng }}
              </div>
              <div class="history-display-item-text">
                {{ item.node.name_chn }}
              </div>
            </v-list-item-content>
            <v-list-item-content>
              <div class="history-display-item-text text-right">
                x {{ item.quantity }}
              </div>
              <div class="history-display-item-text text-right">
                {{ (item.node.price * item.quantity).toFixed(2) }}
              </div>
            </v-list-item-content>
          </v-list-item>
          <v-list-item-content
            v-for="customization in item.customizations"
            v-bind:key="customization.id"
          >
            <div class="menu-display-item-text pl-5">
              - {{ customization.name_eng }} / {{ customization.name_chn }}
            </div>
          </v-list-item-content>
        </v-card>
      </template>
    </v-card>
    <v-card v-on:click="openHistoryOptionsDialogue = true">
      <v-list-item three-line>
        <v-list-item-content>
          <div class="history-display-item-text">Subtotal:</div>
          <div class="history-display-item-text">GST:</div>
          <div class="history-display-item-text mt-5">Total:</div>
        </v-list-item-content>
        <v-list-item-content>
          <div class="menu-display-item-text text-right">
            {{ ($store.state.priceDetails.subtotal).toFixed(2) }}
          </div>
          <div class="menu-display-item-text text-right">
            {{ ($store.state.priceDetails.gst).toFixed(2) }}
          </div>
          <div class="menu-display-item-text text-right mt-5 mb-0">
            ${{ ($store.state.priceDetails.total).toFixed(2) }}
          </div>
        </v-list-item-content>
      </v-list-item>
    </v-card>
    <v-dialog v-model="openHistoryOptionsDialogue" width="900">
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
          <div
            v-for="value in $store.state.selectedItems"
            v-bind:key="value.id"
          >
            <v-row class="submitOrderDialogText mt-5 mb-5">
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
              Subtotal: {{ $store.state.priceDetails.subtotal }}
            </v-col>
            <v-col :cols="4" class="text-end">
              GST: {{ $store.state.priceDetails.gst }}
            </v-col>
            <v-col :cols="4" class="text-end">
              Total: ${{ $store.state.priceDetails.total }}
            </v-col>
          </v-row>
          <br />
        </div>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            x-large
            width="24.5%"
            v-on:click="
              openHistoryOptionsDialogue = false;
              confirmingAction = 'REORDER';
              openHistoryOptionsConfirmationDialogue = true;
            "
          >
            <div>REORDER<br /></div>
          </v-btn>
          <v-btn
            x-large
            width="24.5%"
            v-on:click="
              openHistoryOptionsDialogue = false;
              confirmingAction = 'CLEAR';
              openHistoryOptionsConfirmationDialogue = true;
            "
          >
            <div>CLEAR<br /></div>
          </v-btn>
          <v-btn
            x-large
            width="24.5%"
            v-on:click="
              openHistoryOptionsDialogue = false;
              confirmingAction = 'VOID';
              openHistoryOptionsConfirmationDialogue = true;
            "
          >
            <div>VOID<br /></div>
          </v-btn>
          <v-btn
            x-large
            width="24.5%"
            v-on:click="
              openHistoryOptionsDialogue = false;
              confirmingAction = 'PAID';
              openHistoryOptionsConfirmationDialogue = true;
            "
          >
            <div>PAID<br /></div>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="openHistoryOptionsConfirmationDialogue" width="900">
      <v-card>
        <h2 class="text-center pt-16 pb-12">
          {{ confirmingAction }} ORDER #{{ $store.state.currentOrder.id }}
        </h2>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            x-large
            width="50%"
            v-on:click="
              openHistoryOptionsDialogue = false;
              openHistoryOptionsConfirmationDialogue = false;
            "
          >
            <div>NO<br /></div>
          </v-btn>
          <v-btn
            x-large
            width="50%"
            v-on:click="
              performHistoryOption(confirmingAction);
              openHistoryOptionsDialogue = false;
              openHistoryOptionsConfirmationDialogue = false;
            "
          >
            <div>YES<br /></div>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style>
.history-display-item-text {
  font-size: 1.2em;
}
</style>

<script>
import { store } from "../store/store";

import axios from "axios";
import HistorySelect from "./HistorySelect";
export default {
  data() {
    return {
      confirmingAction: "",
      openHistoryOptionsConfirmationDialogue: false,
      openHistoryOptionsDialogue: false,
    };
  },

  methods: {
    performHistoryOption: function (actionStr) {
      const orderHistory = this.$store.state.orderHistory;
      if (actionStr === "VOID") {
        this.voidOrder();
        orderHistory[this.$store.state.currentOrder.id.toString()][
          `order_${actionStr.toLowerCase()}`
        ] = true;
      }
      if (actionStr === "PAID") {
        this.paidOrder();
        orderHistory[this.$store.state.currentOrder.id.toString()][
          `order_${actionStr.toLowerCase()}`
        ] = true;
      }
      // Maybe give this a better name than clear?
      if (actionStr === "CLEAR") {
        this.clearOrderStatus();
        orderHistory[this.$store.state.currentOrder.id.toString()][
          `order_paid`
        ] = false;
        orderHistory[this.$store.state.currentOrder.id.toString()][
          `order_void`
        ] = false;
      }
      if (actionStr === "REORDER") {
        store.commit("setComponent", "ORDER");
      }
      this.confirmingAction = "";
      store.commit("setOrderHistory", orderHistory);
    },
    async reorder() {
      const res = await axios.put(
        `http://localhost:3000/put/orders/update/id/${this.$store.state.currentOrder.id}`,
        { ...this.$store.state.currentOrder, paid: false, void: false }
      );
      if (!res) {
        console.log("");
      }
    },
    async clearOrderStatus() {
      const res = await axios.put(
        `http://localhost:3000/put/orders/update/id/${this.$store.state.currentOrder.id}`,
        { ...this.$store.state.currentOrder, paid: false, void: false }
      );
      if (!res) {
        console.log("");
      }
    },
    async paidOrder() {
      const res = await axios.put(
        `http://localhost:3000/put/orders/update/id/${this.$store.state.currentOrder.id}`,
        { ...this.$store.state.currentOrder, paid: true }
      );
      if (!res) {
        console.log("");
      }
    },
    async voidOrder() {
      const res = await axios.put(
        `http://localhost:3000/put/orders/update/id/${this.$store.state.currentOrder.id}`,
        { ...this.$store.state.currentOrder, void: true }
      );
      if (!res) {
        console.log("");
      }
    },
  },
  components: {
    HistorySelect,
  },
};
</script> 