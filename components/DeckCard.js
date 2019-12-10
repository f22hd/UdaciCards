import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { withNavigation } from "react-navigation";

class DeckCard extends React.Component {
  componentWillReceiveProps(props) {
    console.log(props);
  }

  onClick = () => {
    console.log("props", this.props.data.title);
    this.props.navigation.navigate("DeckDetails", { title: this.props.data.title });
  };

  render() {
    const obj = this.props.data;

    return (
      <View style={styles.container} onClick={this.onClick}>
        <Text style={styles.text} style={styles.title}>
          {obj.title}
        </Text>
        <Text style={styles.text}>Cards: {obj.questions.length}</Text>
      </View>
    );
  }
}

export default withNavigation(DeckCard);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    borderColor: "#ddd",
    borderRadius: 15,
    borderWidth: 1,
    borderStyle: "solid",
    marginTop: 20
  },
  input: {
    padding: 10,
    margin: 14,
    borderColor: "#777",
    borderWidth: 1,
    borderStyle: "solid",
    maxWidth: "100%",
    borderRadius: 15
  },
  text: {
    color: "#333",
    fontSize: 17,
    padding: 10
  },
  title: {
    fontSize: 22
  },
  button: {
    marginTop: 40,
    borderRadius: 15,
    padding: 8
  }
});
