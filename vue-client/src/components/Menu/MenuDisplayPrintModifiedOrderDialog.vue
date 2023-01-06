<template>
  <div>
    <v-dialog
      persistent
      @keydown.esc="onEsc()"
      v-model="menuComponentDetails.dialogToggles.printModifiedOrderDialog"
      width="900"
    >
      <v-card>
        <h2 class="text-center pt-16 pb-12">PRINT MODIFIED ORDER ?</h2>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            x-large
            width="24%"
            v-on:click="
              reprintKitchen();
              storeMixinClearOrderRelatedDetails();
              onEsc();
            "
          >
            <div>KITCHEN<br /></div>
          </v-btn>
          <v-btn
            x-large
            width="24%"
            v-on:click="
              reprintClient();
              storeMixinClearOrderRelatedDetails();
              onEsc();
            "
          >
            <div>CLIENT<br /></div>
          </v-btn>
          <v-btn
            x-large
            width="24%"
            v-on:click="
              reprintBoth();
              storeMixinClearOrderRelatedDetails();
              onEsc();
            "
          >
            <div>BOTH<br /></div>
          </v-btn>
          <v-btn x-large width="24%" v-on:click="onEsc()">
            <div>CANCEL<br /></div>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import printMixin from "../../mixins/printMixin";
import storeMixin from "../../mixins/storeMixin";
export default {
  mixins: [printMixin, storeMixin],
  props: ["menuComponentDetails"],
  data() {
    return {
      menuComponentDetailsUpdate: {},
    };
  },
  methods: {
    onEsc() {
      let updatedMenuComponentDetails = { ...this.menuComponentDetails };
      updatedMenuComponentDetails.dialogToggles.printModifiedOrderDialog = false;
      this.$emit("updateMenuComponentDetails", updatedMenuComponentDetails);
      this.storeMixinClearOrderRelatedDetails();
    },
  },
};
</script>
