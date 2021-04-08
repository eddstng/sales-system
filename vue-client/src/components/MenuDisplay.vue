<template>
  <v-card
    outlined
    tile
    v-scroll.self="onScroll"
    class="overflow-y-auto"
    height="95vh"
    v-chat-scroll
  >
        <template>
          <v-card
            class="mx-auto pt-2"
            outlined
            v-for="item in $store.state.selectedItems"
            v-bind:key="item"
            height="7em"
            width="100vw"
          >
            <v-list-item three-line>
              <v-list-item-content>
                <div class="menu-display-name">{{ item.name_eng }}</div>
                <div class="menu-display-name">{{ item.name_chn }}</div>
              </v-list-item-content>
              <Button class="menu-display-name">{{ item.price }}</Button>
            </v-list-item>
          </v-card>
        </template>
  </v-card>
</template>

<style>
  .menu-display-name {
    font-size: 1.2em;
  }
</style>
