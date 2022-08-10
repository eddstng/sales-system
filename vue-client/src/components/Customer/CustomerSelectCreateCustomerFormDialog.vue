<template>
  <div>
    <v-dialog v-model="selectedCustomerDetails.createCustomerFormDialog" width="500">
      <v-card>
        <div>
          <br />
          <v-col>
            <h3 class="text-center">CONFIRM CUSTOMER</h3>
            <br />
            <v-form ref="form" lazy-validation>
              <v-text-field v-model="selectedCustomerDetails.selectedCustomer.phone" label="Phone Number" required
                :rules="rules" autocomplete="off" autofocus @keydown.enter.prevent="confirmCustomerSubmit()">
              </v-text-field>
              <v-row>
                <v-col cols="12" md="3">
                  <v-text-field v-model="
                    selectedCustomerDetails.selectedCustomer.buzzer_number
                  " label="Buzzer Number" autocomplete="off" @keydown.enter.prevent="confirmCustomerSubmit()">
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field v-model="
                    selectedCustomerDetails.selectedCustomer.unit_number
                  " label="Unit Number" autocomplete="off" @keydown.enter.prevent="confirmCustomerSubmit()">
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field v-model="
                    selectedCustomerDetails.selectedCustomer.street_number
                  " label="Street Number" autocomplete="off" @keydown.enter.prevent="confirmCustomerSubmit()">
                  </v-text-field>
                </v-col>
              </v-row>
              <v-text-field v-model="selectedCustomerDetails.selectedCustomer.street_name" :counter="50"
                label="Street Name" autocomplete="off" @keydown.enter.prevent="confirmCustomerSubmit()"></v-text-field>
              <br />
              <!-- <v-select
                v-model="selectedCustomerDetails.selectedCustomer.city"
                label="City"
                dense
              ></v-select> -->
              <v-text-field v-model="selectedCustomerDetails.selectedCustomer.name" label="Name" autocomplete="off"
                @keydown.enter.prevent="confirmCustomerSubmit()"></v-text-field>
              <v-text-field v-model="selectedCustomerDetails.selectedCustomer.note" :counter="100" label="Note"
                autocomplete="off" @keydown.enter.prevent="confirmCustomerSubmit()"></v-text-field>
            </v-form>
          </v-col>
          <div v-if="
            this.selectedCustomerDetails.suggestedCustomers.length > 0 &&
            this.selectedCustomerDetails.selectedCustomer.phone.length < 10
          ">
            <v-btn v-for="customer in this.selectedCustomerDetails
            .suggestedCustomers" :key="customer.id" x-large dark width="100%"
              v-on:click="setSelectedCustomer(customer)">{{
                  customer.phone.replace(/(\d{3})(\d{3})(\d{3})/, "$1-$2-$3")
              }}
              - {{ customer.name }}</v-btn>
          </div>
          <div v-if="
            this.selectedCustomerDetails.selectedCustomer.street_name &&
            this.selectedCustomerDetails.selectedCustomer.street_name
              .length >= 1
          ">
            <v-btn v-for="streetName in this.suggestedStreetName" :key="streetName" x-large dark width="100%"
              v-on:click="
                selectedCustomerDetails.selectedCustomer.street_name =
                streetName
              ">{{ streetName }}</v-btn>
          </div>
          <br />
        </div>
        <v-alert v-if="this.createCustomerError" class="ml-2 mr-2" dense type="error" outlined>
          Error: {{ this.createCustomerError }}
        </v-alert>
        <v-alert v-if="this.createCustomerWarning" class="ml-2 mr-2" dense type="warning" outlined>
          Warning: {{ this.createCustomerWarning }}
        </v-alert>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn x-large width="50%" v-on:click="
  phone = '';
