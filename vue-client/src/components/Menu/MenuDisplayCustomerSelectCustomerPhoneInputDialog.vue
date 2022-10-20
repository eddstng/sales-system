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
              @keydown.enter.prevent="
                toggleCreateCustomerFormDialogOn();
                setSelectedCustomerIfCustomerExists();
              "
              required
              autocomplete="off"
              autofocus
            ></v-text-field>
            <v-alert
              v-if="this.phoneError"
              class="ml-2 mr-2"
              dense
              type="error"
              outlined
            >
              Error: {{ this.phoneError }}
            </v-alert>
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
              selectedCustomerDetails.selectedCustomer = JSON.parse(
                JSON.stringify(customer)
              );
              toggleCreateCustomerFormDialogOn();
              setSelectedCustomerIfCustomerExists(customer);
            "
            >{{ customer.phone.replace(/(\d{3})(\d{3})(\d{3})/, "$1-$2-$3") }} {{ customer.name !== null ?  '-' : ''}}
            {{ customer.name }}</v-btn
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
            phoneError = null;
            phone = '';
            selectedCustomerDetails.customerPhoneInputDialog = false;
            selectedCustomerDetails.selectedCustomer.phone = '';
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
import customerSelectMixin from "../../mixins/customerSelectMixin";
export default {
  mixins: [customerSelectMixin],
  props: ["selectedCustomerDetails"],
  data() {
    return {
      phoneError: null,
    };
  },
  methods: {
    toggleCreateCustomerFormDialogOn() {
      if (this.selectedCustomerDetails.selectedCustomer.phone.length < 12) {
        this.phoneError =
          "Invalid phone number. Phone number needs to be at least 10 numbers long.";
      } else {
        this.selectedCustomerDetails.customerPhoneInputDialog = false;
        this.$emit("setCreateCustomerFormDialogToBool", true);
      }
    },
    setSelectedCustomerIfCustomerExists() {
      if (
        this.$store.state.customers[
          this.selectedCustomerDetails.selectedCustomer.phone
        ] !== undefined
      ) {
        this.selectedCustomerDetails.selectedCustomer = JSON.parse(
          JSON.stringify(
            this.$store.state.customers[
              this.selectedCustomerDetails.selectedCustomer.phone
            ]
          )
        );
        this.customerSelectMixinSetSelectedCustomer(
          JSON.parse(
            JSON.stringify(
              this.$store.state.customers[
                this.selectedCustomerDetails.selectedCustomer.phone
              ]
            )
          )
        );
      }
    },
  },
};
</script>
