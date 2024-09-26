const images = [
    'img1.jpg', 'img2.jpg', 'img3.jpg',
    'img4.jpg', 'img5.jpg', 'img6.jpg'
];
let cards = [...images, ...images];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;

function shuffle(array) {
    return array.sort(() => 0.5 - Math.random());
}

function createBoard() {
    const board = document.getElementById('game-board');
    shuffle(cards).forEach(image => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.image = image;

        const img = document.createElement('img');
        img.src = image;
        card.appendChild(img);
        
        card.addEventListener('click', flipCard);
        board.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard || this === firstCard) return;
    
    this.querySelector('img').style.display = 'block';
    
    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    checkForMatch();
}

function checkForMatch() {
    if (firstCard.dataset.image === secondCard.dataset.image) {
        disableCards();
        matchedPairs++;
        if (matchedPairs === images.length) {
            const confettiInterval = setInterval(launchConfetti, 100);
            setTimeout(() => {
                clearInterval(confettiInterval);
            }, 3000);
            document.getElementById('message').innerText = 'Feliz Cumpleaños mi amor, gracias por existir, que tengas una vida llena de exitos y bendiciones';
        }
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.querySelector('img').style.display = 'none';
        secondCard.querySelector('img').style.display = 'none';
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

createBoard();

function launchConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}
