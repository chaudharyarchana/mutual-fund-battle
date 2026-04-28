import AsyncStorage from "@react-native-async-storage/async-storage";

const DECK_STORAGE_KEY = "@fund_powercard_deck";

export const getSavedDeck = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(DECK_STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    return [];
  }
};

export const saveToDeck = async (fund) => {
  if (!fund || !fund.id) {
    return { success: false, message: "Invalid fund data" };
  }

  try {
    const currentDeck = await getSavedDeck();
    
    if (currentDeck.length >= 5) {
      return { success: false, message: "Deck is full (Max 5 cards)" };
    }

    const isDuplicate = currentDeck.some((item) => String(item.id) === String(fund.id));
    if (isDuplicate) {
      return { success: false, message: "Card already in your collection" };
    }

    const updatedDeck = [...currentDeck, fund];
    await AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(updatedDeck));
    
    return { success: true, updatedDeck };
  } catch (e) {
    return { success: false, message: "Storage write failed" };
  }
};

export const removeFromDeck = async (fundId) => {
  try {
    const currentDeck = await getSavedDeck();
    const updatedDeck = currentDeck.filter((item) => String(item.id) !== String(fundId));
    
    await AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(updatedDeck));
    return updatedDeck;
  } catch (e) {
    return [];
  }
};