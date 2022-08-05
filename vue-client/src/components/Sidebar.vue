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
                    class="my-2"
                    x-large
                    color="success"
                    dark
                    height="180px"
                    width="100%"
                    v-on:click="changeComponent('ORDER')"
                    >ORDER</v-btn
                  >
                  <v-btn
                    class="my-2"
                    x-large
                    color="success"
                    dark
                    height="180px"
                    width="100%"
                    v-on:click="changeComponent('HISTORY')"
                    >HISTORY</v-btn
                  >
                  <v-btn
                    class="my-2"
                    x-large
                    color="orange"
                    dark
                    height="180px"
                    width="100%"
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
  </v-card>
</template>

<script>
import storeMixin from "../mixins/storeMixin";
import { store } from "../store/store";

export default {
  mixins: [storeMixin],
  data() {
    return {
      changeComponentDetails: {
        warning: false,
        component: "",
      },
    };
  },
  methods: {
    setOrderWarning() {
      if (
        (JSON.stringify(this.$store.state.selectedItems) !== "{}" ||
          this.$store.state.selectedCustomer.phone !== "" ||
          JSON.stringify(this.$store.state.currentOrder) !==
            '{"id":null,"type":null,"total":0,"customer_id":null,"void":null,"paid":null}') &&
        this.$store.state.component !== "HISTORY"
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
  },
};
</script>
