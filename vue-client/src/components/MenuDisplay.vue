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
            v-bind:key="value.id"
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
                submitOrder();
            "
          >
            <div>SUBMIT<br /></div>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-if="removeSelectedItem.node !== undefined"
      v-model="removeSelectedItemDialog"
      width="600px"
    >
      <v-card>
        <div>
          <h3 class="text-center pt-10 pb-5">
            REMOVE ITEM
            <br />
            <br />
            {{removeSelectedItem.node.name_eng}}
            <br />
            {{removeSelectedItem.node.name_chn}}
          </h3>

          <br />
        </div>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            x-large
            width="32%"
            v-on:click="
              removeSelectedItemDialog=false
              removeSelectedItem={}
            "
          >
            <div>CANCEL<br /></div>
          </v-btn>
          <v-btn
            x-large
            width="32%"
            v-on:click="
              removeSelectedItemDialog=false;
              removeSelectedItemOne(removeSelectedItem);
              removeSelectedItem={};
            "
          >
            <div>REMOVE 1<br /></div>
          </v-btn>
          <v-btn
            x-large
            width="32%"
            v-on:click="
              removeSelectedItemDialog=false;
              removeSelectedItemAll(removeSelectedItem);
              removeSelectedItem={};
            "
          >
            <div>REMOVE ALL<br /></div>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card
      outlined
      tile
      height="16vh"
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
          v-for="item in $store.state.selectedItems"
          v-bind:key="item.id"
          height="7em"
          width="100vw"
          v-on:click="      
            removeSelectedItemDialog = true;
            removeSelectedItem = item;
          "
        >
          <v-list-item three-line>
            <v-list-item-content>
              <div class="menu-display-item-text">{{ item.node.name_eng }}</div>
              <div class="menu-display-item-text">{{ item.node.name_chn }}</div>
            </v-list-item-content>
            <v-list-item-content>
              <div class="menu-display-item-text text-right">
                x {{ item.quantity }}
              </div>
              <div class="menu-display-item-text text-right">
                {{ item.node.price * item.quantity }}
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
import axios from "axios";
import { store } from "../store/store";
import CustomerSelect from "@/components/CustomerSelect";
export default {
  data() {
    return {
      removeSelectedItemDialog: false,
      removeSelectedItem: {},
      submitOrderDialog: false,
      createCustomerError: null,
      suggestedCustomers: [],
      suggestedStreetName: [],
    };
  },
  methods: {
    calculatePriceDetails: function () {
      this.$root.$refs.MenuButtons.calculatePriceDetails();
    },
    removeSelectedItemOne: function (selectedItem) {
      const selectedItems = Object.assign({}, this.$store.state.selectedItems);
      if (selectedItems[selectedItem.node.id].quantity === 1) {
        delete selectedItems[selectedItem.node.id];
      } else {
        selectedItems[selectedItem.node.id].quantity =
          selectedItems[selectedItem.node.id].quantity - 1;
      }
      store.commit("setSelectedItems", selectedItems);
      this.calculatePriceDetails();
    },
    removeSelectedItemAll: function (selectedItem) {
      const selectedItems = Object.assign({}, this.$store.state.selectedItems);
      delete selectedItems[selectedItem.node.id];
      store.commit("setSelectedItems", selectedItems);
      this.calculatePriceDetails();
    },
    submitOrderDialogConditional: function () {
      if (
        this.$store.state.selectedCustomer.phone !== undefined &&
        Object.keys(store.state.selectedItems).length !== 0
      ) {
        this.submitOrderDialog = true;
      }
    },
    addItemsToOrder: async function (orderIdNum) {
      const orderItemsCreateManyInputData = [];
      for (const [key, value] of Object.entries(
        this.$store.state.selectedItems
      )) {
        orderItemsCreateManyInputData.push({
          order_id: orderIdNum,
          item_id: parseInt(key),
          quantity: value.quantity,
        });
      }

      console.log(orderItemsCreateManyInputData);
      const res = await axios.post(
        "http://localhost:3000/post/ordersitems/create/bulk",
        orderItemsCreateManyInputData
      );
      console.log(res);
      if (isNaN(res.status !== 200)) {
        throw new Error(
          `Failed to submit order during addItemsToOrder. ${res}`
        );
      }
    },
    clearOrder: function () {
      store.commit("setSelectedCustomer", {});

      store.commit("setPriceDetails", {
        subtotal: 0,
        gst: 0,
        total: 0,
      });

      store.commit("setSelectedItems", {});
      store.commit("setCurrentOrder", {
        id: null,
        type: null,
      });
    },
    submitOrder: async function () {
      try {
        console.log({
          total: this.$store.state.priceDetails.total,
          customer_id: this.$store.state.selectedCustomer.id,
          type: this.$store.state.currentOrder.type,
        });
        const res = await axios.post(
          "http://localhost:3000/post/orders/create",
          {
            total: this.$store.state.priceDetails.total,
            customer_id: this.$store.state.selectedCustomer.id,
            type: this.$store.state.currentOrder.type,
          }
        );
        if (isNaN(res.data.id)) {
          throw new Error("Failed to submit order. No order id retrieved.");
        }

        this.addItemsToOrder(res.data.id);
        this.clearOrder();
        store.commit("setNotification", 1);
      } catch (err) {
        store.commit("setNotification", 2);
        console.log(err);
      }
    },
  },
  components: {
    CustomerSelect,
  },
};
</script>