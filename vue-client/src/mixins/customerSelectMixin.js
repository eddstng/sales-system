import { store } from '../store/store';
export default {
  methods: {
    customerSelectMixinSetSelectedCustomer: function(selectedCustomer) {
      const selectedCustomerWithStringEmptyValues = this.customerSelectMixinSelectedCustomerValueNullToEmptyString(
        selectedCustomer
      );
      store.commit(
        'setSelectedCustomer',
        selectedCustomerWithStringEmptyValues
      );
      this.selectedCustomerDetails.customerPhoneInputDialog = false;
      this.selectedCustomerDetails.selectDineInFormDialog = false;
    },
    customerSelectMixinSelectedCustomerValueNullToEmptyString: function(
      selectedCustomer
    ) {
      for (const key in selectedCustomer) {
        if (selectedCustomer[key] === null) {
          selectedCustomer[key] = '';
        }
      }
      return selectedCustomer;
    },
    customerSelectMixinBuildCustomerAddress: function(body) {
      if (body.street_number && body.street_name) {
        const unitNumber = body.unit_number ? `${body.unit_number} - ` : '';
        return `${body.unit_number ? unitNumber : ''}${body.street_number} ${
          body.street_name
        }`;
      }
      return null;
    },
  },
};
