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
            selectedCustomerDetails.customerPhoneInputDialog = true;
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
            selectedCustomerDetails.customerPhoneInputDialog = true;
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
    <CustomerSelectCustomerPhoneInputDialog
      v-bind:selectedCustomerDetails="selectedCustomerDetails"
      @setCreateCustomerFormDialogToBool="setCreateCustomerFormDialogToBool"
    />
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
                v-on:click="customerSelectMixinSetSelectedCustomer(table)"
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
                    v-model="selectedCustomerDetails.selectedCustomer.street_number"
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
              v-for="customer in this.selectedCustomerDetails
                .suggestedCustomers"
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
              this.selectedCustomerDetails.selectedCustomer.street_name
                .length >= 1
            "
          >
            <v-btn
              v-for="streetName in this.suggestedStreetName"
              :key="streetName"
              x-large
              dark
              width="100%"
              v-on:click="selectedCustomerDetails.selectedCustomer.street_name = streetName"
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
    <!-- <CustomerSelectCreateCustomerFormDialog /> -->

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
import CustomerSelectCustomerPhoneInputDialog from "./CustomerSelectCustomerPhoneInputDialog";
import customerSelectMixin from "../mixins/customerSelectMixin";
export default {
  mixins: [customerSelectMixin],
  data() {
    return {
      selectDineInFormDialogue: false,
      openClearSelectedCustomerConfirmationDialogue: false,
      createCustomerError: null,
      selectedCustomerDetails: {
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
        suggestedCustomers: [],
        customerPhoneInputDialog: false,
        createCustomerFormDialog: false,
      },
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
      suggestedStreetName: [],
      orderType: null,
      orderTypeString: ["DINE IN", "PICK UP", "DELIVERY"],
    };
  },
  components: {
    CustomerSelectCustomerPhoneInputDialog,
  },
  watch: {
    "selectedCustomerDetails.selectedCustomer.phone": function () {
      this.suggestCustomerFromPhoneInput();
    },
    "selectedCustomerDetails.selectedCustomer.street_name": function () {
      this.suggestStreetNameFromStreetNameInput();
    },
    deep: true,
  },
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
    setCreateCustomerFormDialogToBool: function (bool) {
      this.selectedCustomerDetails.createCustomerFormDialog = bool;
    },
    setStoreOrderType: function (orderTypeNum) {
      store.commit("setCurrentOrder", { type: orderTypeNum });
    },
    clearSelectedCustomer: function () {
      store.commit("setSelectedCustomer", {});
    },
    suggestCustomerFromPhoneInput: function () {
      this.selectedCustomerDetails.suggestedCustomers = [];
      if (this.$store.state.customers.length <= 0) {
        console.log("error in suggestCustomerFromPhoneInput");
      }
      const customerArr = this.$store.state.customers;
      if (this.selectedCustomerDetails.selectedCustomer.phone.length < 3) {
        this.selectedCustomerDetails.suggestedCustomers = [];
      } else {
        customerArr.forEach((v) => {
          if (
            v.phone.includes(
              this.selectedCustomerDetails.selectedCustomer.phone
            )
          ) {
            this.selectedCustomerDetails.suggestedCustomers.push(v);
          }
        });
      }
      return;
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
  },
};
</script>