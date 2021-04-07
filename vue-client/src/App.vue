<template>
  <v-app>
    <template>
      <v-row no-gutters>
        <v-col lg="2">
          <Sidebar />
        </v-col>
        <v-col lg="4">
          <v-card class="pa-2 fill-height" outlined tile>
            <v-container class="grey lighten-5 fill-height"> Bill </v-container>
          </v-card>
        </v-col>
        <v-col lg="6" height="100vh">
          <v-card class="fill-height" tile>
            <v-container class="grey lighten-5 fill-height">
              <Menu />
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </v-app>
</template>

<script>
import Sidebar from "@/components/Sidebar";
import Menu from "@/components/Menu";

export default {
  name: "App",
  components: {
    Sidebar,
    Menu
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
