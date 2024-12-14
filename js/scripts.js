const timerElement = document.getElementById('time');
const popup = document.getElementById('popup');
const popupMessage = document.getElementById('popup-message');
const popupClose = document.getElementById('popup-close');
const collectibles = document.querySelectorAll('.collectible');
const moveLeftButton = document.getElementById('move-left');
const moveRightButton = document.getElementById('move-right');
const dropClawButton = document.getElementById('drop-claw');
const startButton = document.querySelector('.start-button');

let timer;
let timeLeft = 30;
let collectedPrizes = [];
let clawPosition = 2; // Middle position

const prizeImages = [
    '../images/kirby.png',
    '../images/melody.png',
    '../images/pig.png',
    '../images/sheep.png',
    '../images/star.png',
    '../images/unicorn.png'
];

function updateTimer() {
    timerElement.textContent = `00:${timeLeft < 10 ? '0' : ''}${timeLeft}`;
}

function startGame() {
    resetGame();
    timer = setInterval(() => {
        timeLeft--;
        updateTimer();
        if (timeLeft <= 0) {
            clearInterval(timer);
            showPopup('Time is up! Try again!');
        }
    }, 1000);
}

function resetGame() {
    clearInterval(timer);
    timeLeft = 30;
    updateTimer();
}

function moveClaw(direction) {
    if (direction === 'left' && clawPosition > 0) {
        clawPosition--;
    } else if (direction === 'right' && clawPosition < collectibles.length - 1) {
        clawPosition++;
    }
    console.log(`Claw position: ${clawPosition}`);
}

function dropClaw() {
    if (timeLeft > 0) {

        const prizeIndex = Math.floor(Math.random() * prizeImages.length);
        if (!collectedPrizes.includes(prizeIndex)) {
            collectedPrizes.push(prizeIndex);
            const prizeImage = document.createElement('img');
            prizeImage.src = prizeImages[prizeIndex];
            prizeImage.alt = 'Collectible';
            collectibles[prizeIndex].appendChild(prizeImage);
            showPopup('You won a prize!');
            if (collectedPrizes.length === prizeImages.length) {
                showPopup('Congratulations! You collected all the prizes!');
            }
        } else {
            showPopup('Oops! You missed.');
        }

    }
}

function showPopup(message) {
    popupMessage.textContent = message;
    popup.style.display = 'block';
}

popupClose.addEventListener('click', () => {
    popup.style.display = 'none';
});

startButton.addEventListener('click', startGame);
moveLeftButton.addEventListener('click', () => moveClaw('left'));
moveRightButton.addEventListener('click', () => moveClaw('right'));
dropClawButton.addEventListener('click', dropClaw);

updateTimer();
