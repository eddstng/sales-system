<template>
  <v-dialog
    v-model="selectedCustomerDetails.createCustomerFormDialog"
    width="500"
  >
    <v-card>
      <div>
        <br />
        <v-col>
          <v-form ref="form" lazy-validation>
            <v-text-field
              v-model="selectedCustomerDetails.selectedCustomer.phone"
              label="Phone Number"
              required
              :rules="rules"
              autocomplete="off"
              autofocus
            ></v-text-field>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="selectedCustomerDetails.selectedCustomer.unit_number"
                  label="Unit Number"
                  autocomplete="off"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="
                    selectedCustomerDetails.selectedCustomer.street_number
                  "
                  label="Street Number"
                  autocomplete="off"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-text-field
              v-model="selectedCustomerDetails.selectedCustomer.street_name"
              :counter="50"
              label="Street Name"
              autocomplete="off"
            ></v-text-field>
            <br />
            <v-select
              v-model="selectedCustomerDetails.selectedCustomer.city"
              :items="cityNameArr"
              label="City"
              dense
            ></v-select>
            <v-text-field
              v-model="selectedCustomerDetails.selectedCustomer.name"
              label="Name"
              autocomplete="off"
            ></v-text-field>
            <v-text-field
              v-model="selectedCustomerDetails.selectedCustomer.note"
              :counter="100"
              label="Note"
              autocomplete="off"
            ></v-text-field>
          </v-form>
        </v-col>
        <div
          v-if="
            this.selectedCustomerDetails.suggestedCustomers.length > 0 &&
            this.selectedCustomerDetails.selectedCustomer.phone.length < 10
          "
        >
          <v-btn
            v-for="customer in this.selectedCustomerDetails.suggestedCustomers"
            :key="customer.id"
            x-large
            dark
            width="100%"
            v-on:click="setSelectedCustomer(customer)"
            >{{ customer.phone }} - {{ customer.name }}</v-btn
          >
        </div>
        <div
          v-if="
            this.selectedCustomerDetails.selectedCustomer.street_name &&
            this.selectedCustomerDetails.selectedCustomer.street_name.length >=
              1
          "
        >
          <v-btn
            v-for="streetName in this.suggestedStreetName"
            :key="streetName"
            x-large
            dark
            width="100%"
            v-on:click="
              selectedCustomerDetails.selectedCustomer.street_name = streetName
            "
            >{{ streetName }}</v-btn
          >
        </div>
        <br />
      </div>
      <v-alert
        v-if="this.createCustomerError"
        class="ml-2 mr-2"
        dense
        type="error"
        outlined
      >
        Error: {{ this.createCustomerError }}
      </v-alert>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          x-large
          width="50%"
          v-on:click="
            phone = '';
            selectedCustomerDetails.createCustomerFormDialog = false;
          "
        >
          <div>CANCEL<br /></div>
        </v-btn>
        <v-btn x-large width="50%" v-on:click="createCustomerSubmit()">
          <div>CREATE<br /></div>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
import { streetNameArr } from "../data/streets";
import customerSelectMixin from "../mixins/customerSelectMixin";
import { cityNameArr } from "../data/cities";
export default {
  mixins: [customerSelectMixin],
  data() {
    return {
      createCustomerError: null,
      cityNameArr,
      suggestedStreetName: [],

    };
  },
    watch: {
    "selectedCustomerDetails.selectedCustomer.street_name": function () {
      this.suggestStreetNameFromStreetNameInput();
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
        selectedCustomer.phone.length > 10
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
        if (selectedCustomer.city === "") {
          this.createCustomerError = "INVALID CITY";
          return false;
        }
        const unitNumber =
          selectedCustomer.unit_number !== ""
            ? `${selectedCustomer.unit_number} - `
            : "";
        this.selectedCustomerDetails.suggestedCustomers.address = `${unitNumber}${selectedCustomer.street_number} ${selectedCustomer.street_name}`;
      }

      // Ensure street_number is a number.
      if (selectedCustomer.street_number !== "") {
        if (isNaN(selectedCustomer.street_number)) {
          this.createCustomerError = "INVALID STREET NUMBER";
          return false;
        }
      }

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
    createCustomerSubmit: async function () {
      if (this.validCreateCustomerForm()) {
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

          this.customerSelectMixinSetSelectedCustomer(res.data);
          this.selectedCustomerDetails.createCustomerFormDialog = false;
          return;
        } catch (err) {
          this.createCustomerError = err.response.data;
        }
      }
    },
     suggestStreetNameFromStreetNameInput: function () {
      this.suggestedStreetName = [];
      if (this.selectedCustomerDetails.selectedCustomer.street_name === "") {
        this.suggestedStreetName = [];
      } else {
        streetNameArr.forEach((v) => {
          if (this.suggestedStreetName.length >= 5) {
            return;
          }
          if (
            v
              .toLowerCase()
              .startsWith(
                this.selectedCustomerDetails.selectedCustomer.street_name
              )
          ) {
            this.suggestedStreetName.push(v);
          }
        });
      }
      return;
    },
  },
};
</script>
