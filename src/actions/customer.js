import AsyncStorage from '@react-native-community/async-storage';
import * as Types from '../Types';
import * as StorageKeys from '../constants/StorageKeys';
import showError from '../components/showError';

export const getCustomers = async () => {
  let data = await AsyncStorage.getItem(StorageKeys.CUSTOMERS);
  if (data) {
    data = JSON.parse(data);
    return data;
  }
  return [];
};

/**
 * Add the customer to local storage
 * @param {Types.Customer} customr Customer to add
 */
export const addCustomer = async (customer: Types.Customer) => {
  try {
    let data = await AsyncStorage.getItem(StorageKeys.CUSTOMERS);
    if (data) {
      data = JSON.parse(data);
      data.push(customer);
      await AsyncStorage.setItem(StorageKeys.CUSTOMERS, JSON.stringify(data));
    } else {
      await AsyncStorage.setItem(
        StorageKeys.CUSTOMERS,
        JSON.stringify([customer])
      );
    }
  } catch (error) {
    showError(error.message);
  }
};

/**
 * Remove the customer
 * @param {String} customerName name of the customer to remove
 */
export const removeCustomer = customerName => {};
