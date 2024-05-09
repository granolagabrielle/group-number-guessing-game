function onReady() {
  console.log('JavaScript is loaded!');
  fetchGuesses();
}

onReady();
let guessesMade = document.getElementById('guesses-made');


function guessHandler(event) {
  event.preventDefault();

  const playerName = document.getElementById('player-name').value;
  const playerGuess = document.getElementById('player-guess').value;

  axios({
    method: 'POST',
    url: '/guesses',
    data: { playerName, playerGuess },
  })
    .then(function (response) {
      console.log('Guess has been accepted!');
      fetchGuesses();

    })
    .catch(function (error) {
      console.log(error);
      alert('Something is not right, check the console');
    });
  document.getElementById('player-name').value = '';
  document.getElementById('player-guess').value = '';
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
                  <td>${guess.playerName}</td>
                  <td>${guess.playerGuess}</td>
                  <td>${guess.result}</td>
              </tr>
          `;
      }
    })
    .catch((error) => {
      console.log(error);
      alert('Something is not right, check the console.');
    });
}

function guessCounter(){
  axios.get('/guessesMade').then(response => {
    const guessesMade = document.getElementById('guesses-made');
    console.log(response.data)
    guessesMade.value = response.data;
 
  }).catch(error => {
    console.log(error);
    alert('Something went wrong, check the console')
  })
}

// setInterval(fetchGuesses, 1000);