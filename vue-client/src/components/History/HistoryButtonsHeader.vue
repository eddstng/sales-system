<template>
  <div>
    <v-btn
      v-if="$store.state.selectedCustomer.phone.length === 0"
      class="history-button-text mr-1"
      width="32.8%"
      height="80px"
      dark
      v-on:click="
        customerOptionDetails.openCustomerOptionSearchDialog = true;
        updateCustomerOptionDetails(customerOptionDetails);
      "
    >
      <!-- SEARCH -->
    </v-btn>
    <v-btn
      v-if="$store.state.selectedCustomer.phone.length > 0"
      v-on:click="
        displayBackButton = false;
        storeMixResetSelectedCustomer();
        storeMixResetSelectedItemsOrderedByEntry();
        storeMixResetCurrentOrder();
      "
      class="history-button-text mr-1"
      width="32.8%"
      height="80px"
      dark
    >
      BACK
    </v-btn>

    <v-btn class="history-button-text" width="33%" height="80px" dark>
      {{ $store.state.selectedCustomer.phone }}
    </v-btn>
    <v-btn class="history-button-text ml-1" width="33%" height="80px" dark>
    </v-btn>
  </div>
</template>

<style>
.history-display-item-text {
  font-size: 1.2em;
}
</style>

<script>
import storeMixin from "../../mixins/storeMixin";
export default {
  props: ["customerOptionDetails"],
  mixins: [storeMixin],
  components: {},
  data() {
    return {
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
    updateCustomerOptionDetails() {
      this.$emit("setCustomerOptionDetails", this.customerOptionDetailsUpdate);
    },
    // clearStoreSelectedCustomer() {
    //   store.commit("setSelectedCustomer", {
    //     phone: "",
    //   });
    // },
    // clearStoreOrderStuff() {
    //   store.commit("setSelectedItemsOrderedByEntry", {});
    //   this.storeMixinClearCurrentOrder();
    // },
  },
};
</script>
  