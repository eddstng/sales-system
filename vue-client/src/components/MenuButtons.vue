<template>
  <v-card outlined tile class="overflow-y-auto" height="95vh">
    <v-container class="grey lighten-5 fill-height">
      <v-container>
        <div
          class="d-inline"
          v-for="item in $store.state.items"
          v-bind:key="item.name_eng"
        >
          <v-btn
            v-if="item.sizes === null"
            class="menu-button-text"
            x-large
            height="180px"
            width="50%"
            v-on:click="onClickMenuButton(item)"
          >
            <div>
              {{ item.id }}<br />
              <br />
              {{ item.name_eng }}<br />{{ item.name_chn }}<br /><br />{{
                item.price
              }}
            </div>
          </v-btn>

          <template v-if="item.sizes !== null">
            <div class="d-inline">
              <v-dialog v-model="dialog" width="500">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    class="menu-button-text"
                    x-large
                    height="180px"
                    width="50%"
                    v-on:click="
                      onClickMenuButton(item);
                      dialog = true;
                    "
                    v-bind="attrs"
                    v-on="on"
                  >
                    <div>
                      {{ item.id }}<br />
                      <br />
                      {{ item.name_eng }}<br />{{ item.name_chn }}<br /><br />S:
                      {{ item.sizes.small }} <br />
                      L: {{ item.sizes.large }}
                    </div>
                  </v-btn>
                </template>

                <v-card>
                  <v-card-title class="headline grey lighten-2">
                    Privacy Policy
                  </v-card-title>

                  <v-card-text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </v-card-text>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="dialog = false">
                      I accept
                    </v-btn>

                    <v-btn
                      class="menu-button-text"
                      x-large
                      height="180px"
                      width="50%"
                      v-on:click="
                        onClickMenuButton(item);
                        dialog = false;
                      "
                      v-for="(price, size) of item.sizes"
                      v-bind:key="size"
                      @click="dialog = false"
                    >
                      <div>{{ size }}<br />{{ price }}<br /></div>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
          </template>
        </div>
      </v-container>
    </v-container>
  </v-card>
</template>

<style>
.menu-button-text {
  font-size: 1.2em;
  overflow: hidden;
  border-style: solid;
  border-color: white;
}
</style>
overflow: hidden;

<script>
import { store } from "../store/store";
export default {
  data() {
    return {
      dialog: false,
    };
  },
  mounted() {
    this.scrollToElement();
  },
  methods: {
    scrollToElement() {
      const el = this.$refs.scrollToMe;
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    },
    onClickMenuButton(item) {
      this.addItemToSelectedItems(item);
      this.calculatePriceDetails();
    },
    addItemToSelectedItems(item) {
      let selectedItems = store.state.selectedItems;
      if (item.id in selectedItems) {
        selectedItems[item.id].quantity++;
      } else {
        selectedItems[item.id] = {};
        selectedItems[item.id].node = item;
        selectedItems[item.id].quantity = 1;
      }
      store.commit("setSelectedItems", selectedItems);
    },
    calculatePriceDetails() {
      let priceDetails = store.state.priceDetails;
      priceDetails.subtotal = 0;
      priceDetails.gst = 0;
      priceDetails.total = 0;
      const selectedItems = store.state.selectedItems;
      Object.keys(selectedItems).forEach((key) => {
        console.log(key, selectedItems[key]);
        priceDetails.subtotal =
          parseFloat(selectedItems[key].node.price) *
            selectedItems[key].quantity +
          priceDetails.subtotal;
        priceDetails.gst = parseFloat(
          (priceDetails.subtotal * 0.05).toFixed(2)
        );
        priceDetails.total = priceDetails.subtotal + priceDetails.gst;
      });
      store.commit("priceDetails", priceDetails);
    },
  },
};
</script>
