import React from 'react';
import {
  Button,
  Grid,
  Segment,
} from 'semantic-ui-react';

export const GameEndedPrompt = ({ handleStartGame, score }) => (
  <Grid centered style={{ margin: 50 }}>
    <Segment.Group>
      <Segment>
        <Grid.Column>
          <h3 style={{ padding: '3em' }}>
            Your score: {score}
          </h3>
          <h3 style={{ padding: '3em' }}>
            High Score: {localStorage.getItem('highScore')}
          </h3>
          <h3>
            Would you like to play again?
          </h3>
        </Grid.Column>
      </Segment>
      <Segment>
        <Grid.Column>
          <Button primary onClick={handleStartGame}>Yes</Button>
          <Button secondary>No</Button>
        </Grid.Column>
      </Segment>
    </Segment.Group>
  </Grid>
);
