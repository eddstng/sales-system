import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { store } from "./store/store";
import axios from "axios";
import VueChatScroll from 'vue-chat-scroll';
import storeMixin from "./mixins/storeMixin"


Vue.use(VueChatScroll);
Vue.config.productionTip = false;

new Vue({
  mixins: [storeMixin],
  methods: {
    async init() {
      // Set Items
      axios.get("http://localhost:3000/get/server").then(() => {}).catch(() => {
        store.commit('setNotification', 3);
      });
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
        allItemsArray
      );
      store.commit(
        "setCategorizedItems",
        allItemsCategorized
      );
      this.storeMixinUpdateStoreCustomerArray();
    },
  },
  mounted() {
    this.init();
  },
  vuetify,
  store,
  render: (h) => h(App),
}).$mount("#app");
