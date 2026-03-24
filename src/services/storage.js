import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = '@auth_token';

export const setToken = async (token) => {
  await AsyncStorage.setItem(TOKEN_KEY, token);
};

export const getToken = async () => {
  return await AsyncStorage.getItem(TOKEN_KEY);
};

export const removeToken = async () => {
  await AsyncStorage.removeItem(TOKEN_KEY);
};

const ONBOARDED_KEY = '@hasSeenOnboarding';

export const setHasSeenOnboarding = async () => {
  try {
    await AsyncStorage.setItem(ONBOARDED_KEY, 'true');
  } catch (e) {
    console.log('Error saving onboarding status', e);
  }
};

export const getHasSeenOnboarding = async () => {
  try {
    const value = await AsyncStorage.getItem(ONBOARDED_KEY);
    return value === 'true';
  } catch (e) {
    console.log('Error reading onboarding status', e);
    return false;
  }
};

export const removeHasSeenOnboarding = async () => {
  await AsyncStorage.removeItem(ONBOARDED_KEY);
};