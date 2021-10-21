import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { store } from "./store/store";
import axios from "axios";
import VueChatScroll from 'vue-chat-scroll';

Vue.use(VueChatScroll);
Vue.config.productionTip = false;

new Vue({
  methods: {
    async init() {
      // Set Items
      const allItemsArray = (await axios.get("http://localhost:3000/get/items/all")).data
      const allItemsCategorized = allItemsArray.reduce((obj, item) => {
        if (obj[item.category] === undefined) {
          obj[item.category] = [item]
        } else {
          obj[item.category].push(item);
        }
        return obj;
      }, {});
      store.commit(
        "setItems",
        allItemsCategorized
      );
      store.commit(
        "setCustomers",
        (await axios.get("http://localhost:3000/get/customers/all")).data
      );
      const tables = [];
      store.state.customers.forEach(customer => {
        if (customer.name && customer.name.includes('Table #')) {
          tables.push(customer)
        }
      })
      store.commit("setTables", tables)
    },
  },
  mounted() {
    this.init();
  },
  vuetify,
  store,
  render: (h) => h(App),
}).$mount("#app");
