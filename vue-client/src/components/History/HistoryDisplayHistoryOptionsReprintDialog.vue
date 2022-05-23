<template>
  <div>
    <v-dialog
      v-model="historyOptionsDetails.openHistoryOptionsReprintDialogue"
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
              historyOptionsDetailsUpdate.openHistoryOptionsConfirmationDialogue = true;
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
              historyOptionsDetailsUpdate.openHistoryOptionsConfirmationDialogue = true;
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
              historyOptionsDetailsUpdate.openHistoryOptionsConfirmationDialogue = true;
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
              historyOptionsDetailsUpdate.openHistoryOptionsReprintDialogue = false;
              historyOptionsDetailsUpdate.openHistoryOptionsConfirmationDialogue = false;
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
  props: ['historyOptionsDetails'],
  data() {
    return {
      historyOptionsDetailsUpdate: {},
    };
  },
  methods: {
    updateHistoryOptionsDetails() {
      // REMOVE THE PREVIOUS COMMIT LOG AND THEN INVESTIGATE WHY THIS MESSES UP THE STATUS CHANGE AFTER REPRINT
      // ALSO WHAT IS 'Will-change memory consumption is too high. Budget limit is the document surface area multiplied by 3 (1477216 px). Occurrences of will-change over the budget will be ignored.'
      this.historyOptionsDetailsUpdate.openHistoryOptionsDialogue = false;
      this.historyOptionsDetailsUpdate.openHistoryOptionsReprintDialogue = false;
      this.$emit('setHistoryOptionsDetails', this.historyOptionsDetailsUpdate);
    },
  },
};
</script>
