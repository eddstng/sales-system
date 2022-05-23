<template>
    <v-dialog
      v-model="historyOptionsDetails.openHistoryOptionsConfirmationDialogue"
      width="900"
    >
      <v-card>
        <h2 class="text-center pt-16 pb-12">
          {{ historyOptionsDetails.confirmingAction }} ORDER #{{
            $store.state.currentOrder.id
          }}
        </h2>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            x-large
            width="50%"
            v-on:click="
              historyOptionsDetailsUpdate = historyOptionsDetails;
              historyOptionsDetailsUpdate.openHistoryOptionsConfirmationDialogue = false;
              historyOptionsDetailsUpdate.openHistoryOptionsDialogue = false;
              updateHistoryOptionsDetails(historyOptionsDetailsUpdate);
            "
          >
            <div>NO<br /></div>
          </v-btn>
          <v-btn
            x-large
            width="50%"
            v-on:click="
              historyOptionsDetailsUpdate = historyOptionsDetails;
              historyOptionsDetailsUpdate.openHistoryOptionsConfirmationDialogue = false;
              historyOptionsDetailsUpdate.openHistoryOptionsDialogue = false;
              performHistoryOption(historyOptionsDetails.confirmingAction);
              updateHistoryOptionsDetails(historyOptionsDetails);
            "
          >
            <div>YES<br /></div>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import axios from 'axios';
import { store } from '../../store/store';
export default {
  props: ['historyOptionsDetails'],
  data() {
    return {
      historyOptionsDetailsUpdate: {
        openHistoryOptionsReprintDialogue: false,
      },
    };
  },
  methods: {
    updateHistoryOptionsDetails() {
      this.$emit('setHistoryOptionsDetails', this.historyOptionsDetailsUpdate);
    },
    async clearOrderStatus() {
      const res = await axios.put(
        `http://localhost:3000/put/orders/update/id/${this.$store.state.currentOrder.id}`,
        { ...this.$store.state.currentOrder, paid: false, void: false }
      );
      if (!res) {
        console.log('');
      }
    },
    async paidOrder() {
      const res = await axios.put(
        `http://localhost:3000/put/orders/update/id/${this.$store.state.currentOrder.id}`,
        { ...this.$store.state.currentOrder, paid: true }
      );
      if (!res) {
        console.log('');
      }
    },
    async voidOrder() {
      const res = await axios.put(
        `http://localhost:3000/put/orders/update/id/${this.$store.state.currentOrder.id}`,
        { ...this.$store.state.currentOrder, void: true }
      );
      if (!res) {
        console.log('');
      }
    },
    // The following function is repeated. TO DO: Find a place to store this function to export.
    printOrder: async function(order_id, printKitchen, printClient) {
      const res = await axios.post('http://localhost:3000/post/print', {
        order_id,
        printKitchen,
        printClient,
      });
      if (isNaN(res.status !== 200)) {
        throw new Error(
          `Failed to submit order. Received status code of ${res.status}.`
        );
      }
      return res;
    },
        dosomething: async function() {
          this.historyOptionsDetails.openHistoryOptionsReprintDialogue = false
     console.log('do something')
    },
    performHistoryOption: function(actionStr) {
      const orderHistory = this.$store.state.orderHistory;
      if (actionStr === 'VOID') {
        this.voidOrder();
        orderHistory[this.$store.state.currentOrder.id.toString()][
          `order_${actionStr.toLowerCase()}`
        ] = true;
      }
      if (actionStr === 'PAID') {
        this.paidOrder();
        orderHistory[this.$store.state.currentOrder.id.toString()][
          `order_${actionStr.toLowerCase()}`
        ] = true;
      }
      // Maybe give this a better name than clear?
      if (actionStr === 'CLEAR') {
        this.clearOrderStatus();
        orderHistory[this.$store.state.currentOrder.id.toString()][
          `order_paid`
        ] = false;
        orderHistory[this.$store.state.currentOrder.id.toString()][
          `order_void`
        ] = false;
      }
      if (actionStr === 'REORDER') {
        store.commit('setComponent', 'ORDER');
      }
      if (actionStr === 'REPRINT KITCHEN') {
        this.printOrder(this.$store.state.currentOrder.id, true, false);
      }
      if (actionStr === 'REPRINT CLIENT') {
        this.printOrder(this.$store.state.currentOrder.id, false, true);
      }
      if (actionStr === 'REPRINT BOTH') {
        this.printOrder(this.$store.state.currentOrder.id, true, true);
      }
      this.historyOptionsDetails.confirmingAction = '';
    },
  },
};
</script>
