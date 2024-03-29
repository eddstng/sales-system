h<template>
  <v-container>
    <v-card outlined tile height="13vh">
      <MenuDisplayCustomerSelect />
    </v-card>
    <v-card
      outlined
      tile
      class="overflow-y-auto d-block"
      height="62vh"
      v-chat-scroll
    >
      <template>
        <v-card
          class="mx-auto pt-2"
          outlined
          v-for="item in $store.state.selectedItemsOrderedByEntry"
          v-bind:key="item.timestamp"
          v-on:click="onClickSelectedItem(item)"
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
          onClickSelectedItem({
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
            <!-- <div class="menu-display-item-text">{{ item.name_eng || item.node.name_eng }}</div> -->
            <div class="menu-display-item-text">Order Customization</div>
            <div class="menu-display-item-text mt-2">全改</div>
            <div
              class="menu-display-item-text mt-5"
              v-for="customization in $store.state.currentOrder.customizations"
              v-bind:key="customization.id"
            >
              ➡ {{ customization.name_eng }}
              {{
                customization.name_chn.length === 0
                  ? ""
                  : `/ ${customization.name_chn}`
              }}
            </div>
            <!-- <div class="menu-display-item-text">{{ item.node.name_chn.length === 0 ? 'Custom Item' : item.node.name_chn }}</div> -->
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

    <v-card v-on:click="openMenuDisplayDialog()">
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
</template>

<style>
.menu-display-item-text {
  font-size: 1.2em;
}

.submitOrderDialogText {
  margin-left: 15%;
  width: 70%;
}
</style>

<script>
import utilsMixin from "../../mixins/utilsMixin";
import storeMixin from "../../mixins/storeMixin";
import MenuDisplayCustomerSelect from "./MenuDisplayCustomerSelect";

export default {
  props: ["menuComponentDetails"],
  computed: {
    currentOrderCustomizationPrice: function () {
      let totalCustomizationPrice = 0;
      this.$store.state.currentOrder.customizations.forEach((customization) => {
        totalCustomizationPrice += customization.price;
      });

      return parseFloat(totalCustomizationPrice).toFixed(2);
    },
  },
  mixins: [storeMixin, utilsMixin],
  methods: {
    onClickSelectedItem(item) {
      let updatedMenuComponentDetails = { ...this.menuComponentDetails };
      updatedMenuComponentDetails.dialogToggles.selectedItemDialog = true;
      updatedMenuComponentDetails.dialogToggles.openCustomizeSelectedItemDialog = false;
      updatedMenuComponentDetails.removeSelectedItem = item;
      this.$emit("updateMenuComponentDetails", updatedMenuComponentDetails);
    },
    openMenuDisplayDialog() {
      if (this.$store.state.menuDisplayType === "ORDER") {
        if (
          this.$store.state.selectedCustomer.phone !== undefined &&
          Object.keys(this.$store.state.selectedItems).length !== 0
        ) {
          let updatedMenuComponentDetails = { ...this.menuComponentDetails };
          updatedMenuComponentDetails.dialogToggles.submitOrderDialog = true;
          this.$emit("updateMenuComponentDetails", updatedMenuComponentDetails);
        }
      }
      if (this.$store.state.menuDisplayType === "MODIFY") {
        if (
          this.$store.state.selectedCustomer.phone !== undefined &&
          Object.keys(this.$store.state.selectedItems).length !== 0
        ) {
          let updatedMenuComponentDetails = { ...this.menuComponentDetails };
          updatedMenuComponentDetails.dialogToggles.modifyOrderDialog = true;
          this.$emit("updateMenuComponentDetails", updatedMenuComponentDetails);
        }
      }
    },
  },
  components: {
    MenuDisplayCustomerSelect,
  },
};
</script>