import React from "react";
import { StyleSheet, View, FlatList, SafeAreaView } from "react-native";
import DeckCard from "../components/DeckCard";
import { retrieveDecks } from "../backend/storage";
import { NavigationEvents } from "react-navigation";
import { ScrollView } from "react-native-gesture-handler";

class ListDecks extends React.Component {
  state = {
    list: []
  };

  loadDecks = async () => {
    console.log("loading");
    try {
      const decks = await retrieveDecks();
      this.setState({
        list: decks
      });
    } catch (error) {
      console.error(error);
    }
  };

  async componentWillMount() {}

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <NavigationEvents
          onDidFocus={payload => {
            console.log("onDidFocus", payload);
            this.loadDecks();
          }}
          onDidBlur={() => {
            this.setState({ list: [] });
          }}
        />

        <ScrollView>
          <View style={{ padding: 20 }}>
            {this.state.list.length > 0 &&
              this.state.list.map((item, index) => {
                return <DeckCard key={index} data={item} />;
              })}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

ListDecks.navigationOptions = {
  title: "List Decks"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F8FA"
  },
  input: {
    padding: 10,
    margin: 14,
    borderColor: "#777",
    borderStyle: "solid",
    maxWidth: "100%",
    borderRadius: 15
  },
  text: {
    color: "#333",
    fontSize: 13,
    padding: 10
  },
  button: {
    marginTop: 40,
    borderRadius: 15,
    padding: 8
  }
});

export default ListDecks;
