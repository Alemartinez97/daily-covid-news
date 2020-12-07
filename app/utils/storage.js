import { AsyncStorage } from "react-native"
import {initialState} from '../reducers/filter';

export const getFilters = async () => {
  let filters;
  try {
    filters = await AsyncStorage.getItem('filters');
  } catch(e) {
    filters = "{}";
  }
  const parsedFilters = JSON.parse(filters || "{}");
  return {
    ...initialState,
    ...parsedFilters,
  };
};

export const setFilter = async (filter, value) => {
  const filters = await getFilters();
  filters[filter] = value;
  await AsyncStorage.setItem('filters', JSON.stringify(filters));
};

export const storeIdToken = async (token) => {
  await AsyncStorage.setItem('idToken', token);
};

export const clearIdToken = async () => {
  await AsyncStorage.setItem('idToken', '');
};

export const getIdToken = async () => {
  return await AsyncStorage.getItem('idToken');
};

export const setUser = async (user) => {
  return await AsyncStorage.setItem('user', JSON.stringify(user));
};

export const getUser = async () => {
  const user = await AsyncStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};
