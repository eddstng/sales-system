<template>
       <v-dialog v-model="historyOptionsDetails.openHistoryOptionsDialogue" width="900">
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
            <v-row class="submitOrderDialogText mt-5 mb-5">
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
              Subtotal: {{ $store.state.priceDetails.subtotal }}
            </v-col>
            <v-col :cols="4" class="text-end">
              GST: {{ $store.state.priceDetails.gst }}
            </v-col>
            <v-col :cols="4" class="text-end">
              Total: ${{ $store.state.priceDetails.total }}
            </v-col>
          </v-row>
          <br />
        </div>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            x-large
            width="24.5%"
            v-on:click="
              historyOptionsDetailsUpdate.openHistoryOptionsDialogue = false;
              historyOptionsDetailsUpdate.confirmingAction = 'REORDER';
              historyOptionsDetailsUpdate.openHistoryOptionsConfirmationDialogue = true;
              updateHistoryOptionsDetails(historyOptionsDetailsUpdate)
            "
          >
            <div>REORDER<br /></div>
          </v-btn>
          <v-btn
            x-large
            width="24.5%"
            v-on:click="
              historyOptionsDetailsUpdate.openHistoryOptionsDialogue = false;
              historyOptionsDetailsUpdate.confirmingAction = 'CLEAR';
              historyOptionsDetailsUpdate.openHistoryOptionsConfirmationDialogue = true;
              updateHistoryOptionsDetails(historyOptionsDetailsUpdate)
            "
          >
            <div>CLEAR<br /></div>
          </v-btn>
          <v-btn
            x-large
            width="24.5%"
            v-on:click="
              historyOptionsDetailsUpdate.openHistoryOptionsDialogue = false;
              historyOptionsDetailsUpdate.confirmingAction = 'VOID';
              historyOptionsDetailsUpdate.openHistoryOptionsConfirmationDialogue = true;
              updateHistoryOptionsDetails(historyOptionsDetailsUpdate)
            "
          >
            <div>VOID<br /></div>
          </v-btn>
          <v-btn
            x-large
            width="24.5%"
            v-on:click="
              historyOptionsDetailsUpdate.openHistoryOptionsDialogue = false;
              historyOptionsDetailsUpdate.confirmingAction = 'PAID';
              historyOptionsDetailsUpdate.openHistoryOptionsConfirmationDialogue = true;
              updateHistoryOptionsDetails(historyOptionsDetailsUpdate)
            "
          >
            <div>PAID<br /></div>
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
        historyOptionsDetailsUpdate: {}
    }
   },
  methods: {
    updateHistoryOptionsDetails() {
      this.$emit("setHistoryOptionsDetails", this.historyOptionsDetailsUpdate);
    }
  }
}
</script>
