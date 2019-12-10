import React from "react";
import { StyleSheet, Text, View, Button, Alert, SafeAreaView } from "react-native";
// import Toast from "react-native-toast-native";
import { withNavigation, NavigationEvents } from "react-navigation";
import { getDeck } from "../backend/storage";
import Colors from "../constants/Colors";
import Question from "../components/Question";

class QuizDetails extends React.Component {
  state = {
    deckDetails: {},
    correctAnswersCount: 0,
    questions: [],
    currentQuestionIndex: 0,
    isVisibleAnswer: false,
    isQuestionsOver: false
  };

  init = async () => {
    const { title } = this.props.navigation.state.params;
    const deck = await getDeck(title);
    this.setState({
      deckDetails: deck,
      questions: deck.questions
    });
  };

  showAnswer = () => {
    this.setState({ isVisibleAnswer: !this.state.isVisibleAnswer });
  };

  nextQuestion = () => {
    if (this.state.questions.length > this.state.currentQuestionIndex + 1) {
      this.setState({
        currentQuestionIndex: this.state.currentQuestionIndex + 1,
        isVisibleAnswer: false
      });
    } else {
      this.setState({
        isQuestionsOver: true
      });
    }
  };

  submitAnswer = isYes => {
    const currentQuestion = this.state.questions[this.state.currentQuestionIndex];
    const answer = isYes ? "yes" : "no";
    if (currentQuestion.answer.toLowerCase() === answer) {
      this.setState({
        correctAnswersCount: this.state.correctAnswersCount + 1
      });
    }

    this.nextQuestion();
  };

  reset = () => {
    this.setState({
      deckDetails: {},
      correctAnswersCount: 0,
      questions: [],
      currentQuestionIndex: 0,
      isVisibleAnswer: false,
      isQuestionsOver: false
    });

    this.init();
  };

  goBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <NavigationEvents onDidFocus={() => this.init()} />

        {this.state.questions.length > 0 ? (
          <View>
            <View style={styles.textWrapper}>
              <Text style={styles.title}>
                {"Questions: "}
                {this.state.currentQuestionIndex + 1} of {this.state.questions.length}{" "}
              </Text>
            </View>

            <View style={styles.textWrapper}>
              {this.state.questions && <Question question={this.state.questions[this.state.currentQuestionIndex]} />}
            </View>

            {this.state.isVisibleAnswer && (
              <View style={styles.textWrapper}>
                <Text style={{ color: Colors.errorBackground, padding: 20, fontSize: 16 }}>
                  {this.state.questions[this.state.currentQuestionIndex].answer}
                </Text>
              </View>
            )}

            <View style={styles.textWrapper}>
              <Text>Score: {this.state.correctAnswersCount}</Text>
            </View>

            {/* action buttons */}
            {!this.state.isQuestionsOver ? (
              <View style={styles.buttonWrapper}>
                <Button style={styles.button} title="Show Asnwer" onPress={() => this.showAnswer()}></Button>

                <br />

                <Button style={styles.button} title="Correct" onPress={() => this.submitAnswer(true)}></Button>

                <br />

                <Button style={styles.button} title="Incorrect" onPress={() => this.submitAnswer(false)}></Button>
              </View>
            ) : (
              <View style={styles.buttonWrapper}>
                <Text style={styles.dangerText}>Your quiz is over</Text>
                <Button style={styles.button} title="Again" onPress={() => this.reset()}></Button>

                <br />

                <Button style={styles.button} title="Go Back" onPress={() => this.goBack()}></Button>
              </View>
            )}
          </View>
        ) : (
          <View>
            <Text style={styles.title}>No Questions Found</Text>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

QuizDetails.navigationOptions = {
  title: "Quiz"
};

export default withNavigation(QuizDetails);

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
    alignSelf: "center",
    marginTop: 30
  },
  text: {
    color: "#333",
    fontSize: 17,
    padding: 10
  },
  title: {
    fontSize: 28,
    color: Colors.warningText,
    textAlign: "center"
  },
  buttonWrapper: {
    padding: 30,
    marginTop: 30
  },
  button: {
    borderRadius: 15,
    padding: 30,
    marginTop: 40
  },
  dangerText: {
    padding: 29,
    marginBottom: 20,
    color: Colors.errorBackground
  }
});
