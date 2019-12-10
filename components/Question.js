import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

export default class Question extends React.Component {
  componentWillReceiveProps(props) {
    console.log(props);
  }

  render() {
    console.log(this.props.question);
    return <View>{this.props.question && <Text style={styles.title}>{this.props.question.question}</Text>}</View>;
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    textAlign: "center",
    color: Colors.tintColor
  }
});
