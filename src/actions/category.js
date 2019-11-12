import AsyncStorage from '@react-native-community/async-storage';
import * as Types from '../Types';
import * as StorageKeys from '../constants/StorageKeys';
import showError from '../components/showError';

export const getCategories = async () => {
  let data = await AsyncStorage.getItem(StorageKeys.CATEGORIES);
  if (data) {
    data = JSON.parse(data);
    return data;
  }
  return [];
};

/**
 * Add category to Storage
 * @param {Types.Category} categoty Category to add
 */
export const addCategory = async (categoty: Types.Category) => {
  try {
    let data = await AsyncStorage.getItem(StorageKeys.CATEGORIES);
    if (data) {
      data = JSON.parse(data);
      data.push(categoty);
      await AsyncStorage.setItem(StorageKeys.CATEGORIES, JSON.stringify(data));
    } else {
      await AsyncStorage.setItem(
        StorageKeys.CATEGORIES,
        JSON.stringify([categoty])
      );
    }
  } catch (error) {
    showError(error.message);
  }
};

export const removeCategory = () => {
  
}

export const updateCategory = () => {

}