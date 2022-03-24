const title = document.querySelector('#title')
const userMsg = document.querySelector('#userMsg')
const currentRange = document.querySelector('#currentRange')
const contentWrapper = document.querySelector('#contentWrapper')
const newGame = document.createElement('div')
const numGuess = document.querySelector('#numGuess')
const btnsWrapper = document.querySelector('#btnsWrapper')


numGuess.classList = 'd-flex align-items-center justify-content-center mb-3'
newGame.innerHTML = `<button class='btn btn-light shadow-sm'>New Game</button>`


let randomNum = Math.floor(Math.random() * 100)
let guessCount = 0

let minNum = 0
let maxNum = 100


newGame.addEventListener('click', () => location.reload())

function gameStart(gameDifficulty) {
    contentWrapper.prepend(newGame)
    currentRange.innerText = 'Current range:'
    numGuess.innerHTML = `<input onkeydown="numLimit(event)" onchange="numLimit(event)" id='input' type='number' class='form-control mx-1' />
    <button onclick='submitNum(event)' class='btn btn-info shadow-sm'>Submit</button>`

    btnsWrapper.innerHTML = `<div style="width: 100%; height: 50px;" class='bg-dark rounded my-4'>
        <div style="width: 50%; position: relative; height: 50px;" class='bg-primary rounded'>
            <p id='min' style="position: absolute; left: -4px; bottom: 35px">0</p>
            <p id='max' style="position: absolute; right: -10px; bottom: 35px">100</p>
        </div>
    </div>`
    if (gameDifficulty === 'easy') {
        guessCount = 10
    } else {
        guessCount = 5
    }
    title.innerText = `Remaining chances: ${guessCount ? guessCount : ''}`
}

function submitNum(event) {
    const input = document.querySelector('#input')
    const min = document.querySelector('#min')
    const max = document.querySelector('#max')
    let playerGuess = input.value
    if (Number(playerGuess) <= 50) {
        min.innerText = playerGuess
    } else if (Number(playerGuess) > 50) {
        max.innerText = playerGuess
    }
    if (guessCount - 1) {
        playerActive(playerGuess)
    } else {
        event.target.disabled = true
        userMsg.classList = 'text-danger'
        userMsg.innerText = 'No attemps!'
        title.innerText = `Remaining chances: 0`
    }
}

function playerActive(playerGuess) {
    if (Number(playerGuess) === randomNum) {
        userMsg.classList = 'text-success'
        userMsg.innerText = 'You Win!'
    } else if (Number(playerGuess) <= randomNum) {
        userMsg.classList = 'text-warning'
        userMsg.innerText = 'You guess too low!'
        guessCount -= 1
        title.innerText = `Remaining chances: ${guessCount}`
    } else if (Number(playerGuess) >= randomNum) {
        userMsg.classList = 'text-warning'
        userMsg.innerText = 'You guess too high!'
        guessCount -= 1
        title.innerText = `Remaining chances: ${guessCount}`
    } 
}

function numLimit(event) {
    if (event.target.value) {
        if (event.target.value <= 0) {
            event.target.value = 1
        } else if (event.target.value >= 101) {
            event.target.value = 100
        }
    }
}