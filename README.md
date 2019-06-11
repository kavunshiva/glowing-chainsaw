## Overview of app
This was made in React. It has a `containers` directory, more for managing API calls, keeping track of the app's overall state, and handling the logic for which component should render, and a `components` directory, more for holding views that are less responsible for the app's core logic.

### How it works
When the app is loaded, the user is asked whether they would like to play a game of trivia in the `StartGamePrompt` component. If they would, a `fetch` call is made to the OpenTriviaDB to pull down ten random questions, which are sorted randomly and passed down to the `QuestionPrompt` component. (The `QuestionPrompt` component also receives the `score` and question `count` as props so the user knows where they are in the game.)

When the user submits an answer to a question, the index of which question to display is incremented in the parent `TriviaGameContainer`, and the score is incremented as well if they answer correctly. Play progresses until the index is equal to the number of questions (in this case, `10` because of the param in the initial aforementioned API call), at which point the user is shown the `GameEndedPrompt` and asked if they would like to play again. Playing again resets the score and the question index and fetches a new set of questions from the OpenTriviaDB API. High scores are persisted in the browser's `localStorage`.

### What I would do with more time, etc.
Oh, I dunno. I'd probably make it prettier: it's pretty barebones right now. Things I might do are: change the colors of some of the fonts (e.g. to indicate whether the player has exceeded the high score at the end), mess around with CSS, and add some cool animations (e.g. transitions). I might also add some unit tests to make sure that I'm handling basic functionality as well as edge cases, especially if I decided to grow the app beyond its current small footprint.
