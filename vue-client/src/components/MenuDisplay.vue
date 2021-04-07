<template>
  <v-card
    outlined
    tile
    v-scroll.self="onScroll"
    class="overflow-y-auto"
    height="95vh"
  >
    <v-container class="grey lighten-5 fill-height">
      <v-container>
        <div v-scroll.self="onScroll" class="overflow-y-auto" max-height="400">
          <template>
            <v-card
              class="mx-auto"
              max-width="344"
              outlined
              v-for="item in $store.state.items"
              v-bind:key="item"
            >
              <v-list-item three-line>
                <v-list-item-content>
                  <div>{{
                    item.name_eng
                  }}</div>
                  <div>{{
                    item.name_chn
                  }}</div>
                </v-list-item-content>
                <v-list-item-avatar>{{
                  item.price
                }}</v-list-item-avatar>
              </v-list-item>
            </v-card>
          </template>
        </div>
      </v-container>
    </v-container>
  </v-card>
</template>