selectedCustomerDetails.createCustomerFormDialog = false;
          ">
            <div>CANCEL<br /></div>
          </v-btn>
          <v-btn x-large width="50%" v-on:click="confirmCustomerSubmit()">
            <div>CONFIRM<br /></div>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- dialog to confirm updating customer -->
    <v-dialog v-model="confirmCustomerUpdateDialog" width="500">
      <v-card>
        <div>
          <br />
          <v-col>
            <h3 class="text-center">UPDATE CUSTOMER</h3>
            <br />
            <v-form ref="form" lazy-validation>
              <v-text-field v-model="selectedCustomerDetails.selectedCustomer.phone" label="Phone Number" required
                :rules="rules" autocomplete="off" autofocus></v-text-field>
              <v-row>
                <v-col cols="12" md="3">
                  <v-text-field v-model="
                    selectedCustomerDetails.selectedCustomer.buzzer_number
                  " label="Buzzer Number" autocomplete="off" @keydown.enter.prevent="confirmCustomerSubmit()">
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field v-model="
                    selectedCustomerDetails.selectedCustomer.unit_number
                  " label="Unit Number" autocomplete="off"></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field v-model="
                    selectedCustomerDetails.selectedCustomer.street_number
                  " label="Street Number" autocomplete="off"></v-text-field>
                </v-col>
              </v-row>
              <v-text-field v-model="selectedCustomerDetails.selectedCustomer.street_name" :counter="50"
                label="Street Name" autocomplete="off"></v-text-field>
              <br />
              <v-text-field v-model="selectedCustomerDetails.selectedCustomer.name" label="Name" autocomplete="off">
              </v-text-field>
              <v-text-field v-model="selectedCustomerDetails.selectedCustomer.note" :counter="100" label="Note"
                autocomplete="off"></v-text-field>
            </v-form>
          </v-col>
          <div v-if="
            this.selectedCustomerDetails.suggestedCustomers.length > 0 &&
            this.selectedCustomerDetails.selectedCustomer.phone.length < 10
          ">
            <v-btn v-for="customer in this.selectedCustomerDetails
            .suggestedCustomers" :key="customer.id" x-large dark width="100%"
              v-on:click="setSelectedCustomer(customer)">{{
                  customer.phone.replace(/(\d{3})(\d{3})(\d{3})/, "$1-$2-$3")
              }}
              - {{ customer.name }}</v-btn>
          </div>
          <div v-if="
            this.selectedCustomerDetails.selectedCustomer.street_name &&
            this.selectedCustomerDetails.selectedCustomer.street_name
              .length >= 1
          ">
            <v-btn v-for="streetName in this.suggestedStreetName" :key="streetName" x-large dark width="100%"
              v-on:click="
                selectedCustomerDetails.selectedCustomer.street_name =
                streetName
              ">{{ streetName }}</v-btn>
          </div>
        </div>
        <br />
        <h3 class="text-center">
          This action will update the customer details.
        </h3>
        <h3 class="text-center">To confirm this action click [UPDATE].</h3>
        <h3 class="text-center">To stop this action click [CANCEL].</h3>
        <br />
        <br />

        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn x-large width="50%" v-on:click="
  phone = '';
confirmCustomerUpdateDialog = false;
selectedCustomerDetails.selectedCustomer = JSON.parse(
  JSON.stringify(
    $store.state.customers[
    selectedCustomerDetails.selectedCustomer.id
    ]
  )
);
createCustomerError = null;
createCustomerWarning = 'DATA RESET';
selectedCustomerDetails.createCustomerFormDialog = false;
selectedCustomerDetails.createCustomerFormDialog = true;
          ">
            <div>CANCEL<br /></div>
          </v-btn>
          <v-btn x-large width="50%" v-on:click="
            updateCustomerSubmit(selectedCustomerDetails.selectedCustomer)
          ">
            <div>UPDATE<br /></div>
          </v-btn>
        </v-card-actions>
        <!-- dialog to confirm updating customer -->
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
import customerSelectMixin from "../../mixins/customerSelectMixin";
import storeMixin from "../../mixins/storeMixin";

