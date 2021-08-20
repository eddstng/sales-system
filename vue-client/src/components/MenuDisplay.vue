<template>
  <v-container>
    <v-dialog
      v-model="submitOrderDialog"
      width="900"
    >
      <!-- Select Customer  -->
      <!-- Select Customer Button / Customer Display  -->
      <!-- Select Customer Phone Number Search Form Dialogue -->
      <v-card>
        <div>
          <br />
          <v-row class="submitOrderDialogText mt-10">
            <div>
              <v-col :cols=15>
                {{ $store.state.selectedCustomer.phone }} <br />
                {{ $store.state.selectedCustomer.address }} <br />
                {{ $store.state.selectedCustomer.name }}
              </v-col>
              <v-col v-if="$store.state.selectedCustomer.note">
                * {{ $store.state.selectedCustomer.note }} <br />
              </v-col>
            </div>
          </v-row>
          <div
            v-for="value in $store.state.selectedItems"
            v-bind:key="value"
          >
            <v-row class="submitOrderDialogText mt-5 mb-5">
              <v-col :cols=5>
                {{value.node.name_eng}}
              </v-col>
              <v-col :cols=3>
                {{value.node.name_chn}}
              </v-col>
              <v-col
                :cols=2
                class="text-center"
              >
                {{value.node.price}}
              </v-col>
              <v-col class="text-end">
                x{{value.quantity}}
              </v-col>
            </v-row>
          </div>

          <v-row class="submitOrderDialogText mt-5 mb-5">
            <v-col :cols=4>
              Subtotal: {{ $store.state.priceDetails.subtotal }}
            </v-col>
            <v-col
              :cols=4
              class="text-end"
            >
              GST: {{ $store.state.priceDetails.gst }}
            </v-col>
            <v-col
              :cols=4
              class="text-end"
            >
              Total: ${{ $store.state.priceDetails.total }}
            </v-col>
          </v-row>

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
                submitOrderDialog = false;
            "
          >
            <div>CANCEL<br /></div>
          </v-btn>
          <v-btn
            x-large
            width="50%"
            v-on:click="
                submitOrderDialog = false;
                createCustomerFormDialogue = true;
            "
          >
            <div>SUBMIT<br /></div>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card
      outlined
      tile
      height="15vh"
    >
      <CustomerSelect />
    </v-card>
    <v-card
      outlined
      tile
      class="overflow-y-auto d-block"
      height="62.5vh"
      v-chat-scroll
    >
      <template>
        <v-card
          class="mx-auto pt-2"
          outlined
          v-for="value in $store.state.selectedItems"
          v-bind:key="value"
          height="7em"
          width="100vw"
        >
          <v-list-item three-line>
            <v-list-item-content>
              <div class="menu-display-item-text">{{ value.node.name_eng }}</div>
              <div class="menu-display-item-text">{{ value.node.name_chn }}</div>
            </v-list-item-content>
            <v-list-item-content>
              <div class="menu-display-item-text text-right">
                x {{ value.quantity }}
              </div>
              <div class="menu-display-item-text text-right">
                {{ value.node.price * value.quantity }}
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </template>
    </v-card>
    <v-card v-on:click="
                phone = '';
                submitOrderDialogConditional()
            ">
      <v-list-item three-line>
        <v-list-item-content>
          <div class="menu-display-item-text">Subtotal:</div>
          <div class="menu-display-item-text">GST:</div>
          <div class="menu-display-item-text mt-5">Total:</div>
        </v-list-item-content>
        <v-list-item-content>
          <div class="menu-display-item-text text-right">
            {{ $store.state.priceDetails.subtotal }}
          </div>
          <div class="menu-display-item-text text-right">
            {{ $store.state.priceDetails.gst }}
          </div>
          <div class="menu-display-item-text text-right mt-5 mb-0">
            ${{ $store.state.priceDetails.total }}
          </div>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </v-container>
</template>

<style>
.menu-display-item-text {
  font-size: 1.2em;
}

.menu-display-customer-text {
  font-size: 1.2em;
  margin-left: 0.9em;
}

.text-right {
  position: right;
}

.submitOrderDialogText {
  margin-left: 15%;
  width: 600px;
}
</style>

<script>
import { store } from "../store/store";
import CustomerSelect from "@/components/CustomerSelect";
export default {
  data() {
    return {
      selectTableFormDialogue: false,
      submitOrderDialog: false,
      createCustomerFormDialogue: false,
      createCustomerError: null,
      suggestedCustomers: [],
      suggestedStreetName: [],
      orderType: null,
      orderTypeString: ["DINE IN", "PICK UP", "DELIVERY"],
    };
  },
  methods: {
    submitOrderDialogConditional: function () {
      if (
        this.$store.state.selectedCustomer.phone !== "" &&
        Object.keys(store.state.selectedItems).length !== 0
      ) {
        this.submitOrderDialog = true;
      }
    },
  },
  components: {
    CustomerSelect,
  },
};
</script>