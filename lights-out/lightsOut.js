const LIGHTS = document.querySelectorAll(".lightTile")
const INSTRUCTIONS = document.querySelector("#instructions")
const GAME_BOARD = document.querySelector(".lightsOutGrid")
const GAME_WIN_MESSAGE = document.querySelector("#gameWinMessage")

const GAME_BTN = document.querySelector("#game-btn")
const GUESS_COUNT = document.querySelector("#guessCount")
const SPACE = document.querySelector("#btnBlankSpace")

const MIN_LIGHTS_CLICKED = 15
const MAX_LIGHTS_CLICKED = 30
const MIN_INDEX = 0
const MAX_INDEX = 24

let guessCount = 0

// function that starts the game
function startGame() {
	GAME_BTN.innerText = 'Reset'
	GAME_BTN.id = 'reset'

	//remove all of the tile flashes and turn lights off and assign indicies
	let index = 0
	for ( const light of LIGHTS ){
	light.classList.remove("tileFlash")
	light.dataset.index = index
	index += 1
	}

	// hide instructions and show count
	INSTRUCTIONS.style.visibility = "hidden";
	guessCount = 0
	GUESS_COUNT.style.visibility = "visible";
	GUESS_COUNT.innerHTML = `Guess Count: ${guessCount}`;
	SPACE.style = "margin: 0 1em 0 1em";

	// generate a game board
	generateBoard()


	// make gameboard playable
	GAME_BOARD.classList.remove("unplayable")
}

// function that resets the game; reverts everything back to before start
function resetGame() {
	GAME_BTN.innerText = 'Start'
	GAME_BTN.id = 'start'

	// remove any tile off and add flashes
	for ( let light of LIGHTS ){
	light.classList.remove("tileOff")
	light.classList.add("tileFlash")
	}

	// make instructions visible
	INSTRUCTIONS.style.visibility = "visible";

	// make game board unplayable
	GAME_BOARD.classList.add("unplayable")

	// reset guess count and hide count
	guessCount = 0
	GUESS_COUNT.innerHTML = "";
	GUESS_COUNT.style.visibility="hidden"
	SPACE.style = "margin: 0 0 0 0"
}

// function that generates a game board
function generateBoard() {
	const numClicks = randomNumGen(MIN_LIGHTS_CLICKED, MAX_LIGHTS_CLICKED)
	let index
	let clicks = 0
	while (clicks < numClicks) {
	  index = randomNumGen(MIN_INDEX, MAX_INDEX)
	  lightClick( index )
	  clicks += 1
	}
	
}

// light Toggle functions below!!!!!!!!!!!!!!!!!!!!!!
///////////////////////////////////////////////////////////////////////////////////
function lightClick( lightIndex ) {
	const upperIndex = lightIndex - 5
	const lowerIndex = lightIndex + 5
	const rightIndex = lightIndex + 1
	const leftIndex = lightIndex - 1
	toggleUp(upperIndex)
	toggleDown(lowerIndex)
	toggleLeft(lightIndex, leftIndex)
	toggleRight(lightIndex, rightIndex)

	// also toggle current value
	LIGHTS[lightIndex].classList.toggle("tileOff")

	// adds to guess count if game playable
	if(!GAME_BOARD.classList.contains("unplayable")){
	  guessCount += 1 
	  GUESS_COUNT.innerHTML = `Guess Count: ${guessCount}`;
	}

}

function toggleUp( upperIndex ) {
	if ( upperIndex <= MAX_INDEX && upperIndex >= MIN_INDEX ){
	  LIGHTS[upperIndex].classList.toggle("tileOff")
	}
}
function toggleLeft( lightIndex, leftIndex ) {
	if ( leftIndex <= MAX_INDEX && leftIndex >= MIN_INDEX ){
	  if ( lightIndex % 5 != 0 ){
		LIGHTS[leftIndex].classList.toggle("tileOff")
		}
	}
}
function toggleRight( lightIndex, rightIndex ) {
	if ( rightIndex <= MAX_INDEX && rightIndex >= MIN_INDEX ){
	  if ( (lightIndex + 1) % 5 != 0 ){
		LIGHTS[rightIndex].classList.toggle("tileOff")
		}
	}
}
function toggleDown( lowerIndex ) {
	if ( lowerIndex <= MAX_INDEX && lowerIndex >= MIN_INDEX ){
	  LIGHTS[lowerIndex].classList.toggle("tileOff")
	}
}
///////////////////////////////////////////////////////////////////////////////////

// helper functions to facilitate the game 

// function that decides which action should be taken when button clicked
function buttonDecide() {
	if (GAME_BTN.id === 'start'){
	startGame()
	}else{
	resetGame()
	}
}

// function that decides to change board state or start game
// captures clicks on board
function gameBoardDecide(event) {
	if (GAME_BOARD.classList.contains("unplayable")){
	  startGame()
	} else if(event.target.classList.contains("lightTile")){
	  lightClick(parseInt(event.target.dataset.index))
	}
	checkWinner()
}

// random number generator
function randomNumGen(min, max) {
	let dif = max - min
	let randomNum
	randomNum = Math.floor(Math.random() * dif)
	randomNum += min
	return randomNum
}

// checks to see if you are a winner!
function checkWinner() {
	for(let light of LIGHTS){
	  if(!light.classList.contains("tileOff")){
		return
	  }
	}
	// if make it down here, then you are a winner
	alert(`Congratulations! You have Won!\nYou solved the game in ${guessCount} guesses.\nClick the board or press reset to play again.`);

	GAME_BOARD.classList.add("unplayable")

	// display cheerful board
	//cheerfulBoard() // 
}

// cheerful Board function // a work in progress. Probably won't finish.
/*function cheerfulBoard() {
	let index
	let flashes = 0
	while(flashes < 1000){
	  index = randomNumGen(MIN_INDEX, MAX_INDEX)
	  clearInterval(setInterval(function () {LIGHTS[index].classList.toggle("tileOff")} , 25));
	  //clearInterval();
	  flashes += 1;
	}
}*/

// event listeners below
GAME_BTN.addEventListener('click', buttonDecide)
GAME_BOARD.addEventListener('click', gameBoardDecide)