export default {
  mixins: [customerSelectMixin, storeMixin],
  data() {
    return {
      createCustomerWarning: null,
      createCustomerError: null,
      suggestedStreetName: [],
      confirmCustomerUpdateDialog: false,
    };
  },
  watch: {
    "selectedCustomerDetails.selectedCustomer.street_name": function () {
      this.suggestStreetNameFromStreetNameInput();
    },
    "selectedCustomerDetails.selectedCustomer.phone": function () {
      this.selectedCustomerDetails.selectedCustomer.phone =
        this.selectedCustomerDetails.selectedCustomer.phone.replace(
          /(\d{3})(\d{3})(\d{3})/,
          "$1-$2-$3"
        );
    },
    deep: true,
  },
  props: ["selectedCustomerDetails"],
  computed: {
    rules() {
      const rules = [];
      const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
      if (!regex.test(this.selectedCustomerDetails.selectedCustomer.phone)) {
        rules.push("Invalid Phone Number");
      }
      return rules;
    },
  },
  methods: {
    toggleCreateCustomerFormDialogOn() {
      this.$emit("setCreateCustomerFormDialogToBool", true);
    },

    validCreateCustomerForm: function () {
      // Validate Phone
      const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
      const selectedCustomer = Object.assign(
        {},
        this.selectedCustomerDetails.selectedCustomer
      );

      if (
        !regex.test(selectedCustomer.phone) ||
        selectedCustomer.phone === "" ||
        selectedCustomer.phone.length < 12
      ) {
        this.createCustomerError = "INVALID PHONE NUMBER";
        return false;
      }

      // Validate Address
      if (
        selectedCustomer.street_number !== "" &&
        selectedCustomer.street_name === ""
      ) {
        this.createCustomerError = "INVALID STREET NAME";
        return false;
      }

      if (
        selectedCustomer.street_number === "" &&
        selectedCustomer.street_name !== ""
      ) {
        this.createCustomerError = "INVALID STREET NUMBER";
        return false;
      }

      // Build Address
      if (selectedCustomer.street_name !== "") {
        const unitNumber =
          selectedCustomer.unit_number !== ""
            ? `${selectedCustomer.unit_number} - `
            : "";
        this.selectedCustomerDetails.suggestedCustomers.address = `${unitNumber}${selectedCustomer.street_number} ${selectedCustomer.street_name}`;
      }

      // Ensure street_number is a number.
      // Commented out a requirement for street_number to be an integer.
      // if (selectedCustomer.street_number !== "") {
      //   if (isNaN(selectedCustomer.street_number)) {
      //     this.createCustomerError = "INVALID STREET NUMBER";
      //     return false;
      //   }
      // }

      this.createCustomerError = null;
      return true;
    },
    selectedCustomerValueEmptyStringToNull: function (selectedCustomer) {
      for (const key in selectedCustomer) {
        if (selectedCustomer[key] === "") {
          selectedCustomer[key] = null;
        }
      }
      return selectedCustomer;
    },
    // confirmCustomerSubmit currently will either update customer if applicable (or nothing), or create customer.
    confirmCustomerSubmit: async function () {
      this.createCustomerError = null;
      this.checkIfIsDeliveryAndHasValidAddress();
      if (this.createCustomerError !== null) {
        return
      }
      // If there is a selectedCustomer (set in CustomerSelectCustomerPhoneInputDialog if the customer exists),
      // then check if the customer details have been updated in the form,
      // if updated, then open customerUpdateDialog.
      if (this.$store.state.selectedCustomer.id !== undefined) {
        if (
          JSON.stringify(this.selectedCustomerDetails.selectedCustomer) ===
          JSON.stringify(
            this.$store.state.customers[
            this.selectedCustomerDetails.selectedCustomer.phone
            ]
          )
        ) {
          // If customer details have not been updated in the form then do nothing and close dialogue.
          this.selectedCustomerDetails.createCustomerFormDialog = false;
          return;
        } else {
          // If customer details have been updated in the form then open customerUpdateDialog.
          this.confirmCustomerUpdateDialog = true;
        }
      }
      // If there is no selectedCustomer (meaning that the customer does not exist),
      // then validate customer form and create a new customer entry.
      if (
        this.createCustomerError === null &&
        this.validCreateCustomerForm() &&
        this.confirmCustomerUpdateDialog === false
      ) {
        try {
          const selectedCustomerWithNullEmptyValues =
            this.selectedCustomerValueEmptyStringToNull(
              this.selectedCustomerDetails.selectedCustomer
            );
          const res = await axios.post(
            "http://localhost:3000/post/customers/create",
            {
              ...selectedCustomerWithNullEmptyValues,
              street_number: parseInt(
                this.selectedCustomerDetails.selectedCustomer.street_number
              ),
            }
          );
          this.selectedCustomerDetails.createCustomerFormDialog = false;
          this.customerSelectMixinSetSelectedCustomer(res.data);
          this.storeMixinUpdateStoreCustomerArray();
          return;
        } catch (err) {
          this.createCustomerError = err.response.data;
        }
      }
    },
    updateCustomerSubmit: async function (selectedCustomer) {
      try {
        // If the customer was newly created, selectedCustomer will not be updated with the database generated id. 
        // The following line adds the will retrieve the id from the store if necessary. 
        const selectedCustomerId = selectedCustomer.id ?? this.$store.state.selectedCustomer.id;
        if (isNaN(selectedCustomerId)) {
          throw new Error('Error occured while trying to update customer details due to invalid customer id.')
        }

        // Update customer details of the selectedCustomer.
        const res = await axios.put(
          `http://localhost:3000/put/customers/update/id/${selectedCustomerId}`,
          selectedCustomer
        );
        if (res.status !== 200) {
          throw new Error('Error occured while trying to update customer details during PUT request.')
        } 

        // If the PUT request was successful, update the store with the new customer details. 
        this.customerSelectMixinSetSelectedCustomer(
          res.data
        );

        this.confirmCustomerUpdateDialog = false;
        this.selectedCustomerDetails.createCustomerFormDialog = false;
        this.createCustomerWarning = null;
        this.createCustomerError = null;

        this.storeMixinUpdateStoreCustomerArray();
        return;
      } catch (err) {
        this.createCustomerError = err.response.data;
      }
    },
    checkIfIsDeliveryAndHasValidAddress: function () {
      if (
        this.$store.state.currentOrder.type === 2 &&
        (this.selectedCustomerDetails.selectedCustomer.street_number == "" ||
          this.selectedCustomerDetails.selectedCustomer.street_name == "" || this.selectedCustomerDetails.selectedCustomer.street_number == null ||
          this.selectedCustomerDetails.selectedCustomer.street_name == null)
      ) {
        this.createCustomerError = "DELIVERY REQUIRES A VALID ADDRESS";
      }
      return;
    },
  },
};
</script>
