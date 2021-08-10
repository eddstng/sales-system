<template>
  <v-container>
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
    <v-card>
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
            {{ $store.state.priceDetails.total }}
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
</style>

<script>
import CustomerSelect from "@/components/CustomerSelect";
export default {
  components: {
    CustomerSelect,
  },
};
</script>