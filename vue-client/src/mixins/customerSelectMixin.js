import { store } from "../store/store";
export default {
    methods: {
        customerSelectMixinSetSelectedCustomer: function (selectedCustomer) {
            const selectedCustomerWithStringEmptyValues =
                this.customerSelectMixinselectedCustomerValueNullToEmptyString(selectedCustomer);
            store.commit(
                "setSelectedCustomer",
                selectedCustomerWithStringEmptyValues
            );
            this.selectedCustomerDetails.customerPhoneInputDialog = false;
            this.selectDineInFormDialogue = false;
            this.selectedCustomerDetails.selectedCustomer = {
                phone: "",
                unit_number: "",
                street_number: "",
                street_name: "",
                address: "",
                city: "",
                name: "",
                note: "",
            };
        },
        customerSelectMixinselectedCustomerValueNullToEmptyString: function (selectedCustomer) {
            for (const key in selectedCustomer) {
                if (selectedCustomer[key] === null) {
                    selectedCustomer[key] = "";
                }
            }
            return selectedCustomer;
        },
    },
};