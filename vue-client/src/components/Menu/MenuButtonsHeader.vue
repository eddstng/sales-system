<template>
  <div>
    <v-btn
      v-if="$store.state.selectedCustomer.phone.length === 0"
      class="history-button-text mr-1"
      width="24.5%"
      height="80px"
      dark
      v-on:click="
        customerOptionDetailsUpdate.openCustomerOptionSearchDialog = true;
        updateCustomerOptionDetails(customerOptionDetails);
      "
    >
      BACK
    </v-btn>
    <v-btn class="history-button-text" width="24.5%" height="80px" dark>
      CUSTOM
    </v-btn>
    <v-btn class="history-button-text ml-1" width="24.5%" height="80px" dark>
      ⮟
    </v-btn>
        <v-btn class="history-button-text ml-1" width="24.5%" height="80px" dark>
      ⮝
    </v-btn>
  </div>
</template>

<style>
.history-display-item-text {
  font-size: 1.2em;
}
</style>

<script>
import { store } from "../../store/store";

export default {
  props: ["customerOptionDetails"],
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
    clearStoreSelectedCustomer() {
      store.commit("setSelectedCustomer", {
        phone: "",
      });
    },
  },
};
</script>
  