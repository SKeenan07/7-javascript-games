document.addEventListener('DOMContentLoaded', () => {
	// Card options
	const cardArray = [
		{
			name: 'Dublin',
			img: 'images/Dublin_enric-moreu-YQb4ZbM0b3Q-unsplash.jpg'
		},
		{
			name: 'Dublin',
			img: 'images/Dublin_enric-moreu-YQb4ZbM0b3Q-unsplash.jpg'
		},
		{
			name: 'London',
			img: 'images/London_charlie-marusiak-HkZE5eE5Izg-unsplash.jpg'
		},
		{
			name: 'London',
			img: 'images/London_charlie-marusiak-HkZE5eE5Izg-unsplash.jpg'
		},
		{
			name: 'NYC',
			img: 'images/NYC_nirmal-rajendharkumar-K_Q21NQAjoI-unsplash.jpg'
		},
		{
			name: 'NYC',
			img: 'images/NYC_nirmal-rajendharkumar-K_Q21NQAjoI-unsplash.jpg'
		},
		{
			name: 'Paris',
			img: 'images/Paris_grillot-edouard-888-NfA8Tfo-unsplash.jpg'
		},
		{
			name: 'Paris',
			img: 'images/Paris_grillot-edouard-888-NfA8Tfo-unsplash.jpg'
		},
		{
			name: 'Rome',
			img: 'images/Rome_roberto-reigado-Blp3s4lG6t4-unsplash.jpg'
		},
		{
			name: 'Rome',
			img: 'images/Rome_roberto-reigado-Blp3s4lG6t4-unsplash.jpg'
		},
		{
			name: 'Seoul',
			img: 'images/Seoul_ciaran-o-brien-qegMLAiTBA4-unsplash.jpg'
		},
		{
			name: 'Seoul',
			img: 'images/Seoul_ciaran-o-brien-qegMLAiTBA4-unsplash.jpg'
		},
		{
			name: 'Sydney',
			img: 'images/Sydney_hannah-skelly-64T7Qg2nCLc-unsplash.jpg'
		},
		{
			name: 'Sydney',
			img: 'images/Sydney_hannah-skelly-64T7Qg2nCLc-unsplash.jpg'
		},
		{
			name: 'Toronto',
			img: 'images/Toronto_warren-wong-9FdMgHz6bbM-unsplash.jpg'
		},
		{
			name: 'Toronto',
			img: 'images/Toronto_warren-wong-9FdMgHz6bbM-unsplash.jpg'
		}
	]
	
	cardArray.sort(() => 0.5 - Math.random())
	
	const grid = document.querySelector('.grid')
	const resultDisplay = document.querySelector('#result')
	var cardsChosen = []
	var cardsChosenId = []
	const cardsWon = []
	
	// Create game board
	function createBoard() {
		for (let i = 0; i < cardArray.length; i++) {
			var card = document.createElement('img')
			card.setAttribute('src', 'images/blue_julia-sabiniarz-lsng4VBmCjM-unsplash.jpg')
			card.setAttribute('data-id', i)
			card.addEventListener('click', flipCard)
			grid.appendChild(card)
		}
	}
	
	// Check for matches
	function checkForMatch() {
		var cards = document.querySelectorAll('img')
		const optionOneId = cardsChosenId[0]
		const optionTwoId = cardsChosenId[1]
		if(optionOneId == optionTwoId) {
			cards[optionOneId].setAttribute('src', 'images/blank.png')
			cards[optionTwoId].setAttribute('src', 'images/blank.png')
			alert('You clicked the same image!')
		}
		else if (cardsChosen[0] === cardsChosen[1]) {
			alert ('You found a match!')
			cards[optionOneId].setAttribute('scr', 'images/white.png')
			cards[optionTwoId].setAttribute('scr', 'images/white.png')
			cards[optionOneId].removeEventListener('click', flipCard)
			cards[optionTwoId].removeEventListener('click', flipCard)
			cardsWon.push(cardsChosen)
		} else {
			cards[optionOneId].setAttribute('src', 'images/blue_julia-sabiniarz-lsng4VBmCjM-unsplash.jpg')
			cards[optionTwoId].setAttribute('src', 'images/blue_julia-sabiniarz-lsng4VBmCjM-unsplash.jpg')
			alert('Sorry, try again')
		}
		cardsChosen = []
		cardsChosenId = []
		resultDisplay.textContent = cardsWon.length
		if (cardsWon.length === cardArray.length/2) {
			resultDisplay.textContent = "Congratulations! You found all the matches!"
		}
	}
	
	// Flip card
	function flipCard() {
		var cardId = this.getAttribute('data-id')
		cardsChosen.push(cardArray[cardId].name)
		cardsChosenId.push(cardId)
		this.setAttribute('src', cardArray[cardId].img)
		if (cardsChosen.length === 2) {
			setTimeout(checkForMatch, 500)
		}
		
	}
	
	createBoard()
})