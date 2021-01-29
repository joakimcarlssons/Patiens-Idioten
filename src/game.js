module.exports = {

    fillDeck() {
        let arr = []
        const suites = ["Hearts", "Spades", "Diamonds", "Clubs"]
        
        for(let suite of suites) {
            for(let value = 2; value <= 14; value++) {
                const card = {suite, value}
                arr.push(card)
            }
          }

          return arr
    },

    shuffle(arrayToShuffle) {
        return arrayToShuffle.sort(() => Math.random()-0.5)
    },

    takeFour(mainDeck, playDeck){

        const start = mainDeck.length - 1
        const end = mainDeck.length - 4
        let counter = 0

        for(let i = start; i >= end; i--) {
            playDeck[counter].cards.push(mainDeck[i])
            counter++;
        }

        mainDeck.splice(end, 4)
    },

    getTopCards(arrayToGetCardsFrom){
        let topCards = []

        // Get the current cards lying on top
        for(let i = 0; i < 4; i++) {
            topCards.push(arrayToGetCardsFrom[i].cards[arrayToGetCardsFrom[i].cards.length - 1])
        }

        return topCards
    },


    checkForTrashables(currentPlayDeck) {
        let topCards = []
        let trashables = []

        // Get the current cards lying on top
        topCards = this.getTopCards(currentPlayDeck)

        // Sort the cards by color and value
        topCards = topCards.sort((a, b) => (a.suite > b.suite) ? 1 : -1)

        // Check if a card is trashable, and add it to the array if it is
        for(let i = 0; i < topCards.length -1; i++) {
            if(topCards[i] != undefined) {
                
                if(topCards[i+1] != undefined) {
                // Check if the next card is of same suite and higher value
                    if((topCards[i].suite == topCards[i+1].suite)) {
        
                        if(topCards[i].value < topCards[i+1].value) {
                            trashables.push(topCards[i])
                        }
                        else {
                            trashables.push(topCards[i+1])
                        }
                    }
                }
            }
        }

        // Return the trashable items
        return trashables
    }
}