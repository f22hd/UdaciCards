import React from "react";
import { StyleSheet, Text, View, Button, Alert, SafeAreaView } from "react-native";
// import Toast from "react-native-toast-native";
import { withNavigation, NavigationEvents } from "react-navigation";
import { deleteDeck, getDeck } from "../backend/storage";
import Colors from "../constants/Colors";

class DeckDetails extends React.Component {
  state = {
    deckDetails: {}
  };

  init = async () => {
    const { title } = this.props.navigation.state.params;
    const deck = await getDeck(title);
    this.setState({
      deckDetails: deck
    });
  };
  componentDidMount() {}

  delete = () => {
    // confirm
    console.log("deletion");
    this.actualDelete();
    // try {
    //   Alert.alert(
    //     "Confirm",
    //     `Are you sure to delete ${this.state.deckDetails.title}?`,
    //     [
    //       { text: "Delete", onPress: () => this.actualDelete() },
    //       { text: "Cancel", style: "cancel" }
    //     ],
    //     { cancelable: true }
    //   );
    // } catch (error) {
    //   console.error(error);
    // }
  };

  actualDelete = async () => {
    const isDeleted = await deleteDeck(this.state.deckDetails);
    if (isDeleted) {
      //this.showMessage("Deck has been deleted successfully");
      this.props.navigation.goBack();
    } else {
      // show error
    }
  };

  showMessage = msg => {
    //Toast.show(msg, Toast.SHORT);
  };

  addCard = () => {
    this.props.navigation.navigate("AddQuestion", { deckDetails: this.state.deckDetails });
  };

  startQuiz = () => {
    this.props.navigation.navigate("Quiz", { title: this.state.deckDetails.title });
  };

  /* 
      Number of cards in the deck -- done
      Option to start a quiz for that deck
      Option to add a new question to the deck

      button : add card
      button : start quiz

  */

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <NavigationEvents onDidFocus={() => this.init()} />

        <View style={styles.textWrapper}>
          <Text style={styles.title}>{this.state.deckDetails.title}</Text>
          {this.state.deckDetails.questions && <Text style={styles.text}>Cards: {this.state.deckDetails.questions.length}</Text>}
        </View>

        <View style={styles.buttonWrapper}>
          <Button title="Add Card" style={styles.button} onPress={() => this.addCard()} />
          <br />
          <Button title="Start Quiz" style={styles.button} onPress={() => this.startQuiz()} />
          <br />
          <Button title="Delete Deck" style={styles.dangerButton} onPress={() => this.delete()} />
        </View>
      </SafeAreaView>
    );
  }
}

DeckDetails.navigationOptions = {
  title: "Deck Details"
};

export default withNavigation(DeckDetails);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 40,
    backgroundColor: "#F5F8FA",

    borderColor: "#ddd",
    borderRadius: 15,
    borderWidth: 1,
    borderStyle: "solid"
  },
  textWrapper: {
    alignSelf: "center"
  },
  text: {
    color: "#333",
    fontSize: 17,
    padding: 10
  },
  title: {
    fontSize: 28,
    color: Colors.warningText
  },
  buttonWrapper: {
    padding: 30
  },
  button: {
    borderRadius: 15,
    padding: 30
  },
  dangerButton: {
    backgroundColor: Colors.errorBackground,
    color: Colors.errorText
  }
});
