<template>
  <v-container>
    <v-card
      outlined
      tile
      v-scroll.self="onScroll"
      class="overflow-y-auto d-block"
      height="80vh"
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
    <v-container>
      <v-list-item three-line>
        <v-list-item-content>
          <div class="menu-display-text">Subtotal:</div>
          <div class="menu-display-text">GST:</div>
          <div class="menu-display-text mt-5">Total:</div>
        </v-list-item-content>
        <v-list-item-content>
          <div class="menu-display-text text-right">5</div>
          <div class="menu-display-text text-right">5</div>
          <div class="menu-display-text text-right mt-5">123</div>
        </v-list-item-content>
      </v-list-item>
    </v-container>
  </v-container>
</template>

<style>
.menu-display-text {
  font-size: 1.3em;
}

.position-fixed {
  position: fixed;
}
</style>
