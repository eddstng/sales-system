<template>
  <div>
    <v-container>
      <v-card
        outlined
        tile
        height="16vh"
        v-on:click="
          selectedCustomerDetails.createCustomerFormDialog = true;
          selectedCustomerDetails.selectedCustomer =
            $store.state.selectedCustomer;
        "
      >
        <CustomerDisplayCustomer />
      </v-card>
      <v-card
        outlined
        tile
        class="overflow-y-auto d-block"
        height="62.5vh"
        v-chat-scroll
      >
        <template>
          <!-- <v-btn
            class="history-button-text"
            v-for="customer in customerOptionDetails.customerOrderHistory"
            v-bind:key="customer.order_id"
            x-large
            dark
            height="80px"
            width="100%"
            v-on:click="onClickCustomerButton(customer)"
          >
            <v-row>
              <v-col>
                {{ new Date(customer.timestamp).toLocaleDateString() }}
                {{ getFormattedTimeStamp(new Date(customer.timestamp)) }}
                {{ customer.id }}
                ${{ customer.total.toFixed(2) }}
              </v-col>
              <v-col>
                {{ customer.name }}
              </v-col>
              <v-col class="">
                {{ customer.address }}
              </v-col>
            </v-row>
          </v-btn> -->

          <v-card
            class="mx-auto pt-2"
            outlined
            v-for="item in $store.state.selectedItemsOrderedByEntry"
            v-bind:key="item.id"
            width="100vw"
          >
            <v-list-item three-line>
              <v-list-item-content>
                <div class="history-display-item-text">
                  {{ item.node.name_eng }}
                </div>
                <div class="history-display-item-text">
                  {{
                    item.node.name_chn.length === 0
                      ? "Custom Item"
                      : item.node.name_chn
                  }}
                </div>
              </v-list-item-content>
              <v-list-item-content>
                <div class="history-display-item-text text-right">
                  x {{ item.quantity }}
                </div>
                <div class="history-display-item-text text-right">
                  {{
                    (
                      (item.node.custom_price
                        ? item.node.custom_price
                        : item.node.price) * item.quantity
                    ).toFixed(2)
                  }}
                </div>
              </v-list-item-content>
            </v-list-item>
            <v-list-item-content
              v-for="customization in item.customizations"
              v-bind:key="customization.id"
            >
              <div class="menu-display-item-text pl-5">
                ➡ {{ customization.name_eng }}
                {{
                  customization.name_chn === ""
                    ? ""
                    : "/" + customization.name_chn
                }}
              </div>
            </v-list-item-content>
          </v-card>
        </template>
      </v-card>
      <v-card
        v-on:click="customerOptionDetails.openHistoryOptionsDialog = true"
      >
        <v-list-item three-line>
          <v-list-item-content>
            <div class="menu-display-item-text">Subtotal:</div>
            <div class="menu-display-item-text">Discount:</div>
            <div class="menu-display-item-text">GST:</div>
            <div class="menu-display-item-text mt-5">Total:</div>
          </v-list-item-content>
          <v-list-item-content>
            <div class="menu-display-item-text text-right">
              {{ $store.state.priceDetails.subtotal.toFixed(2) }}
            </div>
            <div class="menu-display-item-text text-right">
              -{{ $store.state.priceDetails.discount.toFixed(2) }}
            </div>
            <div class="menu-display-item-text text-right">
              {{ $store.state.priceDetails.gst.toFixed(2) }}
            </div>
            <div class="menu-display-item-text text-right mt-5 mb-0">
              ${{ $store.state.priceDetails.total.toFixed(2) }}
            </div>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-container>
    <MenuDisplayCustomerSelectCreateCustomerFormDialog
      v-bind:selectedCustomerDetails="selectedCustomerDetails"
    />
  </div>
</template>

<style>
.history-display-item-text {
  font-size: 1.2em;
}
</style>

<script>
import CustomerDisplayCustomer from "../Customer/CustomerDisplayCustomer";
import MenuDisplayCustomerSelectCreateCustomerFormDialog from "../Menu/MenuDisplayCustomerSelectCreateCustomerFormDialog";
export default {
  props: ["customerOptionDetails"],
  components: {
    MenuDisplayCustomerSelectCreateCustomerFormDialog,
    CustomerDisplayCustomer,
  },
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
    getFormattedTimeStamp: function (orderTimestamp) {
      var hours = orderTimestamp.getHours();
      var minutes = orderTimestamp.getMinutes();
      var ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? "0" + minutes : minutes;
      var strTime = hours + ":" + minutes + " " + ampm;
      return strTime;
    },
  },
};
</script>
  