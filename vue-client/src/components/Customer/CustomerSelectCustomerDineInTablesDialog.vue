<template>
  <v-dialog
    v-model="selectedCustomerDetails.selectDineInFormDialog"
    width="500"
  >
    <v-card>
      <div>
        <br />
        <v-col>
          <div class="p-0" max-height="400">
            <v-btn
              class="menu-button-text mt-2 ml-1 mr-1"
              v-for="table in $store.state.tables"
              v-bind:key="table.name_eng"
              x-large
              dark
              height="100px"
              width="31.6%"
              v-on:click="customerSelectMixinSetSelectedCustomer(table)"
              >{{ table.name }}{{ table.price }}</v-btn
            >
          </div>
        </v-col>
        <br />
      </div>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          x-large
          width="100%"
          v-on:click="selectedCustomerDetails.selectDineInFormDialog = false"
        >
          <div>CANCEL<br /></div>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import customerSelectMixin from "../../mixins/customerSelectMixin";
export default {
  mixins: [customerSelectMixin],
  props: ["selectedCustomerDetails"],
  methods: {
    toggleCreateCustomerFormDialogOn() {
      this.$emit("setCreateCustomerFormDialogToBool", true);
    },
  },
};
</script>
