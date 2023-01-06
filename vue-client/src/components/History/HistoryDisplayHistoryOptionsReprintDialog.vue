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
              reprintKitchen()
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
              reprintClient()
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
              reprintBoth()
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
import printMixin from "../../mixins/printMixin";

export default {
    mixins: [printMixin],

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
