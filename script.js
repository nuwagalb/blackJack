//
// Black Jack
// by Albert Nuwagaba
//

function startBlackJack () {

    // //Card variables
    let suit = ['Hearts', 'Spades', 'Clubs', 'Diamonds'],
        values = ['Ace', 'King', 'Queen', 'Jack',
                'Ten', 'Nine', 'Eight', 'Seven',
                'Six', 'Five', 'Four', 'Three',
                'Two'];

    //DOM variables            
    let textArea = document.getElementById('text-area'),
        newButton = document.getElementById('new-game-button'),
        hitButton = document.getElementById('hit-button'),
        stayButton = document.getElementById('stay-button');

    //Game variables
    let gameStarted = false,
        gameOver = false,
        playerWon = false,
        drawGame = false,
        dealerCards = [],
        playerCards = [],
        dealerScore = 0,
        playerScore = 0,
        deck = [];

    
    //hide Hit Button and Stay Button at the start of a New Game
    hitButton.style.display = 'none';
    stayButton.style.display = 'none';
    showStatus();

    //when new game starts, hide the start new button and display the hit and stay buttons
    newButton.addEventListener('click', function () {
        gameStarted = true;
        gameOver = false;
        playerWon = false;

        deck = createDeck();
        shuffleDeck(deck);
        dealerCards = [getNextCard(),  getNextCard()];
        playerCards = [getNextCard(),  getNextCard()];

        newButton.style.display = 'none';
        hitButton.style.display = 'inline';
        stayButton.style.display = 'inline';
        showStatus();
    });

    hitButton.addEventListener('click', function() {
        playerCards.push(getNextCard());
        checkForEndOfGame();
        showStatus();
    });

    stayButton.addEventListener('click', function() {
        gameOver = true;
        checkForEndOfGame();
        showStatus();
    });

    function createDeck() {
        let deck = [];

        for (let suitIdx = 0; suitIdx < suit.length; suitIdx++) {
            for (let valuesIdx = 0; valuesIdx < values.length; valuesIdx++) {
                let card = {
                    suit: suit[suitIdx],
                    value: values[valuesIdx]
                };

                deck.push(card);
            }
        }

        return deck;
    }

    function shuffleDeck(deck) {
        for (let i = 0; i < deck.length; i++) {
            let swapIdx = Math.trunc(Math.random() * deck.length);
            let tmp = deck[swapIdx];
            deck[swapIdx] = deck[i];
            deck[i] = tmp;
        }
    }

    function getCardString (card) {
        return card.value + " of " + card.suit;
    }

    function getNextCard() {
       return deck.shift();       
    }

    function getCardNumericValue(card) {
        switch (card.value) {
            case 'Ace':
                return 1;
        
            case 'Two':
                return 2;
            
            case 'Three':
                return 3;
                
            case 'Four':
                return 4;

            case 'Five':
                return 5;

            case 'Six':
                return 6;

            case 'Seven':
                return 7;

            case 'Eight':
                return 8;

            case 'Nine':
                return 9;
    
            default:
                return 10;
        }
    }

    function getScore(cardsArray) {
        let score = 0;
        let hasAce = false;
        for (let i = 0; i < cardsArray.length; i++) {
            let card = cardsArray[i];
            score += getCardNumericValue(card);

            if (card.value === 'Ace') {
                hasAce = true;
            }
        }

        if (hasAce && score + 10 <= 21) {
            return score + 10;
        }

        return score;
    }

    function updateScores() {
       dealerScore = getScore(dealerCards);
       playerScore = getScore(playerCards);
    }

    function checkForEndOfGame() {
        updateScores();

        if (gameOver) {
            //let dealer take cards
            while (dealerScore < playerScore
                   && playerScore <= 21
                   && dealerScore <= 21) {
                dealerCards.push(getNextCard());
                updateScores();
            }
        }

        if (playerScore > 21) {
            playerWon = false;
            gameOver = true;
        }
        else if (dealerScore > 21) {
            playerWon = true;
            gameOver = true;
        }
        else if (gameOver) {
            if (playerScore > dealerScore) {
                playerWon = true;
            }
            else {
                playerWon = false;
            }
        }
    }

    function resetButtons() {
        newButton.style.display = 'inline';
        hitButton.style.display = 'none';
        stayButton.style.display = 'none'; 
    }
    
    function showStatus() {
        if (!gameStarted) {
            textArea.innerText = "Welcome to Black Jack!";
            return;
        }

       let dealerCardString = '';
       for (let i = 0; i < dealerCards.length; i++) {
           dealerCardString += getCardString(dealerCards[i]) + '\n';
       }

       let playerCardString = '';
       for (let i = 0; i < playerCards.length; i++) {
           playerCardString += getCardString(playerCards[i]) + '\n';
       }

       updateScores();

       textArea.innerText = 
        'Dealer has:\n' +
        dealerCardString +
        '(score: ' + dealerScore + ')\n\n' + 

        'Player has:\n' +
        playerCardString +
        '(score: ' + playerScore + ')\n\n';

        if (playerScore === 21) {
            textArea.innerText += "YOU WIN!";
            resetButtons();
        }
        
        if (dealerScore === 21 && !gameOver) {
            textArea.innerText += "DEALER WINS";
            resetButtons();
        }

        if (playerScore === dealerScore) {
            textArea.innerText += "DRAW GAME!";
            gameOver = false;
            resetButtons();
        }

        if (dealerCards.length === 5 && dealerScore < 21 && !gameOver) {
            textArea.innerText += "DEALER WINS";
        }

        if (gameOver) {
            if (playerWon) {
                textArea.innerText += "YOU WIN!"; 
            }
            else {
                textArea.innerText += "DEALER WINS!";
            }
            resetButtons();
        }
    }
}
