<template>
  <v-container>
    <v-card
      outlined
      tile
      height="16vh"
    >
      <HistorySelect />
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
import HistorySelect from "./HistorySelect";
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
  },
  components: {
    HistorySelect,
  },
};
</script> 