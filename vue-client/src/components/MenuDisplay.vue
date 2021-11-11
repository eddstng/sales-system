<template>
  <v-container>
    <v-dialog v-model="submitOrderDialog" width="900">
      <v-card>
        <div>
          <br />
          <v-row class="submitOrderDialogText mt-10">
            <div>
              <v-col :cols="15">
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
            <v-row
              v-if="value.node !== undefined"
              class="submitOrderDialogText mt-5 mb-5"
            >
              <v-col :cols="5">
                {{ value.node.name_eng }}
              </v-col>
              <v-col :cols="3">
                {{ value.node.name_chn }}
              </v-col>
              <v-col :cols="2" class="text-center">
                {{ value.node.price }}
              </v-col>
              <v-col class="text-end"> x{{ value.quantity }} </v-col>
            </v-row>
          </div>

          <v-row class="submitOrderDialogText mt-5 mb-5">
            <v-col :cols="4">
              Subtotal: {{ $store.state.priceDetails.subtotal.toFixed(2) }}
            </v-col>
            <v-col :cols="4" class="text-end">
              GST: {{ $store.state.priceDetails.gst.toFixed(2) }}
            </v-col>
            <v-col :cols="4" class="text-end">
              Total: ${{ $store.state.priceDetails.total.toFixed(2) }}
            </v-col>
          </v-row>

          <br />
        </div>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn x-large width="50%" v-on:click="submitOrderDialog = false">
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
      width="1000px"
    >
      <v-card>
        <div>
          <h3 class="text-center pt-10 pb-5">
            REMOVE ITEM
            <br />
            <br />
            {{ removeSelectedItem.node.name_eng }}
            <br />
            {{ removeSelectedItem.node.name_chn }}
          </h3>

          <br />
        </div>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            x-large
            width="19.6%"
            v-on:click="
              removeSelectedItemDialog = false;
              removeSelectedItem = {};
            "
          >
            <div>CANCEL<br /></div>
          </v-btn>
          <v-btn
            x-large
            width="19.6%"
            v-on:click="openCustomizeItemDialogue = true"
          >
            <div>CUSTOMIZE<br /></div>
          </v-btn>
          <v-btn
            x-large
            width="19.6%"
            v-on:click="
              removeSelectedItemDialog = false;
              removeSelectedItemAll(removeSelectedItem);
              removeSelectedItem = {};
            "
          >
            <div>REMOVE ALL<br /></div>
          </v-btn>
          <v-btn
            x-large
            width="19.6%"
            v-on:click="
              removeSelectedItemDialog = false;
              removeSelectedItemOne(removeSelectedItem);
              removeSelectedItem = {};
            "
          >
            <div>REMOVE 1<br /></div>
          </v-btn>
          <v-btn
            x-large
            width="19.6%"
            v-on:click="
              removeSelectedItemDialog = false;
              addSelectedItemOne(removeSelectedItem);
              removeSelectedItem = {};
            "
          >
            <div>ADD 1<br /></div>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-if="openCustomizeItemDialogue"
      v-model="removeSelectedItemDialog"
      width="1000px"
    >
      <v-card>
        <div>
          <h3 class="text-center pt-10 pb-5">
            CUSTOMIZE ITEM
            <br />
            <br />
            {{ removeSelectedItem.node.name_eng }}
            <br />
            {{ removeSelectedItem.node.name_chn }}
          </h3>

          <br />
          <v-btn
            v-for="customization in customizations"
            v-bind:key="customization.name_eng"
            class="mt-1 mr-1"
            x-large
            width="19.6%"
            height="80px"
            v-on:click="
              openCustomizeItemDialogue = false;
              removeSelectedItemDialog = false;
              addCustomizationToItem(removeSelectedItem, {
                name_eng: `NO ${customization.name_eng}`,
                name_chn: `NO ${customization.name_chn}`,
              });
            "
          >
            <p>
              NO {{ customization.name_eng }}<br />NO
              {{ customization.name_chn }}
            </p>
          </v-btn>
          <v-btn
            v-for="customization in customizations"
            v-bind:key="customization.name_eng"
            class="mt-1 mr-1"
            x-large
            width="19.6%"
            height="80px"
            v-on:click="
              openCustomizeItemDialogue = false;
              removeSelectedItemDialog = false;
              addCustomizationToItem(removeSelectedItem, {
                name_eng: `LESS ${customization.name_eng}`,
                name_chn: `LESS ${customization.name_chn}`,
              });
            "
          >
            <p>
              LESS {{ customization.name_eng }}<br />LESS
              {{ customization.name_chn }}
            </p>
          </v-btn>
          <v-btn
            v-for="customization in customizations"
            v-bind:key="customization.name_eng"
            class="mt-1 mr-1"
            x-large
            width="19.6%"
            height="80px"
            v-on:click="
              openCustomizeItemDialogue = false;
              removeSelectedItemDialog = false;
              addCustomizationToItem(removeSelectedItem, {
                name_eng: `ADD ${customization.name_eng}`,
                name_chn: `ADD ${customization.name_chn}`,
              });
            "
          >
            <p>
              ADD {{ customization.name_eng }}<br />ADD
              {{ customization.name_chn }}
            </p>
          </v-btn>
          <v-btn
            class="mt-3 mb-3"
            x-large
            width="20%"
            height="80px"
            v-on:click="
              openCustomizeItemDialogue = false;
              removeSelectedItemDialog = false;
              addCustomizationToItem(removeSelectedItem, {
                name_eng: `CUSTOM: `,
                name_chn: `CUSTOM: `,
              });
            "
          >
            <p>CUSTOM</p>
          </v-btn>
        </div>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            x-large
            width="100%"
            v-on:click="openCustomizeItemDialogue = false"
          >
            <div>CANCEL<br /></div>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card outlined tile height="16vh">
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
          width="100vw"
          v-on:click="
            removeSelectedItemDialog = true;
            removeSelectedItem = item;
          "
        >
          <v-list-item three-line v-if="item.node !== undefined">
            <v-list-item-content>
              <div class="menu-display-item-text">{{ item.node.name_eng }}</div>
              <div class="menu-display-item-text">{{ item.node.name_chn }}</div>
            </v-list-item-content>
            <v-list-item-content>
              <div class="menu-display-item-text text-right">
                x {{ item.quantity }}
              </div>
              <div class="menu-display-item-text text-right">
                {{ (item.node.price * item.quantity).toFixed(2) }}
              </div>
              <br />
            </v-list-item-content>
          </v-list-item>
          <v-list-item-content
            v-for="customization in item.customizations"
            v-bind:key="customization.id"
          >
            <div class="menu-display-item-text pl-5">
              - {{ customization.name_eng }} / {{ customization.name_chn }}
            </div>
          </v-list-item-content>
        </v-card>
      </template>
    </v-card>
    <v-card
      v-on:click="
        phone = '';
        submitOrderDialogConditional();
      "
    >
      <v-list-item three-line>
        <v-list-item-content>
          <div class="menu-display-item-text">Subtotal:</div>
          <div class="menu-display-item-text">GST:</div>
          <div class="menu-display-item-text mt-5">Total:</div>
        </v-list-item-content>
        <v-list-item-content>
          <div class="menu-display-item-text text-right">
            {{ $store.state.priceDetails.subtotal.toFixed(2) }}
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
</template>

