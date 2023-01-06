import axios from "axios";
import { store } from "../store/store";

export default {
    methods: {
        reprintOrder: async function (
            order_id,
            printKitchen,
            printClient,
            order_timestamp
        ) {
            try {
                store.commit("setNotification", 4);
                await axios.post("http://localhost:3000/post/reprint", {
                    order_id,
                    printKitchen,
                    printClient,
                    order_timestamp,
                });
            } catch (err) {
                const errorMessage = `${err.response.data}`;
                store.commit("setErrorToDisplay", errorMessage);
                store.commit("setNotification", 5);
                throw errorMessage;
            }
        },
        reprintBoth: async function () {
            console.log('both')
            this.reprintOrder(
                this.$store.state.currentOrder.id,
                true,
                true,
                this.$store.state.currentOrder.timestamp
            );
        },
        reprintKitchen: async function () {
            this.reprintOrder(
                this.$store.state.currentOrder.id,
                true,
                false,
                this.$store.state.currentOrder.timestamp
            );
        },
        reprintClient: async function () {
            this.reprintOrder(
                this.$store.state.currentOrder.id,
                false,
                true,
                this.$store.state.currentOrder.timestamp
            );
        }
    },
};