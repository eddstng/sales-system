<template>
  <div max-height="400">
    <div v-if="$store.state.selectedCustomer.phone === ''">
      <v-row align="center" justify="space-around">
        <v-btn
          class="menu-button-text mt-6"
          min-height="100%"
          width="25%"
          style="height: 10vh"
          v-on:click="
            selectedCustomerDetails.selectDineInFormDialog = true;
            setStoreOrderType(0);
          "
        >
          <div>DINE IN</div>
        </v-btn>
        <v-btn
          class="menu-button-text mt-6"
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
          class="menu-button-text mt-6"
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
      x-large
      width="100%"
      v-on:click="selectedCustomerDetails.changeOrderDetailsDialog = true"
      style="height: 13vh"
    >
      <div class="customer-detail-text">
        {{ this.orderTypeString[$store.state.currentOrder.type] }} <br />
        {{
          $store.state.selectedCustomer.phone.replace(
            /(\d{3})(\d{3})(\d{3})/,
            "$1-$2-$3"
          )
        }}
        <br />
        {{ $store.state.selectedCustomer.address }}
        <div
          v-if="
            $store.state.selectedCustomer.buzzer_number !== '' &&
            $store.state.selectedCustomer.buzzer_number !== null
          "
        >
          {{
            $store.state.selectedCustomer.buzzer_number !== "" &&
            $store.state.selectedCustomer.buzzer_number !== null
              ? `Buzzer:`
              : ""
          }}{{ $store.state.selectedCustomer.buzzer_number }}
        </div>
        {{ $store.state.selectedCustomer.name }} <br />
        {{ $store.state.selectedCustomer.note }}
      </div>
    </v-btn>
    <MenuDisplayCustomerSelectCustomerPhoneInputDialog
      v-bind:selectedCustomerDetails="selectedCustomerDetails"
      @setCreateCustomerFormDialogToBool="setCreateCustomerFormDialogToBool"
    />
    <MenuDisplayCustomerSelectCustomerDineInTablesDialog
      v-bind:selectedCustomerDetails="selectedCustomerDetails"
    />
    <MenuDisplayCustomerSelectCreateCustomerFormDialog
      v-bind:selectedCustomerDetails="selectedCustomerDetails"
    />

    <v-dialog
      v-model="selectedCustomerDetails.changeCustomerDetailsDialog"
      width="900"
    >
      <v-card>
        <h2 class="text-center pt-16 pb-12">MODIFY CUSTOMER?</h2>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            x-large
            width="33%"
            v-on:click="
              selectedCustomerDetails.changeCustomerDetailsDialog = false
            "
          >
            <div>CANCEL<br /></div>
          </v-btn>
          <v-btn
            x-large
            width="33%"
            v-on:click="
              selectedCustomerDetails.changeCustomerDetailsDialog = false;
              clearSelectedCustomer();
            "
          >
            <div>CLEAR<br /></div>
          </v-btn>
          <v-btn
            x-large
            width="33%"
            v-on:click="
              selectedCustomerDetails.changeCustomerDetailsDialog = false;
              selectedCustomerDetails.createCustomerFormDialog = true;
              selectedCustomerDetails.selectedCustomer =
                $store.state.selectedCustomer;
            "
          >
            <div>YES<br /></div>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="selectedCustomerDetails.changeOrderTypeDialog"
      width="900"
    >
      <v-card>
        <h2 class="text-center pt-16 pb-12">UPDATE ORDER TYPE?</h2>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            x-large
            width="24%"
            v-on:click="selectedCustomerDetails.changeOrderTypeDialog = false"
          >
            <div>CANCEL<br /></div>
          </v-btn>
          <v-btn
            x-large
            width="24%"
            v-on:click="
              selectedCustomerDetails.changeOrderTypeDialog = false;
              setStoreOrderType(0);
            "
          >
            <div>DINE IN<br /></div>
          </v-btn>
          <v-btn
            x-large
            width="24%"
            v-on:click="
              selectedCustomerDetails.changeOrderTypeDialog = false;
              setStoreOrderType(1);
            "
          >
            <div>TAKE OUT<br /></div>
          </v-btn>
          <v-btn
            x-large
            width="24%"
            v-on:click="
              selectedCustomerDetails.changeOrderTypeDialog = false;
              setStoreOrderType(2);
            "
          >
            <div>DELIVERY<br /></div>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="selectedCustomerDetails.changeOrderDetailsDialog"
      width="900"
    >
      <v-card>
        <h2 class="text-center pt-16 pb-12">CHANGE ORDER DETAILS?</h2>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            x-large
            width="33%"
            v-on:click="
              selectedCustomerDetails.changeOrderDetailsDialog = false
            "
          >
            <div>CANCEL<br /></div>
          </v-btn>
          <v-btn
            x-large
            width="33%"
            v-on:click="
              selectedCustomerDetails.changeOrderDetailsDialog = false;
              selectedCustomerDetails.changeCustomerDetailsDialog = true;
            "
          >
            <div>CUSTOMER<br /></div>
          </v-btn>
          <v-btn
            x-large
            width="33%"
            v-on:click="
              selectedCustomerDetails.changeOrderDetailsDialog = false;
              selectedCustomerDetails.changeOrderTypeDialog = true;
              selectedCustomerDetails.selectedCustomer =
                $store.state.selectedCustomer;
            "
          >
            <div>ORDER TYPE<br /></div>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped> .customer-detail-text{font-size: 14px;}</style>

