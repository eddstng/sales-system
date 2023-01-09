<template>
  <v-card class="fill-height" outlined tile>
    <v-container class="grey lighten-5 fill-height">
      <template>
        <v-container>
          <v-row>
            <v-col>
              <div>
                <div>
                  <v-btn
                    class="my-2 text-md-body-1"
                    x-large
                    v-bind:color="
                      $store.state.component === 'ORDER' ? 'green' : 'grey'
                    "
                    dark
                    height="150px"
                    width="100%"
                    v-on:click="changeComponent('ORDER')"
                    >ORDER</v-btn
                  >
                  <v-btn
                    class="my-2 text-md-body-1"
                    x-large
                    v-bind:color="
                      $store.state.component === 'HISTORY' ? 'green' : 'grey'
                    "
                    dark
                    height="150px"
                    width="100%"
                    v-on:click="changeComponent('HISTORY')"
                    >HISTORY</v-btn
                  >
                  <v-btn
                    class="my-2 text-md-body-2"
                    x-large
                    v-bind:color="
                      $store.state.component === 'CUSTOMER' ? 'green' : 'grey'
                    "
                    dark
                    height="150px"
                    width="100%"
                    v-on:click="changeComponent('CUSTOMER')"
                    >CUSTOMER</v-btn
                  >
                  <v-btn
                    class="my-2 text-md-body-1"
                    x-large
                    color="orange"
                    dark
                    height="150px"
                    width="100%"
                    v-on:click="openOptions()"
                    >OPTIONS</v-btn
                  >
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </template>
    </v-container>
    <v-dialog v-model="changeComponentDetails.warning" width="900">
      <v-card>
        <h2 class="text-center pt-16 pb-12">Data will be lost. Continue?</h2>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            x-large
            width="50%"
            v-on:click="changeComponentDetails.warning = false"
          >
            <div>NO<br /></div>
          </v-btn>
          <v-btn x-large width="50%" v-on:click="setComponent()">
            <div>YES<br /></div>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- ORDER OPTIONS -->
    <v-dialog v-model="orderOptionsDialog" width="900">
      <v-card>
        <h2 class="text-center pt-16 pb-12">ORDER OPTIONS</h2>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            x-large
            width="100%"
            v-on:click="orderOptionsInternalDialog = true"
          >
            <div>INTERNAL<br /></div>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="orderOptionsInternalDialog" width="900">
      <v-card>
        <h2 class="text-center pt-16 pb-12">SET TO INTERNAL ORDER</h2>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn x-large width="50%" v-on:click="setOrderToInternal(false)">
            <div>FALSE<br /></div>
          </v-btn>
          <v-btn x-large width="50%" v-on:click="setOrderToInternal(true)">
            <div>TRUE<br /></div>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- HISTORY OPTIONS -->
    <v-dialog v-model="historyOptionsDialog" width="900">
      <v-card>
        <h2 class="text-center pt-16 pb-12">HISTORY OPTIONS</h2>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn x-large width="33%" v-on:click="printTodayHistoryStatement()">
            <div>PRINT STATEMENT<br /></div>
          </v-btn>
          <v-btn
            x-large
            width="33%"
            v-on:click="printTodayHistoryStatementInternal()"
          >
            <div>PRINT INTERNAL STATEMENT<br /></div>
          </v-btn>
          <v-btn x-large width="33%" v-on:click="printTodayHistoryType()">
            <div>PRINT DELIVERY STATEMENT<br /></div>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import storeMixin from "../mixins/storeMixin";
import { store } from "../store/store";
import axios from "axios";

export default {
  mixins: [storeMixin],
  data() {
    return {
      orderOptionsDialog: false,
      orderOptionsInternalDialog: false,
      historyOptionsDialog: false,
      changeComponentDetails: {
        warning: false,
        component: "",
      },
    };
  },
  methods: {
    async setOrderToInternal(bool) {
      const order = this.$store.state.currentOrder;
      order.internal = bool;
      store.commit("setCurrentOrder", order);
      this.orderOptionsDialog = false;
      this.orderOptionsInternalDialog = false;
    },
    async openOptions() {
      this.orderOptionsDialog = false;
      this.historyOptionsDialog = false;
      if (this.$store.state.component === "ORDER") {
        this.orderOptionsDialog = true;
      }
      if (this.$store.state.component === "HISTORY") {
        this.historyOptionsDialog = true;
      }
    },
    async printTodayHistoryStatement() {
      try {
        this.historyOptionsDialog = false;
        await axios.get(`http://localhost:3000/get/todayhistorystatement`);
      } catch (err) {
        store.commit("setErrorToDisplay", err.response.data);
        store.commit("setNotification", 5);
        this.historyOptionsDialog = false;
      }
    },
    async printTodayHistoryStatementInternal() {
      try {
        this.historyOptionsDialog = false;
        await axios.get(
          `http://localhost:3000/get/todayhistorystatementinternal`
        );
      } catch (err) {
        store.commit("setErrorToDisplay", err.response.data);
        store.commit("setNotification", 5);
        this.historyOptionsDialog = false;
      }
    },
    async printTodayHistoryType() {
      try {
        this.historyOptionsDialog = false;
        await axios.post(
          `http://localhost:3000/post/todayhistorystatementtype`,
          {
            type: 2,
          }
        );
      } catch (err) {
        store.commit("setErrorToDisplay", err.response.data);
        store.commit("setNotification", 5);
        this.historyOptionsDialog = false;
      }
    },

    setOrderWarning() {
      if (
        (JSON.stringify(this.$store.state.selectedItems) !== "{}" ||
          this.$store.state.selectedCustomer.phone !== "" ||
          JSON.stringify(this.$store.state.currentOrder) !==
            '{"id":null,"type":null,"total":0,"customer_id":null,"void":null,"paid":null,"itemQuantity":0,"internal":false,"customizations":[],"customizations_price":0}') &&
        this.$store.state.component === "ORDER"
      ) {
        return true;
      }
      return false;
    },
    async changeComponent(componentStr) {
      this.changeComponentDetails.component = componentStr;
      if (this.setOrderWarning()) {
        this.changeComponentDetails.warning = true;
      } else {
        this.setComponent();
      }
    },
    async setComponent() {
      switch (this.changeComponentDetails.component) {
        case "HISTORY":
          this.setComponentToHistory();
          break;
        case "ORDER":
          store.commit("setMenuDisplayType", "ORDER");
          this.setComponentToOrder();
          break;
        case "CUSTOMER":
          this.setComponentToCustomer();
          break;
      }
      this.changeComponentDetails.warning = false;
    },
    async setComponentToHistory() {
      await this.storeMixinUpdateOrderHistoryArray();
      store.commit("setComponent", "HISTORY");
      this.storeMixinClearOrderRelatedDetails();
    },
    async setComponentToOrder() {
      store.commit("setComponent", "ORDER");
      this.storeMixinClearOrderRelatedDetails();
    },
    async setComponentToCustomer() {
      store.commit("setComponent", "CUSTOMER");
      this.storeMixinClearOrderRelatedDetails();
    },
  },
};
</script>
