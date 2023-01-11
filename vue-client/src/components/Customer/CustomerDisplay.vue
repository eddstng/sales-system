<template>
    <v-container>
        <CustomerDisplayCustomer />

    <MenuDisplayCustomerSelectCreateCustomerFormDialog
      v-bind:selectedCustomerDetails="selectedCustomerDetails"
    />
    <HistoryDisplayHistoryOptionsDialog
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
import CustomerDisplayCustomer from "../Customer/CustomerDisplayCustomer";
import HistoryDisplayHistoryOptionsDialog from "../History/HistoryDisplayHistoryOptionsDialog";
import MenuDisplayCustomerSelectCreateCustomerFormDialog from "../Menu/MenuDisplayCustomerSelectCreateCustomerFormDialog";
export default {
  components: {
    MenuDisplayCustomerSelectCreateCustomerFormDialog,
    CustomerDisplayCustomer,
    HistoryDisplayHistoryOptionsDialog,
  },
  computed: {
    currentOrderCustomizationPrice: function () {
      let totalCustomizationPrice = 0;
      this.$store.state.currentOrder.customizations.forEach((customization) => {
        totalCustomizationPrice += customization.price;
      });

      return parseFloat(totalCustomizationPrice).toFixed(2);
    },
  },
  data() {
    return {
      historyOptionsDetails: {
        confirmingAction: "",
        openHistoryOptionsConfirmationDialog: false,
        openHistoryOptionsReprintDialog: false,
        openHistoryOptionsDialog: false,
      },
      selectedCustomerDetails: {
        selectedCustomer: {
          phone: "",
          buzzer_number: "",
          unit_number: "",
          street_number: "",
          street_name: "",
          address: "",
          city: "",
          name: "",
          note: "",
          id: "",
        },
        suggestedCustomers: [],
        selectDineInFormDialog: false,
        customerPhoneInputDialog: false,
        createCustomerFormDialog: false,
        openClearSelectedCustomerConfirmationDialog: false,
      },
    };
  },
  methods: {
    setHistoryOptionsDetails: function (historyOptionsDetails) {
      this.historyOptionsDetails = historyOptionsDetails;
    },
    openHistoryOptionDialog() {
      if (
        this.$store.state.selectedItemsOrderedByEntry &&
        Object.keys(this.$store.state.selectedItemsOrderedByEntry).length !== 0
      )
        this.historyOptionsDetails.openHistoryOptionsDialog = true;
    },
    openModifyCustomerDialog: function () {
      if (this.$store.state.selectedCustomer.phone !== "") {
        this.selectedCustomerDetails.createCustomerFormDialog = true;
        this.selectedCustomerDetails.selectedCustomer =
          this.$store.state.selectedCustomer;
      }
    },
    getFormattedTimeStamp: function (orderTimestamp) {
      var hours = orderTimestamp.getHours();
      var minutes = orderTimestamp.getMinutes();
      var ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? "0" + minutes : minutes;
      var strTime = hours + ":" + minutes + " " + ampm;
      return strTime;
    },
  },
};
</script>
  