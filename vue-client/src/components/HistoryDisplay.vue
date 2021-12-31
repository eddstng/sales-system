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
      <!-- BUG: For some reason, even though selectedItemsOrderedByEntry is sorted by keys (timestamp), the display order is not the same. Why?--> 
      <template>
        <v-card
          class="mx-auto pt-2"
          outlined
          v-for="item in $store.state.selectedItemsOrderedByEntry"
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
              ➡ {{ customization.name_eng }} {{ customization.name_chn === "" ? "" : "/" + customization.name_chn }}
            </div>
          </v-list-item-content>
        </v-card>
      </template>
    </v-card>
    <v-card
      v-on:click="historyOptionsDetails.openHistoryOptionsDialogue = true"
    >
      <v-list-item three-line>
        <v-list-item-content>
          <div class="menu-display-item-text">Subtotal:</div>
          <div class="menu-display-item-text">Discount:</div>
          <div class="menu-display-item-text">GST:</div>
          <div class="menu-display-item-text mt-5">Total:</div>
        </v-list-item-content>
        <v-list-item-content>
          <div class="menu-display-item-text text-right">
            {{ $store.state.priceDetails.subtotal.toFixed(2) }}
          </div>
          <div class="menu-display-item-text text-right">
            {{ $store.state.priceDetails.discount.toFixed(2) }}
          </div>
          <div class="menu-display-item-text text-right">
            {{ $store.state.priceDetails.gst.toFixed(2) }}
          </div>
          <div class="menu-display-item-text text-right mt-5 mb-0">
            ${{ $store.state.priceDetails.total.toFixed(2) }}
          </div>
        </v-list-item-content>
      </v-list-item>
    </v-card>
    <HistoryDisplayHistoryOptionsDialog
      v-bind:historyOptionsDetails="historyOptionsDetails"
      @setHistoryOptionsDetails="setHistoryOptionsDetails"
    />
    <HistoryDisplayHistoryOptionsConfirmationDialog
      v-bind:historyOptionsDetails="historyOptionsDetails"
      @setHistoryOptionsDetails="setHistoryOptionsDetails"
    />
  </v-container>
</template>

<style>
.history-display-item-text {
  font-size: 1.2em;
}
</style>

<script>
import HistoryDisplayHistoryOptionsDialog from "./HistoryDisplayHistoryOptionsDialog";
import HistoryDisplayHistoryOptionsConfirmationDialog from "./HistoryDisplayHistoryOptionsConfirmationDialog";

import HistorySelect from "./HistorySelect";
export default {
  data() {
    return {
      historyOptionsDetails: {
        confirmingAction: "",
        openHistoryOptionsConfirmationDialogue: false,
        openHistoryOptionsDialogue: false,
      },
    };
  },

  methods: {
    setHistoryOptionsDetails: function (historyOptionsDetails) {
      this.historyOptionsDetails.confirmingAction = historyOptionsDetails.confirmingAction;
      this.historyOptionsDetails.openHistoryOptionsConfirmationDialogue = historyOptionsDetails.confirmingAction;
      this.historyOptionsDetails.openHistoryOptionsDialogue = historyOptionsDetails.confirmingAction;
    },
  },
  components: {
    HistorySelect,
    HistoryDisplayHistoryOptionsDialog,
    HistoryDisplayHistoryOptionsConfirmationDialog,
  },
};
</script> 