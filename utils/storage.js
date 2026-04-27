import AsyncStorage from "@react-native-async-storage/async-storage";

const DECK_STORAGE_KEY = "@fund_powercard_deck";

// Save deck to storage
export const saveDeck = async (deck) => {
  try {
    const jsonValue = JSON.stringify(deck);
    await AsyncStorage.setItem(DECK_STORAGE_KEY, jsonValue);
    return true;
  } catch (error) {
    console.error("Error saving deck:", error);
    return false;
  }
};

// Get deck from storage
export const getDeck = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(DECK_STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error("Error reading deck:", error);
    return [];
  }
};

// Add card to deck (max 5 cards)
export const addCardToDeck = async (card) => {
  try {
    const currentDeck = await getDeck();

    // Check if already in deck
    if (currentDeck.some((c) => c.id === card.id)) {
      return { success: false, message: "Card already in deck" };
    }

    // Check max limit
    if (currentDeck.length >= 5) {
      return { success: false, message: "Deck is full (max 5 cards)" };
    }

    const newDeck = [...currentDeck, card];
    await saveDeck(newDeck);
    return { success: true, deck: newDeck };
  } catch (error) {
    console.error("Error adding card to deck:", error);
    return { success: false, message: "Error adding card" };
  }
};

// Remove card from deck
export const removeCardFromDeck = async (cardId) => {
  try {
    const currentDeck = await getDeck();
    const newDeck = currentDeck.filter((c) => c.id !== cardId);
    await saveDeck(newDeck);
    return { success: true, deck: newDeck };
  } catch (error) {
    console.error("Error removing card from deck:", error);
    return { success: false, message: "Error removing card" };
  }
};
