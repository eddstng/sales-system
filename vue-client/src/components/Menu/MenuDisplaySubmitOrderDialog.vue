<template>
  <v-dialog
    persistent
    v-model="menuComponentDetails.dialogToggles.submitOrderDialog"
    @keydown.esc="onEsc()"
    width="80%"
  >
    <v-card>
      <div>
        <div>
          <div class="dialog-header-font">
            <br />
            <v-row class="submitOrderDialogText mt-1">
              <v-col>
                {{ orderTypeString[$store.state.currentOrder.type] }}</v-col
              >
              <v-col :cols="3">
                {{ $store.state.selectedCustomer.name }}
              </v-col>
              <v-col :cols="3">
                {{
                  $store.state.selectedCustomer.phone.replace(
                    /(\d{3})(\d{3})(\d{3})/,
                    "$1-$2-$3"
                  )
                }}
              </v-col>
              <v-col :cols="4">
                {{ $store.state.selectedCustomer.address }}
              </v-col>
            </v-row>
            <v-row class="submitOrderDialogText mt-0">
              <v-col :cols="5" v-if="$store.state.selectedCustomer.note">
                <!-- <v-col :cols="4"> -->
                {{ `Note: ${$store.state.selectedCustomer.note}` }}
              </v-col>
              <v-col v-if="$store.state.currentOrder.internal === true">
                Internal Order: TRUE</v-col
              >
            </v-row>
            <v-row class="submitOrderDialogText"> </v-row>
            <br />
          </div>
          <v-card class="overflow-y-auto" height="58vh">
            <div class="text-center">[ ▼ ]</div>
            <div
              v-for="value in $store.state.selectedItemsOrderedByEntry"
              v-bind:key="value.id"
            >
              <v-divider></v-divider>
              <v-row
                v-if="value.node !== undefined"
                class="submitOrderDialogText pt-2 pb-2"
              >
                <v-col> x{{ value.quantity }} </v-col>
                <v-col :cols="5">
                  {{ value.node.name_eng }}
                </v-col>
                <v-col :cols="4">
                  {{ value.node.name_chn }}
                </v-col>
                <v-col :cols="2" class="text-center">
                  ${{
                    Number(
                      value.node.custom_price
                        ? value.node.custom_price
                        : value.node.price
                    ).toFixed(2)
                  }}
                </v-col>
              </v-row>
              <v-list-item-content
                v-for="customization in value.customizations"
                v-bind:key="customization.id"
              >
                <div class="submitOrderItemCustomizationText">
                  ➡ {{ customization.name_eng }}
                  {{
                    customization.name_chn === ""
                      ? ""
                      : "/" + customization.name_chn
                  }}
                  {{
                    customization.price !== 0 ? `- $${customization.price}` : ""
                  }}
                </div>
              </v-list-item-content>
            </div>

            <v-divider></v-divider>
            <div>
              <div
                v-if="$store.state.currentOrder.customizations.length !== 0"
                class="mt-5 mb-3"
              >
                <v-row class="submitOrderDialogText">
                  <v-col :cols="1"> ❂</v-col>
                  <v-col :cols="5"> Order Customization</v-col>
                  <v-col :cols="4"> 全改 </v-col>
                  <v-col :cols="2" class="pl-16">
                    ${{
                      this.$store.state.currentOrder.customizations_price.toFixed(
                        2
                      )
                    }}</v-col
                  >
                </v-row>
                <div
                  v-for="customization in $store.state.currentOrder
                    .customizations"
                  v-bind:key="customization.id"
                >
                  <v-list-item-content>
                    <div class="submitOrderItemCustomizationText">
                      ➡ {{ customization.name_eng }}
                      {{
                        customization.name_chn === ""
                          ? ""
                          : "/" + customization.name_chn
                      }}
                      + ${{
                        Number(
                          customization.custom_price
                            ? customization.custom_price
                            : customization.price
                        ).toFixed(2)
                      }}
                    </div>
                  </v-list-item-content>
                </div>
                <v-divider></v-divider>
              </div>
              <div class="text-center mb-1">[ ▲ ]</div>
            </div>
          </v-card>
        </div>
      </div>
      <div class="card-actions">
        <v-divider> </v-divider>
        <v-row class="submitOrderDialogText mt-1 mb-1">
          <v-col :cols="2">
            Number of Items:
            {{ $store.state.currentOrder.itemQuantity }}
          </v-col>
          <v-col :cols="2">
            Subtotal: {{ $store.state.priceDetails.subtotal.toFixed(2) }}
          </v-col>
          <v-col :cols="2" class="text-end">
            Discount: -{{ $store.state.priceDetails.discount.toFixed(2) }}
          </v-col>
          <v-col :cols="2" class="text-end">
            PST: {{ $store.state.priceDetails.pst.toFixed(2) }}
          </v-col>
          <v-col :cols="2" class="text-end">
            GST: {{ $store.state.priceDetails.gst.toFixed(2) }}
          </v-col>
          <v-col :cols="2" class="text-end">
            Total: ${{ $store.state.priceDetails.total.toFixed(2) }}
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn x-large width="50%" v-on:click="onClickCancel()">
            <div>CANCEL<br /></div>
          </v-btn>
          <v-btn
            x-large
            width="50%"
            v-on:click="onClickCancel(), submitOrder()"
          >
            <div>SUBMIT<br /></div>
          </v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </v-dialog>
</template>

<style>
.card-actions {
  bottom: 0;
}

.pl-25 {
  padding-left: 8em;
}

.submitOrderItemCustomizationText {
  margin-left: 22%;
}

.dialog-header-font {
  font-weight: bold;
  font-size: 18px;
}

.user-select-disabled {
  user-select: none;
  -webkit-user-select: none; /*Safari*/
  -moz-user-select: none; /*Firefox*/
}
</style>

<script>
import storeMixin from "../../mixins/storeMixin";
import { store } from "../../store/store";
import axios from "axios";

export default {
  mixins: [storeMixin],
  props: ["menuComponentDetails"],
  data() {
    return {
      orderTypeString: ["DINE IN", "PICK UP", "DELIVERY"],
    };
  },
  methods: {
    onEsc() {
      this.onClickCancel();
    },
    onClickCancel() {
      let updatedMenuComponentDetails = { ...this.menuComponentDetails };
      updatedMenuComponentDetails.dialogToggles.submitOrderDialog = false;
      this.$emit("updateMenuComponentDetails", updatedMenuComponentDetails);
    },
    submitOrder: async function () {
      try {
        store.commit("setNotification", 4);
        await this.submitOrderFunction({
          customer_id: this.$store.state.selectedCustomer.id,
          orderDetails: this.$store.state.currentOrder,
          items: this.$store.state.selectedItems,
          priceDetails: this.$store.state.priceDetails,
        });
        this.storeMixinClearOrderRelatedDetails();
        store.commit("setNotification", 1);
      } catch (err) {
        store.commit("setErrorToDisplay", err.response.data);
        store.commit("setNotification", 5);
      }
    },

    submitOrderFunction: async function ({
      customer_id,
      orderDetails,
      items,
      priceDetails,
    }) {
      await axios.post("http://localhost:3000/post/submitorder", {
        customer_id: customer_id,
        orderDetails: orderDetails,
        items: items,
        priceDetails: priceDetails,
      });
    },
  },
};
</script>
