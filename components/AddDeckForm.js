import React from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { AddDeck } from "../backend/storage";

class AddDeckForm extends React.Component {
  state = {
    title: "",
    errorMsg: ""
  };

  onChange = (key, value) => {
    this.setState({
      [key]: value
    });
  };

  onSubmit = async () => {
    try {
      const obj = {
        ...this.state,
        questions: []
      };
      const isAdded = await AddDeck(obj);
      if (isAdded) {
        console.log(isAdded, this.props);
        this.props.onAdded(obj);
        this.setState({
          title: ""
        });
      } else {
        this.setState({
          errorMsg: "Unable to Add new Deck"
        });
      }
    } catch (e) {
      console.error(e);

      this.setState({
        errorMsg: "Unable to Add new Deck"
      });
    }
  };

  render() {
    return (
      <View>
        <View style={styles.form}>
          <TextInput placeholder="Title" style={styles.input} value={this.state.title} onChangeText={text => this.onChange("title", text)} />
          <Button style={styles.button} title="Add" onPress={() => this.onSubmit()}></Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  form: {
    margin: 20,
    padding: 10
  },
  input: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 20,
    marginBottom: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    borderStyle: "solid",
    maxWidth: "100%",
    borderRadius: 15,
    shadowColor: null
  },
  focus: {
    shadowColor: "none"
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

export default AddDeckForm;
