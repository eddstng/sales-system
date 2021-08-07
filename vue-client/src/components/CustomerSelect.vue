<template>
  <div
    class="p-0"
    max-height="400"
  >
    <!-- <v-btn
          v-if="Object.keys($store.state.selectedCustomer).length === 0"
          class="menu-button-text mt-5 ml-2"
          x-large
          width="97%"
          min-height="100%"
          v-on:click="selectCustomerFormDialogue = true;"
          style="height: 10vh;"
          v-bind="attrs"
        >
          <div>
            SELECT A CUSTOMER
          </div>
        </v-btn> -->
    <div v-if="Object.keys($store.state.selectedCustomer).length === 0">
      <v-row
        align="center"
        justify="space-around"
      >
        <v-btn
          class="menu-button-text mt-8"
          min-height="100%"
          width="25%"
          v-on:click="
            selectTableFormDialogue = true;
            orderType=0;
          "
          style="height: 10vh;"
          v-bind="attrs"
        >
          <div>
            DINE IN
          </div>
        </v-btn>
        <v-btn
          class="menu-button-text mt-8"
          x-large
          min-height="100%"
          width="25%"
          v-on:click="
            selectCustomerFormDialogue = true;
            orderType=1;
          "
          style="height: 10vh;"
          v-bind="attrs"
        >
          <div>
            TAKE OUT
          </div>
        </v-btn>
        <v-btn
          class="menu-button-text mt-8"
          x-large
          min-height="100%"
          width="25%"
          v-on:click="
            selectCustomerFormDialogue = true;
            orderType=2;
          "
          style="height: 10vh;"
          v-bind="attrs"
        >
          <div>
            DELIVERY
          </div>
        </v-btn>
      </v-row>
    </div>
    <v-btn
      v-else
      class="menu-button-text mt-5"
      x-large
      width="97%"
      min-height="100%"
      v-on:click="selectCustomerFormDialogue = true;"
      style="height: 10vh;"
      v-bind="attrs"
    >
      <div>
        {{ this.orderType }} <br />
        {{ $store.state.selectedCustomer.phone }} <br />
        {{ $store.state.selectedCustomer.address }} <br />
        {{ $store.state.selectedCustomer.name }} <br />
        {{ $store.state.selectedCustomer.note }}
      </div>
    </v-btn>
    <v-dialog
      v-model="selectCustomerFormDialogue"
      width="500"
    >
      <!-- Select Customer  -->
      <!-- Select Customer Button / Customer Display  -->
      <!-- Select Customer Phone Number Search Form Dialogue -->
      <v-card>
        <div>
          <br />
          <v-col>
            <v-form
              ref="form"
              lazy-validation
            >
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
          <div v-if="this.suggestedCustomers.length > 0 && this.selectedCustomer.phone.length < 10">
            <p class="text-center"> Suggested Customers </p>
            <v-btn
              v-for="customer in this.suggestedCustomers"
              :key="customer.id"
              x-large
              dark
              width="100%"
              v-on:click="setSelectedCustomer(customer)"
            >{{ customer.phone }} - {{ customer.name }}</v-btn>
          </div>
          <br />
        </div>
        <v-divider></v-divider>
        <!-- Select Customer Phone Number Search Form Buttons-->
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
    <!-- Create Customer Form Dialogue-->
    <v-dialog
      v-model="createCustomerFormDialogue"
      width="500"
    >
      <v-card>
        <div>
          <br />
          <v-col>
            <v-form
              ref="form"
              lazy-validation
            >
              <v-text-field
                v-model="selectedCustomer.phone"
                label="Phone Number"
                required
                :rules="rules"
                autocomplete="off"
                autofocus
              ></v-text-field>
              <v-row>
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="selectedCustomer.unitNumber"
                    label="Unit Number"
                    autocomplete="off"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="selectedCustomer.streetNumber"
                    label="Street Number"
                    autocomplete="off"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-text-field
                v-model="selectedCustomer.streetName"
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
          <div v-if="this.suggestedCustomers.length > 0 && this.selectedCustomer.phone.length < 10">
            <p class="text-center"> Suggested Customers </p>
            <v-btn
              v-for="customer in this.suggestedCustomers"
              :key="customer.id"
              x-large
              dark
              width="100%"
              v-on:click="setSelectedCustomer(customer)"
            >{{ customer.phone }} - {{ customer.name }}</v-btn>
          </div>
          <div v-if="this.selectedCustomer.streetName.length >=  1">
            <p class="text-center"> Suggested Hello </p>
            <v-btn
              v-for="streetName in this.suggestedStreetName"
              :key="streetName"
              x-large
              dark
              width="100%"
              v-on:click="setCustomerSelectedCustomerStreetName(streetName)"
            >{{ streetName }}</v-btn>
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
          Error: {{this.createCustomerError}}
        </v-alert>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            x-large
            width="50%"
            v-on:click="
              phone = ''
              selectCustomerFormDialogue = false
              sssscreateCustomerFormDialogue = false;
            "
          >
            <div>CANCEL<br /></div>
          </v-btn>
          <v-btn
            x-large
            width="50%"
            v-on:click="
                createCustomerSubmit();
            "
          >
            <div>CREATE<br /></div>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>
</style>

<script>
import { store } from "../store/store";
import { streetNameArr } from "../data/streets";
import { cityNameArr } from "../data/cities";

export default {
  data() {
    return {
      selectTableFormDialogue: false,
      selectCustomerFormDialogue: false,
      createCustomerFormDialogue: false,
      createCustomerError: null,
      selectedCustomer: {
        phone: "",
        unitNumber: "",
        streetNumber: "",
        streetName: "",
        city: "",
        name: "",
        note: "",
      },
      cityNameArr,
      suggestedCustomers: [],
      suggestedStreetName: [],
      orderType: null,
    };
  },
  watch: {
    "selectedCustomer.phone": function () {
      this.suggestCustomerFromPhoneInput();
    },
    "selectedCustomer.streetName": function () {
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
    setSelectedCustomer: function (selectedCustomer) {
      this.selectedCustomer.phone = selectedCustomer.phone;
      this.selectedCustomer.unitNumber = selectedCustomer.unit_number;
      this.selectedCustomer.streetNumber = selectedCustomer.street_number;
      this.selectedCustomer.streetName = selectedCustomer.street_name;
      this.selectedCustomer.name = selectedCustomer.name;
      this.selectedCustomer.note = selectedCustomer.note;
      store.commit("setSelectedCustomer", selectedCustomer);
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
    setCustomerSelectedCustomerStreetName: function (streetName) {
      this.selectedCustomer.streetName = streetName;
    },
    suggestStreetNameFromStreetNameInput: function () {
      this.suggestedStreetName = [];
      if (this.selectedCustomer.streetName.length === 0) {
        this.suggestedStreetName = [];
      } else {
        streetNameArr.forEach((v) => {
          if (this.suggestedStreetName.length >= 5) {
            return;
          }
          if (v.toLowerCase().startsWith(this.selectedCustomer.streetName)) {
            this.suggestedStreetName.push(v);
          }
        });
      }
      return;
    },
    validCreateCustomerForm: function () {
      const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
      if (
        !regex.test(this.selectedCustomer.phone) ||
        this.selectedCustomer.phone === ""
      ) {
        this.createCustomerError = "Invalid Phone Number";
        return false;
      }
      this.createCustomerError = null;
      return true;
    },
    createCustomerSubmit: function () {
      if (this.validCreateCustomerForm()) {
        this.createCustomerFormDialogue = false;
        return;
      }
    },
  },
};
</script>