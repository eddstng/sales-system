<template>
  <v-container>
    <v-card
      outlined
      tile
      height="15vh"
    >
      <div class="menu-display-customer-text">
        <div
          class="p-0"
          max-height="400"
        >
          <!-- <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="menu-button-text"
            x-large
            dark
            height="180px"
            width="97%"
            v-on:click="onClickMenuButton(item)"
                      v-bind="attrs"
          v-on="on"
            >SELECT A CUSTOMER</v-btn
          >
           </template>  -->

          <v-dialog
            v-model="dialog"
            width="500"
          >
            <template v-slot:activator="{ attrs }">
              <v-btn
                class="menu-button-text mt-5"
                x-large
                width="97%"
                min-height="100%"
                v-on:click="
                      dialog = true;
                    "
                style="height: 10vh;"
                v-bind="attrs"
              >
                <div>
                  SELECT A CUSTOMER
                </div>
              </v-btn>
            </template>

            <v-card>
              <div>
                <br />
                <v-col>
                  <v-form
                    ref="form"
                    lazy-validation
                  >
                    <v-text-field
                      v-model="phone"
                      :counter="10"
                      label="Phone Number"
                      required
                      @change="this.suggestCustomerFromPhone()"
                    ></v-text-field>
                  </v-form>
                </v-col>
                <div>
                  <div>
                    {{this.suggestedCustomer}}
                  </div>
                </div>
              </div>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  text
                  @click="dialog = false"
                >
                  I accept
                </v-btn>

                <v-btn
                  class="menu-button-text"
                  x-large
                  height="180px"
                  width="50%"
                  v-on:click="
                        dialog = false;
                      "
                  @click="dialog = false"
                >
                  <div>123123123<br /></div>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </div>
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
export default {
  data() {
    return {
      dialog: false,
      phone: "",
      suggestedCustomer: {},
    };
  },
  watch: {
    // whenever question changes, this function will run
    phone: function () {
      this.suggestCustomerFromPhone();
    },
    deep: true,
  },
  methods: {
    suggestCustomerFromPhone: function () {
      console.log("=======");
      if (this.$store.state.customers.length <= 0) {
        console.log("error in suggestCustomerFromPhone");
      }
      const customerArr = this.$store.state.customers;
      customerArr.forEach((v) => {
        if (this.phone === v.phone) {
          this.suggestedCustomer = v;
        }
      });
      return;
    },
  },
};
</script>