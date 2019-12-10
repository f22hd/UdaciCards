import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import TabBarIcon from "../components/TabBarIcon";

import AddDeck from "../screens/AddDeck";
import ListDecks from "../screens/ListDeck";
import AddQuestion from "../screens/AddQuestion";
import DeckDetails from "../screens/DeckDetails";
import QuizDetails from "../screens/QuizDetails";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

// my

const AddDeckStack = createStackNavigator(
  {
    AddDeck: AddDeck,
    AddQuestion: AddQuestion,
    DeckDetails: DeckDetails,
    AddDeck: AddDeck,
    Quiz: QuizDetails
  },
  config
);

AddDeckStack.navigationOptions = {
  tabBarLabel: "Add Deck",
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={Platform.OS === "ios" ? "ios-add" : "md-add"} />
};

const ListDeckStack = createStackNavigator(
  {
    Decks: ListDecks,
    AddQuestion: AddQuestion,
    DeckDetails: DeckDetails,
    AddDeck: AddDeck,
    Quiz: QuizDetails
  },
  config
);

ListDeckStack.navigationOptions = {
  tabBarLabel: "List Deck",
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={Platform.OS === "ios" ? "ios-list" : "md-list"} />
};
// my

const tabNavigator = createBottomTabNavigator({
  ListDeckStack,
  AddDeckStack
});

tabNavigator.path = "";

export default tabNavigator;
