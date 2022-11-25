<template>
  <div>
    <HistoryDisplayHistoryOptionsDialog
      v-bind:historyOptionsDetails="historyOptionsDetails"
      @setHistoryOptionsDetails="setHistoryOptionsDetails"
    />
    <HistoryDisplayHistoryOptionsConfirmationDialog
      v-bind:historyOptionsDetails="historyOptionsDetails"
      @setHistoryOptionsDetails="setHistoryOptionsDetails"
    />
    <HistoryDisplayHistoryOptionsReprintDialog
      v-bind:historyOptionsDetails="historyOptionsDetails"
      @setHistoryOptionsDetails="setHistoryOptionsDetails"
    />
    <v-row no-gutters>
      <v-col lg="1">
        <Sidebar />
      </v-col>
      <v-col lg="4">
        <v-card outlined tile>
          <v-container class="grey lighten-5">
            <HistoryDisplay
              v-bind:historyOptionsDetails="historyOptionsDetails"
            />
          </v-container>
        </v-card>
      </v-col>
      <v-col lg="7" height="100vh">
        <v-card class="fill-height" tile>
          <v-container class="grey lighten-5">
            <HistoryButtonsHeader />
            <HistoryButtons class="mt-1" />
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import storeMixin from "../../mixins/storeMixin";
import Sidebar from "../Sidebar";
import HistoryButtons from "../History/HistoryButtons";
import HistoryDisplay from "../History/HistoryDisplay";
import HistoryButtonsHeader from "../History/HistoryButtonsHeader";

import HistoryDisplayHistoryOptionsDialog from "./HistoryDisplayHistoryOptionsDialog";
import HistoryDisplayHistoryOptionsConfirmationDialog from "./HistoryDisplayHistoryOptionsConfirmationDialog";
import HistoryDisplayHistoryOptionsReprintDialog from "./HistoryDisplayHistoryOptionsReprintDialog";
export default {
  mixins: [storeMixin],
  components: {
    Sidebar,
    HistoryButtons,
    HistoryDisplay,
    HistoryDisplayHistoryOptionsDialog,
    HistoryDisplayHistoryOptionsConfirmationDialog,
    HistoryDisplayHistoryOptionsReprintDialog,
    HistoryButtonsHeader,
  },
  data() {
    return {
      historyOptionsDetails: {
        confirmingAction: "",
        openHistoryOptionsConfirmationDialog: false,
        openHistoryOptionsReprintDialog: false,
        openHistoryOptionsDialog: false,
      },
    };
  },
  methods: {
    setHistoryOptionsDetails: function (historyOptionsDetails) {
      this.historyOptionsDetails = historyOptionsDetails;
    },
  },
};
</script>

<style>
.menu-notification {
  position: relative;
  margin-bottom: 0;
}
.sidebar-buttons {
  height: 100px;
}
</style>
