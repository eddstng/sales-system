<template>
  <v-dialog
    v-model="historyOptionsDetails.openHistoryOptionsConfirmationDialog"
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
import axios from "axios";
import { store } from "../../store/store";
export default {
  props: ["historyOptionsDetails"],
  data() {
    return {
      historyOptionsDetailsUpdate: {},
    };
  },
  methods: {
    updateHistoryOptionsDetails() {
      this.historyOptionsDetailsUpdate.openHistoryOptionsDialog = false;
      this.historyOptionsDetailsUpdate.openHistoryOptionsConfirmationDialog = false;
      this.$emit("setHistoryOptionsDetails", this.historyOptionsDetailsUpdate);
    },
    async updateOrderStatus(currentOrderWithUpdatedStatus) {
      const res = await axios.put(
        `http://localhost:3000/put/orders/update/id/${this.$store.state.currentOrder.id}`,
        currentOrderWithUpdatedStatus
      );
      if (!res) {
        console.log("");
      }
    },
    performHistoryOption: function (actionStr) {
      const orderHistory = this.$store.state.orderHistory;
      if (actionStr === "VOID") {
        this.updateOrderStatus({
          ...this.$store.state.currentOrder,
          void: true,
        });
        orderHistory[this.$store.state.currentOrder.id.toString()][
          `order_${actionStr.toLowerCase()}`
        ] = true;
        // should update this to also render the void status on the customer buttons currently it does not change when you void it from that menu
      }
      if (actionStr === "PAID") {
        this.updateOrderStatus({
          ...this.$store.state.currentOrder,
          paid: true,
        });
        orderHistory[this.$store.state.currentOrder.id.toString()][
          `order_${actionStr.toLowerCase()}`
        ] = true;
      }
      // Maybe give this a better name than clear?
      if (actionStr === "CLEAR") {
        this.updateOrderStatus({
          ...this.$store.state.currentOrder,
          paid: false,
          void: false,
        });
        orderHistory[this.$store.state.currentOrder.id.toString()][
          `order_paid`
        ] = false;
        orderHistory[this.$store.state.currentOrder.id.toString()][
          `order_void`
        ] = false;
      }
      if (actionStr === "REORDER") {
        store.commit("setMenuDisplayType", "ORDER");
        store.commit("setComponent", "ORDER");
      }
      if (actionStr === "MODIFY") {
        store.commit("setMenuDisplayType", "MODIFY");
        store.commit("setComponent", "ORDER");
      }
      this.historyOptionsDetails.confirmingAction = "";
    },
  },
};
</script>
