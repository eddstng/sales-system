<template>
  <div max-height="400">
    <v-btn
      x-large
      width="100%"
      style="height: 14vh"
    >
      <div>
        {{ this.orderTypeString[$store.state.currentOrder.type] }} <br />
        {{
          $store.state.selectedCustomer.phone.replace(
            /(\d{3})(\d{3})(\d{3})/,
            "$1-$2-$3"
          )
        }}
        <br />
        {{ $store.state.selectedCustomer.address }} <br />
        {{ $store.state.selectedCustomer.name }} <br />
        {{ $store.state.selectedCustomer.note }}
      </div>
    </v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderTypeString: ["DINE IN", "PICK UP", "DELIVERY"],
    };
  },
};
</script>