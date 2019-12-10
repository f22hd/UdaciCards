import { AsyncStorage } from "react-native";

// keys
const DECKS = "DECKS";

export const DumpDecks = async decks => {
  try {
    await AsyncStorage.setItem(DECKS, JSON.stringify(decks));
  } catch (e) {
    console.error("DumpDecks", e);
    return false;
  }
};

export const AddDeck = async deck => {
  try {
    console.log("to insterted", deck);
    let decks = await retrieveDecks();
    // remove old obj
    decks = decks.filter(d => d.title !== deck.title);

    const newDecks = decks.concat(deck);
    await AsyncStorage.setItem(DECKS, JSON.stringify(newDecks));
    return true;
  } catch (e) {
    console.error("AddDeck", e);
    return false;
  }
};

export const getDeck = async title => {
  try {
    let decks = await retrieveDecks();
    const deck = decks.find(d => d.title === title);
    return deck;
  } catch (error) {
    console.error("getDeck", e);
    return false;
  }
};

export const retrieveDecks = async () => {
  try {
    const decks = await AsyncStorage.getItem(DECKS);
    const toReturn = JSON.parse(decks);
    console.log("toReturn", toReturn);
    return toReturn;
  } catch (e) {
    console.error("retrieveDecks", e);
    return [];
  }
};

export const deleteDeck = async deck => {
  try {
    let decks = await retrieveDecks();
    const newDecks = decks.filter(d => d.title !== deck.title);
    DumpDecks(newDecks);

    return true;
  } catch (e) {
    console.error("retrieveDecks", e);
    return false;
  }
};

export const addQuestion = async (deck, question) => {};
