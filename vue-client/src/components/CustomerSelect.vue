<template>
  <div class="p-0" max-height="400">
    <div v-if="Object.keys($store.state.selectedCustomer).length === 0">
      <v-row align="center" justify="space-around">
        <v-btn
          class="menu-button-text mt-8"
          min-height="100%"
          width="25%"
          ff
          style="height: 10vh"
          v-on:click="
            selectDineInFormDialogue = true;
            setStoreOrderType(0);
          "
        >
          <div>DINE IN</div>
        </v-btn>
        <v-btn
          class="menu-button-text mt-8"
          x-large
          min-height="100%"
          width="25%"
          v-on:click="
            selectCustomerFormDialogue = true;
            setStoreOrderType(1);
          "
          style="height: 10vh"
        >
          <div>TAKE OUT</div>
        </v-btn>
        <v-btn
          class="menu-button-text mt-8"
          x-large
          min-height="100%"
          width="25%"
          v-on:click="
            selectCustomerFormDialogue = true;
            setStoreOrderType(2);
          "
          style="height: 10vh"
        >
          <div>DELIVERY</div>
        </v-btn>
      </v-row>
    </div>
    <v-btn
      v-else
      class="menu-button-text mt-5"
      x-large
      width="97%"
      min-height="100%"
      v-on:click="openClearSelectedCustomerConfirmationDialogue = true"
      style="height: 10vh"
    >
      <div>
        {{ this.orderTypeString[$store.state.currentOrder.type] }} <br />
        {{ $store.state.selectedCustomer.phone }} <br />
        {{ $store.state.selectedCustomer.address }} <br />
        {{ $store.state.selectedCustomer.name }} <br />
        {{ $store.state.selectedCustomer.note }}
      </div>
    </v-btn>
    <v-dialog v-model="selectCustomerFormDialogue" width="500">
      <v-card>
        <div>
          <br />
          <v-col>
            <v-form ref="form" lazy-validation>
              <v-text-field
                v-model="selectedCustomer.phone"
                :counter="16"
                label="Phone Number"
                required
                autocomplete="off"
                autofocus
              ></v-text-field>
            </v-form>
          </v-col>
          <div v-if="this.suggestedCustomers.length > 0">
            <v-btn
              v-for="customer in this.suggestedCustomers"
              :key="customer.id"
              x-large
              dark
              width="100%"
              v-on:click="setSelectedCustomer(customer)"
              >{{ customer.phone }} - {{ customer.name }}</v-btn
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
              selectCustomerFormDialogue = false;
            "
          >
            <div>CANCEL<br /></div>
          </v-btn>
          <v-btn
            x-large
            width="50%"
            v-on:click="
              selectCustomerFormDialogue = false;
              createCustomerFormDialogue = true;
            "
          >
            <div>CREATE<br /></div>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="selectDineInFormDialogue" width="500">
      <v-card>
        <div>
          <br />
          <v-col>
            <div class="p-0" max-height="400">
              <v-btn
                class="menu-button-text mt-2 ml-1 mr-1"
                v-for="table in $store.state.tables"
                v-bind:key="table.name_eng"
                x-large
                dark
                height="100px"
                width="31.6%"
                v-on:click="setSelectedCustomer(table)"
                >{{ table.name }}{{ table.price }}</v-btn
              >
            </div>
          </v-col>
          <br />
        </div>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            x-large
            width="100%"
            v-on:click="selectDineInFormDialogue = false"
          >
            <div>CANCEL<br /></div>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="createCustomerFormDialogue" width="500">
      <v-card>
        <div>
          <br />
          <v-col>
            <v-form ref="form" lazy-validation>
              <v-text-field
                v-model="selectedCustomer.phone"
                label="Phone Number"
                required
                :rules="rules"
                autocomplete="off"
                autofocus
              ></v-text-field>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="selectedCustomer.unit_number"
                    label="Unit Number"
                    autocomplete="off"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="selectedCustomer.street_number"
                    label="Street Number"
                    autocomplete="off"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-text-field
                v-model="selectedCustomer.street_name"
                :counter="50"
                label="Street Name"
                autocomplete="off"
              ></v-text-field>
              <br />
              <v-select
                v-model="selectedCustomer.city"
                :items="cityNameArr"
                label="City"
                dense
              ></v-select>
              <v-text-field
                v-model="selectedCustomer.name"
                label="Name"
                autocomplete="off"
              ></v-text-field>
              <v-text-field
                v-model="selectedCustomer.note"
                :counter="100"
                label="Note"
                autocomplete="off"
              ></v-text-field>
            </v-form>
          </v-col>
          <div
            v-if="
              this.suggestedCustomers.length > 0 &&
              this.selectedCustomer.phone.length < 10
            "
          >
            <v-btn
              v-for="customer in this.suggestedCustomers"
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
              this.selectedCustomer.street_name &&
              this.selectedCustomer.street_name.length >= 1
            "
          >
            <v-btn
              v-for="streetName in this.suggestedStreetName"
              :key="streetName"
              x-large
              dark
              width="100%"
              v-on:click="selectedCustomer.street_name = streetName"
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
              createCustomerFormDialogue = false;
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
    <v-dialog
      v-model="openClearSelectedCustomerConfirmationDialogue"
      width="900"
    >
      <v-card>
        <h2 class="text-center pt-16 pb-12">CLEAR CUSTOMER?</h2>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            x-large
            width="50%"
            v-on:click="openClearSelectedCustomerConfirmationDialogue = false"
          >
            <div>NO<br /></div>
          </v-btn>
          <v-btn
            x-large
            width="50%"
            v-on:click="
              openClearSelectedCustomerConfirmationDialogue = false;
              clearSelectedCustomer();
            "
          >
            <div>YES<br /></div>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { store } from "../store/store";
