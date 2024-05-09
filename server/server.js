const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5001;

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

// array to hold guesses
let randomNumber = Math.floor(Math.random() * 25) + 1;
let numberGuesses = [];
let guessesMade = 0;

// GET & POST Routes go here

// POST for submitting guesses to server
app.post('/guesses', (req, res) => {
  let guess = req.body;
  numberGuesses.push(guess);
  res.status(201).send(numberGuesses);
});

// POST for guess counter
// app.post('/guessesMade', (req, res) => {
//   guessesMade++;
//   res.status(201).send(guessesMade);
// });

app.get('/guessesMade', (req, res) => {
  guessesMade++;
  res.send(guessesMade);
});

// GET to retrieve all previous guesses
app.get('/guesses', (req, res) => {
  let resultArray = [];
  // let result = {};
  // const tooHigh = [];
  // const tooLow = [];

  console.log(randomNumber);

  for (const guess of numberGuesses) {
    if (guess.playerGuess === randomNumber) {
      guess.result = 'Correct!';
      resultArray.push(guess);
      const restartButton = document.getElementById('restart-button');
      restartButton.innerHTML = `<button>Restart</button>`;
    } else if (guess.playerGuess > randomNumber) {
      guess.result = 'Too high!';

      // result = { name: guess.name, guess: guess.guess, result: 'Too high!' };
      resultArray.push(guess);
    } else {
      guess.result = 'Too Low!';

      // result = { name: guess.name, guess: guess.guess, result: 'Too Low' };
      resultArray.push(guess);
    }
    console.log(guess);
  }
  console.log(resultArray);

  res.send(resultArray);
});

// app.delete ('/guesses')

app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});
