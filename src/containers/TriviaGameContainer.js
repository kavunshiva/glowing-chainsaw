import React, { Component } from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';
import { StartGamePrompt } from '../components/StartGamePrompt';
import { GameEndedPrompt } from '../components/GameEndedPrompt';
import QuestionPrompt from '../components/QuestionPrompt';

export default class TriviaGameContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      currentQuestionIndex: 0,
      score: 0,
      gameStarted: false,
      gameEnded: false,
      isFetching: false,
    };

    this.handleStartGame = this.handleStartGame.bind(this);
    this.handleSubmitAnswer = this.handleSubmitAnswer.bind(this);
  }

  decodeHtml(str) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = str;
    return textArea.value;
  }

  fetchQuestions(callback) {
    this.setState({ isFetching: true });
    return fetch('https://opentdb.com/api.php?amount=10')
      .then(response => response.json())
      .then(rawQuestions => {
        const questions = rawQuestions.results.map((rawQuestion, id) => {
          const { correct_answer, incorrect_answers, question } = rawQuestion;
          return {
            id,
            question: this.decodeHtml(question),
            answers: [
              ...incorrect_answers.map(answer => ({
                answer: this.decodeHtml(answer),
                correct: false,
              })),
              { answer: this.decodeHtml(correct_answer), correct: true },
            ].sort(() => 0.5 - Math.random()),
          };
        });
        return this.setState({ questions }, callback);
      })
      .catch(err => console.log(err));
  }

  handleStartGame() {
    return this.fetchQuestions(
      () => this.setState({
        gameStarted: true,
        gameEnded: false,
        currentQuestionIndex: 0,
        isFetching: false,
        score: 0,
      }),
    );
  }

  handleSubmitAnswer(correct) {
    return this.setState(prevState => {
      const currentQuestionIndex = prevState.currentQuestionIndex + 1;
      const score = prevState.score += correct ? 1 : 0;
      const gameEnded = prevState.questions.length === currentQuestionIndex;
      if (gameEnded) {
        const highScore = localStorage.getItem('highScore');
        if (!highScore || score > highScore) localStorage.setItem('highScore', score);
      }
      return { currentQuestionIndex, score, gameEnded };
    });
  }

  render() {
    const {
      questions,
      currentQuestionIndex,
      gameStarted,
      gameEnded,
      isFetching,
      score,
    } = this.state;

    if (isFetching) return <Dimmer active><Loader /></Dimmer>;
    if (!gameStarted && !gameEnded) {
      return <StartGamePrompt handleStartGame={this.handleStartGame} />;
    }

    if (gameEnded) return <GameEndedPrompt handleStartGame={this.handleStartGame} score={score} />;

    const question = questions && questions[currentQuestionIndex];
    return <QuestionPrompt
      question={question}
      handleSubmitAnswer={this.handleSubmitAnswer}
      count={`${currentQuestionIndex + 1}/${questions.length}`}
      score={score}
    />;
  }
}
