<template>
  <div>
    <v-dialog
      v-model="historyOptionsDetails.openHistoryOptionsReprintDialog"
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
            width="24%"
            v-on:click="
              historyOptionsDetailsUpdate = historyOptionsDetails;
              historyOptionsDetailsUpdate.confirmingAction = 'REPRINT KITCHEN';
              historyOptionsDetailsUpdate.openHistoryOptionsConfirmationDialog = true;
              updateHistoryOptionsDetails(historyOptionsDetails);
            "
          >
            <div>KITCHEN<br /></div>
          </v-btn>
          <v-btn
            x-large
            width="24%"
            v-on:click="
              historyOptionsDetailsUpdate = historyOptionsDetails;
              historyOptionsDetailsUpdate.confirmingAction = 'REPRINT CLIENT';
              historyOptionsDetailsUpdate.openHistoryOptionsConfirmationDialog = true;
              updateHistoryOptionsDetails(historyOptionsDetails);
            "
          >
            <div>CLIENT<br /></div>
          </v-btn>
          <v-btn
            x-large
            width="24%"
            v-on:click="
              historyOptionsDetailsUpdate = historyOptionsDetails;
              historyOptionsDetailsUpdate.confirmingAction = 'REPRINT BOTH';
              historyOptionsDetailsUpdate.openHistoryOptionsConfirmationDialog = true;
              updateHistoryOptionsDetails(historyOptionsDetails);
            "
          >
            <div>BOTH<br /></div>
          </v-btn>
          <v-btn
            x-large
            width="24%"
            v-on:click="
              historyOptionsDetailsUpdate = historyOptionsDetails;
              historyOptionsDetailsUpdate.openHistoryOptionsReprintDialog = false;
              historyOptionsDetailsUpdate.openHistoryOptionsConfirmationDialog = false;
              updateHistoryOptionsDetails(historyOptionsDetails);
            "
          >
            <div>CANCEL<br /></div>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
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
      this.historyOptionsDetailsUpdate.openHistoryOptionsReprintDialog = false;
      this.$emit("setHistoryOptionsDetails", this.historyOptionsDetailsUpdate);
    },
  },
};
</script>
