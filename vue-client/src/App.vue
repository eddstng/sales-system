<template>
  <v-app>
    <NotificationsBar />
    <!-- <template v-if="$store.state.component === 'ORDER'"> -->
      <!-- <Menu /> -->
      <Main />
    <!-- </template> -->
    <!-- <template v-if="$store.state.component === 'HISTORY'">
      <History />
    </template> -->
    <!-- <template v-if="$store.state.component === 'CUSTOMER'">
      <Customer />
    </template> -->
  </v-app>
</template>

<script>
import storeMixin from "./mixins/storeMixin";
// import Menu from "./components/Menu/Menu";
import Main from "./components/Main/Main";
// import History from "./components/History/History";
// import Customer from "./components/Customer/Customer";
import NotificationsBar from "./components/NotificationsBar/NotificationsBar";
export default {
  mixins: [storeMixin],
  name: "App",
  components: {
    NotificationsBar,
    // Menu,
    Main,
    // History,
    // Customer
  },
  // created() {
  //   this.$root.$refs.App = this;
  // },
};
</script>
