document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div')
    const scoreDisplay = document.querySelector('span')
    const startBtn = document.querySelector('.start')

    const width = 10
    let currentIndex = 0 // the first div in the grid
    let appleIndex = 0 // the first div in the grid
    let currentSnake = [2,1,0] // The div with a value of 2 is the head // The div with a value of 1 is the body // The div with a value of 0 is the tail
    let direction = 1
    let score = 0
    let speed = 0.9
    let intervalTime = 0
    let interval = 0


    // Start and Restart the game
    function startGame() {
        currentSnake.forEach(index => squares[index].classList.remove('snake'))
        squares[appleIndex].classList.remove('apple')
        clearInterval(interval)
        score = 0
        randomApple()
        direction = 1
        scoreDisplay.innerText = score
        intervalTime = 1000
        currentSnake = [2,1,0]
        currentIndex = 0
        currentSnake.forEach(index => squares[index].classList.add('snake'))
        interval = setInterval(moveOutcomes, intervalTime)
    }

    // Snake Outcomes
    function moveOutcomes() {

        // If the snake hits a border or itself
        if (
            (currentSnake[0] + width >= (width * width) && direction === width) || // Snake hits the bottom
            (currentSnake[0] % width === width -1 && direction === 1) || // Snake hits the right border
            (currentSnake[0] % width === 0 && direction === -1) || // Snake hits the left border
            (currentSnake[0] - width < 0 && direction === -width) || // Snake hits the top
            squares[currentSnake[0] + direction].classList.contains('snake') // Snake hits itself
        ) {
            // Then, clear the interval
            return clearInterval(interval)
        }

        const tail = currentSnake.pop() // Define tail
        squares[tail].classList.remove('snake') // Remove Snake class from the tail
        currentSnake.unshift(currentSnake[0] + direction)

        // Getting the apple
        if(squares[currentSnake[0]].classList.contains('apple')) {
            squares[currentSnake[0]].classList.remove('apple')
            squares[tail].classList.add('snake')
            currentSnake.push(tail)
            randomApple()
            score++
            scoreDisplay.textContent = score
            clearInterval(interval)
            intervalTime = intervalTime * speed
            interval = setInterval(moveOutcomes, intervalTime)
        }
        squares[currentSnake[0]].classList.add('snake')
    }

    // Generate a new apple
    function randomApple() {
        do{
            appleIndex = Math.floor(Math.random() * squares.length)
        } while(squares[appleIndex].classList.contains('snake')) // Make sure apple isn't where the snake is
        squares[appleIndex].classList.add('apple')
    }

    // Assign functions to key codes
    function control(e) {
        squares[currentIndex].classList.remove('snake') //Remove snake between each move - prevent snake from being left behind

        if (e.keyCode === 39) {
            direction = 1 // Move RIGHT
        } else if (e.keyCode === 38) {
            direction = -width // Move UP
        } else if (e.keyCode === 37) {
            direction = -1 // Move LEFT
        } else if (e.keyCode === 40) {
            direction = +width // Move DOWN
        }
    }

    // Listen for key strokes to execute control function
    document.addEventListener('keyup', control)
    startBtn.addEventListener('click', startGame)

})