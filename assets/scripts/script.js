const Front = 'card_front';
const Back = 'card_back';
const Card = 'card';
const Icon = 'icon';

startGame();

function startGame() {
    initializeCards(game.createCardsFromTechs());
}

function initializeCards(cards) {
    let tabuleiro = document.getElementById('tabuleiro');

    tabuleiro.innerHTML = '';
    game.cards.forEach((card) => {
        let cardElement = document.createElement('div');
        cardElement.id = card.id;
        cardElement.classList.add(Card);
        cardElement.dataset.icon = card.icon;

        createCardContent(card, cardElement);

        cardElement.addEventListener('click', flipCard);
        tabuleiro.appendChild(cardElement);
    });
}

function createCardContent(card, cardElement) {
    createCardFace(Front, card, cardElement);
    createCardFace(Back, card, cardElement);
}

function createCardFace(face, card, element) {
    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face);
    if (face === Front) {
        let iconElement = document.createElement('img');
        iconElement.classList.add(Icon);
        iconElement.src = './assets/images/' + card.icon + '.svg';
        cardElementFace.appendChild(iconElement);
    } else {
        cardElementFace.innerHTML = '&lt/&gt';
    }
    element.appendChild(cardElementFace);
}

function flipCard() {
    if (game.setCard(this.id)) {
        this.classList.add('flip');
        if (game.secondCard) {
            if (game.checkMatch()) {
                game.clearCards();
                if (game.checkGameOver()) {
                    let gameOverLayer = document.getElementById('gameOver');
                    gameOverLayer.style.display = 'flex';
                }
            } else {
                setTimeout(() => {
                    let firstCardView = document.getElementById(
                        game.firstCard.id
                    );
                    let secondCardView = document.getElementById(
                        game.secondCard.id
                    );

                    firstCardView.classList.remove('flip');
                    secondCardView.classList.remove('flip');
                    game.unflipCards();
                }, 1000);
            }
        }
    }
}

function restart() {
    game.clearCards();
    startGame();
    let gameOverLayer = document.getElementById('gameOver');
    gameOverLayer.style.display = 'none';
}
