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
        <v-col lg="6">
          <v-card class="pa-2 fill-height" outlined tile>
            <v-container class="grey lighten-5 fill-height">
              Items
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </v-app>
</template>

<script>
import Sidebar from "@/components/Sidebar";
export default {
  name: "App",

  components: {
    Sidebar,
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
