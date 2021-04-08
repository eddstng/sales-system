<template>
  <v-app>
    <template>
      <v-row no-gutters>
        <v-col lg="2">
          <Sidebar />
        </v-col>
        <v-col lg="4">
          <v-card outlined tile>
            <v-container class="grey lighten-5">
              <MenuDisplay />
            </v-container>
          </v-card>
        </v-col>
        <v-col lg="6" height="100vh">
          <v-card class="fill-height" tile>
            <v-container class="grey lighten-5">
              <MenuButtons />
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </v-app>
</template>

<script>
import Sidebar from "@/components/Sidebar";
import MenuButtons from "@/components/MenuButtons";
import MenuDisplay from "@/components/MenuDisplay";

export default {
  name: "App",
  components: {
    Sidebar,
    MenuButtons,
    MenuDisplay,
  },

  data: () => ({
    //
  }),
};
</script>

<style>
.sidebar-buttons {
  height: 100px;
}
</style>
