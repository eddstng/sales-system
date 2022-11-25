<template>
  <div>
    <v-container>
      <v-card
        outlined
        tile
        height="13vh"
        v-on:click="openModifyCustomerDialog()"
      >
        <CustomerDisplayCustomer />
      </v-card>
      <v-card
        outlined
        tile
        class="overflow-y-auto d-block"
        height="62vh"
        v-chat-scroll
      >
        <template>
          <div
            v-if="$store.state.selectedCustomer.phone == ''"
            class="p-0"
            max-height="400"
          >
            <p class="text-subtitle-2 text-center pt-35p">SELECT A CUSTOMER</p>
          </div>
          <div
            v-else-if="
              $store.state.selectedItemsOrderedByEntry &&
              Object.keys($store.state.selectedItemsOrderedByEntry).length === 0
            "
            class="p-0"
            max-height="400"
          >
            <p class="text-subtitle-2 text-center pt-35p">SELECT AN ORDER</p>
          </div>
          <v-card
            class="mx-auto pt-2"
            outlined
            v-for="item in $store.state.selectedItemsOrderedByEntry"
            v-bind:key="item.timestamp"
          >
            <v-list-item three-line v-if="item.node !== undefined">
              <v-list-item-content style="width: 100px">
                <div class="menu-display-item-text" style="width: 90%">
                  {{ item.node.custom_name || item.node.name_eng }}
                </div>
                <div class="menu-display-item-text" style="width: 90%">
                  {{
                    item.node.name_chn.length === 0
                      ? "Custom Item"
                      : item.node.name_chn
                  }}
                </div>
              </v-list-item-content>
              <v-list-item-content>
                <div class="menu-display-item-text text-right">
                  {{ item.quantity ? `x ${item.quantity}` : "" }}
                </div>
                <div class="menu-display-item-text text-right">
                  {{
                    item.node.custom_price || item.node.price
                      ? `$${(
                          (item.node.custom_price
                            ? item.node.custom_price
                            : item.node.price) * item.quantity
                        ).toFixed(2)}`
                      : ""
                  }}
                </div>
                <br />
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
        <v-card
          class="mx-auto pt-2"
          outlined
          v-if="$store.state.currentOrder.customizations.length !== 0"
          width="100vw"
          v-on:click="
            openSelectedItemDialog({
              node: {
                name_chn: '全改',
                name_eng: 'Order Customization',
                category: 'customizations',
              },
              customizations: $store.state.currentOrder.customizations,
            })
          "
        >
          <v-list-item three-line>
            <v-list-item-content>
              <div class="menu-display-item-text">Order Customization</div>
              <div class="menu-display-item-text mt-2">全改</div>
              <div
                class="menu-display-item-text mt-5"
                v-for="customization in $store.state.currentOrder
                  .customizations"
                v-bind:key="customization.id"
              >
                ➡ {{ customization.name_eng }}
                {{
                  customization.name_chn.length === 0
                    ? ""
                    : `/ ${customization.name_chn}`
                }}
              </div>
            </v-list-item-content>

            <v-list-item-content>
              <div class="menu-display-item-text text-right">
                ${{ currentOrderCustomizationPrice }}
              </div>
              <br />
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-card>

      <v-card v-on:click="openHistoryOptionDialog">
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
    <HistoryDisplayHistoryOptionsDialog
      v-bind:historyOptionsDetails="historyOptionsDetails"
      @setHistoryOptionsDetails="setHistoryOptionsDetails"
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
import HistoryDisplayHistoryOptionsDialog from "../History/HistoryDisplayHistoryOptionsDialog";
import MenuDisplayCustomerSelectCreateCustomerFormDialog from "../Menu/MenuDisplayCustomerSelectCreateCustomerFormDialog";
export default {
  props: ["customerOptionDetails"],
  components: {
    MenuDisplayCustomerSelectCreateCustomerFormDialog,
    CustomerDisplayCustomer,
    HistoryDisplayHistoryOptionsDialog,
  },
  computed: {
    currentOrderCustomizationPrice: function () {
      let totalCustomizationPrice = 0;
      this.$store.state.currentOrder.customizations.forEach((customization) => {
        totalCustomizationPrice += customization.price;
      });

      return parseFloat(totalCustomizationPrice).toFixed(2);
    },
  },
  data() {
    return {
       historyOptionsDetails: {
        confirmingAction: "",
        openHistoryOptionsConfirmationDialog: false,
        openHistoryOptionsReprintDialog: false,
        openHistoryOptionsDialog: false,
      },
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
        setHistoryOptionsDetails: function (historyOptionsDetails) {
      this.historyOptionsDetails = historyOptionsDetails;
    },
    openHistoryOptionDialog() {
      if (
        this.$store.state.selectedItemsOrderedByEntry &&
        Object.keys(this.$store.state.selectedItemsOrderedByEntry).length !== 0
      )
        this.historyOptionsDetails.openHistoryOptionsDialog = true;
    },
    openModifyCustomerDialog: function () {
      if (this.$store.state.selectedCustomer.phone !== "") {
        this.selectedCustomerDetails.createCustomerFormDialog = true;
        this.selectedCustomerDetails.selectedCustomer =
          this.$store.state.selectedCustomer;
      }
    },
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
  