let rand_num = parseInt(Math.random()*100+1);
const submit = document.querySelector('#subt');
const userinput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const Low_High = document.querySelector('.lowOrHi');
const startOver = document.querySelector('.resultParas');

const p = document.createElement('p');
let prevguess = []
let numGuess = 1
let playGame = true

if(playGame){
  submit.addEventListener('click',function(e){
    e.preventDefault()
    const guess = parseInt(userinput.value);
    validateGuess(guess)
  })
}

function validateGuess(guess){
  if(isNaN(guess)){
    alert("Please Enter A Valid Number")
  }
  else if(guess < 1){
    alert("Please Enter A Number Greater Than 1")
  }
  else if(guess > 100){
    alert("Enter A Number Less Than 100")
  }
  else{
    prevguess.push(guess)
    if(numGuess === 11){
      displayGuess(guess)
      displayMessage(`Game Over. Random number was ${rand_num}`)
      EndGame()
    }
    else{
      displayGuess(guess)
      checkGuess(guess)
    }
  }
}
function checkGuess(guess){
  if(guess === rand_num){
    displayMessage(`Right Guess`)
    EndGame()
  }
  else if(guess < rand_num){
    displayMessage(`The number is too low`)
  }
  else if(guess > rand_num)
  {
    displayMessage(`The number is too high`)
  }
}
function displayGuess(guess){
  userinput.value = ''
  guessSlot.innerHTML += `${guess} `
  numGuess++;
  remaining.innerHTML = `${11 - numGuess}`
}
function displayMessage(message){
  Low_High.innerHTML = `<h2>${message}</h2>`
}
function NewGame(){
  const newGameButton =document.querySelector('#newGame')
  newGameButton.addEventListener('click',function(e){
    rand_num = parseInt(Math.random()*100+1);
    prevguess = []
    numGuess = 1
    guessSlot.innerHTML = ''
    remaining.innerHTML = `${11 - numGuess}`
    userinput.removeAttribute('disabled')
    startOver.removeChild(p)
    playGame = true
  })
}
function EndGame(){
  userinput.value = ''
  userinput.setAttribute('disabled','')
  p.classList.add('button')
  p.innerHTML = `<h2 id="newGame">Start New Game</h2>`
  startOver.appendChild(p)
  playGame = false
  NewGame()
}