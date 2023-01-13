import { store } from "../store/store";

export default {
    methods: {
        async getOrCreateItem(item) {
            if (item.id) {
                return item;
            }
            const matchedItemInSuggestedItems = this.suggestedItems.find(
                (e) =>
                    e.name_eng.toUpperCase() === item.name_eng.toUpperCase() &&
                    e.price === item.price
            );

            if (matchedItemInSuggestedItems !== undefined) {
                return matchedItemInSuggestedItems
            }

            return await this.createCustomItem();
        },
        async addItemToSelectedItems(item) {
            let selectedItem = await this.getOrCreateItem(item);
            let selectedItems = store.state.selectedItems;
            if (selectedItem.id in selectedItems) {
                selectedItems[selectedItem.id].quantity++;
            } else {
                selectedItems[selectedItem.id] = {};
                selectedItems[selectedItem.id].node = { ...selectedItem };
                selectedItems[selectedItem.id].quantity = 1;
                selectedItems[selectedItem.id].timestamp = Date.now();
            }
            store.commit("setSelectedItems", selectedItems);
            this.storeMixinSumSelectedItemsQuantity();
            this.storeMixinUpdateStorePriceDetails();
        },
    }
};