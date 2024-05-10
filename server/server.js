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
  let result = {};
  // const tooHigh = [];
  // const tooLow = [];
  console.log(randomNumber);
  // for (let i = 0; i < numberGuesses.length; i++) {
  //   let guess = numberGuesses[i];
  // console.log(numberGuesses[i]);
  // check logans guess
  console.log(guess.loganGuess);
  console.log(guess.gabrielleGuess);
  console.log(guess.adamGuess);
  if (Number(guess.loganGuess) === randomNumber) {
    result.loganGuess = guess.loganGuess;
    result.loganResult = 'Correct!';
  } else if (guess.loganGuess > randomNumber) {
    result.loganGuess = guess.loganGuess;
    result.loganResult = 'Too High!';
  } else if (guess.loganGuess < randomNumber) {
    result.loganGuess = guess.loganGuess;
    result.loganResult = 'Too Low!';
  }
  // check gabrielle guess
  if (Number(guess.gabrielleGuess) === randomNumber) {
    result.gabrielleGuess = guess.gabrielleGuess;
    result.gabrielleResult = 'Correct!';
  } else if (guess.gabrielleGuess > randomNumber) {
    result.gabrielleGuess = guess.gabrielleGuess;
    result.gabrielleResult = 'Too High!';
  } else if (guess.gabrielleGuess < randomNumber) {
    result.gabrielleGuess = guess.gabrielleGuess;
    result.gabrielleResult = 'Too Low!';
  }
  // check adams guess
  if (Number(guess.adamGuess) === randomNumber) {
    result.adamGuess = guess.adamGuess;
    result.adamResult = 'Correct!';
  } else if (guess.adamGuess > randomNumber) {
    result.adamGuess = guess.adamGuess;
    result.adamResult = 'Too High!';
  } else if (guess.adamGuess < randomNumber) {
    result.adamGuess = guess.adamGuess;
    result.adamResult = 'Too Low!';
  }
  // resultArray.push(result);
  // }
  // console.log(result);
  console.log(result.loganGuess);
  console.log(result.gabrielleGuess);
  console.log(result.adamGuess);
  guessesMade += 1;

  // res.send(result);

  numberGuesses.push(result);
  // console.log(numberGuesses);
  res.status(201).send(numberGuesses);
});

// POST for guess counter
// app.post('/guessesMade', (req, res) => {
//   res.send(`${guessesMade}`);
// });

app.get('/guessesMade', (req, res) => {
  res.send(`${guessesMade}`);
});

// GET to retrieve all previous guesses
app.get('/guesses', (req, res) => {
  res.send(numberGuesses);
});

app.delete('/guesses', (req, res) => {
  numberGuesses = [];
  guessesMade = 0;
  randomNumber = Math.floor(Math.random() * 25) + 1;
  res.send('DELETE Request Called for /guesses');
});

app.listen(PORT, () => {
  // console.log('Server is running on port', PORT);
});
