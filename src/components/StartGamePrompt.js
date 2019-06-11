import React from 'react';
import {
  Button,
  Grid,
  Segment,
} from 'semantic-ui-react';

export const StartGamePrompt = ({ handleStartGame }) => (
  <Grid centered style={{ margin: 50 }}>
    <Segment.Group>
      <Segment>
        <Grid.Column>
          <h3 style={{ padding: '3em' }}>
            Would you like to play a game of trivia?
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
