function onReady() {
  console.log('JavaScript is loaded!');
  fetchGuesses();
}

onReady();

let guessesMade = document.getElementById('guesses-made');

function guessHandler(event) {
  event.preventDefault();

  const loganGuess = document.getElementById('logan-guess').value;
  const gabrielleGuess = document.getElementById('gabrielle-guess').value;
  const adamGuess = document.getElementById('adam-guess').value;

  axios({
    method: 'POST',
    url: '/guesses',
    data: { loganGuess, gabrielleGuess, adamGuess },
  })
    .then(function (response) {
      console.log('Guess has been accepted!');
      fetchGuesses();
    })
    .catch(function (error) {
      console.log(error);
      alert('Something is not right, check the console');
    });

  document.getElementById('logan-guess').value = '';
  document.getElementById('gabrielle-guess').value = '';
  document.getElementById('adam-guess').value = '';
  // guessCounter();
  guessPost();
}

function fetchGuesses() {
  axios
    .get('/guesses')
    .then((response) => {
      const tableBody = document.getElementById('guessHistoryTable');
      tableBody.innerHTML = '';
      for (let i = 0; i < response.data.length; i++) {
        let guess = response.data[i];
        tableBody.innerHTML += `
                <tr>
                    <td id="logan${i}">${guess.loganGuess}, ${guess.loganResult}</td>
                    <td id="gabrielle${i}">${guess.gabrielleGuess}, ${guess.gabrielleResult}</td>
                    <td id="adam${i}">${guess.adamGuess}, ${guess.adamResult}</td>
                </tr>
            `;
        if (guess.gabrielleResult === 'Correct!') {
          const gabrielleGuess = document.getElementById(`gabrielle${i}`);
          gabrielleGuess.style.backgroundColor = 'cornflowerblue';
          gabrielleGuess.style.fontWeight = 'bolder';
        }
        if (guess.loganResult === 'Correct!') {
          const loganGuess = document.getElementById(`logan${i}`);
          loganGuess.style.backgroundColor = 'green';
          loganGuess.style.fontWeight = 'bolder';
        }
        if (guess.adamResult === 'Correct!') {
          const adamGuess = document.getElementById(`adam${i}`);
          adamGuess.style.backgroundColor = 'goldenrod';
          adamGuess.style.fontWeight = 'bolder';
        }
      }
    })
    .catch((error) => {
      console.log(error);
      alert('Something is not right, check the console.');
    });
  guessCounter();
}

function guessCounter() {
  axios
    .get('/guessesMade')
    .then((response) => {
      const guessesMade = document.getElementById('guesses-made');
      console.log('Game:', response.data);
      guessesMade.innerHTML = response.data;
    })
    .catch((error) => {
      console.log(error);
      alert('Something went wrong, check the console');
    });
}

function guessPost() {
  axios
    .post('/guessesMade')
    .then((response) => {
      const guessesMade = document.getElementById('guesses-made');
      console.log('Game:', response.data);
      guessesMade.innerHTML = response.data;
    })
    .catch((error) => {
      console.log(error);
      alert('Something went wrong, check the console');
    });
}
// function removePlayerGuess(event) {

// }

function resetGame(event) {
  axios
    .delete('/guesses')
    .then((response) => {
      console.log(response.data);
      const tableBody = document.getElementById('guessHistoryTable');
      tableBody.innerHTML = '';
    })
    .catch((error) => console.log('There is an error.', error));
}
setInterval(fetchGuesses, 1000);
