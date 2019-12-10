import React from "react";
import { View, StyleSheet, Text, SafeAreaView } from "react-native";
import AddDeckForm from "../components/AddDeckForm";
import { withNavigation } from "react-navigation";
import Colors from "../constants/Colors";

class AddDeck extends React.Component {
  onAdded = deckDetails => {
    this.props.navigation.navigate("DeckDetails", { title: deckDetails.title });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>What title of your new Deck?</Text>
          <AddDeckForm onAdded={this.onAdded} />
        </View>
      </SafeAreaView>
    );
  }
}

AddDeck.navigationOptions = {
  title: "Add Deck"
};
export default withNavigation(AddDeck);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#F5F8FA"
  },
  wrapper: {
    borderColor: "#ddd",
    borderWidth: 1,
    borderStyle: "solid",
    backgroundColor: "#fff",
    margin: 20,
    borderRadius: 15
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    padding: 20,
    color: Colors.tintColor
  }
});