import { streetNameArr } from "../data/streets";
import { cityNameArr } from "../data/cities";
export default {
  data() {
    return {
      selectDineInFormDialogue: false,
      selectCustomerFormDialogue: false,
      createCustomerFormDialogue: false,
      openClearSelectedCustomerConfirmationDialogue: false,
      createCustomerError: null,
      selectedCustomer: {
        phone: "",
        unit_number: "",
        street_number: "",
        street_name: "",
        address: "",
        city: "",
        name: "",
        note: "",
      },
      cityNameArr,
      suggestedCustomers: [],
      suggestedStreetName: [],
      orderType: null,
      orderTypeString: ["DINE IN", "PICK UP", "DELIVERY"],
    };
  },
  watch: {
    "selectedCustomer.phone": function () {
      this.suggestCustomerFromPhoneInput();
    },
    "selectedCustomer.street_name": function () {
      this.suggestStreetNameFromStreetNameInput();
    },
    deep: true,
  },
  computed: {
    rules() {
      const rules = [];
      const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
      if (!regex.test(this.selectedCustomer.phone)) {
        rules.push("Invalid Phone Number");
      }
      return rules;
    },
  },
  methods: {
    setStoreOrderType: function (orderTypeNum) {
      store.commit("setCurrentOrder", { type: orderTypeNum });
    },
    clearSelectedCustomer: function () {
      store.commit("setSelectedCustomer", {});
    },
    suggestCustomerFromPhoneInput: function () {
      this.suggestedCustomers = [];
      if (this.$store.state.customers.length <= 0) {
        console.log("error in suggestCustomerFromPhoneInput");
      }
      const customerArr = this.$store.state.customers;
      if (this.selectedCustomer.phone.length < 3) {
        this.suggestedCustomers = [];
      } else {
        customerArr.forEach((v) => {
          if (v.phone.includes(this.selectedCustomer.phone)) {
            this.suggestedCustomers.push(v);
          }
        });
      }
      return;
    },
    suggestStreetNameFromStreetNameInput: function () {
      this.suggestedStreetName = [];
      if (this.selectedCustomer.street_name === "") {
        this.suggestedStreetName = [];
      } else {
        streetNameArr.forEach((v) => {
          if (this.suggestedStreetName.length >= 5) {
            return;
          }
          if (v.toLowerCase().startsWith(this.selectedCustomer.street_name)) {
            this.suggestedStreetName.push(v);
          }
        });
      }
      return;
    },

    validCreateCustomerForm: function () {
      // Validate Phone
      const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
      const selectedCustomer = this.selectedCustomer;

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
        this.suggestedCustomers.address = `${unitNumber}${selectedCustomer.street_number} ${selectedCustomer.street_name}`;
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
    selectedCustomerValueNullToEmptyString: function (selectedCustomer) {
      for (const key in selectedCustomer) {
        if (selectedCustomer[key] === null) {
          selectedCustomer[key] = "";
        }
      }
      return selectedCustomer;
    },
    setSelectedCustomer: function (selectedCustomer) {
      const selectedCustomerWithStringEmptyValues =
        this.selectedCustomerValueNullToEmptyString(selectedCustomer);
      store.commit(
        "setSelectedCustomer",
        selectedCustomerWithStringEmptyValues
      );
      this.selectCustomerFormDialogue = false;
      this.selectDineInFormDialogue = false;
      this.selectedCustomer = {
        phone: "",
        unit_number: "",
        street_number: "",
        street_name: "",
        address: "",
        city: "",
        name: "",
        note: "",
      };
    },
    createCustomerSubmit: async function () {
      if (this.validCreateCustomerForm()) {
        try {
          const selectedCustomerWithNullEmptyValues =
            this.selectedCustomerValueEmptyStringToNull(this.selectedCustomer);
          const res = await axios.post(
            "http://localhost:3000/post/customers/create",
            {
              ...selectedCustomerWithNullEmptyValues,
              street_number: parseInt(this.selectedCustomer.street_number),
            }
          );
          this.setSelectedCustomer(res.data);
          this.createCustomerFormDialogue = false;
          return;
        } catch (err) {
          this.createCustomerError = err.response.data;
        }
      }
    },
  },
};
</script>