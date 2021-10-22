<template>
  <v-card outlined tile class="overflow-y-auto" height="92.4vh">
    <div class="p-0" v-if="displayMenuButtons" max-height="400">
      <v-btn
        x-large
        dark
        height="200px"
        width="49.5%"
        class="mt-1 mr-1"
        v-on:click="
          displayCategoriesButtons = true;
          displayMenuButtons = false;
          selectedCategory = null;
        "
        ><div>
          <p class="menu-button-text-eng">BACK</p>
        </div>
      </v-btn>
      <v-btn
        v-for="item in $store.state.items[selectedCategory]"
        v-bind:key="item.name_eng"
        x-large
        dark
        height="200px"
        width="49.5%"
        class="mt-1 mr-1"
        v-on:click="
          onClickMenuButton(item);
          displayCategoriesButtons = true;
          displayMenuButtons = false;
        "
        ><div>
          <p class="menu-button-text-eng">#{{ item.menu_id }}</p>
          <p class="menu-button-text-eng">{{ item.name_eng }}</p>
          <p class="menu-button-text-chn">{{ item.name_chn }}</p>
          <p class="menu-button-text-price">{{ item.price.toFixed(2) }}</p>
        </div>
      </v-btn>
      <v-btn
        x-large
        dark
        height="200px"
        width="49.5%"
        class="mt-1 mr-1"
        v-on:click="
          displayCategoriesButtons = true;
          displayMenuButtons = false;
          selectedCategory = null;
        "
        ><div>
          <p class="menu-button-text-eng">BACK</p>
        </div>
      </v-btn>
    </div>
    <div class="p-0" v-if="displayCategoriesButtons" max-height="400">
      <v-btn
        v-for="item in categories"
        v-bind:key="item"
        x-large
        dark
        height="200px"
        width="24.5%"
        class="mt-1 mr-1"
        v-on:click="
          selectedCategory = item.id;
          displayCategoriesButtons = false;
          displayMenuButtons = true;
        "
        ><div>
          <p class="menu-button-text-eng">{{ item.name_eng }}</p>
          <!-- <p class="menu-button-text-eng" >{{ item.name_chn }}</p> -->
          <p class="menu-button-text-eng">{{ item.num_range }}</p>
        </div>
      </v-btn>
    </div>
  </v-card>
</template>

<style>
.menu-button-text-eng {
  font-size: 1.2em;
}
.menu-button-text-chn {
  font-size: 1.7em;
}
.menu-button-text-price {
  font-size: 1.7em;
}
</style>

<script>
import { store } from "../store/store";
export default {
  data() {
    return {
      selectedCategory: null,
      categories: [
        {
          name_eng: "Appetizers",
          name_chn: "Appetizers",
          num_range: "1-6",
          id: 0,
        },
        {
          name_eng: "Soup",
          name_chn: "Soup",
          num_range: "7-17",
          id: 1,
        },
        {
          name_eng: "Egg Foo Yung",
          name_chn: "Egg Foo Yung",
          num_range: "18-22",
          id: 2,
        },
        {
          name_eng: "Vegetables",
          name_chn: "Vegetables",
          num_range: "23-27",
          id: 3,
        },
        {
          name_eng: "Seafood",
          name_chn: "Seafood",
          num_range: "28-40",
          id: 4,
        },
        {
          name_eng: "Oyster/Scallops",
          name_chn: "Oyster/Scallops",
          num_range: "41-49",
          id: 5,
        },
        {
          name_eng: "Hot Pot",
          name_chn: "Hot Pot",
          num_range: "50-59",
          id: 6,
        },
        {
          name_eng: "Pork",
          name_chn: "Pork",
          num_range: "60-70",
          id: 7,
        },
        {
          name_eng: "Beef",
          name_chn: "Beef",
          num_range: "71-83",
          id: 8,
        },
        {
          name_eng: "Chicken",
          name_chn: "Chicken",
          num_range: "84-97",
          id: 9,
        },
        {
          name_eng: "Over Rice",
          name_chn: "Over Rice",
          num_range: "98-115",
          id: 10,
        },
        {
          name_eng: "Fried Rice",
          name_chn: "Fried Rice",
          num_range: "116-123",
          id: 11,
        },
        {
          name_eng: "Chow Mein",
          name_chn: "Chow Mein",
          num_range: "124-148",
          id: 12,
        },
        {
          name_eng: "Noodle Soup",
          name_chn: "Noodle Soup",
          num_range: "149-156",
          id: 13,
        },
        {
          name_eng: "Congee",
          name_chn: "Congee",
          num_range: "157-164",
          id: 14,
        },
        {
          name_eng: "Specials/Drinks",
          name_chn: "Specials/Drinks",
          // num_range: '1-6',
          id: 15,
        },
      ],
      displayCategoriesButtons: true,
      displayMenuButtons: false,
    };
  },
  mounted() {
    this.scrollToElement();
  },
  methods: {
    calculatePriceDetails: function () {
      this.$root.$refs.App.calculatePriceDetails();
    },
    scrollToElement() {
      const el = this.$refs.scrollToMe;
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    },
    onClickMenuButton(item) {
      this.addItemToSelectedItems(item);
      this.calculatePriceDetails();
    },
    addItemToSelectedItems(item) {
      let selectedItems = store.state.selectedItems;
      if (item.id in selectedItems) {
        selectedItems[item.id].quantity++;
      } else {
        selectedItems[item.id] = {};
        selectedItems[item.id].node = item;
        selectedItems[item.id].quantity = 1;
      }
      store.commit("setSelectedItems", selectedItems);
    },
  },
};
</script>
