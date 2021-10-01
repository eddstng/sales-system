
<template>
  <v-app>
    <div v-if="render">
      <v-row no-gutters>
        <v-col>
          <v-alert class="menu-notification text-center">
            {{ currentDate() }} - {{ hours }}:{{ minutes }}:{{ seconds }}
            {{ amPm }}
          </v-alert>
        </v-col>
        <v-col :cols="10">
          <v-alert
            class="menu-notification"
            v-if="$store.state.notification === 0"
          >
          </v-alert>
          <v-alert
            class="menu-notification"
            type="success"
            v-if="$store.state.notification === 1"
          >
            Order successfully added.
          </v-alert>
          <v-alert
            class="menu-notification"
            type="error"
            v-if="$store.state.notification === 2"
          >
            Order failed please check the status and try again.
          </v-alert>
        </v-col>
      </v-row>
    </div>
    <template v-if="$store.state.component === 'ORDER'">
      <v-row no-gutters>
        <v-col lg="2">
          <Sidebar />
        </v-col>
        <v-col lg="4">
          <v-card outlined tile>
            <v-container class="grey lighten-5">
              <MenuDisplay />
            </v-container>
          </v-card>
        </v-col>
        <v-col lg="6" height="100vh">
          <v-card class="fill-height" tile>
            <v-container class="grey lighten-5">
              <MenuButtons />
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </template>
    <template v-if="$store.state.component === 'HISTORY'">
      <v-row no-gutters>
        <v-col lg="2">
          <Sidebar />
        </v-col>
        <v-col lg="4">
          <v-card outlined tile>
            <v-container class="grey lighten-5">
              <HistoryDisplay />
            </v-container>
          </v-card>
        </v-col>
        <v-col lg="6" height="100vh">
          <v-card class="fill-height" tile>
            <v-container class="grey lighten-5">
              <HistoryButtons />
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </v-app>
</template>

<script>
import { store } from "./store/store";

import Sidebar from "./components/Sidebar";
import MenuButtons from "./components/MenuButtons";
import MenuDisplay from "./components/MenuDisplay";
import HistoryButtons from "./components/HistoryButtons";
import HistoryDisplay from "./components/HistoryDisplay";
const date = new Date();
export default {
  name: "App",
  components: {
    Sidebar,
    MenuButtons,
    MenuDisplay,
    HistoryButtons,
    HistoryDisplay,
  },

  data() {
    return {
      hours: date.getHours(),
      minutes: date.getMinutes(),
      seconds: date.getSeconds(),
      amPm: "AM",
      interval: 0,
      notification: 0,
      render: true,
    };
  },
  created() {
    this.$root.$refs.App = this;
  },
  mounted() {
    this.interval = setInterval(this.updateClock, 1000);
    this.interval = setInterval(this.clearAlert, 20000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  methods: {
    async reloadComponent(componentStr) {
      store.commit("setComponent", "");
      await this.$nextTick();
      store.commit("setComponent", componentStr);
    },
    clearAlert() {
      this.$store.state.notification = 0;
    },
    calculatePriceDetails() {
      let priceDetails = store.state.priceDetails;
      priceDetails.subtotal = 0;
      priceDetails.gst = 0;
      priceDetails.total = 0;
      const selectedItems = store.state.selectedItems;
      Object.keys(selectedItems).forEach((key) => {
        priceDetails.subtotal =
          parseFloat(selectedItems[key].node.price) *
            selectedItems[key].quantity +
          priceDetails.subtotal;
        priceDetails.gst = parseFloat(
          (priceDetails.subtotal * 0.05).toFixed(2)
        );
        priceDetails.total = priceDetails.subtotal + priceDetails.gst;
      });
      store.commit("setPriceDetails", priceDetails);
    },
    updateClock() {
      const date = new Date(); // create a new reference here
      this.hours = date.getHours();
      this.minutes = date.getMinutes();
      this.seconds = date.getSeconds();
      this.hours = this.hours % 12 || 12;
      this.hours = this.hours < 10 ? `0${this.hours}` : this.hours;
      this.minutes = this.minutes < 10 ? `0${this.minutes}` : this.minutes;
      this.seconds = this.seconds < 10 ? `0${this.seconds}` : this.seconds;
    },
    currentDate() {
      const current = new Date();
      const date = `${current.getFullYear()}/${
        current.getMonth() + 1
      }/${current.getDate()}`;
      return date;
    },
  },
};
</script>

<style>
.menu-notification {
  position: relative;
  margin-bottom: 0;
}
.sidebar-buttons {
  height: 100px;
}
</style>
