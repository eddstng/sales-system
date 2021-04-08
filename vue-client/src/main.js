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
      store.commit(
        "setItems",
        (await axios.get("http://localhost:3000/get/items/all")).data
      );
    },
  },
  mounted() {
    this.init();
  },
  vuetify,
  store,
  render: (h) => h(App),
}).$mount("#app");