<script>
import { store } from "../../store/store";
import storeMixin from "../../mixins/storeMixin";
import customerSelectMixin from "../../mixins/customerSelectMixin";
import MenuDisplayCustomerSelectCustomerPhoneInputDialog from "./MenuDisplayCustomerSelectCustomerPhoneInputDialog";
import MenuDisplayCustomerSelectCreateCustomerFormDialog from "./MenuDisplayCustomerSelectCreateCustomerFormDialog";
import MenuDisplayCustomerSelectCustomerDineInTablesDialog from "./MenuDisplayCustomerSelectCustomerDineInTablesDialog";

export default {
  mixins: [customerSelectMixin, storeMixin],
  data() {
    return {
      createCustomerError: null,
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
        changeCustomerDetailsDialog: false,
        changeOrderDetailsDialog: false,
        changeOrderTypeDialog: false,
      },
      suggestedStreetName: [],
      orderType: null,
      orderTypeString: ["DINE IN", "PICK UP", "DELIVERY"],
    };
  },
  components: {
    MenuDisplayCustomerSelectCustomerPhoneInputDialog,
    MenuDisplayCustomerSelectCreateCustomerFormDialog,
    MenuDisplayCustomerSelectCustomerDineInTablesDialog,
  },
  watch: {
    "selectedCustomerDetails.selectedCustomer.phone": function () {
      this.suggestCustomerFromPhoneInput();
    },
    deep: true,
  },
  methods: {
    setCreateCustomerFormDialogToBool: function (bool) {
      this.selectedCustomerDetails.createCustomerFormDialog = bool;
    },
    setStoreOrderType: function (orderTypeNum) {
      let currentOrder = JSON.parse(
        JSON.stringify(this.$store.state.currentOrder)
      );
      currentOrder.type = orderTypeNum;
      store.commit("setCurrentOrder", currentOrder);
      (this.selectedCustomerDetails.selectedCustomer = {
        phone: "",
        unit_number: "",
        street_number: "",
        street_name: "",
        address: "",
        city: "",
        name: "",
        note: "",
      }),
        this.storeMixinUpdateStorePriceDetails();
    },
    clearSelectedCustomer: function () {
      let currentOrder = JSON.parse(
        JSON.stringify(this.$store.state.currentOrder)
      );
      currentOrder.type = null;
      store.commit("setCurrentOrder", currentOrder);
      store.commit("setSelectedCustomer", { phone: "" });
    },
    suggestCustomerFromPhoneInput: function () {
      this.selectedCustomerDetails.suggestedCustomers = [];
      var customerArr = JSON.parse(
        JSON.stringify(Object.values(this.$store.state.customers))
      );
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
  },
};
</script>