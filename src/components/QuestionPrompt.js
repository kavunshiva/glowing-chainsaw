import React, { Component } from 'react';
import {
  Button,
  Checkbox,
  Form,
  Grid,
  Header,
  Segment,
} from 'semantic-ui-react';

export default class QuestionPrompt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: {},
      selectedAnswerId: null,
      selectedAnswerCorrect: null,
    };

    this.handleSelectAnswer = this.handleSelectAnswer.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { question } = this.props;
    return this.setState({ question });
  }

  componentDidUpdate(prevProps) {
    const { question: oldQuestion } = prevProps;
    const { question: newQuestion } = this.props;
    if (oldQuestion.id !== newQuestion.id) return this.setState({ question: newQuestion });
    return null;
  }

  handleSelectAnswer(e, { value }) {
    const { answers } = this.state.question;
    return this.setState({
      selectedAnswerId: value,
      selectedAnswerCorrect: answers[value].correct,
    });
  }

  handleSubmit() {
    const { selectedAnswerCorrect } = this.state;
    return this.setState(
      { selectedAnswerId: null },
      () => this.props.handleSubmitAnswer(selectedAnswerCorrect),
    );
  }

  render() {
    const { count, score } = this.props;
    const { question } = this.state;
    return (
      <Grid centered style={{ margin: 50 }}>
        <Segment.Group>
          <Segment>
            <Header as='h4'>{`count: ${count}`}</Header>
            <Header as='h4'>{`score: ${score}`}</Header>
            <Grid.Column>
              <h3 style={{ margin: '2em' }}>
                {question.question}
              </h3>
            </Grid.Column>
          </Segment>
          <Segment>
          <Form>
            {
              question.answers && question.answers.map((answer, i) => (
                <Form.Field key={`answer-${i}`}>
                  <Checkbox
                    radio
                    style={{ align: 'left' }}
                    label={answer.answer}
                    name={answer.answer}
                    value={i}
                    checked={this.state.selectedAnswerId === i}
                    onChange={this.handleSelectAnswer}
                  />
                </Form.Field>
              ))
            }
          </Form>
          </Segment>
          <Segment>
            <Grid.Column>
              <Button primary onClick={this.handleSubmit}>
                Submit Answer
              </Button>
            </Grid.Column>
          </Segment>
        </Segment.Group>
      </Grid>
    );
  }
}
