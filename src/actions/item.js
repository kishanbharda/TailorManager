import AsyncStorage from '@react-native-community/async-storage';
import * as Types from '../Types';
import * as StorageKeys from '../constants/StorageKeys';
import showError from '../components/showError';

export const getItems = async () => {
  let data = await AsyncStorage.getItem(StorageKeys.ITEMS);
  if (data) {
    data = JSON.parse(data);
    return data;
  }
  return [];
};

export const addItem = async (item: Types.ITEM) => {
  try {
    let data = await AsyncStorage.getItem(StorageKeys.ITEMS);
    if (data) {
      data = JSON.parse(data);
      data.push(item);
      await AsyncStorage.setItem(StorageKeys.ITEMS, JSON.stringify(data));
    } else {
      await AsyncStorage.setItem(StorageKeys.ITEMS, JSON.stringify([item]));
    }
  } catch (error) {
    showError(error.message);
  }
};

export const removeItem = async () => {};

export const updateItem = async () => {};
