import React from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

class AddQuestionForm extends React.Component {
  state = {
    question: "",
    answer: ""
  };

  onChange = (key, value) => {
    this.setState({
      [key]: value
    });
  };

  onSubmit = () => {
    this.props.onSubmit({ ...this.state });
    this.setState({
      question: "",
      answer: ""
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <TextInput placeholder="Question" style={styles.input} onChangeText={text => this.onChange("question", text)} />
          <TextInput placeholder="Answer" style={styles.input} onChangeText={text => this.onChange("answer", text)} />

          <Button style={styles.button} title="Add" onPress={() => this.onSubmit()}></Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  form: {
    margin: 30,
    padding: 20,
    backgroundColor: "#fff",
    borderColor: "#ddd",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 15
  },
  input: {
    padding: 10,
    margin: 14,
    borderColor: "#ddd",
    borderWidth: 1,
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

export default AddQuestionForm;
