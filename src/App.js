import "./App.css";
import { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playerScore: 0,
      questions: [
        {
          question: "Where was Techno developed?",
          possibleAnswers: ["Detroit, Michigan", "Boston, Massachusetts"],
          rightAnswer: "Detroit, Michigan",
          playerScore: null,
        },
        {
          question: "When was Techno Developed?",
          possibleAnswers: ["1970s", "1980s"],
          rightAnswer: "1980s",
          playerScore: null,
        },
        {
          question: 'Who had developed the phrase "techno rebels"?',
          possibleAnswers: ["Carl Cox", "Alvin Toffler"],
          rightAnswer: "Alvin Toffler",
          playerScore: null,
        },
        {
          question: "Who won alternative Top 100 DJs 2020?",
          possibleAnswers: ["Carl Cox", "Charlotte De Witte"],
          rightAnswer: "Charlotte De Witte",
          playerScore: null,
        },
      ],
    };
  }

  answerQuestion(index, choice) {
    const answeredQuestion = this.state.questions[index];
    answeredQuestion.playerChoice = choice;
    const allQuestions = this.state.questions;
    allQuestions[index] = answeredQuestion;

    this.setState({ questions: allQuestions }, () => {
      this.updatePlayerScore();
    });
  }

  updatePlayerScore() {
    const playerScore = this.state.questions.filter(
      (q) => q.rightAnswer === q.playerChoice
    ).length;
    this.setState({ playerScore });
  }

  displayResult(index) {
    const question = this.state.questions[index];
    if (!question.playerChoice) {
      return;
    }
    if (question.playerChoice === question.rightAnswer) {
      return <p className="resultCorrect">Your answer is correct!!</p>;
    } else {
      return <p className="resultIncorrect">Your answer is incorrect!!</p>;
    }
  }

  displayScore() {
    const playerScore = this.state.playerScore;
    return <p className="playerScore">{`Player score: ${playerScore}`}</p>;
  }

  renderQuestions() {
    return this.state.questions.map((question, index) =>
      this.displayQuestion(index)
    );
  }

  displayQuestion(index) {
    if (this.state.playerScore < index) {
      return;
    }

    const question = this.state.questions[index];

    return (
      <div className="questionDisplay" key={`q-${index}`}>
        <p className="question">{question.question}</p>
        <br />
        <div className="buttonContainer">
          {question.possibleAnswers.map((answer, answerIndex) => (
            <button
              key={`q-${index}-a-${answerIndex}`}
              className="questionChoice"
              onClick={() => this.answerQuestion(index, answer)}
            >
              {answer}
            </button>
          ))}
        </div>
        <br />
        {this.displayResult(index)}
      </div>
    );
  }

  render() {
    return (
      <div className="App">
        <h1>Techno Quiz App</h1>
        <hr />
        {this.renderQuestions()}
        {this.displayScore()}
      </div>
    );
  }
}

export default App;
