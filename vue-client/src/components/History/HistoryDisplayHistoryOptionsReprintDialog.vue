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
            width="33%"
            v-on:click="
              historyOptionsDetailsUpdate = historyOptionsDetails;
              historyOptionsDetailsUpdate.confirmingAction = 'REPRINT KITCHEN';
              historyOptionsDetailsUpdate.openHistoryOptionsConfirmationDialogue = true;
              historyOptionsDetailsUpdate.openHistoryOptionsDialogue = false;
              historyOptionsDetailsUpdate.openHistoryOptionsReprintDialogue = false;
              updateHistoryOptionsDetails(historyOptionsDetails);
            "
          >
            <div>KITCHEN<br /></div>
          </v-btn>
          <v-btn
            x-large
            width="33%"
            v-on:click="
              historyOptionsDetailsUpdate = historyOptionsDetails;
              historyOptionsDetailsUpdate.confirmingAction = 'REPRINT CLIENT';
              historyOptionsDetailsUpdate.openHistoryOptionsConfirmationDialogue = true;
              historyOptionsDetailsUpdate.openHistoryOptionsDialogue = false;
              historyOptionsDetailsUpdate.openHistoryOptionsReprintDialogue = false;
              updateHistoryOptionsDetails(historyOptionsDetails);
            "
          >
            <div>CLIENT<br /></div>
          </v-btn>
          <v-btn
            x-large
            width="33%"
            v-on:click="
              historyOptionsDetailsUpdate = historyOptionsDetails;
              historyOptionsDetailsUpdate.confirmingAction = 'REPRINT BOTH';
              historyOptionsDetailsUpdate.openHistoryOptionsConfirmationDialogue = true;
              historyOptionsDetailsUpdate.openHistoryOptionsDialogue = false;
              historyOptionsDetailsUpdate.openHistoryOptionsReprintDialogue = false;
              updateHistoryOptionsDetails(historyOptionsDetails);
            "
          >
            <div>BOTH<br /></div>
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
      historyOptionsDetailsUpdate: {
        openHistoryOptionsReprintDialogue: false,
      },
    };
  },
  methods: {
    updateHistoryOptionsDetails() {
      this.$emit('setHistoryOptionsDetails', this.historyOptionsDetailsUpdate);
    },
  },
};
</script>
