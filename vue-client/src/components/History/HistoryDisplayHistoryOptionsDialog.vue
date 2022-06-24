<template>
  <v-dialog
    v-model="historyOptionsDetails.openHistoryOptionsDialog"
    width="1300"
  >
    <v-card>
      <div>
        <br />
        <v-row class="submitOrderDialogText mt-10">
          <div>
            <v-col :cols="15">
              {{
                $store.state.selectedCustomer.phone.replace(
                  /(\d{3})(\d{3})(\d{3})/,
                  "$1-$2-$3"
                )
              }}
              <br />
              {{ $store.state.selectedCustomer.address }} <br />
              {{ $store.state.selectedCustomer.name }}
            </v-col>
            <v-col v-if="$store.state.selectedCustomer.note">
              * {{ $store.state.selectedCustomer.note }} <br />
            </v-col>
            <v-col>
              Number of Items:
              {{ $store.state.currentOrder.itemQuantity }}</v-col
            >
            <br />
          </div>
        </v-row>
        <div v-for="value in $store.state.selectedItems" v-bind:key="value.id">
          <v-row class="submitOrderDialogText mt-5 mb-5">
            <v-col> x{{ value.quantity }} </v-col>
            <v-col :cols="5">
              {{ value.node.name_eng }}
            </v-col>
            <v-col :cols="3">
              {{ value.node.name_chn }}
            </v-col>
            <v-col :cols="2" class="text-center">
              ${{ value.node.price.toFixed(2) }}
            </v-col>
          </v-row>
          <v-list-item-content
            v-for="customization in value.customizations"
            v-bind:key="customization.id"
          >
            <div class="submitOrderDialogText pl-25 mb-5">
              ➡ {{ customization.name_eng }}
              {{
                customization.name_chn === ""
                  ? ""
                  : "/" + customization.name_chn
              }}
            </div>
          </v-list-item-content>
        </div>
        <br />
        <v-row class="submitOrderDialogText mt-5 mb-5">
          <v-col :cols="3">
            Subtotal: {{ $store.state.priceDetails.subtotal.toFixed(2) }}
          </v-col>
          <v-col :cols="3" class="text-end">
            Discount: -{{ $store.state.priceDetails.discount.toFixed(2) }}
          </v-col>
          <v-col :cols="3" class="text-end">
            GST: {{ $store.state.priceDetails.gst.toFixed(2) }}
          </v-col>
          <v-col :cols="3" class="text-end">
            Total: ${{ $store.state.priceDetails.total.toFixed(2) }}
          </v-col>
        </v-row>
        <br />
      </div>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          x-large
          width="13.8%"
          v-on:click="
            historyOptionsDetailsUpdate.confirmingAction = 'REPRINT';
            historyOptionsDetailsUpdate.openHistoryOptionsReprintDialog = true;
            updateHistoryOptionsDetails(historyOptionsDetailsUpdate);
          "
        >
          <div>REPRINT<br /></div>
        </v-btn>
        <v-btn
          x-large
          width="13.8%"
          v-on:click="
            historyOptionsDetailsUpdate.confirmingAction = 'REORDER';
            historyOptionsDetailsUpdate.openHistoryOptionsConfirmationDialog = true;
            updateHistoryOptionsDetails(historyOptionsDetailsUpdate);
          "
        >
          <div>REORDER<br /></div>
        </v-btn>
        <v-btn
          x-large
          width="13.8%"
          v-on:click="
            historyOptionsDetailsUpdate.confirmingAction = 'CLEAR';
            historyOptionsDetailsUpdate.openHistoryOptionsConfirmationDialog = true;
            updateHistoryOptionsDetails(historyOptionsDetailsUpdate);
          "
        >
          <div>CLEAR<br /></div>
        </v-btn>
        <v-btn
          x-large
          width="13.8%"
          v-on:click="
            historyOptionsDetailsUpdate.confirmingAction = 'VOID';
            historyOptionsDetailsUpdate.openHistoryOptionsConfirmationDialog = true;
            updateHistoryOptionsDetails(historyOptionsDetailsUpdate);
          "
        >
          <div>VOID<br /></div>
        </v-btn>
        <v-btn
          x-large
          width="13.8%"
          v-on:click="
            historyOptionsDetailsUpdate.confirmingAction = 'PAID';
            historyOptionsDetailsUpdate.openHistoryOptionsConfirmationDialog = true;
            updateHistoryOptionsDetails(historyOptionsDetailsUpdate);
          "
        >
          <div>PAID<br /></div>
        </v-btn>
        <v-btn
          x-large
          width="13.8%"
          v-on:click="
            historyOptionsDetailsUpdate.confirmingAction = 'MODIFY';
            historyOptionsDetailsUpdate.openHistoryOptionsConfirmationDialog = true;
            updateHistoryOptionsDetails(historyOptionsDetailsUpdate);
          "
        >
          <div>MODIFY<br /></div>
        </v-btn>
        <v-btn
          x-large
          width="13.8%"
          v-on:click="
            historyOptionsDetailsUpdate.confirmingAction = '';
            historyOptionsDetailsUpdate.openHistoryOptionsConfirmationDialog = true;
            updateHistoryOptionsDetails(historyOptionsDetailsUpdate);
          "
        >
          <div>DELETE<br /></div>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["historyOptionsDetails"],
  data() {
    return {
      historyOptionsDetailsUpdate: {
        confirmingAction: "",
        openHistoryOptionsConfirmationDialog: false,
        openHistoryOptionsReprintDialog: false,
        openHistoryOptionsDialog: false,
      },
    };
  },
  methods: {
    updateHistoryOptionsDetails() {
      this.historyOptionsDetailsUpdate.openHistoryOptionsDialog = false;
      this.$emit("setHistoryOptionsDetails", this.historyOptionsDetailsUpdate);
    },
  },
};
</script>