<style>
.menu-display-item-text {
  font-size: 1.2em;
}

.submitOrderDialogText {
  margin-left: 15%;
  width: 600px;
}
</style>

<script>
import axios from "axios";
import { store } from "../store/store";
import CustomerSelect from "./CustomerSelect";
export default {
  data() {
    return {
      customizations: [
        {
          name_eng: "MSG",
          name_chn: "123456",
        },
        {
          name_eng: "SESAME",
          name_chn: "123456",
        },
        {
          name_eng: "SALT",
          name_chn: "123456",
        },
        {
          name_eng: "OIL",
          name_chn: "123456",
        },
        {
          name_eng: "SPICY",
          name_chn: "123456",
        },
      ],
      openCustomizeItemDialogue: false,
      removeSelectedItemDialog: false,
      removeSelectedItem: {},
      submitOrderDialog: false,
      suggestedStreetName: [],
    };
  },
  methods: {
    calculatePriceDetails: function () {
      this.$root.$refs.App.calculatePriceDetails();
    },
    clearOrderRelatedStore: function () {
      this.$root.$refs.App.clearOrderRelatedStore();
    },
    addCustomizationToItem: function (selectedItem, customizationObj) {
        console.log(JSON.stringify(selectedItem));

const vueStoreKeyToDelete = selectedItem.custom_id ?? selectedItem.node.id;
      const selectedItems = Object.assign({}, this.$store.state.selectedItems);
      if (
        selectedItems[selectedItem.custom_id ?? selectedItem.node.id.toString()]
          .customizations === undefined
      ) {
        selectedItems[
          selectedItem.custom_id ?? selectedItem.node.id.toString()
        ].customizations = [customizationObj];
      } else {
        selectedItems[
          selectedItem.custom_id ?? selectedItem.node.id.toString()
        ].customizations.push(customizationObj); // update to check if it is array
      }

      if (!selectedItem.customizations.length !== 0) {
        let customizedItemKeyName = `${selectedItem.node.id.toString()}C-`;
        let customizedItemKeyNumber = 0;
        while (
          selectedItems[
            `${customizedItemKeyName}${customizedItemKeyNumber}`
          ] !== undefined
        ) {
          customizedItemKeyNumber++;
        }
        selectedItems[`${customizedItemKeyName}${customizedItemKeyNumber}`] =
          {};
        selectedItems[`${customizedItemKeyName}${customizedItemKeyNumber}`] =
          selectedItem;
        selectedItems[
          `${customizedItemKeyName}${customizedItemKeyNumber}`
        ].custom_id = `${customizedItemKeyName}${customizedItemKeyNumber}`;
        selectedItems[
          `${customizedItemKeyName}${customizedItemKeyNumber}`
        ].quantity = 1;

        store.commit("setSelectedItems", selectedItems);
        console.log(JSON.stringify(selectedItem));
        this.removeSelectedItemOneByVueStoreKey(vueStoreKeyToDelete);
      }
    },
    removeSelectedItemOneByVueStoreKey: function (vueStoreKeyToDelete) {
      const selectedItems = Object.assign({}, this.$store.state.selectedItems);
      if (
        selectedItems[vueStoreKeyToDelete]
          .quantity === 1
      ) {
        delete selectedItems[vueStoreKeyToDelete];
      } else {
        selectedItems[vueStoreKeyToDelete].quantity - 1;
      }
      store.commit("setSelectedItems", selectedItems);
      this.calculatePriceDetails();
    },
    removeSelectedItemOne: function (selectedItem) {
      const selectedItems = Object.assign({}, this.$store.state.selectedItems);
      if (
        selectedItems[selectedItem.custom_id ?? selectedItem.node.id]
          .quantity === 1
      ) {
        delete selectedItems[selectedItem.custom_id ?? selectedItem.node.id];
      } else {
        selectedItems[selectedItem.node.id].quantity - 1;
      }
      store.commit("setSelectedItems", selectedItems);
      this.calculatePriceDetails();
    },
    addSelectedItemOne: function (selectedItem) {
      const selectedItems = Object.assign({}, this.$store.state.selectedItems);
      selectedItems[selectedItem.node.id].quantity++;
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
    submitOrder: async function () {
      try {
        const newOrder = await this.createOrder();
        this.addItemsToOrder(newOrder.data.id);
        this.updateOrderWithTotalPrice(newOrder);
        this.clearOrderRelatedStore();
        store.commit("setNotification", 1);
      } catch (err) {
        store.commit("setNotification", 2);
        console.log(err);
      }
    },
    updateOrderWithTotalPrice: async function (orderDetails) {
      const res = await axios.put(
        `http://localhost:3000/put/orders/update/id/${orderDetails.data.id}`,
        {
          ...this.orderDetails,
          total: this.$store.state.priceDetails.total,
        }
      );
      if (isNaN(res.status !== 200)) {
        throw new Error(
          `Failed to submit order. Received status code of ${res.status}.`
        );
      }
      return res;
    },
    createOrder: async function () {
      const res = await axios.post("http://localhost:3000/post/orders/create", {
        total: 0,
        customer_id: this.$store.state.selectedCustomer.id,
        type: this.$store.state.currentOrder.type,
      });
      if (isNaN(res.data.id)) {
        throw new Error("Failed to submit order. No order id retrieved.");
      }
      return res;
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
          customizations: value.customizations,
          // <!-- TO DO: We want to make the id an environment variable instead. -->
          custom_price: key === "198" ? value.node.price : null,
          custom_name: key === "198" ? value.node.name_eng : null
        });
      }
      const res = await axios.post(
        "http://localhost:3000/post/ordersitems/create/bulk",
        orderItemsCreateManyInputData
      );
      if (res.status !== 200) {
        throw new Error(
          `Failed to submit order during addItemsToOrder. ${res}`
        );
      }
    },
  },
  components: {
    CustomerSelect,
  },
};
</script>