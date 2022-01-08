<template>
  <v-dialog
    v-model="selectedCustomerDetails.customerPhoneInputDialog"
    width="500"
  >
    <v-card>
      <div>
        <br />
        <v-col>
          <v-form ref="form" lazy-validation>
            <v-text-field
              v-model="selectedCustomerDetails.selectedCustomer.phone"
              :counter="16"
              label="Phone Number"
              required
              autocomplete="off"
              autofocus
            ></v-text-field>
          </v-form>
        </v-col>
        <div v-if="this.selectedCustomerDetails.suggestedCustomers.length > 0">
          <v-btn
            v-for="customer in this.selectedCustomerDetails.suggestedCustomers"
            :key="customer.id"
            x-large
            dark
            width="100%"
            v-on:click="
              selectedCustomerDetails.customerPhoneInputDialog = false;
              selectedCustomerDetails.selectedCustomer = JSON.parse(JSON.stringify(customer));;
              toggleCreateCustomerFormDialogOn();
              customerSelectMixinSetSelectedCustomer(customer);
            "
            >{{ customer.phone.replace(/(\d{3})(\d{3})(\d{3})/, "$1-$2-$3") }} - {{ customer.name }}</v-btn
          >
        </div>
        <br />
      </div>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          x-large
          width="50%"
          v-on:click="
            phone = '';
            selectedCustomerDetails.customerPhoneInputDialog = false;
          "
        >
          <div>CANCEL<br /></div>
        </v-btn>
        <v-btn
          x-large
          width="50%"
          v-on:click="
            selectedCustomerDetails.customerPhoneInputDialog = false;
            toggleCreateCustomerFormDialogOn();
          "
        >
          <div>CREATE<br /></div>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import customerSelectMixin from "../mixins/customerSelectMixin";
export default {
  mixins: [customerSelectMixin],
  props: ["selectedCustomerDetails"],
  methods: {
    toggleCreateCustomerFormDialogOn() {
      this.$emit("setCreateCustomerFormDialogToBool", true);
    },
  },
};
</script>
