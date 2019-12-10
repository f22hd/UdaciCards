import React from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import AddQuestionForm from "../components/AddQuestionForm";
import { withNavigation } from "react-navigation";
import { AddDeck } from "../backend/storage";
import Colors from "../constants/Colors";
class AddQuestion extends React.Component {
  /**
   * The New Question view includes a form with fields for a question and answer, and a submit button.
   * Submitting the form correctly adds the question to the deck.
   */

  onSubmit = async data => {
    console.log("AddQuestion", data);
    let { deckDetails } = this.props.navigation.state.params;
    console.log(deckDetails);
    deckDetails.questions.push(data);
    const isAdded = await AddDeck(deckDetails);
    if (isAdded) {
      this.props.navigation.goBack();
    }
  };

  render() {
    const { deckDetails } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Add new Card for {deckDetails.title}</Text>
        <AddQuestionForm onSubmit={this.onSubmit} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#F5F8FA"
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    padding: 20,
    color: Colors.tintColor
  }
});

AddQuestion.navigationOptions = {
  title: "Add Card"
};
export default withNavigation(AddQuestion);
